'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { X, Calendar, DollarSign, Package, Activity, Info, Truck } from 'lucide-react';
import { DummyMedicine } from '@/services/rackDummyData';

interface MedicineDetailsModalProps {
    medicine: DummyMedicine;
    onClose: () => void;
}

const MedicineDetailsModal: React.FC<MedicineDetailsModalProps> = ({ medicine, onClose }) => {
    // Generate some mock timeline data if essential, but focusing on the requested fields first
    const isExpired = new Date(medicine.expiryDate) < new Date();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            {medicine.name}
                            <span className="text-sm font-normal text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                                {medicine.strength}
                            </span>
                        </h2>
                        <p className="text-slate-500 text-sm">{medicine.genericName} • {medicine.type}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-200 rounded-full">
                        <X size={20} className="text-slate-500" />
                    </Button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto max-h-[70vh]">

                    {/* Key Status Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="text-xs text-blue-600 uppercase font-bold mb-1">Stock Left</div>
                            <div className="text-lg font-bold text-slate-800">{medicine.inStock} units</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                            <div className="text-xs text-purple-600 uppercase font-bold mb-1">Trade Price</div>
                            <div className="text-lg font-bold text-slate-800">৳{medicine.tradePrice}</div>
                        </div>
                        <div className={`p-3 rounded-lg border ${isExpired ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
                            <div className={`text-xs uppercase font-bold mb-1 ${isExpired ? 'text-red-600' : 'text-green-600'}`}>Status</div>
                            <div className={`text-lg font-bold ${isExpired ? 'text-red-700' : 'text-green-700'}`}>{isExpired ? 'Expired' : 'Active'}</div>
                        </div>
                    </div>

                    {/* Detailed Info Grid */}
                    <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                        <Info size={16} className="text-blue-500" />
                        Comprehensive Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        {/* Column 1: Product Info */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase block mb-1">Manufacturer</label>
                                <div className="text-sm font-medium text-slate-700">{medicine.manufacturer}</div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase block mb-1">Supplier</label>
                                <div className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Truck size={14} className="text-slate-400" />
                                    {medicine.supplier}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase block mb-1">Batch ID</label>
                                <div className="text-sm font-medium text-slate-700 font-mono bg-slate-50 inline-block px-2 py-0.5 rounded border border-slate-100">
                                    {medicine.batchId}
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Pricing & Dates */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase block mb-1">Purchase Date</label>
                                    <div className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                        <Calendar size={14} className="text-slate-400" />
                                        {medicine.purchaseDate}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase block mb-1">Expiry Date</label>
                                    <div className={`text-sm font-bold flex items-center gap-2 ${isExpired ? 'text-red-600' : 'text-green-600'}`}>
                                        <Activity size={14} />
                                        {medicine.expiryDate}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase block mb-1">MRP</label>
                                    <div className="text-sm font-medium text-slate-700">৳{medicine.sellingPrice}</div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase block mb-1">Wholesale</label>
                                    <div className="text-sm font-medium text-slate-700">৳{medicine.wholesalePrice}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>Close</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Edit Details</Button>
                </div>
            </div>
        </div>
    );
};

export default MedicineDetailsModal;
