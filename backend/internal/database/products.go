package database

import (
	"database/sql"
	"fmt"
	"strconv"

	"pharmacy-backend/internal/models"
)

// =====================================================
// PRODUCT CRUD OPERATIONS
// =====================================================

// GetAllProducts retrieves all products with related data for API response
func GetAllProducts(db *sql.DB) ([]models.ProductResponse, error) {
	query := `
		WITH product_pack_sizes AS (
			SELECT 
				product_id,
				MAX(CASE WHEN pack_type = 'strip' THEN units_per_pack ELSE 0 END) as strip_units,
				MAX(CASE WHEN pack_type = 'box' THEN units_per_pack ELSE 0 END) as box_units
			FROM product_packaging
			GROUP BY product_id
		),
		product_pack_prices AS (
			SELECT 
				product_id,
				MAX(CASE WHEN pack_type = 'strip' THEN selling_price ELSE 0 END) as strip_price,
				MAX(CASE WHEN pack_type = 'box' THEN selling_price ELSE 0 END) as box_price
			FROM product_packaging
			GROUP BY product_id
		),
		latest_batch AS (
			SELECT DISTINCT ON (product_id)
				product_id, batch_id, expiry_date, purchase_date
			FROM product_batch
			ORDER BY product_id, created_at DESC
		),
		primary_supplier AS (
			SELECT DISTINCT ON (ps.product_id)
				ps.product_id, s.name, s.contact
			FROM product_supplier ps
			JOIN supplier s ON ps.supplier_id = s.id
			WHERE ps.is_primary = TRUE OR ps.id IS NOT NULL
			ORDER BY ps.product_id, ps.is_primary DESC, ps.created_at DESC
		)
		SELECT 
			ROW_NUMBER() OVER (ORDER BY p.id) as srl_no,
			p.id,
			p.product_name,
			COALESCE(p.image, '') as image,
			COALESCE(p.product_description, '') as description,
			COALESCE(p.barcode, '') as barcode,
			COALESCE(p.product_code, '') as product_code,
			COALESCE(p.strength, '') as strength,
			COALESCE(p.manufacture, '') as manufacture,
			COALESCE(g.generic_name, '') as generic_name,
			COALESCE(p.unit_price, 0) as price,
			COALESCE(p.unit_mrp, 0) as mrp,
			COALESCE(p.discount_percent, 0) as discount,
			COALESCE(p.vat_percent, 0) as vat,
			COALESCE(r.rack_name, '') as rack_no,
			COALESCE(r.rack_location, '') as rack_location,
			p.rack_fk_id,
			COALESCE(p.total_purchase, 0) as total_purchase,
			COALESCE(p.total_sold, 0) as total_sold,
			COALESCE(p.available_stock, 0) as in_stock,
			COALESCE(p.stock_alert, 0) as stock_alert,
			COALESCE(c.category_name, '') as category,
			COALESCE(pt.type_name, '') as type,
			COALESCE(lb.batch_id, '') as batch_id,
			COALESCE(TO_CHAR(lb.expiry_date, 'YYYY-MM-DD'), '') as expiry_date,
			COALESCE(TO_CHAR(lb.purchase_date, 'YYYY-MM-DD'), '') as purchase_date,
			COALESCE(ps.name, '') as supplier_name,
			COALESCE(ps.contact, '') as supplier_contact,
			COALESCE(p.unit_cost_price, 0) as buying_price,
			COALESCE(pps.strip_units, 0) as strip_units,
			COALESCE(pps.box_units, 0) as box_units,
			COALESCE(ppp.strip_price, 0) as strip_price,
			COALESCE(ppp.box_price, 0) as box_price
		FROM product p
		LEFT JOIN generic_name g ON p.generic_fk_id = g.id
		LEFT JOIN rack r ON p.rack_fk_id = r.id
		LEFT JOIN category c ON p.category_fk_id = c.id
		LEFT JOIN product_type pt ON p.product_type_fk_id = pt.id
		LEFT JOIN product_pack_sizes pps ON p.id = pps.product_id
		LEFT JOIN product_pack_prices ppp ON p.id = ppp.product_id
		LEFT JOIN latest_batch lb ON p.id = lb.product_id
		LEFT JOIN primary_supplier ps ON p.id = ps.product_id
		WHERE p.deleted = 0
		ORDER BY p.product_name
	`

	rows, err := db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to query products: %w", err)
	}
	defer rows.Close()

	var products []models.ProductResponse
	for rows.Next() {
		var p models.ProductResponse
		var id, srlNo int
		var rackFkID sql.NullInt64
		var stripUnits, boxUnits int
		var stripPrice, boxPrice float64

		err := rows.Scan(
			&srlNo, &id,
			&p.Name, &p.Image, &p.Description, &p.Barcode, &p.ProductCode,
			&p.Strength, &p.Manufacture, &p.GenericName,
			&p.Price, &p.MRP, &p.Discount, &p.VAT,
			&p.RackNo, &p.RackLocation, &rackFkID,
			&p.TotalPurchase, &p.TotalSold, &p.InStock, &p.StockAlert,
			&p.Category, &p.Type,
			&p.BatchID, &p.ExpiryDate, &p.PurchaseDate,
			&p.Supplier, &p.SupplierContact,
			&p.BuyingPrice,
			&stripUnits, &boxUnits,
			&stripPrice, &boxPrice,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan product row: %w", err)
		}

		// Format ID as "prod_001"
		p.ID = fmt.Sprintf("prod_%03d", id)
		p.SrlNo = srlNo

		// Set rack FK ID
		if rackFkID.Valid {
			p.RackFkID = int(rackFkID.Int64)
		}

		// Set pack size and price
		p.PackSize = models.PackSize{
			Strip: stripUnits,
			Box:   boxUnits,
		}
		p.PackPrice = models.PackPrice{
			Strip: stripPrice,
			Box:   boxPrice,
		}

		// Calculate stock status
		p.StockStatus = calculateStockStatus(p.InStock)
		p.ProfitMargin = calculateProfitMargin(p.Price, p.BuyingPrice)

		products = append(products, p)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating product rows: %w", err)
	}

	return products, nil
}

