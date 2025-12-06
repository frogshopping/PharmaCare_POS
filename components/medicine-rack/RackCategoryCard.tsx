'use client';

import React from 'react';
import { ChevronDown, ChevronRight, Package, AlertCircle } from 'lucide-react';
import { CategoryGroup } from '@/services/api';
import MedicineList from './MedicineList';

interface RackCategoryCardProps {
    group: CategoryGroup;
    isExpanded: boolean;
    onToggle: () => void;
}

const RackCategoryCard: React.FC<RackCategoryCardProps> = ({ group, isExpanded, onToggle }) => {
    // Calculate stats
    const lowStockCount = group.medicines.filter(m => m.inStock < 20).length;
    const totalStock = group.medicines.reduce((acc, curr) => acc + curr.inStock, 0);

    return (
        <div className={`
            bg-white rounded-2xl border transition-all duration-300 overflow-hidden
            ${isExpanded
                ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/50'
                : 'border-slate-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1'
            }
        `}>
            {/* Card Header / Main Face */}
            <button
                onClick={onToggle}
                className="w-full text-left"
            >
                <div className={`p-5 ${isExpanded ? 'bg-blue-50/50' : 'bg-white'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`
                                w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                                ${isExpanded ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}
                            `}>
                                <Package size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg leading-tight">{group.category}</h3>
                                <p className="text-slate-500 text-xs font-medium mt-0.5">Rack ID: #{group.category.substring(0, 3).toUpperCase()}-01</p>
                            </div>
                        </div>
                        <div className={`
                            transform transition-transform duration-300
                            ${isExpanded ? 'rotate-180 text-blue-600' : 'text-slate-400'}
                        `}>
                            <ChevronDown size={20} />
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Items</p>
                            <p className="text-slate-700 font-semibold text-lg">{group.count}</p>
                        </div>
                        <div className={`p-3 rounded-lg border ${lowStockCount > 0 ? 'bg-orange-50 border-orange-100' : 'bg-emerald-50 border-emerald-100'}`}>
                            <div className="flex items-center gap-1 mb-1">
                                <p className={`text-[10px] uppercase font-bold tracking-wider ${lowStockCount > 0 ? 'text-orange-600' : 'text-emerald-600'}`}>
                                    Status
                                </p>
                                {lowStockCount > 0 && <AlertCircle size={10} className="text-orange-500" />}
                            </div>
                            <p className={`font-semibold text-lg ${lowStockCount > 0 ? 'text-orange-700' : 'text-emerald-700'}`}>
                                {lowStockCount > 0 ? `${lowStockCount} Low` : 'Good'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative Shelf Bottom (only visible when collapsed) */}
                {!isExpanded && (
                    <div className="h-2 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 border-t border-slate-200" />
                )}
            </button>

            {/* Expanded Content */}
            <div className={`
                transition-all duration-300 ease-in-out
                ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
            `}>
                <div className="p-4 pt-0 bg-blue-50/50">
                    <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
                        <MedicineList medicines={group.medicines} />
                    </div>
                    <div className="text-center mt-3">
                        <span className="text-xs text-blue-600/70 font-medium cursor-pointer hover:text-blue-700">View Full Rack Details →</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RackCategoryCard;
