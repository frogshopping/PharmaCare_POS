'use client';

import React, { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RackTable from '@/components/medicine-rack/RackTable';
import { getDummyRackData, DummyRackCategory } from '@/services/rackDummyData';
import { Search, Package, Filter } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function MedicineRackPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [rackData, setRackData] = useState<DummyRackCategory[]>([]);

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

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
                {/* Header Section */}
                <div className="px-8 py-8 bg-white border-b border-slate-200">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                                    Medicine Rack
                                </h1>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-slate-600">Search:</span>
                                    <div className="relative w-64">
                                        <Input
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="h-8 border-slate-300 focus:border-blue-500 rounded-none w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    <div className="max-w-[1600px] mx-auto">
                        {loading ? (
                            <div className="flex justify-center p-24">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600"></div>
                                    <p className="text-slate-500 text-sm">Loading table...</p>
                                </div>
                            </div>
                        ) : (
                            <RackTable data={filteredData} />
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
