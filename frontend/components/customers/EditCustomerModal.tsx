"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { User, Phone, Mail, MapPin, AlertTriangle, Save, Edit } from "lucide-react"
import { Customer } from "@/lib/types"
import { customerService } from "@/services/customerService"

interface EditCustomerModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: (updatedCustomer: Customer) => void
    customer: Customer | null
}

export function EditCustomerModal({ isOpen, onClose, onSuccess, customer }: EditCustomerModalProps) {
    const [formData, setFormData] = React.useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    })

    React.useEffect(() => {
        if (customer && isOpen) {
            setFormData({
                name: customer.name,
                phone: customer.phone,
                email: customer.email,
                address: customer.address
            })
        }
    }, [customer, isOpen])

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!customer) return

        // Validation
        if (!formData.name) {
            alert("Patient Name is required")
            return
        }

        try {
            const updatedCustomerRaw = {
                ...customer,
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                address: formData.address
            };
            const updated = await customerService.update(customer.id, updatedCustomerRaw);
            onSuccess(updated)
            onClose()
        } catch (error) {
            console.error(error);
            alert('Failed to update customer');
        }
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose} className="max-w-xl">
            <DialogHeader className="border-b border-slate-100 bg-slate-50/50">
                <DialogTitle className="flex items-center gap-2 text-xl">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <Edit size={20} />
                    </div>
                    Edit Customer
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
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="gap-2 shadow-lg shadow-blue-600/20">
                            <Save size={18} />
                            Save Changes
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
