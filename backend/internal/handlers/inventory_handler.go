package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"pharmacy-backend/internal/database"
	"pharmacy-backend/internal/models"

	"github.com/gorilla/mux"
)

// Inventory/Medicine Handlers

// GetMedicines handles GET /api/inventory/medicines
func (h *Handler) GetMedicines(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Parse Query Params
	pageStr := r.URL.Query().Get("page")
	limitStr := r.URL.Query().Get("limit")
	search := r.URL.Query().Get("search")
	status := r.URL.Query().Get("status")
	rack := r.URL.Query().Get("rack")
	sort := r.URL.Query().Get("sort")

	page := 1
	if pageStr != "" {
		if p, err := strconv.Atoi(pageStr); err == nil && p > 0 {
			page = p
		}
	}

	limit := 20
	if limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil && l > 0 {
			limit = l
		}
	}

	medicines, pagination, err := database.GetMedicines(h.db, page, limit, search, status, rack, sort)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	if medicines == nil {
		medicines = []models.ProductResponse{}
	}

	// Response Format
	response := map[string]interface{}{
		"data":       medicines,
		"pagination": pagination,
	}

	json.NewEncoder(w).Encode(response)
}

// GetMedicineByID handles GET /api/inventory/medicines/:id
func (h *Handler) GetMedicineByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id := vars["id"]

	medicine, err := database.GetProductResponseByID(h.db, id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	if medicine == nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   "Medicine not found",
		})
		return
	}

	// Response Format - matching the data structure from GetMedicines
	response := map[string]interface{}{
		"data": medicine,
	}

	json.NewEncoder(w).Encode(response)
}

// CreateMedicine handles POST /api/inventory/medicines
func (h *Handler) CreateMedicine(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var req models.CreateProductRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "error": "Invalid request payload"})
		return
	}

	// Use CreateNewProduct for full response details
	medicine, err := database.CreateNewProduct(h.db, req)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "error": err.Error()})
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(medicine)
}

// UpdateMedicine handles PUT /api/inventory/medicines/:id
func (h *Handler) UpdateMedicine(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id := vars["id"]

	var req models.UpdateProductRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "error": "Invalid request payload"})
		return
	}

	// Use UpdateExistingProduct for full status return
	updatedMedicine, err := database.UpdateExistingProduct(h.db, id, req)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "error": err.Error()})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(updatedMedicine)
}

// DeleteMedicine handles DELETE /api/inventory/medicines/:id
func (h *Handler) DeleteMedicine(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id := vars["id"]

	if err := database.DeleteMedicine(h.db, id); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "error": err.Error()})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Medicine deleted successfully",
	})
}

// GetRacks handles GET /api/inventory/racks
func (h *Handler) GetRacks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	racks, err := database.GetRacks(h.db)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "error": err.Error()})
		return
	}

	// Convert to DTO
	var rackDTOs []models.RackDTO
	for _, r := range racks {
		rackDTOs = append(rackDTOs, models.RackDTO{
			ID:       r.ID,
			Name:     r.RackName,
			Location: r.RackLocation,
		})
	}

	if rackDTOs == nil {
		rackDTOs = []models.RackDTO{}
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"data":    rackDTOs,
	})
}

// CreateRack handles POST /api/inventory/racks
func (h *Handler) CreateRack(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var req models.CreateRackRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "error": "Invalid request payload"})
		return
	}

	rack, err := database.CreateRack(h.db, req)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "error": err.Error()})
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"data":    rack,
	})
}

// GetGenerics handles GET /api/inventory/generics
func (h *Handler) GetGenerics(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	generics, err := database.GetGenerics(h.db)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "error": err.Error()})
		return
	}

	// Convert to DTO
	var genericDTOs []models.GenericDTO
	for _, g := range generics {
		genericDTOs = append(genericDTOs, models.GenericDTO{
			ID:   g.ID,
			Name: g.GenericName,
		})
	}

	if genericDTOs == nil {
		genericDTOs = []models.GenericDTO{}
	}

	json.NewEncoder(w).Encode(genericDTOs)
}

// GetRackMedicines handles GET /api/inventory/racks/medicines
func (h *Handler) GetRackMedicines(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	rackMedicines, err := database.GetRackMedicines(h.db)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	// Response Format
	response := map[string]interface{}{
		"data":        rackMedicines,
		"total_racks": len(rackMedicines),
	}

	json.NewEncoder(w).Encode(response)
}
