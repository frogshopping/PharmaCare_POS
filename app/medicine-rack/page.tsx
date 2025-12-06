'use client';

import React, { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RackCategoryCard from '@/components/medicine-rack/RackCategoryCard';
import { getMedicines } from '@/services/api';
import { Search, Package, Calendar, Filter } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function MedicineRackPage() {
    const [expandedCategory, setExpandedCategory] = useState<string | null>('Allergy');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'category' | 'expiry'>('category');
    const [loading, setLoading] = useState(true);
    const [groupedMedicines, setGroupedMedicines] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch from unified API
                const medicines = await getMedicines();

                // Group by Category
                const grouped = medicines.reduce((acc: any, medicine) => {
                    const cat = medicine.category || 'Uncategorized';
                    if (!acc[cat]) {
                        acc[cat] = { category: cat, medicines: [], count: 0 };
                    }
                    acc[cat].medicines.push(medicine);
                    acc[cat].count++;
                    return acc;
                }, {});

                setGroupedMedicines(Object.values(grouped));
            } catch (error) {
                console.error("Failed to load rack data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter logic
    const filteredGroups = useMemo(() => {
        if (!searchTerm) return groupedMedicines;

        return groupedMedicines.map(group => {
            const matchesCategory = group.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchingMedicines = group.medicines.filter((m: any) =>
                m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.manufacture.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (matchesCategory || matchingMedicines.length > 0) {
                return {
                    ...group,
                    medicines: matchesCategory ? group.medicines : matchingMedicines,
                    count: matchesCategory ? group.count : matchingMedicines.length
                };
            }
            return null;
        }).filter(Boolean);
    }, [groupedMedicines, searchTerm]);

    const handleCategoryToggle = (category: string) => {
        setExpandedCategory(curr => curr === category ? null : category);
    };

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
                {/* Header Section */}
                <div className="px-8 py-6 bg-white border-b border-slate-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-7xl mx-auto">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <Package className="text-blue-600" />
                                Medicine Rack
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">Organized inventory view by storage location and category</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <Input
                                    placeholder="Search medicines, racks..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                />
                            </div>
                            <Button variant="outline" size="icon" className="shrink-0">
                                <Filter size={18} className="text-slate-600" />
                            </Button>
                        </div>
                    </div>

                    {/* Controls Toolbar */}
                    <div className="flex items-center gap-2 mt-6 max-w-7xl mx-auto">
                        <Button
                            variant={viewMode === 'category' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('category')}
                            className={`gap-2 rounded-full px-4 ${viewMode === 'category' ? 'bg-slate-900 text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                            <Package size={16} />
                            By Category
                        </Button>
                        <Button
                            variant={viewMode === 'expiry' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('expiry')}
                            className={`gap-2 rounded-full px-4 ${viewMode === 'expiry' ? 'bg-slate-900 text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                            <Calendar size={16} />
                            By Expiry
                        </Button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="flex justify-center p-24">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                                    <p className="text-slate-500 text-sm font-medium">Loading racks...</p>
                                </div>
                            </div>
                        ) : filteredGroups.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 pb-12">
                                {filteredGroups.map((group) => (
                                    <div key={group.category} className="transition-all duration-300 ease-in-out">
                                        <RackCategoryCard
                                            group={group}
                                            isExpanded={expandedCategory === group.category}
                                            onToggle={() => handleCategoryToggle(group.category)}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
                                <div className="p-6 bg-white rounded-full shadow-sm mb-4 border border-slate-100">
                                    <Package size={48} className="text-slate-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">No medicines found</h3>
                                <p>Try adjusting your search terms</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
