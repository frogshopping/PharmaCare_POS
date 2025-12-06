"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { CreatableSelect } from "@/components/ui/CreatableSelect"
import { Plus, Package, Save, AlertCircle } from "lucide-react"
import { getRacks, getGenerics, Rack, GenericName, createMedicine } from "@/services/api"

interface AddProductModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
    const [loading, setLoading] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [racks, setRacks] = React.useState<Rack[]>([])
    const [generics, setGenerics] = React.useState<GenericName[]>([])

    // Form State
    const [formData, setFormData] = React.useState({
        productName: "",
        description: "",
        power: "",
        generic: "",
        manufacture: "",
        rack: "",
        stock: 0,
        price: 0
    })

    // ... useEffect for racks/generics

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.productName || !formData.price) {
            alert("Please fill in required fields: Product Name and Price")
            return
        }

        setIsSubmitting(true)

        try {
            await createMedicine({
                name: formData.productName,
                description: formData.description,
                strength: formData.power,
                genericName: formData.generic,
                manufacture: formData.manufacture || "Unknown", // Handle missing field
                rackNo: formData.rack,
                inStock: formData.stock,
                price: formData.price,
                // Default values for required fields not in form
                srlNo: 0,
                barcode: "N/A",
                productCode: "N/A",
                totalPurchase: 0,
                totalSold: 0,
                stockStatus: formData.stock > 0 ? 'Normal' : 'Stock Alert'

            })

            onSuccess()
            onClose()

            // Reset form
            setFormData({
                productName: "",
                description: "",
                power: "",
                generic: "",
                manufacture: "",
                rack: "",
                stock: 0,
                price: 0
            })
        } catch (error) {
            console.error("Failed to create product:", error)
            alert("Failed to create product. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }


    const handleCreateRack = (name: string) => {
        const newRack = { id: Date.now(), name }
        setRacks(prev => [...prev, newRack])
        setFormData(prev => ({ ...prev, rack: name }))
    }

    const handleCreateGeneric = (name: string) => {
        const newGeneric = { id: Date.now(), name }
        setGenerics(prev => [...prev, newGeneric])
        setFormData(prev => ({ ...prev, generic: name }))
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose} className="max-w-2xl">
            <DialogHeader className="border-b border-slate-100 bg-slate-50/50">
                <DialogTitle className="flex items-center gap-2 text-xl">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <Package size={20} />
                    </div>
                    Add New Product
                </DialogTitle>
            </DialogHeader>

            <DialogContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Product Name <span className="text-red-500">*</span></label>
                            <Input
                                placeholder="e.g. Paracetamol 500mg"
                                value={formData.productName}
                                onChange={e => handleChange('productName', e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Manufacturer</label>
                            <Input
                                placeholder="e.g. Square Pharmaceuticals"
                                value={formData.manufacture}
                                onChange={e => handleChange('manufacture', e.target.value)}
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Description</label>
                            <textarea
                                className="w-full min-h-[80px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm resize-none"
                                placeholder="Product details and usage..."
                                value={formData.description}
                                onChange={e => handleChange('description', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Power / Strength</label>
                            <Input
                                placeholder="e.g. 500mg"
                                value={formData.power}
                                onChange={e => handleChange('power', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Price <span className="text-red-500">*</span></label>
                            <Input
                                type="number"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                value={formData.price || ''}
                                onChange={e => handleChange('price', parseFloat(e.target.value))}
                                required
                            />
                        </div>
                    </div>

                    {/* Classification */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                                <AlertCircle size={16} className="text-blue-500" />
                                Classification & Storage
                            </h4>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Generic Name</label>
                            <CreatableSelect
                                options={generics}
                                value={formData.generic}
                                onChange={opt => handleChange('generic', opt.name)}
                                onCreate={handleCreateGeneric}
                                placeholder="Select generic..."
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Rack / Location</label>
                            <CreatableSelect
                                options={racks}
                                value={formData.rack}
                                onChange={opt => handleChange('rack', opt.name)}
                                onCreate={handleCreateRack}
                                placeholder="Select rack..."
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Initial Stock</label>
                            <Input
                                type="number"
                                placeholder="0"
                                min="0"
                                value={formData.stock || ''}
                                onChange={e => handleChange('stock', parseInt(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" className="gap-2 shadow-lg shadow-blue-600/20" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                                <Save size={18} />
                            )}
                            {isSubmitting ? 'Saving...' : 'Save Product'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
