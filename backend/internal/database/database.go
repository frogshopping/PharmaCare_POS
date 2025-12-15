package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"pharmacy-backend/internal/models"

	_ "github.com/lib/pq"
)

var db *sql.DB

// InitDB initializes the database connection
func InitDB() error {
	dbHost := os.Getenv("POSTGRES_HOST")
	dbPort := os.Getenv("POSTGRES_PORT")
	dbUser := os.Getenv("POSTGRES_USER")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")

	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPassword, dbName)

	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		return fmt.Errorf("error opening database: %w", err)
	}

	// Set connection pool settings
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(5 * time.Minute)

	// Wait for database to be ready with retry logic
	maxRetries := 30
	for i := 0; i < maxRetries; i++ {
		err = db.Ping()
		if err == nil {
			log.Println("Successfully connected to database")
			return nil
		}
		log.Printf("Database not ready, retrying... (%d/%d)", i+1, maxRetries)
		time.Sleep(2 * time.Second)
	}

	return fmt.Errorf("failed to connect to database after %d retries: %w", maxRetries, err)
}

// GetDB returns the database instance
func GetDB() *sql.DB {
	return db
}

// CloseDB closes the database connection
func CloseDB() error {
	if db != nil {
		return db.Close()
	}
	return nil
}

// Database query helper functions

// GetProducts retrieves all non-deleted products (legacy function)
func GetProducts(db *sql.DB) ([]models.Product, error) {
	query := `
		SELECT id, product_name, COALESCE(product_description, '') as product_description, 
		       COALESCE(strength, '') as strength, 
		       generic_fk_id, rack_fk_id, available_stock, 
		       created_at, updated_at, deleted_at, deleted
		FROM product
		WHERE deleted = 0
		ORDER BY product_name
	`

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []models.Product
	for rows.Next() {
		var p models.Product
		err := rows.Scan(&p.ID, &p.ProductName, &p.ProductDescription, &p.Strength,
			&p.GenericFkID, &p.RackFkID, &p.AvailableStock,
			&p.CreatedAt, &p.UpdatedAt, &p.DeletedAt, &p.Deleted)
		if err != nil {
			return nil, err
		}
		products = append(products, p)
	}

	return products, nil
}

// GetProductByID retrieves a product by ID (legacy function)
func GetProductByID(db *sql.DB, id int) (*models.Product, error) {
	query := `
		SELECT id, product_name, COALESCE(product_description, '') as product_description, 
		       COALESCE(strength, '') as strength, 
		       generic_fk_id, rack_fk_id, available_stock, 
		       created_at, updated_at, deleted_at, deleted
		FROM product
		WHERE id = $1 AND deleted = 0
	`

	var p models.Product
	err := db.QueryRow(query, id).Scan(&p.ID, &p.ProductName, &p.ProductDescription, &p.Strength,
		&p.GenericFkID, &p.RackFkID, &p.AvailableStock,
		&p.CreatedAt, &p.UpdatedAt, &p.DeletedAt, &p.Deleted)

	if err != nil {
		return nil, err
	}

	return &p, nil
}

// CreateProductLegacy creates a new product (legacy function - use CreateNewProduct instead)
func CreateProductLegacy(db *sql.DB, name, description, strength string, genericID, rackID *int) (*models.Product, error) {
	query := `
		INSERT INTO product (product_name, product_description, strength, generic_fk_id, rack_fk_id)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id, product_name, COALESCE(product_description, '') as product_description, 
		          COALESCE(strength, '') as strength, generic_fk_id, rack_fk_id, 
		          available_stock, created_at, updated_at, deleted_at, deleted
	`

	var p models.Product
	err := db.QueryRow(query, name, description, strength, genericID, rackID).Scan(
		&p.ID, &p.ProductName, &p.ProductDescription, &p.Strength,
		&p.GenericFkID, &p.RackFkID, &p.AvailableStock,
		&p.CreatedAt, &p.UpdatedAt, &p.DeletedAt, &p.Deleted)

	if err != nil {
		return nil, err
	}

	return &p, nil
}

// GetInvoices retrieves all non-deleted invoices
func GetInvoices(db *sql.DB) ([]models.Invoice, error) {
	query := `
		SELECT id, customer_id_fk, invoice_type, subtotal, discount, 
		       total, paid_amount, balance, status, notes,
		       created_at, updated_at, deleted_at, deleted
		FROM invoice
		WHERE deleted = 0
		ORDER BY created_at DESC
	`

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var invoices []models.Invoice
	for rows.Next() {
		var inv models.Invoice
		err := rows.Scan(&inv.ID, &inv.CustomerIDFk, &inv.InvoiceType,
			&inv.Subtotal, &inv.Discount, &inv.Total, &inv.PaidAmount,
			&inv.Balance, &inv.Status, &inv.Notes,
			&inv.CreatedAt, &inv.UpdatedAt, &inv.DeletedAt, &inv.Deleted)
		if err != nil {
			return nil, err
		}
		invoices = append(invoices, inv)
	}

	return invoices, nil
}

// GetVendors retrieves all non-deleted vendors
func GetVendors(db *sql.DB) ([]models.Vendor, error) {
	query := `
		SELECT id, name, created_at, updated_at, deleted_at, deleted
		FROM vendor
		WHERE deleted = 0
		ORDER BY name
	`

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var vendors []models.Vendor
	for rows.Next() {
		var v models.Vendor
		err := rows.Scan(&v.ID, &v.Name, &v.CreatedAt, &v.UpdatedAt, &v.DeletedAt, &v.Deleted)
		if err != nil {
			return nil, err
		}
		vendors = append(vendors, v)
	}

	return vendors, nil
}
