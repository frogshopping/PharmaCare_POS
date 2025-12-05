'use client';

import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RackCategoryCard from '@/components/medicine-rack/RackCategoryCard';
import { getMedicinesByCategory } from '@/services/mockMedicineData';
import { Search, Package, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function MedicineRackPage() {
    const [expandedCategory, setExpandedCategory] = useState<string | null>('Allergy');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'category' | 'expiry'>('category');

    const allGroups = useMemo(() => getMedicinesByCategory(), []);

    // Filter logic
    const filteredGroups = useMemo(() => {
        if (!searchTerm) return allGroups;

        return allGroups.map(group => {
            const matchesCategory = group.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchingMedicines = group.medicines.filter(m =>
                m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (matchesCategory || matchingMedicines.length > 0) {
                return {
                    ...group,
                    medicines: matchesCategory ? group.medicines : matchingMedicines,
                    count: matchesCategory ? group.count : matchingMedicines.length
                };
            }
            return null;
        }).filter(Boolean) as typeof allGroups;
    }, [allGroups, searchTerm]);

    const handleCategoryToggle = (category: string) => {
        setExpandedCategory(curr => curr === category ? null : category);
    };

    return (
        <DashboardLayout>
            <div className="p-6 h-full flex flex-col bg-slate-50 overflow-hidden">
                {/* Header */}
                <div className="mb-6 shrink-0">
                    <h1 className="text-2xl font-bold text-slate-800">Medicine Rack</h1>
                    <p className="text-slate-500 text-sm">Organized medicine inventory by category and expiry</p>
                </div>

                {/* Controls */}
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm mb-6 shrink-0 flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Tabs */}
                    <div className="flex bg-slate-100 p-1 rounded-lg gap-1">
                        <Button
                            variant={viewMode === 'category' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('category')}
                            className={viewMode === 'category' ? 'bg-blue-600 shadow-sm hover:bg-blue-700' : 'hover:bg-slate-200'}
                        >
                            <Package size={16} className="mr-2" />
                            By Category
                        </Button>
                        <Button
                            variant={viewMode === 'expiry' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('expiry')}
                            className={viewMode === 'expiry' ? 'bg-blue-600 shadow-sm hover:bg-blue-700' : 'hover:bg-slate-200'}
                        >
                            <Calendar size={16} className="mr-2" />
                            By Expiry
                        </Button>
                    </div>

                    {/* Search */}
                    <div className="w-full md:w-80">
                        <Input
                            icon={<Search size={18} />}
                            placeholder="Search medicines..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Rack Grid */}
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    {filteredGroups.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
                            {filteredGroups.map((group) => (
                                <RackCategoryCard
                                    key={group.category}
                                    group={group}
                                    isExpanded={expandedCategory === group.category}
                                    onToggle={() => handleCategoryToggle(group.category)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                            <Package size={48} className="mb-4 opacity-20" />
                            <p>No medicines found</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
