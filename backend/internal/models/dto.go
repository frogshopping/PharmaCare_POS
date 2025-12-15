package models

// =====================================================
// API DTOs - Product API (Matches frontend expectations)
// =====================================================

// PackSize represents the units per pack for different pack types
type PackSize struct {
	Strip int `json:"strip,omitempty"`
	Box   int `json:"box,omitempty"`
}

// PackPrice represents the prices for different pack types
type PackPrice struct {
	Strip float64 `json:"strip,omitempty"`
	Box   float64 `json:"box,omitempty"`
}

// ProductResponse - Response DTO for GET /api/products
// Matches the exact JSON structure expected by frontend
type ProductResponse struct {
	ID              string    `json:"id"`
	SrlNo           int       `json:"srlNo"`
	Name            string    `json:"name"`
	Image           string    `json:"image,omitempty"`
	Description     string    `json:"description,omitempty"`
	Barcode         string    `json:"barcode,omitempty"`
	ProductCode     string    `json:"productCode,omitempty"`
	Strength        string    `json:"strength,omitempty"`
	Manufacture     string    `json:"manufacture,omitempty"`
	GenericName     string    `json:"genericName,omitempty"`
	Price           float64   `json:"price"`
	MRP             float64   `json:"mrp"`
	Discount        float64   `json:"discount"`
	VAT             float64   `json:"vat"`
	RackNo          string    `json:"rackNo,omitempty"`
	RackLocation    string    `json:"rackLocation,omitempty"`
	RackFkID        int       `json:"rackFkId,omitempty"`
	TotalPurchase   int       `json:"totalPurchase"`
	TotalSold       int       `json:"totalSold"`
	InStock         int       `json:"inStock"`
	StockStatus     string    `json:"stockStatus"`
	Category        string    `json:"category,omitempty"`
	ExpiryDate      string    `json:"expiryDate,omitempty"`
	Type            string    `json:"type,omitempty"`
	BatchID         string    `json:"batchId,omitempty"`
	Supplier        string    `json:"supplier,omitempty"`
	SupplierContact string    `json:"supplierContact,omitempty"`
	PurchaseDate    string    `json:"purchaseDate,omitempty"`
	BuyingPrice     float64   `json:"buyingPrice"`
	ProfitMargin    float64   `json:"profitMargin"`
	StockAlert      int       `json:"stockAlert"`
	PackSize        PackSize  `json:"packSize"`
	PackPrice       PackPrice `json:"packPrice"`
}

// CreateProductRequest - Request DTO for POST /api/products
type CreateProductRequest struct {
	Name            string    `json:"name"`
	Description     string    `json:"description,omitempty"`
	Strength        string    `json:"strength,omitempty"`
	GenericName     string    `json:"genericName,omitempty"`
	Manufacture     string    `json:"manufacture,omitempty"`
	Supplier        string    `json:"supplier,omitempty"`
	SupplierContact string    `json:"supplierContact,omitempty"`
	RackNo          string    `json:"rackNo,omitempty"`
	RackLocation    string    `json:"rackLocation,omitempty"`
	InStock         int       `json:"inStock"`
	Price           float64   `json:"price"`
	MRP             float64   `json:"mrp"`
	Discount        float64   `json:"discount"`
	BuyingPrice     float64   `json:"buyingPrice"`
	Type            string    `json:"type,omitempty"`
	StockStatus     string    `json:"stockStatus,omitempty"`
	Category        string    `json:"category,omitempty"`
	PackSize        PackSize  `json:"packSize"`
	PackPrice       PackPrice `json:"packPrice"`
}

// UpdateProductRequest - Request DTO for PUT/PATCH /api/products/:id
type UpdateProductRequest struct {
	Name            *string    `json:"name,omitempty"`
	Description     *string    `json:"description,omitempty"`
	Strength        *string    `json:"strength,omitempty"`
	GenericName     *string    `json:"genericName,omitempty"`
	Manufacture     *string    `json:"manufacture,omitempty"`
	Supplier        *string    `json:"supplier,omitempty"`
	SupplierContact *string    `json:"supplierContact,omitempty"`
	RackNo          *string    `json:"rackNo,omitempty"`
	RackLocation    *string    `json:"rackLocation,omitempty"`
	InStock         *int       `json:"inStock,omitempty"`
	Price           *float64   `json:"price,omitempty"`
	MRP             *float64   `json:"mrp,omitempty"`
	Discount        *float64   `json:"discount,omitempty"`
	BuyingPrice     *float64   `json:"buyingPrice,omitempty"`
	Type            *string    `json:"type,omitempty"`
	StockStatus     *string    `json:"stockStatus,omitempty"`
	Category        *string    `json:"category,omitempty"`
	PackSize        *PackSize  `json:"packSize,omitempty"`
	PackPrice       *PackPrice `json:"packPrice,omitempty"`
}

