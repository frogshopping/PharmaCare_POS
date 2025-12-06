'use client';

import React from 'react';
import { Medicine } from '@/services/api';

interface MedicineListProps {
    medicines: Medicine[];
}

const MedicineList: React.FC<MedicineListProps> = ({ medicines }) => {
    return (
        <div className="bg-white max-h-[300px] overflow-y-auto custom-scrollbar">
            <div className="divide-y divide-slate-100">
                {medicines.map((medicine) => (
                    <div key={medicine.id} className="p-3 hover:bg-slate-50 transition-colors group flex items-center justify-between">
                        <div className="min-w-0">
                            <h4 className="font-semibold text-slate-800 text-sm truncate pr-2">{medicine.name}</h4>
                            <p className="text-xs text-slate-400 truncate">{medicine.manufacture}</p>
                        </div>

                        <div className="text-right shrink-0">
                            <div className="flex items-center justify-end gap-2 mb-0.5">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${medicine.inStock < 20
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'bg-emerald-100 text-emerald-700'
                                    }`}>
                                    {medicine.inStock} left
                                </span>
                            </div>
                            <span className="text-sm font-bold text-slate-700 block">
                                ${medicine.price.toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {medicines.length === 0 && (
                <div className="p-4 text-center text-slate-400 text-sm">
                    No medicines in this rack.
                </div>
            )}
        </div>
    );
};

export default MedicineList;
