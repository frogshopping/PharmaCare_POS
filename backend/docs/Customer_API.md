# Customer API Documentation

## Overview

New endpoints have been added to manage customer data. These endpoints support full CRUD operations.

Base URL: `http://localhost:8080`

## Endpoints

### 1. Get All Customers

Retrieves a paginated list of customers.

*   **URL**: `/api/customers`
*   **Method**: `GET`
*   **Query Parameters**:
    *   `page` (int, optional): Page number (default: 1)
    *   `limit` (int, optional): Items per page (default: 20)
    *   `search` (string, optional): Search by name, phone, or email
*   **Success Response**:
    *   **Code**: 200 OK
    *   **Content**:
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
            }
          ],
          "pagination": {
            "currentPage": 1,
            "totalPages": 1,
            "totalItems": 1,
            "itemsPerPage": 20
          }
        }
        ```

### 2. Create Customer

Creates a new customer record.

*   **URL**: `/api/customers`
*   **Method**: `POST`
*   **Content-Type**: `application/json`
*   **Request Body**:
    ```json
    {
      "name": "Robert Brown",
      "phone": "+1 555-0125",
      "email": "robert.b@example.com",
      "address": "789 Pine Ln, Chicago, IL"
    }
    ```
*   **Success Response**:
    *   **Code**: 201 Created
    *   **Content**:
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
            "memberSince": "2023-12-13"
          }
        }
        ```

### 3. Update Customer

Updates an existing customer's information.

*   **URL**: `/api/customers/:id`
*   **Method**: `PUT`
*   **Content-Type**: `application/json`
*   **Request Body**:
    ```json
    {
      "name": "Robert Brown",
      "phone": "+1 555-9999",
      "email": "robert.new@example.com",
      "address": "101 New Rd, Chicago, IL"
    }
    ```
*   **Success Response**:
    *   **Code**: 200 OK
    *   **Content**:
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
            "memberSince": "2023-12-13"
          }
        }
        ```

### 4. Delete Customer

Soft deletes a customer record.

*   **URL**: `/api/customers/:id`
*   **Method**: `DELETE`
*   **Success Response**:
    *   **Code**: 200 OK
    *   **Content**:
        ```json
        {
          "success": true,
          "message": "Customer deleted successfully",
          "id": 3
        }
        ```

## Testing with Curl

**Get Customers:**
```bash
curl "http://localhost:8080/api/customers?page=1&limit=10"
```

**Create Customer:**
```bash
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Wonderland", "phone": "123-456-7890", "email": "alice@example.com", "address": "Wonderland St 1"}'
```

**Update Customer (replace ID):**
```bash
curl -X PUT http://localhost:8080/api/customers/1 \
  -H "Content-Type: application/json" \
  -d '{"address": "New Address 123"}'
```

**Delete Customer (replace ID):**
```bash
curl -X DELETE http://localhost:8080/api/customers/1
```
