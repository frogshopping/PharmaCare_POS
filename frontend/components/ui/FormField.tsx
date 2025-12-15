"use client"

import * as React from "react"

/**
 * Reusable Form Field Component
 * Standardizes form input styling and labels
 */

interface FormFieldProps {
    label: string
    required?: boolean
    error?: string
    hint?: string
    children: React.ReactNode
    className?: string
}

export function FormField({
    label,
    required = false,
    error,
    hint,
    children,
    className = "",
}: FormFieldProps) {
    return (
        <div className={className}>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {children}
            {error && (
                <p className="text-xs text-red-600 mt-1">{error}</p>
            )}
            {hint && !error && (
                <p className="text-xs text-slate-500 mt-1">{hint}</p>
            )}
        </div>
    )
}
