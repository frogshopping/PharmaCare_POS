'use client';

import React, { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getMedicines } from '@/services/api';
import { Medicine } from '@/lib/types';
import { Search, Package, Download, Printer, FileSpreadsheet, Eye, Trash2, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import MedicineDetailsModal from '@/components/medicine-rack/MedicineDetailsModal';

interface RackCategory {
    id: string;
    name: string;
    icon: string;
    color: string;
    medicines: Medicine[];
}

export default function MedicineRackPage() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
    const [expandedRacks, setExpandedRacks] = useState<Set<string>>(new Set(['all']));

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await getMedicines();
                setMedicines(data);
            } catch (error) {
                console.error('Error loading medicines:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Categorize medicines by type/category
    const categorizedRacks = useMemo(() => {
        const categories: RackCategory[] = [
            { id: 'vitamin', name: 'Vitamin Rack', icon: '💊', color: 'bg-orange-50 border-orange-200', medicines: [] },
            { id: 'cardiac', name: 'Cardiac Rack', icon: '❤️', color: 'bg-red-50 border-red-200', medicines: [] },
            { id: 'antibiotic', name: 'Antibiotic Rack', icon: '🦠', color: 'bg-blue-50 border-blue-200', medicines: [] },
            { id: 'painkiller', name: 'Painkiller Rack', icon: '💉', color: 'bg-purple-50 border-purple-200', medicines: [] },
            { id: 'diabetes', name: 'Diabetes Rack', icon: '🩺', color: 'bg-green-50 border-green-200', medicines: [] },
            { id: 'respiratory', name: 'Respiratory Rack', icon: '🫁', color: 'bg-cyan-50 border-cyan-200', medicines: [] },
            { id: 'gastrointestinal', name: 'Gastrointestinal Rack', icon: '🔬', color: 'bg-yellow-50 border-yellow-200', medicines: [] },
            { id: 'other', name: 'Other Medicines', icon: '📦', color: 'bg-slate-50 border-slate-200', medicines: [] },
        ];

        // Categorize medicines based on name/generic name keywords
        medicines.forEach(med => {
            const medName = (med.name + ' ' + med.genericName).toLowerCase();

            if (medName.includes('vitamin') || medName.includes('multivitamin') || medName.includes('calcium')) {
                categories[0].medicines.push(med);
            } else if (medName.includes('cardiac') || medName.includes('heart') || medName.includes('atenolol') || medName.includes('amlodipine')) {
                categories[1].medicines.push(med);
            } else if (medName.includes('antibiotic') || medName.includes('amoxicillin') || medName.includes('azithromycin') || medName.includes('ciprofloxacin')) {
                categories[2].medicines.push(med);
            } else if (medName.includes('pain') || medName.includes('paracetamol') || medName.includes('ibuprofen') || medName.includes('diclofenac')) {
                categories[3].medicines.push(med);
            } else if (medName.includes('diabetes') || medName.includes('insulin') || medName.includes('metformin') || medName.includes('glimepiride')) {
                categories[4].medicines.push(med);
            } else if (medName.includes('respiratory') || medName.includes('asthma') || medName.includes('cough') || medName.includes('salbutamol')) {
                categories[5].medicines.push(med);
            } else if (medName.includes('gastro') || medName.includes('omeprazole') || medName.includes('antacid') || medName.includes('ranitidine')) {
                categories[6].medicines.push(med);
            } else {
                categories[7].medicines.push(med);
            }
        });

        return categories.filter(cat => cat.medicines.length > 0);
    }, [medicines]);

    // Filter medicines based on search
    const filteredRacks = useMemo(() => {
        if (!searchTerm) return categorizedRacks;

        const lowerSearch = searchTerm.toLowerCase();
        return categorizedRacks.map(rack => ({
            ...rack,
            medicines: rack.medicines.filter(med =>
                med.name.toLowerCase().includes(lowerSearch) ||
                med.genericName.toLowerCase().includes(lowerSearch) ||
                med.manufacture.toLowerCase().includes(lowerSearch) ||
                med.productCode.toLowerCase().includes(lowerSearch)
            )
        })).filter(rack => rack.medicines.length > 0);
    }, [categorizedRacks, searchTerm]);

    const toggleRack = (rackId: string) => {
        setExpandedRacks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(rackId)) {
                newSet.delete(rackId);
            } else {
                newSet.add(rackId);
            }
            return newSet;
        });
    };

    const handleView = (medicine: Medicine) => {
        setSelectedMedicine(medicine);
    };

    const handleDelete = (medicine: Medicine) => {
        if (confirm(`Are you sure you want to delete ${medicine.name}?`)) {
            setMedicines(prev => prev.filter(m => m.id !== medicine.id));
        }
    };

    const totalMedicines = medicines.length;

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 bg-white border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Package className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-800">Medicine Rack</h1>
                                <p className="text-xs text-slate-500">Categorized inventory - {totalMedicines.toLocaleString()} medicines in {filteredRacks.length} racks</p>
                            </div>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                            <Plus size={18} />
                            Add Medicine
                        </Button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="px-6 py-3 bg-white border-b border-slate-200 flex justify-between items-center">
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                            <FileSpreadsheet size={14} /> CSV
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                            <Download size={14} /> Excel
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                            <Printer size={14} /> Print
                        </Button>
                    </div>
                    <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <Input
                            placeholder="Search medicines across all racks..."
                            className="pl-9 h-8 text-xs"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Categorized Racks */}
                <div className="flex-1 overflow-auto p-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="flex flex-col items-center gap-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <p className="text-slate-500 text-sm font-medium">Loading medicine racks...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredRacks.map((rack) => (
                                <div key={rack.id} className={`bg-white rounded-lg border-2 ${rack.color} shadow-sm overflow-hidden`}>
                                    {/* Rack Header */}
                                    <div
                                        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors"
                                        onClick={() => toggleRack(rack.id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{rack.icon}</span>
                                            <div>
                                                <h3 className="font-bold text-slate-800">{rack.name}</h3>
                                                <p className="text-xs text-slate-500">{rack.medicines.length} medicines</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200">
                                                {rack.medicines.length} items
                                            </span>
                                            {expandedRacks.has(rack.id) ? (
                                                <ChevronUp className="text-slate-400" size={20} />
                                            ) : (
                                                <ChevronDown className="text-slate-400" size={20} />
                                            )}
                                        </div>
                                    </div>

                                    {/* Rack Table */}
                                    {expandedRacks.has(rack.id) && (
                                        <div className="border-t border-slate-200">
                                            <div className="overflow-x-auto">
                                                <table className="w-full border-collapse text-xs">
                                                    <thead className="bg-slate-100">
                                                        <tr>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left w-12">#</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[80px]">Code</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[200px]">Medicine Name</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[150px]">Generic Name</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[100px]">Strength</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[150px]">Manufacturer</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[80px]">Price</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[80px]">In Stock</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-center min-w-[100px]">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rack.medicines.map((medicine, idx) => (
                                                            <tr
                                                                key={medicine.id}
                                                                className="hover:bg-blue-50/30 transition-colors cursor-pointer"
                                                                onClick={() => handleView(medicine)}
                                                            >
                                                                <td className="border border-slate-300 px-2 py-1.5 text-slate-500 text-center">{idx + 1}</td>
                                                                <td className="border border-slate-300 px-2 py-1.5 text-slate-600 font-mono text-[10px]">
                                                                    {medicine.productCode}
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
                                                                <td className="border border-slate-300 px-2 py-1.5 text-right">
                                                                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${medicine.inStock === 0 ? 'bg-red-100 text-red-700' :
                                                                            medicine.inStock < 20 ? 'bg-amber-100 text-amber-700' :
                                                                                'bg-emerald-100 text-emerald-700'
                                                                        }`}>
                                                                        {medicine.inStock}
                                                                    </span>
                                                                </td>
                                                                <td className="border border-slate-300 px-2 py-1.5 text-center" onClick={(e) => e.stopPropagation()}>
                                                                    <div className="flex justify-center gap-1">
                                                                        <Button
                                                                            size="sm"
                                                                            className="h-6 text-[10px] px-2 bg-blue-600 hover:bg-blue-700 text-white"
                                                                            onClick={() => handleView(medicine)}
                                                                        >
                                                                            <Eye size={12} className="mr-1" /> View
                                                                        </Button>
                                                                        <Button
                                                                            size="sm"
                                                                            className="h-6 text-[10px] px-2 bg-red-600 hover:bg-red-700 text-white"
                                                                            onClick={() => handleDelete(medicine)}
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
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Medicine Details Modal */}
            {selectedMedicine && (
                <MedicineDetailsModal
                    medicine={selectedMedicine}
                    onClose={() => setSelectedMedicine(null)}
                />
            )}
        </DashboardLayout>
    );
}
