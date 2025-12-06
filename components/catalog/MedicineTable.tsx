'use client';

import React from 'react';
import { Edit2, Trash2, ShoppingCart, Disc, Pill, GlassWater, Syringe, Box } from 'lucide-react';
import { Medicine } from '@/services/api';
import { Button } from '@/components/ui/Button';

interface MedicineTableProps {
    medicines: Medicine[];
    onRetail: (medicine: Medicine) => void;
    onEdit: (medicine: Medicine) => void;
    onDelete: (medicine: Medicine) => void;
    onViewDetails?: (medicine: Medicine) => void; // New prop for opening details modal
}

export default function MedicineTable({
    medicines,
    onRetail,
    onEdit,
    onDelete,
    onViewDetails
}: MedicineTableProps) {

    // Helper for Type Icon
    const getTypeIcon = (type?: string) => {
        switch (type) {
            case 'Syrup':
            case 'Suspension':
                return <GlassWater size={16} className="text-blue-500" />;
            case 'Capsule':
                return <Pill size={16} className="text-orange-500" />;
            case 'Injection':
                return <Syringe size={16} className="text-red-500" />;
            case 'Cream':
                return <Box size={16} className="text-pink-500" />;
            case 'Tablet':
            default:
                return <Disc size={16} className="text-purple-500" />;
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product Info</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type / Location</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pricing</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Batch / Expiry</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {medicines.map((medicine) => (
                        <tr
                            key={medicine.code || medicine.id}
                            className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                            onClick={() => onViewDetails?.(medicine)} // Row click opens details
                        >
                            <td className="px-6 py-4 align-top">
                                <div className="font-bold text-slate-700">{medicine.name}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{medicine.strength || 'N/A'} • {medicine.manufacture || 'Unknown Manufacturer'}</div>
                                <div className="text-[10px] text-slate-400 font-mono mt-1">Code: {medicine.productCode}</div>
                            </td>
                            <td className="px-6 py-4 align-top">
                                <div className="flex items-center gap-2 mb-1">
                                    {getTypeIcon(medicine.type)}
                                    <span className="text-sm text-slate-600">{medicine.type || 'Tablet'}</span>
                                </div>
                                <div className="inline-flex items-center px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-[10px] font-medium text-slate-500">
                                    {medicine.rackLocation || medicine.rackNo || 'Unassigned'}
                                </div>
                            </td>
                            <td className="px-6 py-4 align-top">
                                <div className="text-sm font-semibold text-slate-700">৳{medicine.price}</div>
                                <div className="text-xs text-slate-500">Buy: ৳{medicine.buyingPrice ? medicine.buyingPrice.toFixed(2) : '-'}</div>
                            </td>
                            <td className="px-6 py-4 align-top">
                                <div className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-bold ${medicine.inStock === 0 ? 'bg-red-50 text-red-700 border-red-100' :
                                        medicine.inStock < 20 ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                            'bg-emerald-50 text-emerald-700 border-emerald-100'
                                    }`}>
                                    {medicine.inStock} units
                                </div>
                            </td>
                            <td className="px-6 py-4 align-top">
                                <div className="text-sm font-mono text-slate-600">{medicine.batchId || 'N/A'}</div>
                                <div className="text-xs text-slate-500 mt-0.5">Exp: {medicine.expiryDate || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEdit(medicine);
                                        }}
                                        title="Edit"
                                        aria-label="Edit"
                                    >
                                        <Edit2 size={14} />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(medicine);
                                        }}
                                        title="Delete"
                                        aria-label="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
