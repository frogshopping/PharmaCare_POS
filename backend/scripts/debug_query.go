package main

import (
	"fmt"
)

func main() {
	search := "napa"
	limit := 20
	offset := 0
	query := "SELECT p.id, p.product_name FROM product p LEFT JOIN generic_name g ON p.generic_fk_id = g.id WHERE p.deleted = 0"

	var args []interface{}
	argCounter := 1

	if search != "" {
		query += fmt.Sprintf(" AND (p.product_name ILIKE $%d OR p.product_code ILIKE $%d OR g.generic_name ILIKE $%d)", argCounter, argCounter, argCounter)
		args = append(args, "%"+search+"%")
		argCounter++
	}

	query += " ORDER BY p.created_at DESC, p.id DESC"
	query += fmt.Sprintf(" LIMIT $%d OFFSET $%d", argCounter, argCounter+1)
	args = append(args, limit, offset)

	fmt.Println("Query:", query)
	fmt.Printf("Args: %v\n", args)
}
