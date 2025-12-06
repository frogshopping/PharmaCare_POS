'use client';

import React from 'react';
import { ShoppingCart, Edit, Barcode, Trash2 } from 'lucide-react';
import { Medicine } from '@/services/api';

interface MedicineTableProps {
    medicines: Medicine[];
    onRetail?: (medicine: Medicine) => void;
    onEdit?: (medicine: Medicine) => void;
    onBarcode?: (medicine: Medicine) => void;
    onDelete?: (medicine: Medicine) => void;
}

const MedicineTable: React.FC<MedicineTableProps> = ({
    medicines,
    onRetail,
    onEdit,
    onBarcode,
    onDelete
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold">SRL. No.</th>
                            <th className="px-6 py-4 font-semibold">Medicine Name</th>
                            <th className="px-6 py-4 font-semibold">Strength</th>
                            <th className="px-6 py-4 font-semibold">Manufacturer</th>
                            <th className="px-6 py-4 font-semibold">Generic Name</th>
                            <th className="px-6 py-4 font-semibold">Price</th>
                            <th className="px-6 py-4 font-semibold">VAT</th>
                            <th className="px-6 py-4 font-semibold">In Stock</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {medicines.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="px-6 py-12 text-center text-slate-500">
                                    No medicines found
                                </td>
                            </tr>
                        ) : (
                            medicines.map((medicine) => {
                                const isHighStock = medicine.inStock >= 100;
                                return (
                                    <tr
                                        key={medicine.id}
                                        className={`hover:bg-slate-50/50 transition-colors ${isHighStock ? 'bg-emerald-50/30' : ''
                                            }`}
                                    >
                                        <td className="px-6 py-4 text-slate-600 font-medium">{medicine.srlNo}</td>
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-slate-800">{medicine.name}</span>
                                            {medicine.barcode && <div className="text-xs text-slate-400 mt-0.5">#{medicine.barcode}</div>}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{medicine.strength || 'N/A'}</td>
                                        <td className="px-6 py-4 text-slate-600">{medicine.manufacture}</td>
                                        <td className="px-6 py-4 text-slate-600">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                                                {medicine.genericName}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-700 font-semibold">${medicine.price.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-slate-600">${medicine.vat.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${medicine.inStock > 20
                                                    ? 'bg-emerald-100 text-emerald-800'
                                                    : medicine.inStock > 0
                                                        ? 'bg-amber-100 text-amber-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                {medicine.inStock}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => onEdit?.(medicine)}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="Edit"
                                                    aria-label="Edit medicine"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => onDelete?.(medicine)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete"
                                                    aria-label="Delete medicine"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MedicineTable;
