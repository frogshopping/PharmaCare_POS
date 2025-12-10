'use client';

import React from 'react';
import { Edit2, Trash2, Disc, Pill, GlassWater, Syringe, Box } from 'lucide-react';
import { Medicine } from '@/services/api';
import { Button } from '@/components/ui/Button';

interface MedicineTableProps {
    medicines: Medicine[];
    onRetail: (medicine: Medicine) => void;
    onEdit: (medicine: Medicine) => void;
    onDelete: (medicine: Medicine) => void;
    onViewDetails?: (medicine: Medicine) => void;
}

export default function MedicineTable({
    medicines,
    onRetail,
    onEdit,
    onDelete,
    onViewDetails
}: MedicineTableProps) {

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
                <thead className="bg-slate-100 sticky top-0 z-10">
                    <tr>
                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left w-12">#</th>
                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[200px]">Medicine Name</th>
                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[150px]">Generic Name</th>
                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[100px]">Strength</th>
                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[150px]">Manufacturer</th>
                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[80px]">Price</th>
                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[60px]">VAT %</th>
                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-center min-w-[80px]">Rack No.</th>
                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[80px]">Purchased</th>
                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[80px]">Sold</th>
                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[80px]">In Stock</th>
                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-center min-w-[150px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((medicine, index) => (
                        <tr
                            key={medicine.id}
                            className="hover:bg-blue-50/30 transition-colors cursor-pointer"
                            onClick={() => onViewDetails?.(medicine)}
                        >
                            <td className="border border-slate-300 px-2 py-1.5 text-slate-500 text-center">
                                {medicine.srlNo || index + 1}
                            </td>
                            <td className="border border-slate-300 px-2 py-1.5">
                                <div className="font-semibold text-slate-800">{medicine.name}</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">{medicine.type || 'Tablet'}</div>
                            </td>
                            <td className="border border-slate-300 px-2 py-1.5 text-slate-600">
                                {medicine.genericName || '-'}
                            </td>
                            <td className="border border-slate-300 px-2 py-1.5 text-slate-600">
                                {medicine.strength || '-'}
                            </td>
                            <td className="border border-slate-300 px-2 py-1.5 text-slate-600">
                                {medicine.manufacture}
                            </td>
                            <td className="border border-slate-300 px-2 py-1.5 text-right text-slate-700 font-medium">
                                ৳{medicine.price.toFixed(2)}
                            </td>
                            <td className="border border-slate-300 px-2 py-1.5 text-right text-slate-600">
                                {medicine.vat || 0}%
                            </td>
                            <td className="border border-slate-300 px-2 py-1.5 text-center text-slate-600">
                                {medicine.rackLocation || medicine.rackNo || '-'}
                            </td>
                            <td className="border border-slate-300 px-2 py-1.5 text-right text-slate-700">
                                {medicine.totalPurchase || 0}
                            </td>
                            <td className="border border-slate-300 px-2 py-1.5 text-right text-slate-700">
                                {medicine.totalSold || 0}
                            </td>
                            <td className="border border-slate-300 px-2 py-1.5 text-right">
                                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${medicine.inStock === 0 ? 'bg-red-100 text-red-700' :
                                    medicine.inStock < 20 ? 'bg-amber-100 text-amber-700' :
                                        'bg-emerald-100 text-emerald-700'
                                    }`}>
                                    {medicine.inStock}
                                </span>
                            </td>
                            <td className="border border-slate-300 px-2 py-1.5 text-center">
                                <div className="flex justify-center gap-1" onClick={(e) => e.stopPropagation()}>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-6 text-[10px] px-2 text-slate-600 border-slate-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onViewDetails?.(medicine);
                                        }}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="h-6 text-[10px] px-2 bg-purple-600 hover:bg-purple-700 text-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEdit(medicine);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 w-6 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(medicine);
                                        }}
                                        title="Delete"
                                    >
                                        <Trash2 size={12} />
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
