'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import {
    Package, Hash, Truck, Building2, Phone, CalendarCheck, Tag, Percent, ShoppingBag
} from 'lucide-react';
import { Medicine } from '@/lib/types';
import { DummyMedicine } from '@/services/rackDummyData';

// Type that can accept both Medicine and DummyMedicine
type MedicineData = Medicine | DummyMedicine;

interface MedicineDetailsModalProps {
    medicine: MedicineData;
    onClose: () => void;
}

// Helper to normalize data from both types
function normalizeData(med: MedicineData) {
    // Check if it's a Medicine type (has 'id' property which DummyMedicine doesn't have)
    const isMedicineType = 'id' in med;

    return {
        name: med.name,
        type: med.type || 'Tablet',
        strength: med.strength || 'N/A',
        manufacturer: isMedicineType ? (med as Medicine).manufacture : (med as DummyMedicine).manufacturer,
        genericName: med.genericName || 'N/A',
        productCode: med.productCode || 'N/A',
        barcode: isMedicineType ? (med as Medicine).barcode : undefined,
        description: isMedicineType ? (med as Medicine).description : undefined,

        // Pricing
        buyingPrice: isMedicineType ? (med as Medicine).buyingPrice : (med as DummyMedicine).tradePrice,
        sellingPrice: isMedicineType ? (med as Medicine).price : (med as DummyMedicine).sellingPrice,
        mrp: isMedicineType ? (med as Medicine).mrp : undefined,
        discount: isMedicineType ? (med as Medicine).discount : undefined,
        wholesalePrice: !isMedicineType ? (med as DummyMedicine).wholesalePrice : undefined,

        // Stock
        inStock: med.inStock,
        rackLocation: isMedicineType ? ((med as Medicine).rackLocation || (med as Medicine).rackNo) : undefined,

        // Packaging
        packSize: isMedicineType ? (med as Medicine).packSize : undefined,
        packPrice: isMedicineType ? (med as Medicine).packPrice : undefined,

        // Supplier & Batch
        supplier: med.supplier || 'N/A',
        supplierContact: isMedicineType ? (med as Medicine).supplierContact : undefined,
        batchId: med.batchId || '---',
        expiryDate: med.expiryDate || 'N/A',
        purchaseDate: med.purchaseDate,
    };
}

