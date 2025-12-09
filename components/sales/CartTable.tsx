import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

export interface CartItem {
    id: string;
    medicineId: string;
    name: string;
    stock: number;
    quantity: number;
    unitPrice: number;
    unit: string; // 'pcs' | 'box' | 'strip'
    vat: number; // Percentage
    // Calculated fields
    totalPrice: number;
}

interface CartTableProps {
    items: CartItem[];
    onUpdateQuantity: (id: string, newQty: number) => void;
    onRemoveItem: (id: string) => void;
    onUpdatePrice: (id: string, newPrice: number) => void;
    onUpdateUnit: (id: string, newUnit: string) => void;
}

export function CartTable({ items, onUpdateQuantity, onRemoveItem, onUpdatePrice, onUpdateUnit }: CartTableProps) {
    if (items.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/30">
                <div className="bg-slate-100 p-6 rounded-full mb-4">
                    <span className="text-4xl">🛒</span>
                </div>
                <h3 className="text-lg font-medium text-slate-600">Cart is empty</h3>
                <p className="text-sm">Search for products or scan barcode to add items</p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-12 text-center">Actions</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Medicine Name</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-center w-24">In Stock</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-center w-32">Quantity</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-right w-24">Unit Price</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-right w-20">Vat</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-right w-28">Total Price</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {items.map((item) => (
                        <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="px-4 py-3 text-center">
                                <button
                                    onClick={() => onRemoveItem(item.id)}
                                    className="text-slate-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                            <td className="px-4 py-3">
                                <span className="text-sm font-medium text-slate-800">{item.name}</span>
                            </td>
                            <td className="px-4 py-3 text-center">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                                    {item.stock}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex flex-col gap-1 items-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                            className="w-6 h-6 flex items-center justify-center bg-slate-100 text-slate-500 rounded hover:bg-slate-200 text-xs"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                                            className="w-10 text-center text-sm font-semibold border-none focus:ring-0 p-0 bg-transparent"
                                        />
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            className="w-6 h-6 flex items-center justify-center bg-slate-100 text-slate-500 rounded hover:bg-slate-200 text-xs"
                                            disabled={item.quantity >= item.stock}
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                    <select
                                        value={item.unit}
                                        onChange={(e) => onUpdateUnit(item.id, e.target.value)}
                                        className="h-6 text-xs bg-slate-50 border-slate-200 rounded px-1 w-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="pcs">pcs</option>
                                        <option value="box">box</option>
                                        <option value="strip">strip</option>
                                    </select>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-right">
                                <input
                                    type="number"
                                    value={item.unitPrice}
                                    onChange={(e) => onUpdatePrice(item.id, parseFloat(e.target.value) || 0)}
                                    className="w-20 text-right text-sm border-b border-transparent focus:border-blue-500 focus:outline-none bg-transparent"
                                />
                            </td>
                            <td className="px-4 py-3 text-right text-sm text-slate-600">
                                {item.vat}%
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-slate-800">
                                ${item.totalPrice.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
