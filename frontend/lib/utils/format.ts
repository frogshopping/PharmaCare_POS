/**
 * Formatting utility functions
 * Centralized formatting logic for consistent display
 */

/**
 * Format currency values
 */
export function formatCurrency(
    value: number,
    currency: string = 'BDT',
    showSymbol: boolean = true
): string {
    const formatted = value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return showSymbol ? `${currency} ${formatted}` : formatted;
}

/**
 * Format date strings
 */
export function formatDate(
    date: string | Date,
    format: 'short' | 'long' | 'time' = 'short'
): string {
    const d = typeof date === 'string' ? new Date(date) : date;

    if (format === 'time') {
        return d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    if (format === 'long') {
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

/**
 * Format phone numbers
 */
export function formatPhone(phone: string): string {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Format based on length
    if (cleaned.length === 11) {
        return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
    }

    return phone;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
    return `${value.toFixed(decimals)}%`;
}

/**
 * Format stock status with color
 */
export function getStockStatusClass(status: 'Low Stock' | 'Stock Alert' | 'Normal'): string {
    const statusMap = {
        'Low Stock': 'text-red-600 bg-red-50',
        'Stock Alert': 'text-orange-600 bg-orange-50',
        'Normal': 'text-green-600 bg-green-50',
    };

    return statusMap[status] || 'text-gray-600 bg-gray-50';
}
