package models

import (
	"database/sql"
	"time"
)

// =====================================================
// DATABASE MODELS (Internal use)
// =====================================================

type BaseEntity struct {
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
	DeletedAt sql.NullTime `json:"deleted_at,omitempty"`
	Deleted   int          `json:"deleted"`
}

type GenericName struct {
	ID          int    `json:"id"`
	GenericName string `json:"generic_name"`
	BaseEntity
}

type Rack struct {
	ID           int    `json:"id"`
	RackName     string `json:"rack_name"`
	RackLocation string `json:"rack_location,omitempty"`
	BaseEntity
}

type ProductType struct {
	ID        int       `json:"id"`
	TypeName  string    `json:"type_name"`
	CreatedAt time.Time `json:"created_at"`
}

type Category struct {
	ID           int       `json:"id"`
	CategoryName string    `json:"category_name"`
	CreatedAt    time.Time `json:"created_at"`
}

type Supplier struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Company string `json:"company"`
	Phone   string `json:"phone"`
	Email   string `json:"email,omitempty"`
	Address string `json:"address,omitempty"`
	Status  string `json:"status"`
	BaseEntity
}

// Internal Product model (database representation)
type Product struct {
	ID                 int           `json:"id"`
	ProductName        string        `json:"product_name"`
	ProductDescription string        `json:"product_description"`
	Image              string        `json:"image,omitempty"`
	Barcode            string        `json:"barcode,omitempty"`
	ProductCode        string        `json:"product_code,omitempty"`
	GenericFkID        sql.NullInt64 `json:"generic_fk_id,omitempty"`
	RackFkID           sql.NullInt64 `json:"rack_fk_id,omitempty"`
	ProductTypeFkID    sql.NullInt64 `json:"product_type_fk_id,omitempty"`
	CategoryFkID       sql.NullInt64 `json:"category_fk_id,omitempty"`
	Strength           string        `json:"strength,omitempty"`
	Manufacture        string        `json:"manufacture,omitempty"`
	UnitPrice          float64       `json:"unit_price"`
	UnitMRP            float64       `json:"unit_mrp"`
	UnitCostPrice      float64       `json:"unit_cost_price"`
	DiscountPercent    float64       `json:"discount_percent"`
	VatPercent         float64       `json:"vat_percent"`
	AvailableStock     int           `json:"available_stock"`
	StockAlert         int           `json:"stock_alert"`
	Status             string        `json:"status"`
	TotalPurchase      int           `json:"total_purchase"`
	TotalSold          int           `json:"total_sold"`
	BaseEntity
}

type ProductPackaging struct {
	ID           int       `json:"id"`
	ProductID    int       `json:"product_id"`
	PackType     PackType  `json:"pack_type"`
	UnitsPerPack int       `json:"units_per_pack"`
	SellingPrice float64   `json:"selling_price"`
	MRP          float64   `json:"mrp"`
	CostPrice    float64   `json:"cost_price"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type ProductBatch struct {
	ID           int       `json:"id"`
	ProductID    int       `json:"product_id"`
	BatchID      string    `json:"batch_id"`
	Quantity     int       `json:"quantity"`
	ExpiryDate   string    `json:"expiry_date,omitempty"`
	PurchaseDate string    `json:"purchase_date,omitempty"`
	SupplierID   int       `json:"supplier_id,omitempty"`
	CostPrice    float64   `json:"cost_price"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type ProductSupplier struct {
	ID          int       `json:"id"`
	ProductID   int       `json:"product_id"`
	SupplierID  int       `json:"supplier_id"`
	IsPrimary   bool      `json:"is_primary"`
	BuyingPrice float64   `json:"buying_price"`
	CreatedAt   time.Time `json:"created_at"`
}

type ProductStock struct {
	ID          int       `json:"id"`
	ProductIDFk int       `json:"product_id_fk"`
	Quantity    int       `json:"quantity"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type ProductStockHistory struct {
	ID               int             `json:"id"`
	ProductIDFk      int             `json:"product_id_fk"`
	ChangeAmount     int             `json:"change_amount"`
	ChangeType       StockChangeType `json:"change_type"`
	PreviousQuantity int             `json:"previous_quantity"`
	NewQuantity      int             `json:"new_quantity"`
	CreatedAt        time.Time       `json:"created_at"`
	StockExpiry      sql.NullTime    `json:"stock_expiry,omitempty"`
}

type Customer struct {
	ID      int            `json:"id"`
	Name    string         `json:"name"`
	Phone   sql.NullString `json:"phone,omitempty"`
	Email   sql.NullString `json:"email,omitempty"`
	Address sql.NullString `json:"address,omitempty"`
	BaseEntity
}

type Invoice struct {
	ID           int           `json:"id"`
	CustomerIDFk sql.NullInt64 `json:"customer_id_fk,omitempty"`
	InvoiceType  InvoiceType   `json:"invoice_type"`
	Subtotal     float64       `json:"subtotal"`
	Discount     float64       `json:"discount"`
	Total        float64       `json:"total"`
	PaidAmount   float64       `json:"paid_amount"`
	Balance      float64       `json:"balance"`
	Status       InvoiceStatus `json:"status"`
	Notes        string        `json:"notes"`
	BaseEntity
}

type InvoiceItem struct {
	ID        int       `json:"id"`
	InvoiceID int       `json:"invoice_id"`
	ProductID int       `json:"product_id"`
	PackType  PackType  `json:"pack_type"`
	Quantity  float64   `json:"quantity"`
	CreatedAt time.Time `json:"created_at"`
}

type Vendor struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	BaseEntity
}

type ProductVendor struct {
	ID          int `json:"id"`
	ProductIDFk int `json:"product_id_fk"`
	VendorIDFk  int `json:"vendor_id_fk"`
}

type Distributor struct {
	ID         int            `json:"id"`
	VendorIDFk int            `json:"vendor_id_fk"`
	Name       string         `json:"name"`
	Phone      sql.NullString `json:"phone,omitempty"`
	Email      sql.NullString `json:"email,omitempty"`
	BaseEntity
}

type ProductStockPurchase struct {
	ID             int            `json:"id"`
	Total          int            `json:"total"`
	PurchaseStatus PurchaseStatus `json:"purchase_status"`
	Due            int            `json:"due"`
	PaidAmount     int            `json:"paid_amount"`
	CreatedAt      time.Time      `json:"created_at"`
}

type ProductStockPurchaseItem struct {
	ID        int       `json:"id"`
	PspFkID   int       `json:"psp_fk_id"`
	ProductID int       `json:"product_id"`
	PackType  PackType  `json:"pack_type"`
	Quantity  float64   `json:"quantity"`
	CreatedAt time.Time `json:"created_at"`
}
