package database

// calculateStockStatus determines the stock status string
func calculateStockStatus(quantity int) string {
	if quantity <= 0 {
		return "Out of Stock"
	} else if quantity < 10 {
		return "Low Stock"
	}
	return "Normal"
}
