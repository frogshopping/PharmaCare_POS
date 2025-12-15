package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"pharmacy-backend/internal/database"
	"pharmacy-backend/internal/models"

	"github.com/gorilla/mux"
)

// =====================================================
// PRODUCTS API HANDLERS
// Endpoints: /api/products
// Response format matches frontend expectations exactly
// =====================================================

// GetAllProducts handles GET /api/products
// Returns all products with full details
func (h *Handler) GetAllProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	products, err := database.GetAllProducts(h.db)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(models.ProductAPIResponse{
			Success: false,
			Data:    nil,
			Error:   err.Error(),
		})
		return
	}

	// Return empty array if no products
	if products == nil {
		products = []models.ProductResponse{}
	}

	json.NewEncoder(w).Encode(models.ProductAPIResponse{
		Success: true,
		Data:    products,
		Error:   nil,
	})
}

// GetProductByID handles GET /api/products/:id
// Returns a single product by ID
func (h *Handler) GetProductByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id := vars["id"]

	product, err := database.GetProductResponseByID(h.db, id)
	if err != nil {
		status := http.StatusInternalServerError
		if strings.Contains(err.Error(), "not found") {
			status = http.StatusNotFound
		}
		w.WriteHeader(status)
		json.NewEncoder(w).Encode(models.ProductAPIResponse{
			Success: false,
			Data:    nil,
			Error:   err.Error(),
		})
		return
	}

	json.NewEncoder(w).Encode(models.ProductAPIResponse{
		Success: true,
		Data:    product,
		Error:   nil,
	})
}

// AddProduct handles POST /api/products
// Creates a new product
func (h *Handler) AddProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var req models.CreateProductRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ProductAPIResponse{
			Success: false,
			Data:    nil,
			Error:   "Invalid request payload",
		})
		return
	}

	// Validate required fields
	if req.Name == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ProductAPIResponse{
			Success: false,
			Data:    nil,
			Error:   "Product name is required",
		})
		return
	}

	product, err := database.CreateNewProduct(h.db, req)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(models.ProductAPIResponse{
			Success: false,
			Data:    nil,
			Error:   err.Error(),
		})
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(models.ProductAPIResponse{
		Success: true,
		Data:    product,
		Error:   nil,
	})
}

// UpdateProduct handles PUT/PATCH /api/products/:id
// Updates an existing product (partial update supported)
func (h *Handler) UpdateProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id := vars["id"]

	var req models.UpdateProductRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ProductAPIResponse{
			Success: false,
			Data:    nil,
			Error:   "Invalid request payload",
		})
		return
	}

	product, err := database.UpdateExistingProduct(h.db, id, req)
	if err != nil {
		status := http.StatusInternalServerError
		if strings.Contains(err.Error(), "not found") {
			status = http.StatusNotFound
		}
		w.WriteHeader(status)
		json.NewEncoder(w).Encode(models.ProductAPIResponse{
			Success: false,
			Data:    nil,
			Error:   err.Error(),
		})
		return
	}

	json.NewEncoder(w).Encode(models.ProductAPIResponse{
		Success: true,
		Data:    product,
		Error:   nil,
	})
}

// RemoveProduct handles DELETE /api/products/:id
// Soft deletes a product
func (h *Handler) RemoveProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id := vars["id"]

	err := database.DeleteProduct(h.db, id)
	if err != nil {
		status := http.StatusInternalServerError
		if strings.Contains(err.Error(), "not found") {
			status = http.StatusNotFound
		}
		w.WriteHeader(status)
		json.NewEncoder(w).Encode(models.ProductAPIResponse{
			Success: false,
			Data:    nil,
			Error:   err.Error(),
		})
		return
	}

	json.NewEncoder(w).Encode(models.ProductAPIResponse{
		Success: true,
		Data: models.DeleteProductResponse{
			ID:      id,
			Message: "Product deleted successfully",
		},
		Error: nil,
	})
}
