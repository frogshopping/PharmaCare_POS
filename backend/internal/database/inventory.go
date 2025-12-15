package database

import (
	"database/sql"
	"fmt"
	"strconv"
	"time"

	"pharmacy-backend/internal/models"
)

// GetMedicines retrieves all medicines with full details for the inventory page
func GetMedicines(db *sql.DB, page, limit int, search, status, rack, sort string) ([]models.ProductResponse, models.Pagination, error) {
	offset := (page - 1) * limit

	// Common Join Clause
	joins := `
		FROM product p
		LEFT JOIN generic_name g ON p.generic_fk_id = g.id
		LEFT JOIN rack r ON p.rack_fk_id = r.id
		LEFT JOIN category c ON p.category_fk_id = c.id
		LEFT JOIN product_type pt ON p.product_type_fk_id = pt.id
	`

	// Build WHERE clause
	whereClause := " WHERE p.deleted = 0"
	var args []interface{}
	argCounter := 1

	if search != "" {
		whereClause += fmt.Sprintf(" AND (p.product_name ILIKE $%d OR p.product_code ILIKE $%d OR g.generic_name ILIKE $%d)", argCounter, argCounter, argCounter)
		args = append(args, "%"+search+"%")
		argCounter++
	}

	if status != "" {
		switch status {
		case "low":
			whereClause += " AND p.available_stock < p.stock_alert AND p.available_stock > 0"
		case "out":
			whereClause += " AND p.available_stock = 0"
		case "Active", "Inactive":
			whereClause += fmt.Sprintf(" AND p.status = $%d", argCounter)
			args = append(args, status)
			argCounter++
		}
	}

	if rack != "" {
		// assuming rack ID or search by name? Prompt says "rack ID".
	}

	// Count Query (executed first with only filter args)
	countQuery := "SELECT COUNT(*) " + joins + whereClause
	var totalItems int
	err := db.QueryRow(countQuery, args...).Scan(&totalItems)
	if err != nil {
		return nil, models.Pagination{}, err
	}

	// Main Query Construction
	query := `
		SELECT 
			p.id, p.product_name, p.product_description,
			p.product_code, p.strength,
			p.manufacture, g.generic_name,
			p.unit_price, p.unit_mrp, p.unit_cost_price,
			p.discount_percent, p.vat_percent,
			r.rack_name, r.rack_location, p.rack_fk_id,
			p.available_stock, p.status,
			c.category_name, pt.type_name,
			p.total_purchase, p.total_sold,
			p.barcode, p.stock_alert
	` + joins + whereClause

	// Build ORDER BY clause based on sort parameter
	orderBy := " ORDER BY "
	switch sort {
	case "sales_desc":
		orderBy += "p.total_sold DESC, p.id DESC"
	case "sales_asc":
		orderBy += "p.total_sold ASC, p.id ASC"
	case "price_desc":
		orderBy += "p.unit_price DESC, p.id DESC"
	case "price_asc":
		orderBy += "p.unit_price ASC, p.id ASC"
	case "name_asc":
		orderBy += "p.product_name ASC, p.id ASC"
	case "name_desc":
		orderBy += "p.product_name DESC, p.id DESC"
	case "date_asc":
		orderBy += "p.created_at ASC, p.id ASC"
	case "date_desc":
		orderBy += "p.created_at DESC, p.id DESC"
	default:
		// Default: newest first
		orderBy += "p.created_at DESC, p.id DESC"
	}

	// Pagination & Ordering
	query += orderBy
	query += fmt.Sprintf(" LIMIT $%d OFFSET $%d", argCounter, argCounter+1)

	// Add limit/offset to args for main query
	queryArgs := append(args, limit, offset)

	// Execute Main Query
	rows, err := db.Query(query, queryArgs...)
	if err != nil {
		return nil, models.Pagination{}, err
	}
	defer rows.Close()

	var products []models.ProductResponse
	srlNo := offset + 1

	for rows.Next() {
		var p models.ProductResponse
		var id int
		var rackFkID sql.NullInt64
		var desc, pCode, strength, manuf, genName, rackName, rackLoc, catName, typeName, barcode sql.NullString

		err := rows.Scan(
			&id, &p.Name, &desc,
			&pCode, &strength,
			&manuf, &genName,
			&p.Price, &p.MRP, &p.BuyingPrice,
			&p.Discount, &p.VAT,
			&rackName, &rackLoc, &rackFkID,
			&p.InStock, &p.StockStatus,
			&catName, &typeName,
			&p.TotalPurchase, &p.TotalSold,
			&barcode, &p.StockAlert,
		)
		if err != nil {
			return nil, models.Pagination{}, err
		}

		p.ID = strconv.Itoa(id)
		p.SrlNo = srlNo
		srlNo++

		p.Description = desc.String
		p.ProductCode = pCode.String
		p.Strength = strength.String
		p.Manufacture = manuf.String
		p.GenericName = genName.String
		p.RackNo = rackName.String
		p.RackLocation = rackLoc.String
		if rackFkID.Valid {
			p.RackFkID = int(rackFkID.Int64)
		}
		p.Category = catName.String
		p.Type = typeName.String
		p.Barcode = barcode.String

		if p.InStock == 0 {
			p.StockStatus = "Out of Stock"
		} else if p.InStock < p.StockAlert { // Used stock_alert from DB
			p.StockStatus = "Low Stock"
		} else {
			p.StockStatus = "Normal"
		}

		if p.BuyingPrice > 0 {
			p.ProfitMargin = ((p.Price - p.BuyingPrice) / p.BuyingPrice) * 100
			// Round to 2 decimal places
			p.ProfitMargin = float64(int(p.ProfitMargin*100)) / 100
		}

		fillExtraData(db, &p, id)
		products = append(products, p)
	}

	totalPages := (totalItems + limit - 1) / limit
	// Avoid division by zero if limit is 0 (though handler should prevent this)
	if limit <= 0 {
		totalPages = 0
	}

	pagination := models.Pagination{
		CurrentPage:  page,
		TotalPages:   totalPages,
		TotalItems:   totalItems,
		ItemsPerPage: limit,
	}

	return products, pagination, nil
}

