"use client"

import * as React from "react"
import { Search, Plus, Minus, Trash2, ScanBarcode, User } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Medicine, getMedicines } from "@/services/api"

interface Item {
    medicineId: string
    name: string
    price: number
    quantity: number
    stock: number
    manufacturer: string
}

interface POSModalProps {
    isOpen: boolean
    onClose: () => void
}

export function POSModal({ isOpen, onClose }: POSModalProps) {
    const [items, setItems] = React.useState<Item[]>([])
    const [medicines, setMedicines] = React.useState<Medicine[]>([])
    const [searchTerm, setSearchTerm] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState<string>("All Categories")
    const [customer, setCustomer] = React.useState("")

    React.useEffect(() => {
        // Load meds for POS grid
        getMedicines().then(setMedicines)
    }, [])

    const filteredMedicines = React.useMemo(() => {
        return medicines.filter((m) =>
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.barcode.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [medicines, searchTerm])

    const addToCart = (medicine: Medicine) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.medicineId === medicine.id)
            if (existing) {
                if (existing.quantity >= medicine.inStock) return prev // Stock check limit
                return prev.map((i) =>
                    i.medicineId === medicine.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [
                ...prev,
                {
                    medicineId: medicine.id,
                    name: medicine.name,
                    price: medicine.price,
                    quantity: 1,
                    stock: medicine.inStock,
                    manufacturer: medicine.manufacture
                },
            ]
        })
    }

    const updateQuantity = (id: string, delta: number) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.medicineId === id) {
                    const newQty = Math.max(1, Math.min(item.quantity + delta, item.stock))
                    return { ...item, quantity: newQty }
                }
                return item
            })
        )
    }

    const updatePrice = (id: string, newPrice: number) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.medicineId === id) {
                    return { ...item, price: newPrice }
                }
                return item
            })
        )
    }

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((i) => i.medicineId !== id))
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.08 // 8% tax example
    const total = subtotal + tax

    return (
        <Dialog isOpen={isOpen} onClose={onClose} className="max-w-7xl h-[90vh] flex flex-col p-0 overflow-hidden">
            <div className="flex flex-1 h-full overflow-hidden">

                {/* LEFT COLUMN: Product Selection */}
                <div className="flex-1 bg-slate-50 flex flex-col border-r border-slate-200">
                    {/* Header & Search */}
                    <div className="p-6 pb-4 bg-white border-b border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                <ScanBarcode size={18} />
                            </span>
                            Point of Sale
                        </h2>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <Input
                                    icon={<Search size={18} />}
                                    placeholder="Search medicines by name or barcode..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-slate-50 border-slate-200"
                                />
                            </div>
                            <Button variant="outline" className="gap-2">
                                <ScanBarcode size={18} />
                                Scan
                            </Button>
                        </div>
                        {/* Categories pills if needed in future */}
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredMedicines.map((medicine) => (
                                <div
                                    key={medicine.id}
                                    onClick={() => addToCart(medicine)}
                                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-blue-600">{medicine.name}</h4>
                                            <p className="text-xs text-slate-500">{medicine.manufacture}</p>
                                        </div>
                                        <Badge variant={medicine.inStock < 50 ? "danger" : "secondary"} className="text-[10px] h-5 px-1.5">
                                            Rx
                                        </Badge>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-lg font-bold text-slate-900">${medicine.price.toFixed(2)}</span>
                                        <span className={`text-xs font-medium ${medicine.inStock === 0 ? "text-red-500" : "text-slate-400"}`}>
                                            Stock: {medicine.inStock}
                                        </span>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 bg-blue-600 text-white py-2 text-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        Add to Cart
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Cart */}
                <div className="w-[400px] bg-white flex flex-col h-full shadow-xl z-10">
                    {/* Customer Select */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Customer</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <select
                                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    value={customer}
                                    onChange={(e) => setCustomer(e.target.value)}
                                >
                                    <option value="">Select Customer</option>
                                    <option value="walk-in">Walk-in Customer</option>
                                    <option value="john">John Doe</option>
                                </select>
                            </div>
                            <Button variant="outline" size="icon" className="shrink-0 bg-white">
                                <Plus size={16} />
                            </Button>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                                <ScanBarcode size={48} className="mb-4" />
                                <p>Cart is empty</p>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.medicineId} className="bg-slate-50 p-3 rounded-xl border border-slate-100 group hover:border-blue-200 transition-colors">
                                    <div className="flex justify-between mb-2">
                                        <h4 className="font-semibold text-slate-800 text-sm">{item.name}</h4>
                                        <button onClick={() => removeItem(item.medicineId)} className="text-slate-400 hover:text-red-500 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5">
                                            <button
                                                onClick={() => updateQuantity(item.medicineId, -1)}
                                                className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.medicineId, 1)}
                                                className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
                                                disabled={item.quantity >= item.stock}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-slate-400">$</span>
                                            <input
                                                type="number"
                                                value={item.price}
                                                onChange={(e) => updatePrice(item.medicineId, parseFloat(e.target.value))}
                                                className="w-16 bg-transparent text-right font-bold text-slate-800 focus:outline-none border-b border-transparent focus:border-blue-500 hover:border-slate-300 transition-all text-sm py-0.5"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer Totals */}
                    <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
                        <div className="flex justify-between text-sm text-slate-600">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-600">
                            <span>Tax (8%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t border-slate-200">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <Button variant="outline" onClick={() => setItems([])} disabled={items.length === 0} className="border-slate-300 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50">
                                Clear Cart
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20" disabled={items.length === 0}>
                                Pay Now
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </Dialog>
    )
}
