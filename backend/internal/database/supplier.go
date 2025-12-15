package database

import (
	"database/sql"
	"fmt"
	"math"
	"pharmacy-backend/internal/models"
)

// GetSuppliers retrieves suppliers with pagination, search, and filtering
func GetSuppliers(db *sql.DB, page, limit int, search, company string) (models.SupplierListResponseData, error) {
	offset := (page - 1) * limit
	var suppliers []models.SupplierDTO
	var totalItems int

	// Base query
	query := `SELECT id, name, company, contact, email, address, status FROM supplier WHERE deleted = 0`
	countQuery := `SELECT COUNT(*) FROM supplier WHERE deleted = 0`
	var args []interface{}
	argCount := 1

	// Apply Search
	if search != "" {
		searchTerm := "%" + search + "%"
		filter := fmt.Sprintf(" AND (name ILIKE $%d OR contact ILIKE $%d OR email ILIKE $%d)", argCount, argCount, argCount)
		query += filter
		countQuery += filter
		args = append(args, searchTerm)
		argCount++
	}

	// Apply Company Filter
	if company != "" {
		companyTerm := "%" + company + "%"
		filter := fmt.Sprintf(" AND company ILIKE $%d", argCount)
		query += filter
		countQuery += filter
		args = append(args, companyTerm)
		argCount++
	}

	// Pagination
	query += fmt.Sprintf(" ORDER BY id ASC LIMIT $%d OFFSET $%d", argCount, argCount+1)
	args = append(args, limit, offset)

	// Execute Count Query (using subset of args)
	// We need to pass only the search/company args to countQuery, not limit/offset
	countArgs := args[:argCount-1]
	err := db.QueryRow(countQuery, countArgs...).Scan(&totalItems)
	if err != nil {
		return models.SupplierListResponseData{}, err
	}

	// Execute Main Query
	rows, err := db.Query(query, args...)
	if err != nil {
		return models.SupplierListResponseData{}, err
	}
	defer rows.Close()

	for rows.Next() {
		var s models.SupplierDTO
		var idInt int
		var company, phone, email, address, status sql.NullString

		if err := rows.Scan(&idInt, &s.Name, &company, &phone, &email, &address, &status); err != nil {
			return models.SupplierListResponseData{}, err
		}

		s.ID = fmt.Sprintf("SUP-%03d", idInt)
		s.Company = company.String
		s.Phone = phone.String
		s.Email = email.String
		s.Address = address.String
		s.Status = status.String

		if s.Status == "" {
			s.Status = "Active"
		}

		suppliers = append(suppliers, s)
	}

	if suppliers == nil {
		suppliers = []models.SupplierDTO{}
	}

	totalPages := int(math.Ceil(float64(totalItems) / float64(limit)))

	return models.SupplierListResponseData{
		Data: suppliers,
		Pagination: models.Pagination{
			TotalItems:   totalItems,
			TotalPages:   totalPages,
			CurrentPage:  page,
			ItemsPerPage: limit,
		},
	}, nil
}

// GetSupplierCompanies returns a list of unique Pharmaceutical companies
func GetSupplierCompanies(db *sql.DB) ([]string, error) {
	query := `SELECT DISTINCT company FROM supplier WHERE deleted = 0 AND company IS NOT NULL AND company != '' ORDER BY company ASC`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var companies []string
	for rows.Next() {
		var company string
		if err := rows.Scan(&company); err != nil {
			return nil, err
		}
		companies = append(companies, company)
	}

	if companies == nil {
		companies = []string{}
	}

	return companies, nil
}

// AddSupplier adds a new supplier
func AddSupplier(db *sql.DB, req models.CreateSupplierRequest) (models.SupplierDTO, error) {
	query := `
		INSERT INTO supplier (name, company, contact, email, address, status)
		VALUES ($1, $2, $3, $4, $5, 'Active')
		RETURNING id
	`

	var idInt int
	err := db.QueryRow(query, req.Name, req.Company, req.Phone, req.Email, req.Address).Scan(&idInt)
	if err != nil {
		return models.SupplierDTO{}, err
	}

	return models.SupplierDTO{
		ID:      fmt.Sprintf("SUP-%03d", idInt),
		Name:    req.Name,
		Company: req.Company,
		Phone:   req.Phone,
		Email:   req.Email,
		Address: req.Address,
		Status:  "Active",
	}, nil
}

// UpdateSupplier updates an existing supplier
func UpdateSupplier(db *sql.DB, id int, req models.UpdateSupplierRequest) (models.SupplierDTO, error) {
	// First get existing supplier
	existingQuery := `SELECT name, company, contact, email, address, status FROM supplier WHERE id = $1 AND deleted = 0`
	var currentName, currentCompany, currentPhone, currentEmail, currentAddress, currentStatus string

	err := db.QueryRow(existingQuery, id).Scan(&currentName, &currentCompany, &currentPhone, &currentEmail, &currentAddress, &currentStatus)
	if err != nil {
		return models.SupplierDTO{}, err
	}

	// Prepare update
	name := currentName
	if req.Name != nil {
		name = *req.Name
	}
	company := currentCompany
	if req.Company != nil {
		company = *req.Company
	}
	phone := currentPhone
	if req.Phone != nil {
		phone = *req.Phone
	}
	email := currentEmail
	if req.Email != nil {
		email = *req.Email
	}
	address := currentAddress
	if req.Address != nil {
		address = *req.Address
	}

	updateQuery := `
		UPDATE supplier 
		SET name = $1, company = $2, contact = $3, email = $4, address = $5, updated_at = NOW()
		WHERE id = $6
	`

	_, err = db.Exec(updateQuery, name, company, phone, email, address, id)
	if err != nil {
		return models.SupplierDTO{}, err
	}

	return models.SupplierDTO{
		ID:      fmt.Sprintf("SUP-%03d", id),
		Name:    name,
		Company: company,
		Phone:   phone,
		Email:   email,
		Address: address,
		Status:  currentStatus,
	}, nil
}

// DeleteSupplier soft deletes a supplier
func DeleteSupplier(db *sql.DB, id int) error {
	query := `UPDATE supplier SET deleted = 1, deleted_at = NOW() WHERE id = $1`
	result, err := db.Exec(query, id)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rows == 0 {
		return sql.ErrNoRows
	}

	return nil
}
