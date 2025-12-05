"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { UserPlus, User, Phone, Mail, MapPin, AlertTriangle, Save } from "lucide-react"

interface AddCustomerModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export function AddCustomerModal({ isOpen, onClose, onSuccess }: AddCustomerModalProps) {
    const [formData, setFormData] = React.useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        allergies: ""
    })

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validation
        if (!formData.name) {
            alert("Patient Name is required")
            return
        }

        console.log("Submitting Customer:", {
            ...formData,
            allergies: formData.allergies.split(',').map(s => s.trim()).filter(Boolean)
        })

        // Simulate API call
        onSuccess()
        onClose()

        // Reset
        setFormData({
            name: "",
            phone: "",
            email: "",
            address: "",
            allergies: ""
        })
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose} className="max-w-xl">
            <DialogHeader className="border-b border-slate-100 bg-slate-50/50">
                <DialogTitle className="flex items-center gap-2 text-xl">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <UserPlus size={20} />
                    </div>
                    Add New Customer
                </DialogTitle>
            </DialogHeader>

            <DialogContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full Name <span className="text-red-500">*</span></label>
                            <Input
                                icon={<User size={18} />}
                                placeholder="e.g. John Smith"
                                value={formData.name}
                                onChange={e => handleChange('name', e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Phone Number</label>
                                <Input
                                    icon={<Phone size={18} />}
                                    placeholder="+1 555 000-0000"
                                    value={formData.phone}
                                    onChange={e => handleChange('phone', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email Address</label>
                                <Input
                                    icon={<Mail size={18} />}
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={e => handleChange('email', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Address</label>
                            <Input
                                icon={<MapPin size={18} />}
                                placeholder="Street address, City..."
                                value={formData.address}
                                onChange={e => handleChange('address', e.target.value)}
                            />
                        </div>

                        {/* Medical Info Section - Added for better UX/Medical Context */}
                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                            <h4 className="text-sm font-bold text-orange-800 mb-2 flex items-center gap-2">
                                <AlertTriangle size={16} />
                                Medical Alert
                            </h4>
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Known Allergies</label>
                            <Input
                                placeholder="e.g. Penicillin, Peanuts (comma separated)"
                                value={formData.allergies}
                                onChange={e => handleChange('allergies', e.target.value)}
                                className="bg-white"
                            />
                            <p className="text-xs text-slate-500 mt-1">Important for drug interaction checks.</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="gap-2 shadow-lg shadow-blue-600/20">
                            <Save size={18} />
                            Save Customer
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