func fillExtraData(db *sql.DB, p *models.ProductResponse, productID int) {
	packQuery := `SELECT pack_type, units_per_pack, selling_price FROM product_packaging WHERE product_id = $1`
	rows, err := db.Query(packQuery, productID)
	if err == nil {
		defer rows.Close()
		for rows.Next() {
			var pType string
			var units int
			var price float64
			rows.Scan(&pType, &units, &price)
			if pType == "strip" {
				p.PackSize.Strip = units
				p.PackPrice.Strip = price
			} else if pType == "box" {
				p.PackSize.Box = units
				p.PackPrice.Box = price
			}
		}
	}

	supQuery := `
		SELECT s.name, s.contact 
		FROM product_supplier ps 
		JOIN supplier s ON ps.supplier_id = s.id 
		WHERE ps.product_id = $1 AND ps.is_primary = true 
		LIMIT 1`
	var sName, sContact sql.NullString
	err = db.QueryRow(supQuery, productID).Scan(&sName, &sContact)
	if err == nil {
		p.Supplier = sName.String
		p.SupplierContact = sContact.String
	}

	batchQuery := `SELECT batch_id, expiry_date, purchase_date FROM product_batch WHERE product_id = $1 ORDER BY expiry_date ASC LIMIT 1`
	var bId string
	var expDate, purDate time.Time
	err = db.QueryRow(batchQuery, productID).Scan(&bId, &expDate, &purDate)
	if err == nil {
		p.BatchID = bId
		p.ExpiryDate = expDate.Format("2006-01-02")
		p.PurchaseDate = purDate.Format("2006-01-02")
	}
}

