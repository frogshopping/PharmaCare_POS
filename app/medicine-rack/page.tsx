'use client';

import React, { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RackCard from '@/components/medicine-rack/RackCard';
import { getDummyRackData, DummyRackCategory, DummyMedicine } from '@/services/rackDummyData';
import { Search, Package, Calendar, Filter, FileText, ShoppingBag, Pill, Syringe, GlassWater, Disc, ArrowRight, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import MedicineDetailsModal from '@/components/medicine-rack/MedicineDetailsModal';
import KeyLegendModal from '@/components/medicine-rack/KeyLegendModal';

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
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="absolute inset-0 z-0 bg-transparent" onClick={onClose}></div>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 z-10">
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
                    <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-200 rounded-full">
                        <span className="text-xl">×</span>
                    </Button>
                </div>
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <h4 className="text-sm font-bold text-slate-700 mb-3">Stored Medicines</h4>
                    <div className="grid grid-cols-1 gap-3">
                        {category.medicines.map((med, idx) => (
                            <div
                                key={idx}
                                onClick={() => onMedicineClick(med)}
                                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                                        {getTypeIcon(med.type)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-700 group-hover:text-blue-700">{med.name}</div>
                                        <div className="text-xs text-slate-400">{med.manufacturer} • {med.type}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">
                                        {med.strength}
                                    </span>
                                    <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default function MedicineRackPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [rackData, setRackData] = useState<DummyRackCategory[]>([]);

    // State for Modals
    const [selectedCategory, setSelectedCategory] = useState<DummyRackCategory | null>(null);
    const [selectedMedicine, setSelectedMedicine] = useState<DummyMedicine | null>(null);
    const [isLegendOpen, setIsLegendOpen] = useState(false);

    useEffect(() => {
        // Simulate loading dummy data
        const loadData = () => {
            setLoading(true);
            setTimeout(() => {
                const data = getDummyRackData();
                setRackData(data);
                setLoading(false);
            }, 500);
        };
        loadData();
    }, []);

    const filteredData = useMemo(() => {
        if (!searchTerm) return rackData;

        return rackData.map(category => {
            const matchesCategory = category.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchingMedicines = category.medicines.filter(m =>
                m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (matchesCategory || matchingMedicines.length > 0) {
                return {
                    ...category,
                    medicines: matchesCategory ? category.medicines : matchingMedicines
                };
            }
            return null;
        }).filter(Boolean) as DummyRackCategory[];
    }, [rackData, searchTerm]);

    const handleMedicineClick = (medicine: DummyMedicine) => {
        setSelectedCategory(null);
        setTimeout(() => setSelectedMedicine(medicine), 100);
    };

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">

                {/* Header */}
                <div className="px-8 py-8 bg-white border-b border-slate-200">
                    <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20 text-white">
                                    <Package size={24} />
                                </div>
                                Medicine Racks
                            </h1>
                            <p className="text-slate-500 mt-1 ml-12">Organize and track medicine locations</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="bg-white text-slate-600 border-slate-200 gap-2 shadow-sm"
                                onClick={() => setIsLegendOpen(true)}
                            >
                                <HelpCircle size={18} /> Icon Guide
                            </Button>
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm hidden md:flex"
                            >
                                <Package size={18} /> Manage Racks
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Filters Toolbar */}
                <div className="px-8 py-6">
                    <div className="max-w-[1600px] mx-auto bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-end">
                        <div className="space-y-1.5 flex-1 min-w-[300px]">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Search Rack or Medicine</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <Input
                                    placeholder="Search details..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5 flex-initial min-w-[200px]">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Rack Category</label>
                            <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50">
                                <option>All Categories</option>
                                <option>Antibiotics</option>
                                <option>Painkillers</option>
                                <option>Vitamins</option>
                            </select>
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 border-slate-200 text-slate-500">
                            <Filter size={18} />
                        </Button>
                        <Button variant="outline" className="h-10 shrink-0 text-slate-600 gap-2 border-slate-200">
                            <FileText size={16} /> Export List
                        </Button>
                    </div>
                </div>

                {/* Main Content Area - Grid Layout */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-8 pb-8">
                    <div className="max-w-[1600px] mx-auto">
                        {loading ? (
                            <div className="flex justify-center p-24">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                    <p className="text-slate-500 text-sm font-medium">Loading racks...</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {filteredData.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {filteredData.map((category) => (
                                            <RackCard
                                                key={category.id}
                                                category={category}
                                                onClick={() => setSelectedCategory(category)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-slate-200 border-dashed text-slate-400">
                                        <Package size={48} className="mb-4 opacity-50" />
                                        <p className="text-lg font-medium text-slate-500">No racks found</p>
                                        <p className="text-sm">Try adjusting your search filters</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Rack Detail Modal (Intermediate List) */}
                <RackDetailModal
                    category={selectedCategory}
                    onClose={() => setSelectedCategory(null)}
                    onMedicineClick={handleMedicineClick}
                />

                {/* Full Medicine Info Modal */}
                {selectedMedicine && (
                    <MedicineDetailsModal
                        medicine={selectedMedicine}
                        onClose={() => setSelectedMedicine(null)}
                    />
                )}

                {/* Icon Guide Modal */}
                {isLegendOpen && (
                    <KeyLegendModal
                        onClose={() => setIsLegendOpen(false)}
                    />
                )}

            </div>
        </DashboardLayout>
    );
}
