"use client"

import * as React from "react"

/**
 * Loading Spinner Component
 * Standardized loading state across the app
 */

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    text?: string
    className?: string
}

export function LoadingSpinner({
    size = 'md',
    text,
    className = ''
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-12 w-12',
        lg: 'h-16 w-16'
    }

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <div className={`animate-spin rounded-full border-b-2 border-blue-500 ${sizeClasses[size]}`}></div>
            {text && (
                <p className="text-slate-600 text-sm mt-4">{text}</p>
            )}
        </div>
    )
}
