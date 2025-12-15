package models

// =====================================================
// Supplier API DTOs
// =====================================================

type SupplierDTO struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Company string `json:"company"`
	Phone   string `json:"phone"`
	Email   string `json:"email"`
	Address string `json:"address"`
	Status  string `json:"status"`
}

type SupplierListResponseData struct {
	Data       []SupplierDTO `json:"data"`
	Pagination Pagination    `json:"pagination"`
}

type SupplierListResponse struct {
	Success bool                     `json:"success"`
	Data    SupplierListResponseData `json:"data"`
}

type SupplierCompaniesResponse struct {
	Success bool     `json:"success"`
	Data    []string `json:"data"`
}

type CreateSupplierRequest struct {
	Name    string `json:"name"`
	Company string `json:"company"`
	Phone   string `json:"phone"`
	Email   string `json:"email"`
	Address string `json:"address"`
}

type UpdateSupplierRequest struct {
	Name    *string `json:"name,omitempty"`
	Company *string `json:"company,omitempty"`
	Phone   *string `json:"phone,omitempty"`
	Email   *string `json:"email,omitempty"`
	Address *string `json:"address,omitempty"`
}

type SingleSupplierResponse struct {
	Success bool        `json:"success"`
	Data    SupplierDTO `json:"data"`
}

type DeleteSupplierResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
