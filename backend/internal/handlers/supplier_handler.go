package handlers

import (
	"encoding/json"
	"net/http"
	"pharmacy-backend/internal/database"
	"pharmacy-backend/internal/models"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
)

// Helper to parse Supplier ID (handles "SUP-001" or "1")
func parseSupplierID(idStr string) (int, error) {
	idStr = strings.TrimPrefix(idStr, "SUP-")
	idStr = strings.TrimPrefix(idStr, "sup-")
	return strconv.Atoi(idStr)
}

// GetSuppliers handles GET /api/suppliers
func (h *Handler) GetSuppliers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Query Parameters
	query := r.URL.Query()
	pageStr := query.Get("page")
	limitStr := query.Get("limit")
	search := query.Get("search")
	company := query.Get("company")

	page := 1
	if pageStr != "" {
		if p, err := strconv.Atoi(pageStr); err == nil && p > 0 {
			page = p
		}
	}

	limit := 10
	if limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil && l > 0 {
			limit = l
		}
	}

	data, err := database.GetSuppliers(h.db, page, limit, search, company)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(models.SupplierListResponse{
			Success: false,
			Data:    models.SupplierListResponseData{}, // Empty data
		})
		return
	}

	json.NewEncoder(w).Encode(models.SupplierListResponse{
		Success: true,
		Data:    data,
	})
}

// GetSupplierCompanies handles GET /api/suppliers/companies
func (h *Handler) GetSupplierCompanies(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	companies, err := database.GetSupplierCompanies(h.db)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(models.SupplierCompaniesResponse{
			Success: false,
			Data:    []string{},
		})
		return
	}

	json.NewEncoder(w).Encode(models.SupplierCompaniesResponse{
		Success: true,
		Data:    companies,
	})
}

// AddSupplier handles POST /api/suppliers
func (h *Handler) AddSupplier(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var req models.CreateSupplierRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.APIResponse{
			Status:  "error",
			Message: "Invalid request body",
			Error:   err.Error(),
		})
		return
	}

	supplier, err := database.AddSupplier(h.db, req)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(models.APIResponse{
			Status:  "error",
			Message: "Failed to add supplier",
			Error:   err.Error(),
		})
		return
	}

	json.NewEncoder(w).Encode(models.SingleSupplierResponse{
		Success: true,
		Data:    supplier,
	})
}

// UpdateSupplier handles PUT /api/suppliers/{id}
func (h *Handler) UpdateSupplier(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	idStr := vars["id"]
	id, err := parseSupplierID(idStr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.APIResponse{
			Status:  "error",
			Message: "Invalid supplier ID",
			Error:   err.Error(),
		})
		return
	}

	var req models.UpdateSupplierRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.APIResponse{
			Status:  "error",
			Message: "Invalid request body",
			Error:   err.Error(),
		})
		return
	}

	supplier, err := database.UpdateSupplier(h.db, id, req)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(models.APIResponse{
			Status:  "error",
			Message: "Failed to update supplier",
			Error:   err.Error(),
		})
		return
	}

	json.NewEncoder(w).Encode(models.SingleSupplierResponse{
		Success: true,
		Data:    supplier,
	})
}

// DeleteSupplier handles DELETE /api/suppliers/{id}
func (h *Handler) DeleteSupplier(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	idStr := vars["id"]
	id, err := parseSupplierID(idStr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.APIResponse{
			Status:  "error",
			Message: "Invalid supplier ID",
			Error:   err.Error(),
		})
		return
	}

	err = database.DeleteSupplier(h.db, id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(models.APIResponse{
			Status:  "error",
			Message: "Failed to delete supplier",
			Error:   err.Error(),
		})
		return
	}

	json.NewEncoder(w).Encode(models.DeleteSupplierResponse{
		Success: true,
		Message: "Supplier deleted successfully",
	})
}
