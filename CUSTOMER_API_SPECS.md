# Customer API Endpoints

These endpoints are required to support the frontend customer management features.

## 1. Get All Customers
**Endpoint:** `GET /api/customers`
**Description:** Retrieves a list of all customers.

**Response Body:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "phone": "+1 555-0123",
      "email": "john.doe@example.com",
      "address": "123 Main St, New York, NY",
      "memberSince": "2023-01-15"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "phone": "+1 555-0124",
      "email": "jane.smith@example.com",
      "address": "456 Oak Ave, Los Angeles, CA",
      "memberSince": "2023-03-10"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 2,
    "itemsPerPage": 20
  }
}
```

## 2. Create Customer
**Endpoint:** `POST /api/customers`
**Description:** Creates a new customer record.

**Request Body:**
```json
{
  "name": "Robert Brown",
  "phone": "+1 555-0125",
  "email": "robert.b@example.com",
  "address": "789 Pine Ln, Chicago, IL"
}
```

**Response Body:**
```json
{
  "success": true,
  "message": "Customer created successfully",
  "data": {
    "id": 3,
    "name": "Robert Brown",
    "phone": "+1 555-0125",
    "email": "robert.b@example.com",
    "address": "789 Pine Ln, Chicago, IL",
    "memberSince": "2023-10-27"
  }
}
```

## 3. Update Customer
**Endpoint:** `PUT /api/customers/:id`
**Description:** Updates an existing customer's information.

**Request Body:**
```json
{
  "name": "Robert Brown",
  "phone": "+1 555-9999",
  "email": "robert.new@example.com",
  "address": "101 New Rd, Chicago, IL"
}
```

**Response Body:**
```json
{
  "success": true,
  "message": "Customer updated successfully",
  "data": {
    "id": 3,
    "name": "Robert Brown",
    "phone": "+1 555-9999",
    "email": "robert.new@example.com",
    "address": "101 New Rd, Chicago, IL",
    "memberSince": "2023-10-27"
  }
}
```

## 4. Delete Customer
**Endpoint:** `DELETE /api/customers/:id`
**Description:** Deletes a customer record.

**Response Body:**
```json
{
  "success": true,
  "message": "Customer deleted successfully",
  "id": 3
}
```
