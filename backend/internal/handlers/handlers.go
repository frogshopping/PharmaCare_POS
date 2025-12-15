package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"pharmacy-backend/internal/database"
	"pharmacy-backend/internal/models"

	"github.com/gorilla/mux"
)

// Handler holds the database connection and provides HTTP handlers
type Handler struct {
	db *sql.DB
}

// New creates a new Handler instance
func New(db *sql.DB) *Handler {
	return &Handler{
		db: db,
	}
}

// Health check handler
func (h *Handler) Health(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	err := h.db.Ping()
	if err != nil {
		json.NewEncoder(w).Encode(models.APIResponse{
			Status:  "error",
			Message: "Database connection failed",
			Error:   err.Error(),
		})
		return
	}

	json.NewEncoder(w).Encode(models.APIResponse{
		Status:  "ok",
		Message: "Pharmacy Management System API is running",
		Data: map[string]string{
			"database": "connected",
			"version":  "1.0.0",
		},
	})
}

// Product Handlers
func (h *Handler) GetProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	products, err := database.GetProducts(h.db)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(models.APIResponse{
			Status:  "error",
			Message: "Failed to retrieve products",
			Error:   err.Error(),
		})
		return
	}

	json.NewEncoder(w).Encode(models.APIResponse{
		Status:  "success",
		Message: "Products retrieved successfully",
		Data:    products,
	})
}

func (h *Handler) GetProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.APIResponse{
			Status:  "error",
			Message: "Invalid product ID",
			Error:   err.Error(),
		})
		return
	}

	product, err := database.GetProductByID(h.db, id)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(models.APIResponse{
			Status:  "error",
			Message: "Product not found",
			Error:   err.Error(),
		})
		return
	}

	json.NewEncoder(w).Encode(models.APIResponse{
		Status:  "success",
		Message: "Product retrieved successfully",
		Data:    product,
	})
}

// CreateProduct is deprecated - use AddProduct instead
// This handler redirects to AddProduct for backward compatibility
func (h *Handler) CreateProduct(w http.ResponseWriter, r *http.Request) {
	// Redirect to new handler
	h.AddProduct(w, r)
}

// Customer Handlers

// Invoice Handlers
func (h *Handler) GetInvoices(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	invoices, err := database.GetInvoices(h.db)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(models.APIResponse{
			Status:  "error",
			Message: "Failed to retrieve invoices",
			Error:   err.Error(),
		})
		return
	}

	json.NewEncoder(w).Encode(models.APIResponse{
		Status:  "success",
		Message: "Invoices retrieved successfully",
		Data:    invoices,
	})
}

// Vendor Handlers
func (h *Handler) GetVendors(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vendors, err := database.GetVendors(h.db)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(models.APIResponse{
			Status:  "error",
			Message: "Failed to retrieve vendors",
			Error:   err.Error(),
		})
		return
	}

	json.NewEncoder(w).Encode(models.APIResponse{
		Status:  "success",
		Message: "Vendors retrieved successfully",
		Data:    vendors,
	})
}
