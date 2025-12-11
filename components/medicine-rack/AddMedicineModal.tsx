'use client';

import React, { useState } from 'react';
import { Medicine } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X } from 'lucide-react';

interface AddMedicineModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (medicine: Partial<Medicine>) => void;
}

export default function AddMedicineModal({ isOpen, onClose, onSave }: AddMedicineModalProps) {
    const [formData, setFormData] = useState<Partial<Medicine>>({
        name: '',
        genericName: '',
        strength: '',
        type: 'Tablet',
        manufacture: '',
        productCode: '',
        barcode: '',
        price: 0,
        buyingPrice: 0,
        mrp: 0,
        inStock: 0,
        rackNo: '',
        supplier: '',
        batchId: '',
        expiryDate: '',
        purchaseDate: '',
        totalPurchase: 0,
        totalSold: 0,
    });

    const handleChange = (field: keyof Medicine, value: any) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };
            // Auto-calculate profit margin when prices change
            if (field === 'price' || field === 'buyingPrice') {
                const buyingPrice = field === 'buyingPrice' ? value : (prev.buyingPrice || 0);
                const sellingPrice = field === 'price' ? value : (prev.price || 0);
                if (buyingPrice > 0) {
                    updated.profitMargin = ((sellingPrice - buyingPrice) / buyingPrice) * 100;
                } else {
                    updated.profitMargin = 0;
                }
            }
            return updated;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
        // Reset form
        setFormData({
            name: '',
            genericName: '',
            strength: '',
            type: 'Tablet',
            manufacture: '',
            productCode: '',
            barcode: '',
            price: 0,
            buyingPrice: 0,
            mrp: 0,
            inStock: 0,
            rackNo: '',
            supplier: '',
            batchId: '',
            expiryDate: '',
            purchaseDate: '',
            totalPurchase: 0,
            totalSold: 0,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-blue-600 px-6 py-4 flex items-center justify-between border-b z-10">
                    <h2 className="text-lg font-bold text-white">Add New Medicine</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-slate-200 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Column 1 - Basic Info */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-slate-700 text-sm border-b pb-2">Basic Information</h3>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Medicine Name *</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    required
                                    placeholder="e.g. Napa"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Generic Name</label>
                                <Input
                                    value={formData.genericName}
                                    onChange={(e) => handleChange('genericName', e.target.value)}
                                    placeholder="e.g. Paracetamol"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Strength</label>
                                <Input
                                    value={formData.strength}
                                    onChange={(e) => handleChange('strength', e.target.value)}
                                    placeholder="e.g. 500mg"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => handleChange('type', e.target.value)}
                                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="Tablet">Tablet</option>
                                    <option value="Capsule">Capsule</option>
                                    <option value="Syrup">Syrup</option>
                                    <option value="Injection">Injection</option>
                                    <option value="Cream">Cream</option>
                                    <option value="Drops">Drops</option>
                                    <option value="Inhaler">Inhaler</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Manufacturer</label>
                                <Input
                                    value={formData.manufacture}
                                    onChange={(e) => handleChange('manufacture', e.target.value)}
                                    placeholder="e.g. Beximco Pharmaceuticals"
                                />
                            </div>
                        </div>

                        {/* Column 2 - Codes & Pricing */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-slate-700 text-sm border-b pb-2">Codes & Pricing</h3>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Product Code</label>
                                <Input
                                    value={formData.productCode}
                                    onChange={(e) => handleChange('productCode', e.target.value)}
                                    placeholder="e.g. MED-001"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Barcode</label>
                                <Input
                                    value={formData.barcode}
                                    onChange={(e) => handleChange('barcode', e.target.value)}
                                    placeholder="e.g. 8901234567890"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Buying Price (TP) *</label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={formData.buyingPrice}
                                    onChange={(e) => handleChange('buyingPrice', parseFloat(e.target.value))}
                                    required
                                    placeholder="0.00"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Selling Price *</label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                                    required
                                    placeholder="0.00"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">MRP</label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={formData.mrp}
                                    onChange={(e) => handleChange('mrp', parseFloat(e.target.value))}
                                    placeholder="0.00"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Profit Margin</label>
                                <Input
                                    type="text"
                                    value={formData.profitMargin ? `${formData.profitMargin.toFixed(2)}%` : '0.00%'}
                                    readOnly
                                    className="bg-slate-50 text-slate-600 font-semibold"
                                    placeholder="Auto-calculated"
                                />
                            </div>
                        </div>

                        {/* Column 3 - Stock & Location */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-slate-700 text-sm border-b pb-2">Stock & Location</h3>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Initial Stock *</label>
                                <Input
                                    type="number"
                                    value={formData.inStock}
                                    onChange={(e) => handleChange('inStock', parseInt(e.target.value))}
                                    required
                                    placeholder="0"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Rack No.</label>
                                <Input
                                    value={formData.rackNo}
                                    onChange={(e) => handleChange('rackNo', e.target.value)}
                                    placeholder="e.g. A-12"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Supplier</label>
                                <Input
                                    value={formData.supplier}
                                    onChange={(e) => handleChange('supplier', e.target.value)}
                                    placeholder="Supplier name"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Batch ID</label>
                                <Input
                                    value={formData.batchId}
                                    onChange={(e) => handleChange('batchId', e.target.value)}
                                    placeholder="e.g. BATCH-2024-001"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Expiry Date</label>
                                <Input
                                    type="date"
                                    value={formData.expiryDate}
                                    onChange={(e) => handleChange('expiryDate', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Purchase Date</label>
                                <Input
                                    type="date"
                                    value={formData.purchaseDate}
                                    onChange={(e) => handleChange('purchaseDate', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-end gap-3 border-t pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Add Medicine
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
