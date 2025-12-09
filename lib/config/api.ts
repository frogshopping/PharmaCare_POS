'use client';

/**
 * API Configuration
 * Centralized API configuration and constants
 */

export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
} as const;

export const API_ENDPOINTS = {
    // Dashboard
    DASHBOARD_STATS: '/dashboard/stats',

    // Inventory
    MEDICINES: '/inventory/medicines',
    MEDICINE_BY_ID: (id: string) => `/inventory/medicines/${id}`,
    RACKS: '/inventory/racks',
    GENERICS: '/inventory/generics',
    CATEGORIES: '/catalog/categories',
    SUBCATEGORIES: '/catalog/subcategories',
    CHILD_CATEGORIES: '/catalog/child-categories',

    // Customers
    CUSTOMERS: '/customers',
    CUSTOMER_BY_ID: (id: string) => `/customers/${id}`,

    // Sales
    SALES: '/sales',
    RECENT_SALES: '/sales/recent',

    // Purchase
    PURCHASES: '/purchases',
    PURCHASE_ORDERS: '/purchases/orders',

    // Reports
    REPORTS_PROFIT: '/reports/profit',
    REPORTS_SALES: '/reports/sales',
} as const;
