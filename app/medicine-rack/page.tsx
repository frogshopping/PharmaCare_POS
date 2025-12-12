'use client';

import React, { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { medicineService } from '@/services/medicineService';
import { Medicine, Rack } from '@/lib/types';
import { Search, Package, Download, Printer, FileSpreadsheet, Eye, ChevronDown, ChevronUp, Plus, Filter, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import MedicineDetailsModal from '@/components/medicine-rack/MedicineDetailsModal';
import { AddRackModal } from '@/components/medicine-rack/AddRackModal';

interface RackCategory {
    id: string | number;
    name: string;
    icon: string;
    color: string;
    medicines: Medicine[];
    isVirtual?: boolean; // True if inferred from medicine data but not in Racks DB
}

type SortFilter = 'all' | 'top-selling' | 'low-selling';

const RACK_COLORS = [
    'bg-orange-50 border-orange-200',
    'bg-red-50 border-red-200',
    'bg-blue-50 border-blue-200',
    'bg-purple-50 border-purple-200',
    'bg-green-50 border-green-200',
    'bg-cyan-50 border-cyan-200',
    'bg-yellow-50 border-yellow-200',
    'bg-slate-50 border-slate-200',
    'bg-indigo-50 border-indigo-200',
    'bg-rose-50 border-rose-200'
];

export default function MedicineRackPage() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [dbRacks, setDbRacks] = useState<Rack[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
    const [expandedRacks, setExpandedRacks] = useState<Set<string | number>>(new Set());
    const [rackFilters, setRackFilters] = useState<Record<string, SortFilter>>({});
    const [isAddRackModalOpen, setIsAddRackModalOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [medsResponse, racksData] = await Promise.all([
                medicineService.getAll(1, 1000, '', 'all'), // Fetch all for overview
                medicineService.getRacks()
            ]);
            setMedicines(medsResponse.data);
            setDbRacks(racksData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Categorize medicines by Rack
    const categorizedRacks = useMemo(() => {
        const categoriesMap = new Map<string, RackCategory>();

        // 1. Initialize with DB Racks
        dbRacks.forEach((rack, index) => {
            categoriesMap.set(rack.name.toLowerCase(), {
                id: rack.id,
                name: rack.name,
                icon: '📦',
                color: RACK_COLORS[index % RACK_COLORS.length],
                medicines: [],
                isVirtual: false
            });
        });

        // 2. Distribute Medicines
        const unassigned: Medicine[] = [];

        medicines.forEach(med => {
            const rackName = med.rackNo || med.rackLocation;
            if (!rackName) {
                unassigned.push(med);
                return;
            }

            const lowerName = rackName.toLowerCase();

            if (categoriesMap.has(lowerName)) {
                categoriesMap.get(lowerName)!.medicines.push(med);
            } else {
                // Found a rack name in medicine that isn't in DB (Virtual Rack)
                const newRack: RackCategory = {
                    id: `virtual-${lowerName}`,
                    name: rackName, // Keep original case
                    icon: '🔖',
                    color: 'bg-slate-50 border-slate-200', // Default color
                    medicines: [med],
                    isVirtual: true
                };
                categoriesMap.set(lowerName, newRack);
            }
        });

        // 3. Convert to Array and Add Unassigned
        const result = Array.from(categoriesMap.values());

        if (unassigned.length > 0) {
            result.push({
                id: 'unassigned',
                name: 'Unassigned / No Rack',
                icon: '⚠️',
                color: 'bg-gray-100 border-gray-200',
                medicines: unassigned,
                isVirtual: true
            });
        }

        return result;
    }, [medicines, dbRacks]);

    // Filter and sort
    const filteredRacks = useMemo(() => {
        let racks = categorizedRacks;

        // Apply search
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            racks = racks.map(rack => ({
                ...rack,
                medicines: rack.medicines.filter(med =>
                    med.name.toLowerCase().includes(lowerSearch) ||
                    med.genericName.toLowerCase().includes(lowerSearch) ||
                    med.manufacture.toLowerCase().includes(lowerSearch) ||
                    med.productCode?.toLowerCase().includes(lowerSearch)
                )
            })).filter(rack => rack.medicines.length > 0);
        }

        // Apply per-rack sort
        racks = racks.map(rack => {
            const filter = rackFilters[rack.id.toString()] || 'all';
            if (filter === 'all') return rack;

            return {
                ...rack,
                medicines: [...rack.medicines].sort((a, b) => {
                    const aSold = a.totalSold || 0;
                    const bSold = b.totalSold || 0;
                    return filter === 'top-selling' ? bSold - aSold : aSold - bSold;
                })
            };
        });

        return racks;
    }, [categorizedRacks, searchTerm, rackFilters]);

    // Expand all if searching
    useEffect(() => {
        if (searchTerm) {
            const allIds = new Set(filteredRacks.map(r => r.id));
            setExpandedRacks(allIds);
        }
    }, [searchTerm, filteredRacks.length]);

    const toggleRack = (rackId: string | number) => {
        setExpandedRacks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(rackId)) newSet.delete(rackId);
            else newSet.add(rackId);
            return newSet;
        });
    };

    const handleCreateRack = async (rackData: any) => {
        try {
            await medicineService.createRack(rackData.title, rackData.location || '');
            await fetchData(); // Reload
            setIsAddRackModalOpen(false);
        } catch (error) {
            console.error('Failed to create rack:', error);
            alert('Failed to create rack. Please try again.');
        }
    };

    const handleView = (medicine: Medicine) => {
        setSelectedMedicine(medicine);
    };

    // NOTE: Deletion is typically handled in Inventory List, keeping readonly view here or redirecting?
    // Removed direct delete to keep it safer.

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
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2" onClick={() => setIsAddRackModalOpen(true)}>
                            <Plus size={18} />
                            Add Rack
                        </Button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="px-6 py-3 bg-white border-b border-slate-200 flex justify-between items-center">
                    <div className="flex gap-2 items-center">
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
                <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="flex flex-col items-center gap-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <p className="text-slate-500 text-sm font-medium">Loading medicine racks...</p>
                            </div>
                        </div>
                    ) : filteredRacks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                            <Package size={48} className="opacity-20 mb-4" />
                            <p>No racks or medicines found</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredRacks.map((rack) => (
                                <div key={rack.id} className={`bg-white rounded-lg border-2 ${rack.color} shadow-sm overflow-hidden`}>
                                    {/* Rack Header */}
                                    <div
                                        className="px-4 py-3 flex items-center justify-between bg-slate-50/50 border-b border-slate-200"
                                    >
                                        <div
                                            className="flex items-center gap-3 cursor-pointer flex-1"
                                            onClick={() => toggleRack(rack.id)}
                                        >
                                            <span className="text-2xl">{rack.icon}</span>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-slate-800">{rack.name}</h3>
                                                    {rack.isVirtual && (
                                                        <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">Virtual</span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-500">{rack.medicines.length} medicines</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="relative" onClick={(e) => e.stopPropagation()}>
                                                <Filter className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                                                <select
                                                    value={rackFilters[rack.id.toString()] || 'all'}
                                                    onChange={(e) => setRackFilters(prev => ({ ...prev, [rack.id.toString()]: e.target.value as SortFilter }))}
                                                    className="pl-7 pr-6 h-7 text-[10px] rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                                >
                                                    <option value="all">All</option>
                                                    <option value="top-selling">Top Selling</option>
                                                    <option value="low-selling">Low Selling</option>
                                                </select>
                                                <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={10} />
                                            </div>
                                            <button onClick={() => toggleRack(rack.id)} className="p-1">
                                                {expandedRacks.has(rack.id) ? (
                                                    <ChevronUp className="text-slate-400" size={20} />
                                                ) : (
                                                    <ChevronDown className="text-slate-400" size={20} />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Rack Table */}
                                    {expandedRacks.has(rack.id) && (
                                        <div className="border-t border-slate-200 animate-in slide-in-from-top-2 duration-200">
                                            <div className="overflow-x-auto">
                                                <table className="w-full border-collapse text-xs">
                                                    <thead className="bg-slate-100">
                                                        <tr>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left w-12">#</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[80px]">Code</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[200px]">Medicine Name</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[150px]">Generic Name</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[100px]">Strength</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[80px]">Price</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-center min-w-[100px]">Stock</th>
                                                            <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-center min-w-[80px]">Action</th>
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
                                                                    <div className="text-[10px] text-slate-500 mt-0.5">{medicine.type || 'Tablet'} • {medicine.manufacture}</div>
                                                                </td>
                                                                <td className="border border-slate-300 px-2 py-1.5 text-slate-600">
                                                                    {medicine.genericName || '-'}
                                                                </td>
                                                                <td className="border border-slate-300 px-2 py-1.5 text-slate-600">
                                                                    {medicine.strength || '-'}
                                                                </td>
                                                                <td className="border border-slate-300 px-2 py-1.5 text-right text-slate-700 font-medium">
                                                                    ৳{medicine.price.toFixed(2)}
                                                                </td>
                                                                <td className="border border-slate-300 px-2 py-1.5 text-center">
                                                                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${medicine.inStock === 0 ? 'bg-red-100 text-red-700' :
                                                                        medicine.inStock < 20 ? 'bg-amber-100 text-amber-700' :
                                                                            'bg-emerald-100 text-emerald-700'
                                                                        }`}>
                                                                        {medicine.inStock}
                                                                    </span>
                                                                </td>
                                                                <td className="border border-slate-300 px-2 py-1.5 text-center" onClick={(e) => e.stopPropagation()}>
                                                                    <Button
                                                                        size="sm"
                                                                        className="h-6 text-[10px] px-2 bg-blue-600 hover:bg-blue-700 text-white"
                                                                        onClick={() => handleView(medicine)}
                                                                    >
                                                                        <Eye size={12} className="mr-1" /> View
                                                                    </Button>
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

                {/* Medicine Details Modal */}
                {selectedMedicine && (
                    <MedicineDetailsModal
                        medicine={selectedMedicine}
                        onClose={() => setSelectedMedicine(null)}
                    />
                )}

                {/* Add Rack Modal */}
                <AddRackModal
                    isOpen={isAddRackModalOpen}
                    onClose={() => setIsAddRackModalOpen(false)}
                    onSave={handleCreateRack}
                />
            </div>
        </DashboardLayout>
    );
}