// GetProductByID retrieves a single product by ID
func GetProductResponseByID(db *sql.DB, idStr string) (*models.ProductResponse, error) {
	// Parse ID (supports both "prod_001" format and plain "1")
	id, err := parseProductID(idStr)
	if err != nil {
		return nil, fmt.Errorf("invalid product ID: %w", err)
	}

	query := `
		WITH product_pack_sizes AS (
			SELECT 
				product_id,
				MAX(CASE WHEN pack_type = 'strip' THEN units_per_pack ELSE 0 END) as strip_units,
				MAX(CASE WHEN pack_type = 'box' THEN units_per_pack ELSE 0 END) as box_units
			FROM product_packaging
			WHERE product_id = $1
			GROUP BY product_id
		),
		product_pack_prices AS (
			SELECT 
				product_id,
				MAX(CASE WHEN pack_type = 'strip' THEN selling_price ELSE 0 END) as strip_price,
				MAX(CASE WHEN pack_type = 'box' THEN selling_price ELSE 0 END) as box_price
			FROM product_packaging
			WHERE product_id = $1
			GROUP BY product_id
		),
		latest_batch AS (
			SELECT batch_id, expiry_date, purchase_date
			FROM product_batch
			WHERE product_id = $1
			ORDER BY created_at DESC
			LIMIT 1
		),
		primary_supplier AS (
			SELECT s.name, s.contact
			FROM product_supplier ps
			JOIN supplier s ON ps.supplier_id = s.id
			WHERE ps.product_id = $1
			ORDER BY ps.is_primary DESC, ps.created_at DESC
			LIMIT 1
		)
		SELECT 
			p.id,
			p.product_name,
			COALESCE(p.image, '') as image,
			COALESCE(p.product_description, '') as description,
			COALESCE(p.barcode, '') as barcode,
			COALESCE(p.product_code, '') as product_code,
			COALESCE(p.strength, '') as strength,
			COALESCE(p.manufacture, '') as manufacture,
			COALESCE(g.generic_name, '') as generic_name,
			COALESCE(p.unit_price, 0) as price,
			COALESCE(p.unit_mrp, 0) as mrp,
			COALESCE(p.discount_percent, 0) as discount,
			COALESCE(p.vat_percent, 0) as vat,
			COALESCE(r.rack_name, '') as rack_no,
			COALESCE(r.rack_location, '') as rack_location,
			p.rack_fk_id,
			COALESCE(p.total_purchase, 0) as total_purchase,
			COALESCE(p.total_sold, 0) as total_sold,
			COALESCE(p.available_stock, 0) as in_stock,
			COALESCE(p.stock_alert, 0) as stock_alert,
			COALESCE(c.category_name, '') as category,
			COALESCE(pt.type_name, '') as type,
			COALESCE(lb.batch_id, '') as batch_id,
			COALESCE(TO_CHAR(lb.expiry_date, 'YYYY-MM-DD'), '') as expiry_date,
			COALESCE(TO_CHAR(lb.purchase_date, 'YYYY-MM-DD'), '') as purchase_date,
			COALESCE(ps.name, '') as supplier_name,
			COALESCE(ps.contact, '') as supplier_contact,
			COALESCE(p.unit_cost_price, 0) as buying_price,
			COALESCE(pps.strip_units, 0) as strip_units,
			COALESCE(pps.box_units, 0) as box_units,
			COALESCE(ppp.strip_price, 0) as strip_price,
			COALESCE(ppp.box_price, 0) as box_price
		FROM product p
		LEFT JOIN generic_name g ON p.generic_fk_id = g.id
		LEFT JOIN rack r ON p.rack_fk_id = r.id
		LEFT JOIN category c ON p.category_fk_id = c.id
		LEFT JOIN product_type pt ON p.product_type_fk_id = pt.id
		LEFT JOIN product_pack_sizes pps ON p.id = pps.product_id
		LEFT JOIN product_pack_prices ppp ON p.id = ppp.product_id
		LEFT JOIN latest_batch lb ON TRUE
		LEFT JOIN primary_supplier ps ON TRUE
		WHERE p.id = $1 AND p.deleted = 0
	`

	var p models.ProductResponse
	var dbID int
	var rackFkID sql.NullInt64
	var stripUnits, boxUnits int
	var stripPrice, boxPrice float64

	err = db.QueryRow(query, id).Scan(
		&dbID,
		&p.Name, &p.Image, &p.Description, &p.Barcode, &p.ProductCode,
		&p.Strength, &p.Manufacture, &p.GenericName,
		&p.Price, &p.MRP, &p.Discount, &p.VAT,
		&p.RackNo, &p.RackLocation, &rackFkID,
		&p.TotalPurchase, &p.TotalSold, &p.InStock, &p.StockAlert,
		&p.Category, &p.Type,
		&p.BatchID, &p.ExpiryDate, &p.PurchaseDate,
		&p.Supplier, &p.SupplierContact,
		&p.BuyingPrice,
		&stripUnits, &boxUnits,
		&stripPrice, &boxPrice,
	)

	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("product not found")
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get product: %w", err)
	}

	p.ID = fmt.Sprintf("prod_%03d", dbID)
	p.SrlNo = 1 // Single product doesn't need row number

	// Set rack FK ID
	if rackFkID.Valid {
		p.RackFkID = int(rackFkID.Int64)
	}

	p.PackSize = models.PackSize{Strip: stripUnits, Box: boxUnits}
	p.PackPrice = models.PackPrice{Strip: stripPrice, Box: boxPrice}
	p.StockStatus = calculateStockStatus(p.InStock)
	p.ProfitMargin = calculateProfitMargin(p.Price, p.BuyingPrice)

	return &p, nil
}

