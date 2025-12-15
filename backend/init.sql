-- Pharmacy Management System Database Schema (Normalized)
-- =====================================================

-- Drop existing types if they exist
DROP TYPE IF EXISTS pack_type_enum CASCADE;
DROP TYPE IF EXISTS stock_change_type CASCADE;
DROP TYPE IF EXISTS invoice_status CASCADE;
DROP TYPE IF EXISTS invoice_type_enum CASCADE;
DROP TYPE IF EXISTS purchase_status_type CASCADE;

-- Create enums
CREATE TYPE pack_type_enum AS ENUM ('unit', 'strip', 'box');
CREATE TYPE stock_change_type AS ENUM ('purchase', 'sold', 'company_return', 'customer_return');
CREATE TYPE invoice_status AS ENUM ('paid', 'due');
CREATE TYPE invoice_type_enum AS ENUM ('outstanding', 'cash');
CREATE TYPE purchase_status_type AS ENUM ('paid', 'due', 'partial');

-- =====================================================
-- LOOKUP/REFERENCE TABLES
-- =====================================================

-- Generic Name Table
CREATE TABLE IF NOT EXISTS generic_name (
    id SERIAL PRIMARY KEY,
    generic_name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    deleted INTEGER DEFAULT 0
);

-- Rack Table
CREATE TABLE IF NOT EXISTS rack (
    id SERIAL PRIMARY KEY,
    rack_name VARCHAR(255) NOT NULL UNIQUE,
    rack_location VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    deleted INTEGER DEFAULT 0
);

-- Product Type Table (Tablet, Syrup, Capsule, Injection, etc.)
CREATE TABLE IF NOT EXISTS product_type (
    id SERIAL PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Category Table (Analgesics, Antibiotics, etc.)
CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Supplier Table
CREATE TABLE IF NOT EXISTS supplier (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    deleted INTEGER DEFAULT 0
);

-- =====================================================
-- MAIN PRODUCT TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    
    -- Basic Info
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    image TEXT,
    barcode VARCHAR(255),
    product_code VARCHAR(255),
    
    -- Foreign Keys to Lookup Tables
    generic_fk_id INTEGER REFERENCES generic_name(id),
    rack_fk_id INTEGER REFERENCES rack(id),
    product_type_fk_id INTEGER REFERENCES product_type(id),
    category_fk_id INTEGER REFERENCES category(id),
    
    -- Medicine Details
    strength VARCHAR(100),
    manufacture VARCHAR(255),
    
    -- Base Pricing (per unit level)
    unit_price DECIMAL(10, 2) DEFAULT 0.00,
    unit_mrp DECIMAL(10, 2) DEFAULT 0.00,
    unit_cost_price DECIMAL(10, 2) DEFAULT 0.00,
    discount_percent DECIMAL(5, 2) DEFAULT 0.00,
    vat_percent DECIMAL(5, 2) DEFAULT 0.00,
    
    -- Stock
    available_stock INTEGER DEFAULT 0,
    stock_alert INTEGER DEFAULT 10,
    status VARCHAR(20) DEFAULT 'Active',
    total_purchase INTEGER DEFAULT 0,
    total_sold INTEGER DEFAULT 0,
    
    -- Timestamps & Soft Delete
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    deleted INTEGER DEFAULT 0
);

-- =====================================================
-- PRODUCT PACKAGING (One-to-Many)
-- =====================================================

CREATE TABLE IF NOT EXISTS product_packaging (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES product(id) ON DELETE CASCADE,
    pack_type pack_type_enum NOT NULL,
    units_per_pack INTEGER NOT NULL DEFAULT 1,
    selling_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    mrp DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    cost_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(product_id, pack_type)
);

-- =====================================================
-- PRODUCT-SUPPLIER RELATIONSHIP (Many-to-Many)
-- =====================================================

