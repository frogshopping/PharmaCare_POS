package main

import (
	"log"
	"net/http"
	"os"

	"pharmacy-backend/internal/database"
	"pharmacy-backend/internal/handlers"
	"pharmacy-backend/internal/middleware"

	"github.com/gorilla/mux"
)

func main() {
	// Initialize database connection
	if err := database.InitDB(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer database.CloseDB()

	// Create router
	r := mux.NewRouter()

	// Apply middleware
	r.Use(middleware.Logging)

	// Initialize handlers
	h := handlers.New(database.GetDB())

	// API routes
	api := r.PathPrefix("/api").Subrouter()

	// Health check
	api.HandleFunc("/health", h.Health).Methods("GET")

	// Inventory routes
	inventory := api.PathPrefix("/inventory").Subrouter()
	inventory.HandleFunc("/medicines", h.GetMedicines).Methods("GET")
	inventory.HandleFunc("/medicines/{id}", h.GetMedicineByID).Methods("GET")
	inventory.HandleFunc("/medicines", h.CreateMedicine).Methods("POST")
	inventory.HandleFunc("/medicines/{id}", h.UpdateMedicine).Methods("PUT")
	inventory.HandleFunc("/medicines/{id}", h.DeleteMedicine).Methods("DELETE")
	inventory.HandleFunc("/racks", h.GetRacks).Methods("GET")
	inventory.HandleFunc("/racks/medicines", h.GetRackMedicines).Methods("GET")
	inventory.HandleFunc("/racks", h.CreateRack).Methods("POST")
	inventory.HandleFunc("/generics", h.GetGenerics).Methods("GET")

	// Product routes (new API with exact frontend response format)

	// Supplier routes
	api.HandleFunc("/suppliers/companies", h.GetSupplierCompanies).Methods("GET")
	api.HandleFunc("/suppliers", h.GetSuppliers).Methods("GET")
	api.HandleFunc("/suppliers", h.AddSupplier).Methods("POST")
	api.HandleFunc("/suppliers/{id}", h.UpdateSupplier).Methods("PUT")
	api.HandleFunc("/suppliers/{id}", h.DeleteSupplier).Methods("DELETE")

	// Customer routes
	api.HandleFunc("/customers", h.GetCustomers).Methods("GET")
	api.HandleFunc("/customers", h.CreateCustomer).Methods("POST")
	api.HandleFunc("/customers/{id}", h.UpdateCustomer).Methods("PUT")
	api.HandleFunc("/customers/{id}", h.DeleteCustomer).Methods("DELETE")

	// Vendor routes
	api.HandleFunc("/vendors", h.GetVendors).Methods("GET")

	// Get port from environment
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	log.Printf("🚀 Pharmacy Management System API starting on port %s", port)
	log.Printf("📊 Health check available at http://localhost:%s/api/health", port)

	// Wrap r with CORS middleware here to ensure it runs even for 404s/unmatched methods
	if err := http.ListenAndServe(":"+port, middleware.CORS(r)); err != nil {
		log.Fatal(err)
	}
}
