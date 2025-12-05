'use client';

import React from 'react';
import { Medicine } from '@/services/mockMedicineData';

interface MedicineListProps {
    medicines: Medicine[];
}

const MedicineList: React.FC<MedicineListProps> = ({ medicines }) => {
    return (
        <div className="bg-white rounded-b-xl border border-t-0 border-blue-600/20 shadow-sm p-4 h-[400px] overflow-y-auto custom-scrollbar">
            <div className="space-y-3">
                {medicines.map((medicine) => (
                    <div key={medicine.id} className="p-3 border border-slate-100 rounded-lg hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-semibold text-slate-800 text-sm">{medicine.name}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">{medicine.manufacturer}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs">
                            <span className="text-slate-600 font-medium">
                                ${medicine.price.toFixed(2)}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span className={`${medicine.stock < 50 ? 'text-orange-500 font-medium' : 'text-emerald-600'}`}>
                                {medicine.stock} in stock
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MedicineList;