const MedicineDetailsModal: React.FC<MedicineDetailsModalProps> = ({ medicine, onClose }) => {
    if (!medicine) return null;

    const data = normalizeData(medicine);

    // Helper to calculate status color
    const getStatusColor = (stock: number) => {
        if (stock === 0) return 'text-red-600 bg-red-50 border-red-200';
        if (stock < 20) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    };

    const isExpired = data.expiryDate !== 'N/A' ? new Date(data.expiryDate) < new Date() : false;

    // Detect if product needs packaging display
    const needsPackaging = data.type === 'Tablet' || data.type === 'Capsule';

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="absolute inset-0 z-0 bg-transparent" onClick={onClose}></div>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden animate-in zoom-in-95 z-10 max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50 sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            Product: {data.name}
                            <span className="text-sm font-normal text-slate-500">({data.type})</span>
                            <span className="text-sm font-normal text-slate-400">- {data.strength}</span>
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">{data.manufacturer}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-200 rounded-full h-8 w-8 text-slate-400">
                        <span className="text-xl leading-none">&times;</span>
                    </Button>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left Column: Basic Info & Pricing */}
                    <div className="space-y-6">
                        {/* Product Information */}
                        <div className="space-y-3">
                            <InfoRow label="Drug" value={data.name} highlight />
                            <InfoRow label="Type" value={data.type} />
                            <InfoRow label="Strength" value={data.strength} />
                            <InfoRow label="Mnf." value={data.manufacturer} />
                            <InfoRow label="Gen. Name" value={data.genericName} />
                            <InfoRow label="Product code" value={data.productCode} mono />
                            {data.barcode && <InfoRow label="Barcode" value={data.barcode} mono />}
                            {data.description && (
                                <div className="pt-2">
                                    <span className="text-sm font-medium text-slate-500">Description:</span>
                                    <p className="text-sm text-slate-700 mt-1">{data.description}</p>
                                </div>
                            )}
                        </div>

                        {/* Pricing Info */}
                        <div className="pt-4 border-t border-slate-100 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500 flex items-center gap-1">
                                    <ShoppingBag size={14} /> Trade Price:
                                </span>
                                <span className="text-sm font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                    {data.buyingPrice?.toFixed(2) || '0.00'} BDT
                                </span>
                            </div>
                            {data.mrp && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500 flex items-center gap-1">
                                        <Tag size={14} /> MRP:
                                    </span>
                                    <span className="text-sm font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                        {data.mrp.toFixed(2)} BDT
                                    </span>
                                </div>
                            )}
                            {data.discount && data.discount > 0 && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500 flex items-center gap-1">
                                        <Percent size={14} /> Discount:
                                    </span>
                                    <span className="text-sm font-medium bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                                        {data.discount}%
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-slate-700">Selling Price:</span>
                                <span className="text-sm font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                                    {data.sellingPrice?.toFixed(2) || '0.00'} BDT
                                </span>
                            </div>
                            {data.wholesalePrice && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">Wholesale Price:</span>
                                    <span className="text-sm font-medium text-slate-600">
                                        {data.wholesalePrice.toFixed(2)} BDT
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Stock Info */}
                        <div className="pt-4 border-t border-slate-100 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500">In Stock:</span>
                                <span className={`text-sm font-bold px-2 py-0.5 rounded border ${getStatusColor(data.inStock)}`}>
                                    {data.inStock} units
                                </span>
                            </div>
                            {data.rackLocation && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">Rack:</span>
                                    <span className="text-sm font-medium text-slate-700">{data.rackLocation}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Price Details Table & Supplier */}
                    <div className="space-y-8">

                        {/* Price Details Table */}
                        {needsPackaging && data.packSize && (
                            <div>
                                <h3 className="text-lg font-medium text-slate-700 mb-4 flex items-center gap-2">
                                    <Package size={18} /> Price details
                                </h3>
                                <div className="border border-slate-200 rounded-lg overflow-hidden">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                                            <tr>
                                                <th className="px-4 py-3 font-semibold">Unit type</th>
                                                <th className="px-4 py-3 font-semibold text-center">Qty.</th>
                                                <th className="px-4 py-3 font-semibold text-right">Price(BDT)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            <tr>
                                                <td className="px-4 py-3 text-slate-700">Unit</td>
                                                <td className="px-4 py-3 text-center text-slate-600">1</td>
                                                <td className="px-4 py-3 text-right font-medium text-slate-800">
                                                    {data.sellingPrice?.toFixed(2) || '0.00'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-slate-700">Strip</td>
                                                <td className="px-4 py-3 text-center text-slate-600">{data.packSize.strip}</td>
                                                <td className="px-4 py-3 text-right font-medium text-slate-800">
                                                    {data.packPrice?.strip?.toFixed(2) || ((data.sellingPrice || 0) * data.packSize.strip).toFixed(2)}
                                                </td>
                                            </tr>
                                            {data.packSize.box > 0 && (
                                                <tr>
                                                    <td className="px-4 py-3 text-slate-700">Box</td>
                                                    <td className="px-4 py-3 text-center text-slate-600">
                                                        {data.packSize.strip * data.packSize.box}
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-medium text-slate-800">
                                                        {data.packPrice?.box?.toFixed(2) || ((data.sellingPrice || 0) * data.packSize.strip * data.packSize.box).toFixed(2)}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    Packaging: {data.packSize.strip} units per strip
                                    {data.packSize.box > 0 && `, ${data.packSize.box} strips per box`}
                                </p>
                            </div>
                        )}

                        {/* Batch & Supplier Info */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                                        <Truck size={16} />
                                        <span className="text-xs font-semibold uppercase">Supplier</span>
                                    </div>
                                    <div className="font-semibold text-slate-700">{data.supplier}</div>
                                    {data.supplierContact && (
                                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <Phone size={12} /> {data.supplierContact}
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                                        <Building2 size={16} />
                                        <span className="text-xs font-semibold uppercase">Manufacturer</span>
                                    </div>
                                    <div className="font-semibold text-slate-700">{data.manufacturer}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className={`p-4 bg-white border rounded-lg shadow-sm ${isExpired ? 'border-red-200 bg-red-50' : 'border-slate-200'}`}>
                                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                                        <CalendarCheck size={16} className={isExpired ? 'text-red-500' : ''} />
                                        <span className={`text-xs font-semibold uppercase ${isExpired ? 'text-red-500' : ''}`}>Expiry Date</span>
                                    </div>
                                    <div className={`font-semibold ${isExpired ? 'text-red-600' : 'text-slate-700'}`}>
                                        {data.expiryDate}
                                    </div>
                                    {isExpired && (
                                        <div className="text-xs text-red-500 mt-1 font-medium">⚠ EXPIRED</div>
                                    )}
                                </div>
                                <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                                        <Hash size={16} />
                                        <span className="text-xs font-semibold uppercase">Batch ID</span>
                                    </div>
                                    <div className="font-semibold font-mono text-slate-700">{data.batchId}</div>
                                    {data.purchaseDate && (
                                        <div className="text-xs text-slate-400 mt-1">
                                            Purchased: {data.purchaseDate}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ label, value, mono, highlight }: { label: string, value: string, mono?: boolean, highlight?: boolean }) => (
    <div className="flex items-start gap-2 text-sm justify-between">
        <span className="font-medium text-slate-500 min-w-[100px] shrink-0">{label}:</span>
        <span className={`font-medium break-words text-right ${mono ? 'font-mono text-slate-600' : 'text-slate-800'} ${highlight ? 'font-bold' : ''}`}>
            {value}
        </span>
    </div>
);

export default MedicineDetailsModal;
