"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

interface DialogProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
}

export function Dialog({ isOpen, onClose, children, className }: DialogProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Dialog Content */}
            <div
                className={cn(
                    "relative z-50 w-full max-w-lg rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200",
                    className
                )}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 transition-colors"
                >
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>
    )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("flex flex-col space-y-1.5 p-6 pb-2", className)}
            {...props}
        />
    )
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn("text-xl font-bold leading-none tracking-tight text-slate-900", className)}
            {...props}
        />
    )
}

export function DialogContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("p-6 pt-2", className)} {...props} />
    )
}