// CreateNewProduct creates a new product with all related data
func CreateNewProduct(db *sql.DB, req models.CreateProductRequest) (*models.ProductResponse, error) {
	tx, err := db.Begin()
	if err != nil {
		return nil, fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()

	// 1. Get or create generic name
	var genericID *int
	if req.GenericName != "" {
		id, err := getOrCreateGenericName(tx, req.GenericName)
		if err != nil {
			return nil, err
		}
		genericID = &id
	}

	// 2. Get or create rack
	var rackID *int
	if req.RackNo != "" {
		id, err := getOrCreateRack(tx, req.RackNo, req.RackLocation)
		if err != nil {
			return nil, err
		}
		rackID = &id
	}

	// 3. Get or create product type
	var productTypeID *int
	if req.Type != "" {
		id, err := getOrCreateProductType(tx, req.Type)
		if err != nil {
			return nil, err
		}
		productTypeID = &id
	}

	// 4. Get or create category
	var categoryID *int
	if req.Category != "" {
		id, err := getOrCreateCategory(tx, req.Category)
		if err != nil {
			return nil, err
		}
		categoryID = &id
	}

	// 5. Generate barcode and product code
	barcode := generateBarcode()
	productCode := generateProductCode(req.Name, req.Strength)

	// 6. Insert product
	productQuery := `
		INSERT INTO product (
			product_name, product_description, barcode, product_code,
			strength, manufacture, generic_fk_id, rack_fk_id, 
			product_type_fk_id, category_fk_id,
			unit_price, unit_mrp, unit_cost_price, discount_percent,
			available_stock, total_purchase, total_sold
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 0, 0)
		RETURNING id
	`

	var productID int
	err = tx.QueryRow(productQuery,
		req.Name, req.Description, barcode, productCode,
		req.Strength, req.Manufacture, genericID, rackID,
		productTypeID, categoryID,
		req.Price, req.MRP, req.BuyingPrice, req.Discount,
		req.InStock,
	).Scan(&productID)

	if err != nil {
		return nil, fmt.Errorf("failed to insert product: %w", err)
	}

	// 7. Insert packaging
	if req.PackSize.Strip > 0 || req.PackPrice.Strip > 0 {
		_, err = tx.Exec(`
			INSERT INTO product_packaging (product_id, pack_type, units_per_pack, selling_price, mrp, cost_price)
			VALUES ($1, 'strip', $2, $3, $4, $5)
		`, productID, req.PackSize.Strip, req.PackPrice.Strip, req.PackPrice.Strip, req.BuyingPrice*float64(req.PackSize.Strip))
		if err != nil {
			return nil, fmt.Errorf("failed to insert strip packaging: %w", err)
		}
	}

	if req.PackSize.Box > 0 || req.PackPrice.Box > 0 {
		_, err = tx.Exec(`
			INSERT INTO product_packaging (product_id, pack_type, units_per_pack, selling_price, mrp, cost_price)
			VALUES ($1, 'box', $2, $3, $4, $5)
		`, productID, req.PackSize.Box, req.PackPrice.Box, req.PackPrice.Box, req.BuyingPrice*float64(req.PackSize.Box))
		if err != nil {
			return nil, fmt.Errorf("failed to insert box packaging: %w", err)
		}
	}

	// 8. Create supplier and link if provided
	if req.Supplier != "" {
		supplierID, err := getOrCreateSupplier(tx, req.Supplier, req.SupplierContact)
		if err != nil {
			return nil, err
		}
		_, err = tx.Exec(`
			INSERT INTO product_supplier (product_id, supplier_id, is_primary, buying_price)
			VALUES ($1, $2, TRUE, $3)
		`, productID, supplierID, req.BuyingPrice)
		if err != nil {
			return nil, fmt.Errorf("failed to link supplier: %w", err)
		}
	}

	if err := tx.Commit(); err != nil {
		return nil, fmt.Errorf("failed to commit transaction: %w", err)
	}

	// Build response
	response := &models.ProductResponse{
		ID:              fmt.Sprintf("prod_%03d", productID),
		SrlNo:           productID,
		Name:            req.Name,
		Description:     req.Description,
		Barcode:         barcode,
		ProductCode:     productCode,
		Strength:        req.Strength,
		Manufacture:     req.Manufacture,
		GenericName:     req.GenericName,
		Price:           req.Price,
		MRP:             req.MRP,
		Discount:        req.Discount,
		VAT:             0,
		RackNo:          req.RackNo,
		RackLocation:    req.RackLocation,
		TotalPurchase:   0,
		TotalSold:       0,
		InStock:         req.InStock,
		StockAlert:      10, // Default
		StockStatus:     calculateStockStatus(req.InStock),
		Type:            req.Type,
		Category:        req.Category,
		Supplier:        req.Supplier,
		SupplierContact: req.SupplierContact,
		BuyingPrice:     req.BuyingPrice,
		ProfitMargin:    calculateProfitMargin(req.Price, req.BuyingPrice),
		PackSize:        req.PackSize,
		PackPrice:       req.PackPrice,
	}

	return response, nil
}

// UpdateExistingProduct updates a product and related data
func UpdateExistingProduct(db *sql.DB, idStr string, req models.UpdateProductRequest) (*models.ProductResponse, error) {
	id, err := parseProductID(idStr)
	if err != nil {
		return nil, fmt.Errorf("invalid product ID: %w", err)
	}

	// Check if product exists
	var exists bool
	err = db.QueryRow("SELECT EXISTS(SELECT 1 FROM product WHERE id = $1 AND deleted = 0)", id).Scan(&exists)
	if err != nil {
		return nil, fmt.Errorf("failed to check product existence: %w", err)
	}
	if !exists {
		return nil, fmt.Errorf("product not found")
	}

	tx, err := db.Begin()
	if err != nil {
		return nil, fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()

	// Update product fields if provided
	if req.Name != nil {
		_, err = tx.Exec("UPDATE product SET product_name = $1, updated_at = NOW() WHERE id = $2", *req.Name, id)
		if err != nil {
			return nil, err
		}
	}
	if req.Description != nil {
		_, err = tx.Exec("UPDATE product SET product_description = $1, updated_at = NOW() WHERE id = $2", *req.Description, id)
		if err != nil {
			return nil, err
		}
	}
	if req.Strength != nil {
		_, err = tx.Exec("UPDATE product SET strength = $1, updated_at = NOW() WHERE id = $2", *req.Strength, id)
		if err != nil {
			return nil, err
		}
	}
	if req.Manufacture != nil {
		_, err = tx.Exec("UPDATE product SET manufacture = $1, updated_at = NOW() WHERE id = $2", *req.Manufacture, id)
		if err != nil {
			return nil, err
		}
	}
	if req.Price != nil {
		_, err = tx.Exec("UPDATE product SET unit_price = $1, updated_at = NOW() WHERE id = $2", *req.Price, id)
		if err != nil {
			return nil, err
		}
	}
	if req.MRP != nil {
		_, err = tx.Exec("UPDATE product SET unit_mrp = $1, updated_at = NOW() WHERE id = $2", *req.MRP, id)
		if err != nil {
			return nil, err
		}
	}
	if req.Discount != nil {
		_, err = tx.Exec("UPDATE product SET discount_percent = $1, updated_at = NOW() WHERE id = $2", *req.Discount, id)
		if err != nil {
			return nil, err
		}
	}
	if req.BuyingPrice != nil {
		_, err = tx.Exec("UPDATE product SET unit_cost_price = $1, updated_at = NOW() WHERE id = $2", *req.BuyingPrice, id)
		if err != nil {
			return nil, err
		}
	}
	if req.InStock != nil {
		_, err = tx.Exec("UPDATE product SET available_stock = $1, updated_at = NOW() WHERE id = $2", *req.InStock, id)
		if err != nil {
			return nil, err
		}
	}

	// Update generic name if provided
	if req.GenericName != nil && *req.GenericName != "" {
		genericID, err := getOrCreateGenericName(tx, *req.GenericName)
		if err != nil {
			return nil, err
		}
		_, err = tx.Exec("UPDATE product SET generic_fk_id = $1, updated_at = NOW() WHERE id = $2", genericID, id)
		if err != nil {
			return nil, err
		}
	}

	// Update rack if provided
	if req.RackNo != nil && *req.RackNo != "" {
		location := ""
		if req.RackLocation != nil {
			location = *req.RackLocation
		}
		rackID, err := getOrCreateRack(tx, *req.RackNo, location)
		if err != nil {
			return nil, err
		}
		_, err = tx.Exec("UPDATE product SET rack_fk_id = $1, updated_at = NOW() WHERE id = $2", rackID, id)
		if err != nil {
			return nil, err
		}
	}

	// Update product type if provided
	if req.Type != nil && *req.Type != "" {
		typeID, err := getOrCreateProductType(tx, *req.Type)
		if err != nil {
			return nil, err
		}
		_, err = tx.Exec("UPDATE product SET product_type_fk_id = $1, updated_at = NOW() WHERE id = $2", typeID, id)
		if err != nil {
			return nil, err
		}
	}

	// Update category if provided
	if req.Category != nil && *req.Category != "" {
		catID, err := getOrCreateCategory(tx, *req.Category)
		if err != nil {
			return nil, err
		}
		_, err = tx.Exec("UPDATE product SET category_fk_id = $1, updated_at = NOW() WHERE id = $2", catID, id)
		if err != nil {
			return nil, err
		}
	}

	// Update packaging if provided
	if req.PackSize != nil || req.PackPrice != nil {
		if req.PackSize != nil && req.PackPrice != nil {
			// Update strip packaging
			_, err = tx.Exec(`
				INSERT INTO product_packaging (product_id, pack_type, units_per_pack, selling_price, mrp, cost_price)
				VALUES ($1, 'strip', $2, $3, $3, $3)
				ON CONFLICT (product_id, pack_type) 
				DO UPDATE SET units_per_pack = $2, selling_price = $3, mrp = $3, updated_at = NOW()
			`, id, req.PackSize.Strip, req.PackPrice.Strip)
			if err != nil {
				return nil, err
			}

			// Update box packaging
			_, err = tx.Exec(`
				INSERT INTO product_packaging (product_id, pack_type, units_per_pack, selling_price, mrp, cost_price)
				VALUES ($1, 'box', $2, $3, $3, $3)
				ON CONFLICT (product_id, pack_type) 
				DO UPDATE SET units_per_pack = $2, selling_price = $3, mrp = $3, updated_at = NOW()
			`, id, req.PackSize.Box, req.PackPrice.Box)
			if err != nil {
				return nil, err
			}
		}
	}

	// Update supplier if provided
	if req.Supplier != nil && *req.Supplier != "" {
		contact := ""
		if req.SupplierContact != nil {
			contact = *req.SupplierContact
		}
		supplierID, err := getOrCreateSupplier(tx, *req.Supplier, contact)
		if err != nil {
			return nil, err
		}

		// Update existing or insert new supplier link
		_, err = tx.Exec(`
			INSERT INTO product_supplier (product_id, supplier_id, is_primary)
			VALUES ($1, $2, TRUE)
			ON CONFLICT (product_id, supplier_id) DO UPDATE SET is_primary = TRUE
		`, id, supplierID)
		if err != nil {
			return nil, err
		}

		// Remove primary status from other suppliers
		_, err = tx.Exec(`
			UPDATE product_supplier SET is_primary = FALSE 
			WHERE product_id = $1 AND supplier_id != $2
		`, id, supplierID)
		if err != nil {
			return nil, err
		}
	}

	if err := tx.Commit(); err != nil {
		return nil, fmt.Errorf("failed to commit transaction: %w", err)
	}

	// Fetch and return updated product
	return GetProductResponseByID(db, idStr)
}

// DeleteProduct soft deletes a product
func DeleteProduct(db *sql.DB, idStr string) error {
	id, err := parseProductID(idStr)
	if err != nil {
		return fmt.Errorf("invalid product ID: %w", err)
	}

	// Check if product exists
	var exists bool
	err = db.QueryRow("SELECT EXISTS(SELECT 1 FROM product WHERE id = $1 AND deleted = 0)", id).Scan(&exists)
	if err != nil {
		return fmt.Errorf("failed to check product existence: %w", err)
	}
	if !exists {
		return fmt.Errorf("product not found")
	}

	_, err = db.Exec("UPDATE product SET deleted = 1, deleted_at = NOW() WHERE id = $1", id)
	if err != nil {
		return fmt.Errorf("failed to delete product: %w", err)
	}

	return nil
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

func parseProductID(idStr string) (int, error) {
	// Handle "prod_001" format
	if len(idStr) > 5 && idStr[:5] == "prod_" {
		return strconv.Atoi(idStr[5:])
	}
	// Handle plain numeric ID
	return strconv.Atoi(idStr)
}

func getOrCreateGenericName(tx *sql.Tx, name string) (int, error) {
	var id int
	err := tx.QueryRow("SELECT id FROM generic_name WHERE generic_name = $1", name).Scan(&id)
	if err == sql.ErrNoRows {
		err = tx.QueryRow("INSERT INTO generic_name (generic_name) VALUES ($1) RETURNING id", name).Scan(&id)
	}
	return id, err
}

func getOrCreateRack(tx *sql.Tx, name, location string) (int, error) {
	var id int
	err := tx.QueryRow("SELECT id FROM rack WHERE rack_name = $1", name).Scan(&id)
	if err == sql.ErrNoRows {
		err = tx.QueryRow("INSERT INTO rack (rack_name, rack_location) VALUES ($1, $2) RETURNING id", name, location).Scan(&id)
	}
	return id, err
}

func getOrCreateProductType(tx *sql.Tx, name string) (int, error) {
	var id int
	err := tx.QueryRow("SELECT id FROM product_type WHERE type_name = $1", name).Scan(&id)
	if err == sql.ErrNoRows {
		err = tx.QueryRow("INSERT INTO product_type (type_name) VALUES ($1) RETURNING id", name).Scan(&id)
	}
	return id, err
}

func getOrCreateCategory(tx *sql.Tx, name string) (int, error) {
	var id int
	err := tx.QueryRow("SELECT id FROM category WHERE category_name = $1", name).Scan(&id)
	if err == sql.ErrNoRows {
		err = tx.QueryRow("INSERT INTO category (category_name) VALUES ($1) RETURNING id", name).Scan(&id)
	}
	return id, err
}

func getOrCreateSupplier(tx *sql.Tx, name, contact string) (int, error) {
	var id int
	err := tx.QueryRow("SELECT id FROM supplier WHERE name = $1", name).Scan(&id)
	if err == sql.ErrNoRows {
		err = tx.QueryRow("INSERT INTO supplier (name, contact) VALUES ($1, $2) RETURNING id", name, contact).Scan(&id)
	}
	return id, err
}

func generateBarcode() string {
	// Generate a simple barcode (in production, use proper barcode generation)
	return fmt.Sprintf("890%010d", generateRandomNumber())
}

func generateProductCode(name, strength string) string {
	// Generate product code from name and strength
	code := ""
	if len(name) >= 4 {
		code = name[:4]
	} else {
		code = name
	}
	if strength != "" {
		code += strength[:min(len(strength), 3)]
	}
	return code
}

func generateRandomNumber() int64 {
	// In production, use crypto/rand or time-based unique ID
	return 1234567890
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func calculateProfitMargin(price, buyingPrice float64) float64 {
	if buyingPrice > 0 {
		margin := ((price - buyingPrice) / buyingPrice) * 100
		return float64(int(margin*100)) / 100
	}
	return 0
}
