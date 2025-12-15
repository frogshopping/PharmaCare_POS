'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Package, ArrowRight, Pill, Syringe, GlassWater, Disc } from 'lucide-react';
import { DummyRackCategory, DummyMedicine } from '@/services/rackDummyData';

interface RackDetailModalProps {
    category: DummyRackCategory | null;
    onClose: () => void;
    onMedicineClick: (medicine: DummyMedicine) => void;
}

const RackDetailModal: React.FC<RackDetailModalProps> = ({ category, onClose, onMedicineClick }) => {
    if (!category) return null;

    // Type icon helper for the list view inside modal
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Syrup':
            case 'Suspension':
                return <GlassWater size={14} className="text-blue-500" />;
            case 'Capsule':
                return <Pill size={14} className="text-orange-500" />;
            case 'Injection':
                return <Syringe size={14} className="text-red-500" />;
            case 'Tablet':
            default:
                return <Disc size={14} className="text-purple-500" />;
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="absolute inset-0 z-0 bg-transparent" onClick={onClose}></div>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 z-10 transition-all">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm text-blue-600">
                            <Package size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">{category.title}</h3>
                            <p className="text-xs text-slate-500">Rack ID: {category.id}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-200 rounded-full h-8 w-8 text-slate-500">
                        <span className="text-xl leading-none">&times;</span>
                    </Button>
                </div>
                <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Stored Medicines</h4>
                    <div className="grid grid-cols-1 gap-3">
                        {category.medicines.map((med, idx) => (
                            <div
                                key={idx}
                                onClick={() => onMedicineClick(med)}
                                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                                        {getTypeIcon(med.type)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">{med.name}</div>
                                        <div className="text-xs text-slate-400 mt-0.5">{med.manufacturer} • {med.type}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md border border-slate-200/50">
                                        {med.strength}
                                    </span>
                                    <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                    <Button variant="outline" onClick={onClose} className="text-slate-600 hover:bg-slate-100 border-slate-200">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RackDetailModal;
