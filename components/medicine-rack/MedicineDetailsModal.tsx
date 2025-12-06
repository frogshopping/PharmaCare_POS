'use client';

import React from 'react';
import { X, Printer, Package, CreditCard, Barcode, Tag } from 'lucide-react';
import { DummyMedicine } from '@/services/rackDummyData';
import { Button } from '@/components/ui/Button';

interface MedicineDetailsModalProps {
    medicine: DummyMedicine;
    onClose: () => void;
}

const MedicineDetailsModal: React.FC<MedicineDetailsModalProps> = ({ medicine, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal Content */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Product: {medicine.name} {medicine.strength} - {medicine.manufacturer}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 transition-colors rounded-full hover:bg-slate-200 text-slate-500">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Left Column: Product Info */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Tag size={14} /> Product Information
                            </h3>

                            <div className="space-y-3 text-sm">
                                <div className="grid grid-cols-3 gap-4">
                                    <span className="font-semibold text-slate-600">Drug:</span>
                                    <span className="col-span-2 text-slate-800 font-bold">{medicine.name}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <span className="font-semibold text-slate-600">Type:</span>
                                    <span className="col-span-2 text-slate-800">{medicine.type}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <span className="font-semibold text-slate-600">Strength:</span>
                                    <span className="col-span-2 text-slate-800">{medicine.strength}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <span className="font-semibold text-slate-600">Manufacturer:</span>
                                    <span className="col-span-2 text-slate-800">{medicine.manufacturer}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <span className="font-semibold text-slate-600">Generic Name:</span>
                                    <span className="col-span-2 text-blue-600 font-medium">{medicine.genericName}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <span className="font-semibold text-slate-600">Product Code:</span>
                                    <span className="col-span-2 text-slate-800 font-mono text-xs bg-slate-100 px-2 py-0.5 rounded inline-block w-fit">{medicine.productCode}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 space-y-3 text-sm">
                                <div className="grid grid-cols-3 gap-4 items-center">
                                    <span className="font-semibold text-slate-600">Trade Price:</span>
                                    <span className="col-span-2">
                                        <span className="bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full text-xs font-bold">{medicine.tradePrice} BDT</span>
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-4 items-center">
                                    <span className="font-semibold text-slate-600">M.R.P:</span>
                                    <span className="col-span-2">
                                        <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold">{medicine.sellingPrice} BDT</span>
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-slate-500 mt-2">
                                    <span className="">Whole Sell Price:</span>
                                    <span className="col-span-2">{medicine.wholesalePrice} BDT</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-slate-500">
                                    <span className="">In Stock:</span>
                                    <span className="col-span-2 text-slate-800 font-medium">{medicine.inStock}.00</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Price Details Table */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <CreditCard size={14} /> Price Details
                            </h3>

                            <div className="border border-slate-200 rounded-lg overflow-hidden mb-6">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-slate-600">Unit Type</th>
                                            <th className="px-4 py-3 text-center font-semibold text-slate-600">Qty.</th>
                                            <th className="px-4 py-3 text-right font-semibold text-slate-600">Price (BDT)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr>
                                            <td className="px-4 py-3 text-slate-800 font-medium">Strip</td>
                                            <td className="px-4 py-3 text-center text-slate-600">10</td>
                                            <td className="px-4 py-3 text-right text-slate-800">{itemPrice(medicine.sellingPrice, 10)}</td>
                                        </tr>
                                        <tr className="bg-slate-50/30">
                                            <td className="px-4 py-3 text-slate-800 font-medium">Box</td>
                                            <td className="px-4 py-3 text-center text-slate-600">100</td>
                                            <td className="px-4 py-3 text-right text-slate-800">{itemPrice(medicine.sellingPrice, 100)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Batch (In Stock) / Exp Date</label>
                                <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                                    <option>-- Sell by FIFO --</option>
                                    <option>Batch A001 (50) - Exp: 2026-10-10</option>
                                    <option>Batch B202 (120) - Exp: 2026-12-01</option>
                                </select>
                            </div>

                            <div className="mt-8 flex justify-end gap-3">
                                <Button variant="outline" className="gap-2">
                                    <Printer size={16} /> Print Label
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper to calculate price
const itemPrice = (unitPrice: number, qty: number) => (unitPrice * qty).toFixed(2);

export default MedicineDetailsModal;