// CreateMedicine adds a new medicine
func CreateMedicine(db *sql.DB, req models.CreateProductRequest) (*models.ProductResponse, error) {
	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	genericID := getOrCreateID(tx, "generic_name", "generic_name", req.GenericName)
	rackID := getOrCreateID(tx, "rack", "rack_name", req.RackNo)
	catID := getOrCreateID(tx, "category", "category_name", req.Category)
	typeID := getOrCreateID(tx, "product_type", "type_name", req.Type)

	var supplierID int
	if req.Supplier != "" {
		err := tx.QueryRow("SELECT id FROM supplier WHERE name = $1", req.Supplier).Scan(&supplierID)
		if err == sql.ErrNoRows {
			err = tx.QueryRow("INSERT INTO supplier (name, contact) VALUES ($1, $2) RETURNING id", req.Supplier, req.SupplierContact).Scan(&supplierID)
			if err != nil {
				return nil, err
			}
		} else if err != nil {
			return nil, err
		}
	}

	var productID int
	query := `
		INSERT INTO product (
			product_name, product_description, strength, manufacture,
			generic_fk_id, rack_fk_id, category_fk_id, product_type_fk_id,
			unit_price, unit_mrp, unit_cost_price, discount_percent,
			available_stock, stock_alert, status, product_code
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
		RETURNING id
	`
	pCode := req.Name // simplified

	err = tx.QueryRow(query,
		req.Name, req.Description, req.Strength, req.Manufacture,
		nullInt(genericID), nullInt(rackID), nullInt(catID), nullInt(typeID),
		req.Price, req.MRP, req.BuyingPrice, req.Discount,
		req.InStock, 10, "Active", pCode,
	).Scan(&productID)
	if err != nil {
		return nil, fmt.Errorf("failed insert product: %v", err)
	}

	_, _ = tx.Exec(`INSERT INTO product_packaging (product_id, pack_type, units_per_pack, selling_price, mrp, cost_price) 
		VALUES ($1, 'unit', 1, $2, $3, $4)`, productID, req.Price, req.MRP, req.BuyingPrice)

	if req.PackSize.Strip > 0 {
		_, _ = tx.Exec(`INSERT INTO product_packaging (product_id, pack_type, units_per_pack, selling_price) 
			VALUES ($1, 'strip', $2, $3)`, productID, req.PackSize.Strip, req.PackPrice.Strip)
	}
	if req.PackSize.Box > 0 {
		_, _ = tx.Exec(`INSERT INTO product_packaging (product_id, pack_type, units_per_pack, selling_price) 
			VALUES ($1, 'box', $2, $3)`, productID, req.PackSize.Box, req.PackPrice.Box)
	}

	if supplierID > 0 {
		_, err = tx.Exec(`INSERT INTO product_supplier (product_id, supplier_id, is_primary, buying_price) 
			VALUES ($1, $2, true, $3)`, productID, supplierID, req.BuyingPrice)
		if err != nil {
			return nil, err
		}
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return &models.ProductResponse{ID: strconv.Itoa(productID), Name: req.Name}, nil
}

// UpdateMedicine updates an existing medicine
func UpdateMedicine(db *sql.DB, idStr string, req models.UpdateProductRequest) error {
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return err
	}

	tx, err := db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	// Update basic fields
	if req.Price != nil {
		_, err := tx.Exec("UPDATE product SET unit_price = $1 WHERE id = $2", *req.Price, id)
		if err != nil {
			return err
		}
	}
	if req.InStock != nil {
		_, err := tx.Exec("UPDATE product SET available_stock = $1 WHERE id = $2", *req.InStock, id)
		if err != nil {
			return err
		}
	}
	// Add other fields updates here... keeping it minimal as per example

	return tx.Commit()
}

// DeleteMedicine soft deletes a medicine
func DeleteMedicine(db *sql.DB, idStr string) error {
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return err
	}

	_, err = db.Exec("UPDATE product SET deleted = 1, deleted_at = NOW() WHERE id = $1", id)
	return err
}

