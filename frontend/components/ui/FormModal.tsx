"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { LucideIcon } from "lucide-react"

/**
 * Reusable Form Modal Component
 * Reduces duplication across add/edit modals
 */

interface FormModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (e: React.FormEvent) => void
    title: string
    icon?: LucideIcon
    iconBgColor?: string
    submitText?: string
    isSubmitting?: boolean
    children: React.ReactNode
    maxWidth?: string
}

export function FormModal({
    isOpen,
    onClose,
    onSubmit,
    title,
    icon: Icon,
    iconBgColor = "bg-blue-600",
    submitText = "Save",
    isSubmitting = false,
    children,
    maxWidth = "max-w-2xl",
}: FormModalProps) {
    return (
        <Dialog isOpen={isOpen} onClose={onClose} className={maxWidth}>
            <DialogHeader className="border-b border-slate-100 bg-slate-50/50">
                <DialogTitle className="flex items-center gap-2 text-xl">
                    {Icon && (
                        <div className={`${iconBgColor} p-2 rounded-lg text-white`}>
                            <Icon size={20} />
                        </div>
                    )}
                    {title}
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={onSubmit} className="flex flex-col flex-1 overflow-hidden">
                {/* Scrollable Content Area */}
                <DialogContent className="space-y-6">
                    {children}
                </DialogContent>

                {/* Sticky Footer with Buttons */}
                <div className="flex justify-end gap-3 p-6 pt-4 border-t border-slate-100 bg-white shrink-0">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="gap-2 shadow-lg shadow-blue-600/20"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Saving...
                            </>
                        ) : (
                            submitText
                        )}
                    </Button>
                </div>
            </form>
        </Dialog>
    )
}

