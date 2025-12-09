'use client';

import React from 'react';
import { DummyMedicine, DummyRackCategory } from '@/services/rackDummyData';
import { Package, ChevronRight, AlertCircle, Pill, Syringe, GlassWater, Disc } from 'lucide-react';

interface RackCardProps {
    category: DummyRackCategory;
    onClick: () => void;
}

const RackCard: React.FC<RackCardProps> = ({ category, onClick }) => {
    // Determine status
    const lowStockCount = category.medicines.filter(m => m.inStock < 50).length;
    const hasLowStock = lowStockCount > 0;

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Syrup':
            case 'Suspension':
                return <GlassWater size={12} className="text-blue-500" />;
            case 'Capsule':
                return <Pill size={12} className="text-orange-500" />;
            case 'Injection':
                return <Syringe size={12} className="text-red-500" />;
            case 'Tablet':
            default:
                return <Disc size={12} className="text-purple-500" />;
        }
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col h-full group"
        >
            {/* Card Header */}
            <div className="px-3 py-2.5 border-b border-slate-50 bg-slate-50/30 flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center text-blue-600">
                        <Package size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 text-sm">{category.title}</h3>
                        <p className="text-slate-400 text-[10px] font-medium">ID: {category.id}</p>
                    </div>
                </div>
                <div className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${hasLowStock ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                    {hasLowStock ? 'Restock' : 'Optimal'}
                </div>
            </div>

            {/* Card Body - Medicine List Preview */}
            <div className="p-3 flex-1 flex flex-col gap-2">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Top Medicines</div>

                {category.medicines.slice(0, 4).map((medicine, idx) => (
                    <div key={idx} className="flex items-center justify-between group/item">
                        <div className="flex items-center gap-1.5">
                            {/* Type Icon */}
                            <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover/item:border-blue-100 transition-colors">
                                {getTypeIcon(medicine.type)}
                            </div>
                            <span className="text-xs text-slate-600 font-medium group-hover/item:text-slate-900 transition-colors truncate max-w-[100px]">
                                {medicine.name}
                            </span>
                        </div>
                        <span className="text-[10px] text-slate-400 bg-slate-50 px-1 py-0 rounded border border-slate-100">
                            {medicine.strength}
                        </span>
                    </div>
                ))}

                {category.medicines.length > 4 && (
                    <div className="text-[10px] text-slate-400 italic mt-0.5 pl-6">
                        + {category.medicines.length - 4} more items...
                    </div>
                )}
            </div>

            {/* Card Footer */}
            <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex justify-between items-center mt-auto group-hover:bg-blue-50/30 transition-colors">
                <span className="text-[10px] font-medium text-slate-500">
                    {category.medicines.length} Medicines Stored
                </span>
                <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors">
                    <ChevronRight size={12} />
                </div>
            </div>
        </div>
    );
};

export default RackCard;
