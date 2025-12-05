'use client';

import React from 'react';
import { Image as ImageIcon, ShoppingCart, Edit, Barcode, Trash2 } from 'lucide-react';
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
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-600 uppercase bg-gray-50 border-b">
                    <tr>
                        <th className="px-4 py-3 font-medium">SRL. No.</th>
                        <th className="px-4 py-3 font-medium">Medicine Name</th>
                            <th className="px-4 py-3 font-medium">Product Code</th>
                        <th className="px-4 py-3 font-medium">Strength</th>
                            <th className="px-4 py-3 font-medium">Manufacturer</th>
                        <th className="px-4 py-3 font-medium">Generic Name</th>
                        <th className="px-4 py-3 font-medium">Price</th>
                            <th className="px-4 py-3 font-medium">VAT</th>
                            <th className="px-4 py-3 font-medium">In Stock</th>
                            <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {medicines.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                                    No medicines found
                                </td>
                            </tr>
                        ) : (
                            medicines.map((medicine) => {
                                const isHighStock = medicine.inStock >= 100;
                                return (
                                    <tr 
                                        key={medicine.id} 
                                        className={`border-b hover:bg-gray-50 ${
                                            isHighStock ? 'bg-green-50' : ''
                                        }`}
                                    >
                            <td className="px-4 py-3 text-gray-900">{medicine.srlNo}</td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-400">
                                        <ImageIcon size={16} />
                                    </div>
                                    <span className="font-medium text-gray-900">{medicine.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-900">
                                            {medicine.productCode} {medicine.barcode && `(${medicine.barcode})`}
                                        </td>
                                        <td className="px-4 py-3 text-gray-900">{medicine.strength || 'N/A'}</td>
                                        <td className="px-4 py-3 text-gray-900">{medicine.manufacture}</td>
                                        <td className="px-4 py-3 text-gray-900">{medicine.genericName}</td>
                                        <td className="px-4 py-3 text-gray-900 font-semibold">${medicine.price.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-gray-900">${medicine.vat.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-gray-900 font-semibold">{medicine.inStock}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => onRetail?.(medicine)}
                                                    className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                                    title="Retail"
                                                >
                                                    <ShoppingCart size={14} />
                                                </button>
                                                <button
                                                    onClick={() => onEdit?.(medicine)}
                                                    className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={14} />
                                                </button>
                                                <button
                                                    onClick={() => onBarcode?.(medicine)}
                                                    className="p-1.5 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                                                    title="Barcode"
                                                >
                                                    <Barcode size={14} />
                                                </button>
                                                <button
                                                    onClick={() => onDelete?.(medicine)}
                                                    className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={14} />
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
