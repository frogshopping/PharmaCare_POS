'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import {
    Calendar, Package, AlertCircle, ShoppingBag,
    Hash, Truck, Building2, Phone, CalendarCheck
} from 'lucide-react';
import { DummyMedicine } from '@/services/rackDummyData';

// We can accept either DummyMedicine (old) or Medicine (new API type)
// Since we mapped API Medicine to DummyMedicine in InventoryPage, we'll stick to DummyMedicine structure
// but we need to ensure the new fields (packSize, packPrice, supplierContact) are available.
// Let's extend the props slightly or assume DummyMedicine has them (which we might need to update in rackDummyData too ideally, 
// but for now since we pass the object from InventoryPage which has the extra fields, we can just access them safely).

interface ExtendedMedicine extends DummyMedicine {
    packSize?: { strip: number; box: number };
    packPrice?: { strip: number; box: number };
    supplierContact?: string;
    buyingPrice?: number;
}

interface MedicineDetailsModalProps {
    medicine: ExtendedMedicine | any; // allow flexibility
    onClose: () => void;
}

const MedicineDetailsModal: React.FC<MedicineDetailsModalProps> = ({ medicine, onClose }) => {
    if (!medicine) return null;

    // Helper to calculate status color
    const getStatusColor = (stock: number) => {
        if (stock === 0) return 'text-red-600 bg-red-50 border-red-200';
        if (stock < 20) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    };

    const isExpired = new Date(medicine.expiryDate) < new Date();

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="absolute inset-0 z-0 bg-transparent" onClick={onClose}></div>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden animate-in zoom-in-95 z-10">

                {/* Header */}
                <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            Product: {medicine.name}
                            <span className="text-sm font-normal text-slate-500">({medicine.type})</span>
                            <span className="text-sm font-normal text-slate-400">- {medicine.strength}</span>
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">{medicine.manufacturer}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-200 rounded-full h-8 w-8 text-slate-400">
                        <span className="text-xl leading-none">&times;</span>
                    </Button>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left Column: Basic Info & Pricing */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <InfoRow label="Drug" value={medicine.name} highlight />
                            <InfoRow label="Type" value={medicine.type} />
                            <InfoRow label="Strength" value={medicine.strength} />
                            <InfoRow label="Mnf." value={medicine.manufacturer} />
                            <InfoRow label="Gen. Name" value={medicine.genericName} />
                            <InfoRow label="Product code" value={medicine.productCode} mono />
                            <InfoRow label="Barcode" value={medicine.barcode || '---'} mono />
                        </div>

                        <div className="pt-4 border-t border-slate-100 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500">Trade Price:</span>
                                <span className="text-sm font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                    {medicine.tradePrice || medicine.buyingPrice || 0} BDT
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-slate-700">Price:</span>
                                <span className="text-sm font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                                    {medicine.sellingPrice || medicine.price} BDT
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500">Whole Sell Price:</span>
                                <span className="text-sm font-medium text-slate-600">
                                    {medicine.wholesalePrice || 0} BDT
                                </span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500">In Stock:</span>
                                <span className={`text-sm font-bold px-2 py-0.5 rounded border ${getStatusColor(medicine.inStock)}`}>
                                    {medicine.inStock.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500">Rack:</span>
                                <span className="text-sm font-medium text-slate-700">{medicine.rackLocation || medicine.rackNo || '---'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Price Details Table & Supplier */}
                    <div className="space-y-8">

                        {/* Price Details Table */}
                        <div>
                            <h3 className="text-lg font-medium text-slate-700 mb-4">Price details</h3>
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
                                            <td className="px-4 py-3 text-slate-700">Strip</td>
                                            <td className="px-4 py-3 text-center text-slate-600">{medicine.packSize?.strip || 10}</td>
                                            <td className="px-4 py-3 text-right font-medium text-slate-800">{medicine.packPrice?.strip || (Number(medicine.price || 0) * (medicine.packSize?.strip || 10)).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-slate-700">Box</td>
                                            <td className="px-4 py-3 text-center text-slate-600">{medicine.packSize?.box || 100}</td>
                                            <td className="px-4 py-3 text-right font-medium text-slate-800">{medicine.packPrice?.box || (Number(medicine.price || 0) * (medicine.packSize?.box || 100)).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Batch & Supplier Info */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Batch (In Stock) / TP / Exp Date</h4>
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600 font-medium">
                                    --Sell by FIFO--
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                                        <Truck size={16} />
                                        <span className="text-xs font-semibold uppercase">Supplier</span>
                                    </div>
                                    <div className="font-semibold text-slate-700">{medicine.supplier || 'N/A'}</div>
                                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                        <Phone size={12} /> {medicine.supplierContact || '---'}
                                    </div>
                                </div>
                                <div className={`p-4 bg-white border rounded-lg shadow-sm ${isExpired ? 'border-red-200 bg-red-50' : 'border-slate-200'}`}>
                                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                                        <CalendarCheck size={16} className={isExpired ? 'text-red-500' : ''} />
                                        <span className={`text-xs font-semibold uppercase ${isExpired ? 'text-red-500' : ''}`}>Expiry Date</span>
                                    </div>
                                    <div className={`font-semibold ${isExpired ? 'text-red-600' : 'text-slate-700'}`}>
                                        {medicine.expiryDate || 'N/A'}
                                    </div>
                                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                        <Hash size={12} /> Batch: <span className="font-mono">{medicine.batchId || '---'}</span>
                                    </div>
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
