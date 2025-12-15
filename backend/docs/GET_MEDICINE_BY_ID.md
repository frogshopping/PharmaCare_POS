# Get Medicine By ID Endpoint

## Endpoint
```
GET /api/inventory/medicines/{id}
```

## Description
Retrieves detailed information about a specific medicine by its ID. The response format matches the structure of individual items from the `GET /api/inventory/medicines` endpoint.

## Parameters
- `id` (path parameter): The medicine ID. Can be in format `prod_001` or just `1`

## Response Format
The response contains a `data` key with the medicine details, matching the structure from the list endpoint:

```json
{
  "data": {
    "id": "prod_001",
    "srl_no": 1,
    "name": "Medicine Name",
    "image": "",
    "description": "",
    "barcode": "123456789",
    "product_code": "MED001",
    "strength": "500mg",
    "manufacture": "Manufacturer Name",
    "generic_name": "Generic Name",
    "price": 10.50,
    "mrp": 12.00,
    "discount": 5.0,
    "vat": 0.0,
    "rack_no": "A1",
    "rack_location": "Floor 1",
    "rack_fk_id": 1,
    "total_purchase": 1000,
    "total_sold": 500,
    "in_stock": 500,
    "stock_alert": 100,
    "category": "Tablet",
    "type": "Medicine",
    "batch_id": "BATCH001",
    "expiry_date": "2025-12-31",
    "purchase_date": "2024-01-01",
    "supplier": "Supplier Name",
    "supplier_contact": "123-456-7890",
    "buying_price": 8.00,
    "pack_size": {
      "strip": 10,
      "box": 100
    },
    "pack_price": {
      "strip": 105.00,
      "box": 1150.00
    },
    "stock_status": "In Stock",
    "profit_margin": 31.25
  }
}
```

## Error Responses

### 404 Not Found
When the medicine with the given ID doesn't exist:
```json
{
  "success": false,
  "error": "Medicine not found"
}
```

### 500 Internal Server Error
When there's a database or server error:
```json
{
  "success": false,
  "error": "error message here"
}
```

## Example Usage

### Using curl
```bash
# Get medicine with ID 1
curl http://localhost:8080/api/inventory/medicines/1

# Get medicine with ID prod_001 (alternative format)
curl http://localhost:8080/api/inventory/medicines/prod_001
```

### Using JavaScript fetch
```javascript
const getMedicineById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/inventory/medicines/${id}`);
    const result = await response.json();
    
    if (response.ok) {
      console.log('Medicine details:', result.data);
      return result.data;
    } else {
      console.error('Error:', result.error);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Failed to fetch medicine:', error);
    throw error;
  }
};

// Usage
getMedicineById(1).then(medicine => {
  console.log(medicine);
});
```

## Related Endpoints
- `GET /api/inventory/medicines` - Get list of all medicines (with pagination, search, filters)
- `POST /api/inventory/medicines` - Create a new medicine
- `PUT /api/inventory/medicines/{id}` - Update a medicine
- `DELETE /api/inventory/medicines/{id}` - Delete a medicine
