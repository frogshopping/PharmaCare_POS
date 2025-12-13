// ============================================
// CENTRALIZED TYPE DEFINITIONS
// This file contains all shared types for the application
// ============================================

// ============================================
// CORE ENTITIES
// ============================================

export interface DashboardStats {
    totalPurchase: number;
    monthlyPurchase: number;
    todaysPurchase: number;
    totalSales: number;
    todaysDiscount: number;
    todaysDiscountPercentage: number;
    monthlyDiscount: number;
    monthlyDiscountPercentage: number;
    todaysRevenue: number;
    monthlyRevenue: number;
    todaysProfitPercentage: number;
    monthlyProfitPercentage: number;
    todaysExpense: number;
    monthlyExpense: number;
    assetInStore: number;
    assetInStoreValue: number;
    assetCost: number;
    currentValue: number;
}

export interface Medicine {
    id: string;
    srlNo: number;
    name: string;
    image?: string;
    description?: string;
    barcode: string;
    productCode: string;
    strength: string;
    manufacture: string;
    genericName: string;
    price: number;
    mrp?: number; // Maximum Retail Price
    profitMargin?: number; // Profit margin percentage
    rackNo: string; // Legacy: rack name (deprecated, use rackId instead)
    rackId?: number | string; // Foreign Key to Rack.id
    rack_id?: number | string; // Alternative FK field name (snake_case from backend)
    totalPurchase: number;
    totalSold: number;
    inStock: number;
    stockStatus: 'Low Stock' | 'Stock Alert' | 'Normal';
    expiryDate?: string;
    type?: 'Tablet' | 'Syrup' | 'Capsule' | 'Injection' | 'Suspension' | 'Cream' | 'Other';
    rackLocation?: string; // Legacy: rack location string
    batchId?: string;
    supplier?: string;
    purchaseDate?: string;
    buyingPrice?: number;
    packSize?: {
        strip: number;
        box: number;
    };
    packPrice?: {
        strip: number;
        box: number;
    };
    supplierContact?: string;
    eCommerceProduct?: boolean;
    stockAlert?: number;
    discount?: number;
    category?: string;
    vat?: number;
}

export interface CategoryGroup {
    category: string;
    medicines: Medicine[];
    count: number;
}

export interface Category {
    id: string;
    number: number;
    name: string;
    image?: string;
    status: 'Active' | 'Inactive';
}

export interface Subcategory {
    id: string;
    number: number;
    name: string;
    categoryName: string;
    image?: string;
    status: 'Active' | 'Inactive';
}

export interface ChildCategory {
    id: string;
    number: number;
    name: string;
    subcategory: string;
    image?: string;
    status: 'Active' | 'Inactive';
}

export interface MedicineType {
    id: string;
    number: number;
    title: string;
}

export interface BarcodeEntry {
    id: string;
    srlNo: number;
    date: string;
    ref: string;
    remarks: string;
}

export interface Package {
    id: string;
    number: number;
    packageTitle: string;
    price: number;
    status: 'Active' | 'Inactive';
}

export interface Follower {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
}

export interface Rack {
    id: number;
    name: string;
    name_en?: string;
}

// Response from /api/inventory/racks/medicines
export interface RackMedicine {
    id: number;
    srl_no: number;
    code: string;
    medicine_name: string;
    generic_name: string;
    strength: string;
    price: number;
    stock: number;
}

export interface RackWithMedicines {
    rack: {
        id: number;
        name: string;
        location: string;
    };
    medicines: RackMedicine[];
    total_medicines: number;
}

export interface RackMedicinesResponse {
    data: RackWithMedicines[];
    total_racks: number;
}

export interface GenericName {
    id: number;
    name: string;
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: Pagination;
}

// ============================================
// COMMON MODAL PROPS
// ============================================

export interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface CreateModalProps extends BaseModalProps {
    onSuccess: () => void;
}

export interface EditModalProps<T> extends BaseModalProps {
    item: T;
    onSuccess: () => void;
}

// ============================================
// FORM STATE TYPE
// ============================================

export type FormField<T> = {
    value: T;
    error?: string;
    touched?: boolean;
};

// ============================================
// API RESPONSE TYPE
// ============================================

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    success: boolean;
}