CREATE TABLE IF NOT EXISTS product_supplier (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES product(id) ON DELETE CASCADE,
    supplier_id INTEGER REFERENCES supplier(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT FALSE,
    buying_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(product_id, supplier_id)
);

-- =====================================================
-- PRODUCT BATCH (For batch-wise inventory tracking)
-- =====================================================

CREATE TABLE IF NOT EXISTS product_batch (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES product(id) ON DELETE CASCADE,
    batch_id VARCHAR(100) NOT NULL,
    quantity INTEGER DEFAULT 0,
    expiry_date DATE,
    purchase_date DATE,
    supplier_id INTEGER REFERENCES supplier(id),
    cost_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- STOCK TRACKING TABLES
-- =====================================================

-- Product Stock Table
CREATE TABLE IF NOT EXISTS product_stock (
    id SERIAL PRIMARY KEY,
    product_id_fk INTEGER REFERENCES product(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Product Stock History Table
CREATE TABLE IF NOT EXISTS product_stock_history (
    id SERIAL PRIMARY KEY,
    product_id_fk INTEGER REFERENCES product(id) ON DELETE CASCADE,
    change_amount INTEGER,
    change_type stock_change_type,
    previous_quantity INTEGER,
    new_quantity INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    stock_expiry TIMESTAMP
);

-- =====================================================
-- CUSTOMER & INVOICE TABLES
-- =====================================================

-- Customer Table
CREATE TABLE IF NOT EXISTS customer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    deleted INTEGER DEFAULT 0
);

-- Invoice Table
CREATE TABLE IF NOT EXISTS invoice (
    id SERIAL PRIMARY KEY,
    customer_id_fk INTEGER REFERENCES customer(id),
    invoice_type invoice_type_enum NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    paid_amount DECIMAL(10, 2) DEFAULT 0,
    balance DECIMAL(10, 2) DEFAULT 0,
    status invoice_status DEFAULT 'due',
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    deleted INTEGER DEFAULT 0
);

-- Invoice Items Table
CREATE TABLE IF NOT EXISTS invoice_items (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER REFERENCES invoice(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES product(id),
    pack_type pack_type_enum NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- VENDOR TABLES (Legacy - kept for compatibility)
-- =====================================================

-- Vendor Table
CREATE TABLE IF NOT EXISTS vendor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    deleted INTEGER DEFAULT 0
);

-- Product Vendor Junction Table
CREATE TABLE IF NOT EXISTS product_vendor (
    id SERIAL PRIMARY KEY,
    product_id_fk INTEGER REFERENCES product(id) ON DELETE CASCADE,
    vendor_id_fk INTEGER REFERENCES vendor(id) ON DELETE CASCADE
);

-- Distributor Table
CREATE TABLE IF NOT EXISTS distributor (
    id SERIAL PRIMARY KEY,
    vendor_id_fk INTEGER REFERENCES vendor(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    deleted INTEGER DEFAULT 0
);

-- =====================================================
-- PURCHASE TABLES
-- =====================================================

-- Product Stock Purchase Table
CREATE TABLE IF NOT EXISTS product_stock_purchase (
    id SERIAL PRIMARY KEY,
    total INTEGER NOT NULL,
    purchase_status purchase_status_type DEFAULT 'due',
    due INTEGER DEFAULT 0,
    paid_amount INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Product Stock Purchase Items Table
CREATE TABLE IF NOT EXISTS product_stock_purchase_items (
    id SERIAL PRIMARY KEY,
    psp_fk_id INTEGER REFERENCES product_stock_purchase(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES product(id),
    pack_type pack_type_enum NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_product_generic ON product(generic_fk_id);
CREATE INDEX IF NOT EXISTS idx_product_rack ON product(rack_fk_id);
CREATE INDEX IF NOT EXISTS idx_product_type ON product(product_type_fk_id);
CREATE INDEX IF NOT EXISTS idx_product_category ON product(category_fk_id);
CREATE INDEX IF NOT EXISTS idx_product_deleted ON product(deleted);
CREATE INDEX IF NOT EXISTS idx_product_barcode ON product(barcode);
CREATE INDEX IF NOT EXISTS idx_product_code ON product(product_code);
CREATE INDEX IF NOT EXISTS idx_product_name ON product(product_name);
CREATE INDEX IF NOT EXISTS idx_invoice_customer ON invoice(customer_id_fk);
CREATE INDEX IF NOT EXISTS idx_invoice_status ON invoice(status);
CREATE INDEX IF NOT EXISTS idx_product_stock_product ON product_stock(product_id_fk);
CREATE INDEX IF NOT EXISTS idx_product_batch_product ON product_batch(product_id);
CREATE INDEX IF NOT EXISTS idx_product_batch_expiry ON product_batch(expiry_date);
CREATE INDEX IF NOT EXISTS idx_product_supplier_product ON product_supplier(product_id);

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Insert product types
INSERT INTO product_type (type_name) VALUES 
    ('Tablet'),
    ('Capsule'),
    ('Syrup'),
    ('Injection'),
    ('Cream'),
    ('Ointment'),
    ('Drops'),
    ('Powder'),
    ('Inhaler'),
    ('Suppository')
ON CONFLICT (type_name) DO NOTHING;

-- Insert categories
INSERT INTO category (category_name) VALUES 
    ('Analgesics'),
    ('Antibiotics'),
    ('Antacids'),
    ('Antidiabetics'),
    ('Antihypertensives'),
    ('Antihistamines'),
    ('Vitamins & Supplements'),
    ('Cardiovascular'),
    ('Respiratory'),
    ('Gastrointestinal')
ON CONFLICT (category_name) DO NOTHING;

-- Insert sample generic names
INSERT INTO generic_name (generic_name) VALUES 
    ('Paracetamol'),
    ('Ibuprofen'),
    ('Amoxicillin'),
    ('Omeprazole'),
    ('Metformin'),
    ('Rosuvastatin + Ezetimibe'),
    ('Paracetamol + Caffeine')
ON CONFLICT (generic_name) DO NOTHING;

-- Insert sample racks
INSERT INTO rack (rack_name, rack_location) VALUES 
    ('A1', 'Aisle A, Shelf 1'),
    ('A2', 'Aisle A, Shelf 2'),
    ('B1', 'Aisle B, Shelf 1'),
    ('B2', 'Aisle B, Shelf 2'),
    ('C1', 'Aisle C, Shelf 1')
ON CONFLICT (rack_name) DO NOTHING;

-- Insert sample suppliers
INSERT INTO supplier (name, contact, email) VALUES 
    ('Mr. Rahman', '+880 1711-223344', 'rahman@supplier.com'),
    ('Mr. Khan', '+880 1911-445566', 'khan@supplier.com'),
    ('Ms. Sultana', '+880 1811-334455', 'sultana@supplier.com')
ON CONFLICT DO NOTHING;

-- Insert sample customers
INSERT INTO customer (name, phone, email) VALUES 
    ('Walk-in Customer', NULL, NULL),
    ('John Doe', '1234567890', 'john@example.com'),
    ('Jane Smith', '0987654321', 'jane@example.com')
ON CONFLICT DO NOTHING;

-- Insert sample vendors (legacy)
INSERT INTO vendor (name) VALUES 
    ('PharmaCorp'),
    ('MediSupply Inc'),
    ('HealthDistributors')
ON CONFLICT DO NOTHING;

-- Insert sample products
INSERT INTO product (
    product_name, product_description, barcode, product_code, strength,
    manufacture, generic_fk_id, rack_fk_id, product_type_fk_id, category_fk_id,
    unit_price, unit_mrp, unit_cost_price, discount_percent, vat_percent,
    available_stock, total_purchase, total_sold
) VALUES 
    (
        'Paracetamol 500mg',
        'Pain reliever and fever reducer',
        '8901234567890',
        'PARA500',
        '500mg',
        'Square Pharmaceuticals',
        1, -- Paracetamol generic
        1, -- A1 rack
        1, -- Tablet
        1, -- Analgesics
        2.85,
        3.00,
        2.00,
        5.00,
        0.00,
        250,
        1000,
        750
    ),
    (
        'Napa Extra',
        'Pain reliever with caffeine',
        '8901234567891',
        'NAPAEX500',
        '500mg + 65mg',
        'Beximco Pharmaceuticals',
        7, -- Paracetamol + Caffeine
        4, -- B2 rack
        1, -- Tablet
        1, -- Analgesics
        4.50,
        5.00,
        3.50,
        10.00,
        0.00,
        500,
        0,
        0
    )
ON CONFLICT DO NOTHING;

-- Insert sample packaging for products
INSERT INTO product_packaging (product_id, pack_type, units_per_pack, selling_price, mrp, cost_price) VALUES
    (1, 'unit', 1, 2.85, 3.00, 2.00),
    (1, 'strip', 10, 28.50, 30.00, 20.00),
    (1, 'box', 100, 285.00, 300.00, 200.00),
    (2, 'unit', 1, 4.50, 5.00, 3.50),
    (2, 'strip', 10, 45.00, 50.00, 35.00),
    (2, 'box', 50, 225.00, 250.00, 175.00)
ON CONFLICT DO NOTHING;

-- Insert sample product-supplier relationships
INSERT INTO product_supplier (product_id, supplier_id, is_primary, buying_price) VALUES
    (1, 1, TRUE, 2.00),
    (2, 2, TRUE, 3.50)
ON CONFLICT DO NOTHING;

-- Insert sample batches
INSERT INTO product_batch (product_id, batch_id, quantity, expiry_date, purchase_date, supplier_id, cost_price) VALUES
    (1, 'BATCH2024001', 250, '2025-12-31', '2024-01-15', 1, 2.00),
    (2, 'BATCH2024002', 500, '2026-06-30', '2024-02-01', 2, 3.50)
ON CONFLICT DO NOTHING;


-- =====================================================
-- AUTOMATIC SALES TRACKING TRIGGER
-- =====================================================
-- This trigger automatically updates product.total_sold and product.available_stock
-- whenever a sale is recorded in the invoice_items table.

-- Function to update product sales and stock
CREATE OR REPLACE FUNCTION update_product_sales()
RETURNS TRIGGER AS $$
DECLARE
    units_sold INTEGER;
BEGIN
    -- Convert pack-based quantity to units
    -- For 'unit' pack type, quantity is already in units
    -- For 'strip' and 'box', we need to get units_per_pack from product_packaging
    IF NEW.pack_type = 'unit' THEN
        units_sold := NEW.quantity;
    ELSE
        -- Get units per pack for this product and pack type
        SELECT units_per_pack INTO units_sold
        FROM product_packaging
        WHERE product_id = NEW.product_id AND pack_type = NEW.pack_type;
        
        -- Multiply by quantity to get total units
        units_sold := units_sold * NEW.quantity;
    END IF;

    -- Update product: increment total_sold and decrement available_stock
    UPDATE product
    SET 
        total_sold = total_sold + units_sold,
        available_stock = GREATEST(0, available_stock - units_sold),
        updated_at = NOW()
    WHERE id = NEW.product_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on invoice_items INSERT
DROP TRIGGER IF EXISTS increment_sales_on_invoice ON invoice_items;
CREATE TRIGGER increment_sales_on_invoice
    AFTER INSERT ON invoice_items
    FOR EACH ROW
    EXECUTE FUNCTION update_product_sales();