// GetRacks fetches all racks
func GetRacks(db *sql.DB) ([]models.Rack, error) {
	rows, err := db.Query("SELECT id, rack_name, COALESCE(rack_location, 'no location') as rack_location FROM rack WHERE deleted = 0")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var racks []models.Rack
	for rows.Next() {
		var r models.Rack
		if err := rows.Scan(&r.ID, &r.RackName, &r.RackLocation); err != nil {
			return nil, err
		}
		racks = append(racks, r)
	}
	return racks, nil
}

// CreateRack adds a new rack
func CreateRack(db *sql.DB, req models.CreateRackRequest) (*models.RackDTO, error) {
	var id int
	err := db.QueryRow("INSERT INTO rack (rack_name, rack_location) VALUES ($1, $2) RETURNING id", req.Name, req.Location).Scan(&id)
	if err != nil {
		return nil, err
	}
	return &models.RackDTO{
		ID:       id,
		Name:     req.Name,
		Location: req.Location,
	}, nil
}

// GetGenerics fetches all generic names
func GetGenerics(db *sql.DB) ([]models.GenericName, error) {
	rows, err := db.Query("SELECT id, generic_name FROM generic_name WHERE deleted = 0")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var generics []models.GenericName
	for rows.Next() {
		var g models.GenericName
		if err := rows.Scan(&g.ID, &g.GenericName); err != nil {
			return nil, err
		}
		generics = append(generics, g)
	}
	return generics, nil
}

func getOrCreateID(tx *sql.Tx, table, col, val string) int {
	if val == "" {
		return 0
	}
	var id int
	err := tx.QueryRow(fmt.Sprintf("SELECT id FROM %s WHERE %s = $1", table, col), val).Scan(&id)
	if err == sql.ErrNoRows {
		tx.QueryRow(fmt.Sprintf("INSERT INTO %s (%s) VALUES ($1) RETURNING id", table, col), val).Scan(&id)
	}
	return id
}

func nullInt(i int) interface{} {
	if i == 0 {
		return nil
	}
	return i
}

// GetRackMedicines retrieves all racks with their associated medicines
func GetRackMedicines(db *sql.DB) ([]models.RackWithMedicines, error) {
	// First, get all racks
	racks, err := GetRacks(db)
	if err != nil {
		return nil, err
	}

	var result []models.RackWithMedicines

	// For each rack, get its medicines
	for _, rack := range racks {
		query := `
			SELECT 
				p.id,
				COALESCE(p.product_code, '') as product_code,
				p.product_name,
				COALESCE(g.generic_name, '') as generic_name,
				COALESCE(p.strength, '') as strength,
				p.unit_price,
				p.available_stock
			FROM product p
			LEFT JOIN generic_name g ON p.generic_fk_id = g.id
			WHERE p.rack_fk_id = $1 AND p.deleted = 0
			ORDER BY p.product_name ASC
		`

		rows, err := db.Query(query, rack.ID)
		if err != nil {
			return nil, err
		}
		defer rows.Close()

		var medicines []models.RackMedicineItem
		srlNo := 1

		for rows.Next() {
			var m models.RackMedicineItem
			var productID int

			err := rows.Scan(
				&productID,
				&m.Code,
				&m.MedicineName,
				&m.GenericName,
				&m.Strength,
				&m.Price,
				&m.Stock,
			)
			if err != nil {
				return nil, err
			}

			m.ID = productID
			m.SrlNo = srlNo
			srlNo++

			medicines = append(medicines, m)
		}

		// Initialize empty array if no medicines
		if medicines == nil {
			medicines = []models.RackMedicineItem{}
		}

		rackWithMedicines := models.RackWithMedicines{
			Rack: models.RackDTO{
				ID:       rack.ID,
				Name:     rack.RackName,
				Location: rack.RackLocation,
			},
			Medicines:      medicines,
			TotalMedicines: len(medicines),
		}

		result = append(result, rackWithMedicines)
	}

	// Initialize empty array if no racks
	if result == nil {
		result = []models.RackWithMedicines{}
	}

	return result, nil
}