// ============================================
// CUSTOMER TYPES
// ============================================

export interface Customer {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    memberSince: string;
    avatar?: string;
}

export interface Supplier {
    id: string;
    name: string;
    company: string;
    phone: string;
    email?: string;
    address?: string;
    nid?: string;
    city?: string;
    state?: string;
    country?: string;
    status: 'Active' | 'Inactive';
    purchaseInvoiceCount: number;
}

// ============================================
// ASSET MANAGEMENT
// ============================================

export interface Asset {
    id: string;
    name: string;
    assetType: 'Operating Asset' | 'Tangible Fixed Asset' | 'Intangible Asset' | 'Capital Asset';
    assetCost: number;
    currentValue: number;
    salvageValue: number;
    usefulLife: number; // in months
    depreciationType: 'Monthly' | 'Yearly';
    depreciation: string; // e.g., "$31.50 Per Month"
    depreciationStatus: 'Yes' | 'No';
    rate: number; // depreciation rate
    status: 'Active' | 'Inactive';
    note?: string;
    image?: string;
    createdAt: string;
}

// ============================================
// SALES TYPES
// ============================================

export interface Sale {
    id: string; // Invoice ID
    customerName: string;
    date: string; // ISO date string
    itemsCount: number;
    totalAmount: number;
    paymentMethod: 'Cash' | 'Credit Card' | 'Debit Card' | 'Insurance' | 'Mobile Payment';
    status: 'Completed' | 'Pending' | 'Refunded' | 'Cancelled';
}

// ============================================
// PURCHASE/INVOICE TYPES
// ============================================

export interface InvoiceItem {
    id: number;
    name: string;
    strength: string;
    qty: number;
    unitPrice: number;
    tradePrice: number;
    discountPercent: number;
    total: number;
}

export interface Transaction {
    date: string;
    paymentMethod: string;
    account: string;
    amount: number;
    description: string;
}

export interface Invoice {
    id: string;
    purchaseDate: string;
    pharmaceuticalCompany: string;
    supplierName: string;
    supplierContact: string;
    supplierEmail?: string;
    items: InvoiceItem[];
    subtotal: number;
    totalAmount: number;
    paidAmount: number;
    dueAmount: number;
    status: 'Paid' | 'Due' | 'Partial' | 'Draft';
    transactions: Transaction[];
}

// ============================================
// RACK TYPES
// ============================================

export interface DummyMedicine {
    name: string;
    strength: string;
    manufacturer: string;
    type: 'Tablet' | 'Syrup' | 'Capsule' | 'Injection' | 'Suspension' | 'Cream';
    genericName: string;
    productCode: string;
    tradePrice: number;
    sellingPrice: number;
    wholesalePrice: number;
    inStock: number;
    purchaseDate: string;
    expiryDate: string;
    batchId: string;
    supplier: string;
}

export interface DummyRackCategory {
    id: number | string;
    title: string;
    medicines: DummyMedicine[];
    count: number;
    location?: string;
}

// ============================================
// DASHBOARD DATA TYPE
// ============================================

export interface DashboardData {
    summary: {
        todaysRevenue: { value: string; trend: string; trendDirection: 'up' | 'down' };
        todaysProfit: { value: string; trend: string; trendDirection: 'up' | 'down' };
        totalProducts: { value: string; trend: string; trendDirection: 'up' | 'down' };
        outOfStock: { value: string; status: string };
        expiringSoon: { value: string; days: number };
        pendingPayments: { value: string; count: number };
    };
    salesTrend: {
        labels: string[];
        data: number[];
    };
    stockDistribution: {
        labels: string[];
        data: number[];
        colors: string[];
    };
    expiryTimeline: {
        ranges: string[];
        counts: number[];
    };
    lowStockAlerts: Array<{ name: string; stock: number; status: string }>;
    topSellingItems: Array<{ name: string; price: number; sold: number; trend: string }>;
    slowMovingItems: Array<{ name: string; stock: number; sold: number }>;
    recentSales: Array<{ id: string; customerName: string; items: string; amount: number; time: string }>;
    purchaseOrders: Array<{ id: string; supplier: string; items: number; amount: number; status: string; date: string }>;
}

