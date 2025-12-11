# Backend API Specification & Database Schema Design for Inventory

This document outlines the API endpoints required to connect the Frontend Inventory Page (`app/inventory/page.tsx`) with your Go backend. It also provides a recommended database schema.

## 1. Base URL
All endpoints should be prefixed with:
`http://localhost:5000/api`

## 2. Inventory Endpoints

### A. Get All Medicines
Fetch the list of medicines with optional filtering and pagination.

- **Endpoint:** `GET /inventory/medicines`
- **Query Parameters:**
  - `page` (optional, default: 1): Page number for pagination
  - `limit` (optional, default: 20): Items per page
  - `search` (optional): Filter by name, generic name, or product code
  - `status` (optional): Filter by stock status (`low`, `out`, `top-selling`, `low-selling`)
  - `rack` (optional): Filter by rack ID

- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "med-123456789",
      "srlNo": 1,
      "name": "Napa Extra",
      "description": "Pain reliever and fever reducer",
      "productCode": "P-1001",
      "strength": "500mg",
      "manufacture": "Beximco Pharmaceuticals Ltd",
      "genericName": "Paracetamol",
      "price": 2.50,
      "mrp": 2.50, 
      "buyingPrice": 1.80,
      "profitMargin": 28.00,
      "rackNo": "Rack A",
      "rackLocation": "Row 1, Shelf 2",
      "totalPurchase": 1000,
      "totalSold": 500,
      "inStock": 500,
      "stockStatus": "Normal",
      "type": "Tablet",
      "expiryDate": "2026-12-31",
      "batchId": "B-1001",
      "supplier": "Mr. Rahim (Beximco)",
      "purchaseDate": "2024-01-01",
      "category": "Medicine",
      "image": "https://example.com/image.jpg"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 195
  }
}
```

### B. Create Medicine
Add a new medicine to the inventory.

- **Endpoint:** `POST /inventory/medicines`
- **Request Body (JSON):**
```json
{
  "name": "Napa Extra",
  "productCode": "P-1002",
  "description": "Pain reliever",
  "type": "Tablet",
  "strength": "500mg",
  "genericName": "Paracetamol",
  "category": "Medicine",
  "manufacture": "Beximco Pharmaceuticals Ltd",
  "supplier": "Mr. Rahim (Beximco)",
  "supplierContact": "01700000000",
  "rackNo": "Rack A",
  "rackLocation": "Row 2",
  "inStock": 100,
  "stockAlert": 10,
  "price": 2.50,
  "mrp": 2.50,
  "buyingPrice": 1.80,
  "discount": 0,
  "status": "Active",
  "expiryDate": "2026-12-31",
  "packSize": {
    "strip": 10,
    "box": 100
  },
  "packPrice": {
    "strip": 25.00,
    "box": 250.00
  }
}
```

- **Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "med-new-id-123",
    "createdAt": "2024-12-11T10:00:00Z",
    ... // returns the created object
  }
}
```

### C. Get Medicine Details
Fetch details for a single medicine.

- **Endpoint:** `GET /inventory/medicines/:id`
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "med-123",
    "name": "Napa Extra",
    ... // full medicine object
  }
}
```

### D. Update Medicine
Update an existing medicine's information.

- **Endpoint:** `PUT /inventory/medicines/:id`
- **Request Body:** Same as POST, but fields are optional (partial update).
```json
{
  "price": 3.00,
  "inStock": 150
}
```
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": { ... } // Updated medicine object
}
```

### E. Delete Medicine
Remove a medicine from inventory.

- **Endpoint:** `DELETE /inventory/medicines/:id`
- **Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Medicine deleted successfully"
}
```

### F. Get Auxiliary Data (Dropdowns)
These endpoints populate the dropdowns in the Add/Edit form.

- **Endpoint:** `GET /inventory/racks`
- **Response:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Shelf A" },
    { "id": 2, "name": "Shelf B" }
  ]
}
```

- **Endpoint:** `GET /inventory/generics`
- **Response:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Paracetamol" },
    { "id": 2, "name": "Azithromycin" }
  ]
}
```

---

## 3. Recommended Database Schema (PostgreSQL)

Here is a normalized schema design to support the above API.

### Table: `medicines`
Stores the core product information.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID / SERIAL | PRIMARY KEY | Unique Identifier |
| `name` | VARCHAR(255) | NOT NULL | Product Name |
| `product_code` | VARCHAR(50) | UNIQUE, NOT NULL | SKU / Reference Code |
| `barcode` | VARCHAR(100) | INDEX | For barcode scanner |
| `description` | TEXT | NULLABLE | Product details |
| `strength` | VARCHAR(50) | NULLABLE | e.g. 500mg |
| `generic_name` | VARCHAR(100) | INDEX | Linked to Generics |
| `type` | VARCHAR(50) | NOT NULL | Tablet, Syrup, etc. |
| `category` | VARCHAR(50) | NULLABLE | Medicine, Equipment |
| `manufacturer` | VARCHAR(100) | INDEX | Manufacturer Name |
| `supplier` | VARCHAR(100) | NULLABLE | Supplier Name |
| `supplier_contact`| VARCHAR(50) | NULLABLE | Supplier Phone |
| `rack_no` | VARCHAR(50) | NULLABLE | Physical Location |
| `buying_price` | DECIMAL(10,2) | NOT NULL | Cost per unit |
| `selling_price` | DECIMAL(10,2) | NOT NULL | Price to customer (Unit) |
| `mrp` | DECIMAL(10,2) | NULLABLE | Printed Maximum Retail Price |
| `in_stock` | INTEGER | DEFAULT 0 | Current Quantity (Units) |
| `stock_alert` | INTEGER | DEFAULT 10 | Low stock threshold |
| `expiry_date` | DATE | NULLABLE | Product Expiry |
| `batch_id` | VARCHAR(50) | NULLABLE | Batch Number |
| `status` | VARCHAR(20) | DEFAULT 'Active' | Active/Inactive |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation time |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update time |

### Table: `medicine_packaging` (Optional - for advanced normalization)
If you want to strictly separate packaging logic.

| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `medicine_id` | UUID | FK to medicines.id |
| `strip_size` | INTEGER | Units per strip |
| `box_size` | INTEGER | Strips per box |
| `strip_price` | DECIMAL(10,2) | Selling price per strip |
| `box_price` | DECIMAL(10,2) | Selling price per box |

### Table: `racks`
| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `id` | SERIAL | Primary Key |
| `name` | VARCHAR(100) | e.g., "Rack A" |
| `location` | VARCHAR(255) | Optional physical description |

### Table: `generics`
| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `id` | SERIAL | Primary Key |
| `name` | VARCHAR(255) | e.g., "Paracetamol" |
