# Pharmacy Management System - Backend

A comprehensive Go-based backend API for pharmacy management system with PostgreSQL database.

## Features

- **Product Management**: Manage medicines with packaging options, pricing, and stock levels
- **Inventory Tracking**: Real-time stock management with history tracking
- **Invoice System**: Generate invoices for cash and outstanding payments
- **Customer Management**: Track customer information and purchase history
- **Vendor & Distributor**: Manage suppliers and distributors
- **Purchase Management**: Track stock purchases with payment status
- **Generic Names & Racks**: Organize products by generic names and storage locations

## Tech Stack

- **Language**: Go 1.21
- **Database**: PostgreSQL 15
- **Router**: Gorilla Mux
- **Containerization**: Docker & Docker Compose

## Project Structure

```
backend/
├── cmd/
│   └── api/
│       └── main.go          # Application entry point
├── internal/
│   ├── config/
│   │   └── config.go        # Configuration management
│   ├── database/
│   │   └── database.go      # Database connection and queries  
│   ├── handlers/
│   │   └── handlers.go      # HTTP request handlers
│   ├── middleware/
│   │   └── middleware.go    # HTTP middleware (CORS, logging)
│   └── models/
│       └── models.go        # Database models and DTOs
├── migrations/              # Database migrations
├── init.sql                 # Database schema initialization
├── Dockerfile              # Docker build configuration
├── docker-compose.yml      # Docker orchestration
├── go.mod                  # Go dependencies
├── Makefile               # Build and development commands
└── README.md              # This file
```

## Quick Start

### Using Docker Compose (Recommended)

1. **Start all services**:
   ```bash
   docker-compose up --build
   ```

2. **Access the API**:
   - Backend API: http://localhost:8080
   - Health Check: http://localhost:8080/api/health
   - PostgreSQL: localhost:5432

3. **Stop services**:
   ```bash
   docker-compose down
   ```

4. **Stop and remove volumes** (reset database):
   ```bash
   docker-compose down -v
   ```

### Manual Setup

1. **Install PostgreSQL** and create database:
   ```sql
   CREATE DATABASE pharmacy_db;
   CREATE USER pharmacy_user WITH PASSWORD 'pharmacy_pass';
   GRANT ALL PRIVILEGES ON DATABASE pharmacy_db TO pharmacy_user;
   ```

2. **Run initialization script**:
   ```bash
   psql -U pharmacy_user -d pharmacy_db -f init.sql
   ```

3. **Set environment variables**:
   ```bash
   export POSTGRES_HOST=localhost
   export POSTGRES_PORT=5432
   export POSTGRES_USER=pharmacy_user
   export POSTGRES_PASSWORD=pharmacy_pass
   export POSTGRES_DB=pharmacy_db
   export PORT=8080
   ```

4. **Install dependencies and run**:
   ```bash
   go mod download
   go run cmd/api/main.go
   ```

## Development Commands

Using the included Makefile:

```bash
# Build the application
make build

# Run the application
make run

# Run tests
make test

# Format code
make fmt

# Clean build artifacts
make clean

# Build Docker image
make docker-build

# Start with Docker Compose
make docker-run

# Stop Docker services
make docker-stop

# Install dependencies
make deps

# Show all available commands
make help
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API and database status

### Products
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product

### Customers
- `GET /api/customers` - List all customers

### Invoices
- `GET /api/invoices` - List all invoices

### Generic Names
- `GET /api/generic-names` - List all generic names

### Racks
- `GET /api/racks` - List all storage racks

### Vendors
- `GET /api/vendors` - List all vendors

## Database Schema

The system includes the following main entities:

- **product**: Medicine/product information
- **product_packaging**: Packaging types (unit, strip, box) with pricing
- **product_stock**: Current stock levels
- **product_stock_history**: Stock change tracking
- **invoice**: Sales invoices
- **invoice_items**: Invoice line items
- **customer**: Customer information
- **vendor**: Supplier information
- **distributor**: Distributor details
- **product_stock_purchase**: Purchase orders
- **generic_name**: Generic medicine names
- **rack**: Storage locations

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | API server port | 8080 |
| `POSTGRES_HOST` | PostgreSQL host | postgres |
| `POSTGRES_PORT` | PostgreSQL port | 5432 |
| `POSTGRES_USER` | Database user | pharmacy_user |
| `POSTGRES_PASSWORD` | Database password | pharmacy_pass |
| `POSTGRES_DB` | Database name | pharmacy_db |

## Development

### Adding New Endpoints

1. Define models in `models.go`
2. Add database queries in `database.go`
3. Create handlers in `handlers.go`
4. Register routes in `main.go`

### Database Migrations

Modify `init.sql` for schema changes. To apply:
```bash
docker-compose down -v
docker-compose up --build
```

## Testing

Test the API using curl:

```bash
# Health check
curl http://localhost:8080/api/health

# Get all products
curl http://localhost:8080/api/products

# Create a product
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "product_name": "Aspirin",
    "product_description": "Pain reliever",
    "power": "500mg",
    "generic_fk_id": 1,
    "rack_fk_id": 1
  }'
```

## License

MIT