// DeleteProductResponse - Response DTO for DELETE /api/products/:id
type DeleteProductResponse struct {
	ID      string `json:"id"`
	Message string `json:"message"`
}

// =====================================================
// API Response Wrappers
// =====================================================

// APIResponse - Standard API response wrapper
type APIResponse struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

// ProductAPIResponse - Product-specific API response (matches frontend spec)
type ProductAPIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
	Error   interface{} `json:"error"`
}

type Pagination struct {
	CurrentPage  int `json:"currentPage"`
	TotalPages   int `json:"totalPages"`
	TotalItems   int `json:"totalItems"`
	ItemsPerPage int `json:"itemsPerPage"`
}

// =====================================================
// Legacy Models (for backward compatibility)
// =====================================================

type RackDTO struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Location string `json:"location,omitempty"`
}

type CreateRackRequest struct {
	Name     string `json:"name"`
	Location string `json:"location,omitempty"`
}

type GenericDTO struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

// RackMedicineItem - Simplified medicine info for rack medicine list
type RackMedicineItem struct {
	ID           int     `json:"id"`
	SrlNo        int     `json:"srl_no"`
	Code         string  `json:"code"`
	MedicineName string  `json:"medicine_name"`
	GenericName  string  `json:"generic_name"`
	Strength     string  `json:"strength"`
	Price        float64 `json:"price"`
	Stock        int     `json:"stock"`
}

// RackWithMedicines - Single rack with its medicines
type RackWithMedicines struct {
	Rack           RackDTO            `json:"rack"`
	Medicines      []RackMedicineItem `json:"medicines"`
	TotalMedicines int                `json:"total_medicines"`
}

// RackMedicinesResponse - Response for GET /api/inventory/racks/medicines
type RackMedicinesResponse struct {
	Data       []RackWithMedicines `json:"data"`
	TotalRacks int                 `json:"total_racks"`
}

// Medicine - Legacy model for /api/inventory/medicines
type Medicine struct {
	ID            string  `json:"id"`
	Name          string  `json:"name"`
	Strength      string  `json:"strength"`
	Manufacture   string  `json:"manufacture"`
	GenericName   string  `json:"genericName"`
	Price         float64 `json:"price"`
	RackNo        string  `json:"rackNo"`
	TotalPurchase int     `json:"totalPurchase"`
	TotalSold     int     `json:"totalSold"`
	InStock       int     `json:"inStock"`
	StockStatus   string  `json:"stockStatus"`
	Category      string  `json:"category"`
	ExpiryDate    string  `json:"expiryDate"`
	Description   string  `json:"description"`
}

type CreateMedicineRequest struct {
	Name        string  `json:"name"`
	Strength    string  `json:"strength"`
	Manufacture string  `json:"manufacture"`
	GenericName string  `json:"genericName"`
	Price       float64 `json:"price"`
	RackNo      string  `json:"rackNo"`
	InStock     int     `json:"inStock"`
	Category    string  `json:"category"`
	ExpiryDate  string  `json:"expiryDate"`
	Description string  `json:"description"`
}

type UpdateMedicineRequest struct {
	Price       *float64 `json:"price"`
	InStock     *int     `json:"inStock"`
	RackNo      *string  `json:"rackNo"`
	Name        *string  `json:"name"`
	Strength    *string  `json:"strength"`
	Manufacture *string  `json:"manufacture"`
	GenericName *string  `json:"genericName"`
	Category    *string  `json:"category"`
	ExpiryDate  *string  `json:"expiryDate"`
	Description *string  `json:"description"`
}

// CreateInvoiceRequest - Legacy invoice creation
type CreateInvoiceRequest struct {
	CustomerID  *int          `json:"customer_id"`
	InvoiceType InvoiceType   `json:"invoice_type"`
	Discount    float64       `json:"discount"`
	PaidAmount  float64       `json:"paid_amount"`
	Notes       string        `json:"notes"`
	Items       []InvoiceItem `json:"items"`
}

// =====================================================
// Customer API DTOs
// =====================================================

type CustomerDTO struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Phone       string `json:"phone"`
	Email       string `json:"email"`
	Address     string `json:"address"`
	MemberSince string `json:"memberSince"`
}

type CreateCustomerRequest struct {
	Name    string `json:"name"`
	Phone   string `json:"phone"`
	Email   string `json:"email"`
	Address string `json:"address"`
}

type UpdateCustomerRequest struct {
	Name    *string `json:"name,omitempty"`
	Phone   *string `json:"phone,omitempty"`
	Email   *string `json:"email,omitempty"`
	Address *string `json:"address,omitempty"`
}

type CustomerListResponse struct {
	Success    bool          `json:"success"`
	Data       []CustomerDTO `json:"data"`
	Pagination Pagination    `json:"pagination"`
}

type SingleCustomerResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    CustomerDTO `json:"data"`
}

type DeleteCustomerResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	ID      int    `json:"id"`
}
