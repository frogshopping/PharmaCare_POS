'use client';

import { useState, useCallback } from 'react';

/**
 * Custom hook for managing form state
 * Reduces boilerplate code in form components
 */
export function useFormState<T extends Record<string, any>>(initialState: T) {
    const [formData, setFormData] = useState<T>(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback((field: keyof T, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleReset = useCallback(() => {
        setFormData(initialState);
    }, [initialState]);

    const setSubmitting = useCallback((value: boolean) => {
        setIsSubmitting(value);
    }, []);

    return {
        formData,
        setFormData,
        handleChange,
        handleReset,
        isSubmitting,
        setSubmitting,
    };
}
