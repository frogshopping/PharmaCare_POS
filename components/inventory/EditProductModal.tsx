"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { CreatableSelect } from "@/components/ui/CreatableSelect"
import { Package, Save, AlertCircle } from "lucide-react"
import { getRacks, getGenerics, Rack, GenericName } from "@/services/mockInventoryData"
import { Medicine } from "@/services/api"

interface EditProductModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: (updatedProduct: Partial<Medicine> & { id: string | number }) => void
    product: Medicine | null
}

export function EditProductModal({ isOpen, onClose, onSuccess, product }: EditProductModalProps) {
    const [loading, setLoading] = React.useState(false)
    const [racks, setRacks] = React.useState<Rack[]>([])
    const [generics, setGenerics] = React.useState<GenericName[]>([])

    // Form State
    const [formData, setFormData] = React.useState({
        productName: "",
        description: "",
        power: "",
        generic: "",
        rack: "",
        stock: 0,
        price: 0
    })

    React.useEffect(() => {
        if (isOpen) {
            setLoading(true)
            Promise.all([getRacks(), getGenerics()])
                .then(([racksData, genericsData]) => {
                    setRacks(racksData)
                    setGenerics(genericsData)
                })
                .finally(() => setLoading(false))
        }
    }, [isOpen])

    React.useEffect(() => {
        if (product && isOpen) {
            setFormData({
                productName: product.name,
                description: product.description || "",
                power: product.strength || "",
                generic: product.genericName,
                rack: "", // In a real scenario, this would come from the product object
                stock: product.inStock,
                price: product.price
            })
        }
    }, [product, isOpen])

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate
        if (!formData.productName || !formData.price) {
            alert("Please fill in required fields")
            return
        }

        // Return updated data
        onSuccess({
            id: product?.id || 0,
            name: formData.productName,
            description: formData.description,
            strength: formData.power,
            genericName: formData.generic,
            // rack: formData.rack, // handle rack logic
            inStock: formData.stock,
            price: formData.price
        })

        onClose()
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
                    Edit Product
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
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Current Stock</label>
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
