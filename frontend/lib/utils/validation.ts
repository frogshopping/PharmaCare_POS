/**
 * Validation utility functions
 * Centralized validation logic for forms
 */

export const validators = {
    required: (value: any, fieldName: string = 'This field') => {
        if (!value || (typeof value === 'string' && !value.trim())) {
            return `${fieldName} is required`;
        }
        return null;
    },

    email: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            return 'Invalid email address';
        }
        return null;
    },

    phone: (value: string) => {
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
        if (value && !phoneRegex.test(value)) {
            return 'Invalid phone number';
        }
        return null;
    },

    minValue: (value: number, min: number, fieldName: string = 'Value') => {
        if (value < min) {
            return `${fieldName} must be at least ${min}`;
        }
        return null;
    },

    maxLength: (value: string, max: number, fieldName: string = 'Field') => {
        if (value && value.length > max) {
            return `${fieldName} cannot exceed ${max} characters`;
        }
        return null;
    },
};

/**
 * Validate multiple fields at once
 */
export function validateForm<T extends Record<string, any>>(
    formData: T,
    rules: Partial<Record<keyof T, ((value: any) => string | null)[]>>
): Record<keyof T, string | null> {
    const errors = {} as Record<keyof T, string | null>;

    for (const field in rules) {
        const fieldRules = rules[field];
        if (fieldRules) {
            for (const rule of fieldRules) {
                const error = rule(formData[field]);
                if (error) {
                    errors[field] = error;
                    break; // Stop at first error for this field
                }
            }
        }
    }

    return errors;
}
