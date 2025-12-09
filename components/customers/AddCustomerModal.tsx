"use client"

import * as React from "react"
import { FormModal } from "@/components/ui/FormModal"
import { FormField } from "@/components/ui/FormField"
import { Input } from "@/components/ui/Input"
import { UserPlus, User, Phone, Mail, MapPin, AlertTriangle } from "lucide-react"
import { useFormState } from "@/lib/hooks/useFormState"
import { CreateModalProps } from "@/lib/types"

export function AddCustomerModal({ isOpen, onClose, onSuccess }: CreateModalProps) {
    const { formData, handleChange, handleReset, isSubmitting, setSubmitting } = useFormState({
        name: "",
        phone: "",
        email: "",
        address: "",
        allergies: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name) {
            alert("Patient Name is required")
            return
        }

        setSubmitting(true)

        try {
            console.log("Submitting Customer:", {
                ...formData,
                allergies: formData.allergies.split(',').map((s: string) => s.trim()).filter(Boolean)
            })

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500))

            onSuccess()
            onClose()
            handleReset()
        } catch (error) {
            console.error("Failed to create customer:", error)
            alert("Failed to create customer. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Add New Customer"
            icon={UserPlus}
            submitText="Save Customer"
            isSubmitting={isSubmitting}
            maxWidth="max-w-xl"
        >
            <div className="space-y-4">
                <FormField label="Full Name" required>
                    <Input
                        icon={<User size={18} />}
                        placeholder="e.g. John Smith"
                        value={formData.name}
                        onChange={e => handleChange('name', e.target.value)}
                        required
                    />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                    <FormField label="Phone Number">
                        <Input
                            icon={<Phone size={18} />}
                            placeholder="+1 555 000-0000"
                            value={formData.phone}
                            onChange={e => handleChange('phone', e.target.value)}
                        />
                    </FormField>

                    <FormField label="Email Address">
                        <Input
                            icon={<Mail size={18} />}
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={e => handleChange('email', e.target.value)}
                        />
                    </FormField>
                </div>

                <FormField label="Address">
                    <Input
                        icon={<MapPin size={18} />}
                        placeholder="Street address, City..."
                        value={formData.address}
                        onChange={e => handleChange('address', e.target.value)}
                    />
                </FormField>

                {/* Medical Info Section */}
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <h4 className="text-sm font-bold text-orange-800 mb-2 flex items-center gap-2">
                        <AlertTriangle size={16} />
                        Medical Alert
                    </h4>
                    <FormField
                        label="Known Allergies"
                        hint="Important for drug interaction checks."
                    >
                        <Input
                            placeholder="e.g. Penicillin, Peanuts (comma separated)"
                            value={formData.allergies}
                            onChange={e => handleChange('allergies', e.target.value)}
                            className="bg-white"
                        />
                    </FormField>
                </div>
            </div>
        </FormModal>
    )
}
