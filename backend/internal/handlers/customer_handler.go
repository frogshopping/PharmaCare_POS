package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"pharmacy-backend/internal/database"
	"pharmacy-backend/internal/models"

	"github.com/gorilla/mux"
)

// GetCustomers handles GET /api/customers
func (h *Handler) GetCustomers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Parse pagination query params
	pageStr := r.URL.Query().Get("page")
	limitStr := r.URL.Query().Get("limit")
	search := r.URL.Query().Get("search")

	page, _ := strconv.Atoi(pageStr)
	if page < 1 {
		page = 1
	}

	limit, _ := strconv.Atoi(limitStr)
	if limit < 1 {
		limit = 20 // Default limit from prompt requirement example
	}

	customers, pagination, err := database.GetCustomers(h.db, page, limit, search)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "message": err.Error()})
		return
	}

	response := models.CustomerListResponse{
		Success:    true,
		Data:       customers,
		Pagination: pagination,
	}

	json.NewEncoder(w).Encode(response)
}

// CreateCustomer handles POST /api/customers
func (h *Handler) CreateCustomer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var req models.CreateCustomerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "message": "Invalid request body"})
		return
	}

	// Basic Validation
	if req.Name == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "message": "Name is required"})
		return
	}

	customer, err := database.CreateCustomer(h.db, req)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "message": "Failed to create customer: " + err.Error()})
		return
	}

	response := models.SingleCustomerResponse{
		Success: true,
		Message: "Customer created successfully",
		Data:    *customer,
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

// UpdateCustomer handles PUT /api/customers/{id}
func (h *Handler) UpdateCustomer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	idStr := vars["id"]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "message": "Invalid customer ID"})
		return
	}

	var req models.UpdateCustomerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "message": "Invalid request body"})
		return
	}

	customer, err := database.UpdateCustomer(h.db, id, req)
	if err != nil {
		if err.Error() == "customer not found" {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "message": "Customer not found"})
			return
		}
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "message": "Failed to update customer: " + err.Error()})
		return
	}

	response := models.SingleCustomerResponse{
		Success: true,
		Message: "Customer updated successfully",
		Data:    *customer,
	}

	json.NewEncoder(w).Encode(response)
}

// DeleteCustomer handles DELETE /api/customers/{id}
func (h *Handler) DeleteCustomer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	idStr := vars["id"]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "message": "Invalid customer ID"})
		return
	}

	err = database.DeleteCustomer(h.db, id)
	if err != nil {
		if err.Error() == "customer not found" {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "message": "Customer not found"})
			return
		}
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "message": "Failed to delete customer: " + err.Error()})
		return
	}

	response := models.DeleteCustomerResponse{
		Success: true,
		Message: "Customer deleted successfully",
		ID:      id,
	}

	json.NewEncoder(w).Encode(response)
}
