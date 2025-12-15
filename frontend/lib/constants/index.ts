/**
 * Application Constants
 * Centralized constants to avoid magic numbers and strings
 */

export const APP_CONFIG = {
    NAME: 'PharmaCare',
    VERSION: '0.1.0',
    DEFAULT_LOCALE: 'en-US',
    DEFAULT_CURRENCY: 'BDT',
} as const;

export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
    MAX_PAGE_SIZE: 100,
} as const;

export const STOCK_LEVELS = {
    LOW_STOCK_THRESHOLD: 10,
    STOCK_ALERT_THRESHOLD: 20,
} as const;

export const VALIDATION = {
    MIN_PRODUCT_PRICE: 0.01,
    MAX_PRODUCT_NAME_LENGTH: 255,
    MAX_DESCRIPTION_LENGTH: 1000,
    MIN_PHONE_LENGTH: 10,
    MAX_PHONE_LENGTH: 15,
} as const;

export const DATE_FORMATS = {
    SHORT: 'MM/DD/YYYY',
    LONG: 'MMMM DD, YYYY',
    TIME: 'HH:mm',
    DATETIME: 'MM/DD/YYYY HH:mm',
} as const;

export const COLORS = {
    STATUS: {
        SUCCESS: 'green',
        WARNING: 'orange',
        DANGER: 'red',
        INFO: 'blue',
    },
    STOCK: {
        LOW: 'red',
        ALERT: 'orange',
        NORMAL: 'green',
    },
} as const;

export const ROUTES = {
    HOME: '/',
    DASHBOARD: '/',
    INVENTORY: '/inventory',
    CUSTOMERS: '/customers',
    SALES: '/sales',
    REPORTS: '/reports',
    MEDICINE_RACK: '/medicine-rack',
    PURCHASE_HISTORY: '/purchase-history',
    PROFIT_LOSS: '/profit-loss',
} as const;

export const MEDICINE_TYPES = {
    TABLET: 'Tablet',
    CAPSULE: 'Capsule',
    SYRUP: 'Syrup',
    INJECTION: 'Injection',
    SUSPENSION: 'Suspension',
    CREAM: 'Cream',
} as const;

export const STOCK_STATUS = {
    LOW_STOCK: 'Low Stock',
    STOCK_ALERT: 'Stock Alert',
    NORMAL: 'Normal',
} as const;

export const STATUS = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
} as const;
