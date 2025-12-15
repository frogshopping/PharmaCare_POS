package database

import (
	"database/sql"
	"fmt"
	"pharmacy-backend/internal/models"
	"time"
)

// GetCustomers retrieves customers with pagination and search
func GetCustomers(db *sql.DB, page, limit int, search string) ([]models.CustomerDTO, models.Pagination, error) {
	offset := (page - 1) * limit

	query := `
		SELECT id, name, COALESCE(phone, ''), COALESCE(email, ''), COALESCE(address, ''), created_at
		FROM customer
		WHERE deleted = 0
	`
	countQuery := `SELECT COUNT(*) FROM customer WHERE deleted = 0`

	var args []interface{}
	if search != "" {
		searchParam := "%" + search + "%"
		filter := " AND (name ILIKE $1 OR phone ILIKE $1 OR email ILIKE $1)"
		query += filter
		countQuery += filter
		args = append(args, searchParam)
	}

	query += " ORDER BY id DESC LIMIT $" + fmt.Sprint(len(args)+1) + " OFFSET $" + fmt.Sprint(len(args)+2)

	// Execute Count
	var totalItems int
	err := db.QueryRow(countQuery, args...).Scan(&totalItems)
	if err != nil {
		return nil, models.Pagination{}, err
	}

	// Execute Data Query
	args = append(args, limit, offset)
	rows, err := db.Query(query, args...)
	if err != nil {
		return nil, models.Pagination{}, err
	}
	defer rows.Close()

	var customers []models.CustomerDTO
	for rows.Next() {
		var c models.CustomerDTO
		var createdAt time.Time
		err := rows.Scan(&c.ID, &c.Name, &c.Phone, &c.Email, &c.Address, &createdAt)
		if err != nil {
			return nil, models.Pagination{}, err
		}
		c.MemberSince = createdAt.Format("2006-01-02")
		customers = append(customers, c)
	}

	if customers == nil {
		customers = []models.CustomerDTO{}
	}

	totalPages := (totalItems + limit - 1) / limit
	if limit <= 0 {
		totalPages = 0
	}

	pagination := models.Pagination{
		CurrentPage:  page,
		TotalPages:   totalPages,
		TotalItems:   totalItems,
		ItemsPerPage: limit,
	}

	return customers, pagination, nil
}

// CreateCustomer creates a new customer
func CreateCustomer(db *sql.DB, req models.CreateCustomerRequest) (*models.CustomerDTO, error) {
	query := `
		INSERT INTO customer (name, phone, email, address)
		VALUES ($1, $2, $3, $4)
		RETURNING id, created_at
	`

	var id int
	var createdAt time.Time

	// Handle empty strings as NULL or empty? Requirement says nothing, but usually fine.
	// However, phone/email are often nullable.

	err := db.QueryRow(query, req.Name, req.Phone, req.Email, req.Address).Scan(&id, &createdAt)
	if err != nil {
		return nil, err
	}

	return &models.CustomerDTO{
		ID:          id,
		Name:        req.Name,
		Phone:       req.Phone,
		Email:       req.Email,
		Address:     req.Address,
		MemberSince: createdAt.Format("2006-01-02"),
	}, nil
}

// UpdateCustomer updates an existing customer
func UpdateCustomer(db *sql.DB, id int, req models.UpdateCustomerRequest) (*models.CustomerDTO, error) {
	// First check if exists
	var current models.CustomerDTO
	var createdAt time.Time

	err := db.QueryRow(`
		SELECT id, name, COALESCE(phone, ''), COALESCE(email, ''), COALESCE(address, ''), created_at 
		FROM customer WHERE id = $1 AND deleted = 0
	`, id).Scan(&current.ID, &current.Name, &current.Phone, &current.Email, &current.Address, &createdAt)

	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("customer not found")
	}
	if err != nil {
		return nil, err
	}

	// Prepare update
	query := "UPDATE customer SET "
	var args []interface{}
	idx := 1

	if req.Name != nil {
		query += fmt.Sprintf("name = $%d, ", idx)
		args = append(args, *req.Name)
		current.Name = *req.Name
		idx++
	}
	if req.Phone != nil {
		query += fmt.Sprintf("phone = $%d, ", idx)
		args = append(args, *req.Phone)
		current.Phone = *req.Phone
		idx++
	}
	if req.Email != nil {
		query += fmt.Sprintf("email = $%d, ", idx)
		args = append(args, *req.Email)
		current.Email = *req.Email
		idx++
	}
	if req.Address != nil {
		query += fmt.Sprintf("address = $%d, ", idx)
		args = append(args, *req.Address)
		current.Address = *req.Address
		idx++
	}

	if len(args) == 0 {
		current.MemberSince = createdAt.Format("2006-01-02")
		return &current, nil
	}

	// Remove trailing comma
	query = query[:len(query)-2]
	query += fmt.Sprintf(" WHERE id = $%d", idx)
	args = append(args, id)

	_, err = db.Exec(query, args...)
	if err != nil {
		return nil, err
	}

	current.MemberSince = createdAt.Format("2006-01-02")
	return &current, nil
}

// DeleteCustomer soft deletes a customer
func DeleteCustomer(db *sql.DB, id int) error {
	result, err := db.Exec("UPDATE customer SET deleted = 1, deleted_at = NOW() WHERE id = $1 AND deleted = 0", id)
	if err != nil {
		return err
	}
	rows, _ := result.RowsAffected()
	if rows == 0 {
		return fmt.Errorf("customer not found")
	}
	return nil
}
