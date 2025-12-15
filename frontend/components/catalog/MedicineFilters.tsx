'use client';

import React, { useState, useEffect } from 'react';

interface MedicineFiltersProps {
    totalCount?: number;
    activeFilter?: string;
    onFilterChange?: (filter: string) => void;
    onSearchChange?: (field: string, value: string) => void;
}

const MedicineFilters: React.FC<MedicineFiltersProps> = ({ 
    totalCount = 0,
    activeFilter: externalActiveFilter = 'newest',
    onFilterChange,
    onSearchChange 
}) => {
    const [activeFilter, setActiveFilter] = useState(externalActiveFilter);
    const [searchValues, setSearchValues] = useState({
        medicineName: '',
        barcode: '',
        strength: '',
        manufacturer: '',
        genericName: ''
    });

    // Sync with external activeFilter prop
    useEffect(() => {
        setActiveFilter(externalActiveFilter);
    }, [externalActiveFilter]);

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
        onFilterChange?.(filter);
    };

    const handleSearchChange = (field: string, value: string) => {
        setSearchValues(prev => ({ ...prev, [field]: value }));
        onSearchChange?.(field, value);
    };

    return (
        <div className="mb-6 space-y-4">
            {/* Filter Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
                <button
                    onClick={() => handleFilterClick('newest')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === 'newest'
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                >
                    Newest Product
                </button>
                <button
                    onClick={() => handleFilterClick('available-100')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === 'available-100'
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                >
                    Available ≥ 100
                </button>
                <button
                    onClick={() => handleFilterClick('available-less-100')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === 'available-less-100'
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                >
                    Available &lt; 100
                </button>
                <button
                    onClick={() => handleFilterClick('out-stock')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === 'out-stock'
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                >
                    Out Stock
                </button>
                <div className="ml-auto text-sm text-slate-300">
                    Total: <span className="font-semibold text-white">{totalCount}</span>
                </div>
            </div>

            {/* Search Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <input
                    type="text"
                    placeholder="Enter Medicine name"
                    value={searchValues.medicineName}
                    onChange={(e) => handleSearchChange('medicineName', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="text"
                    placeholder="Enter Barcode"
                    value={searchValues.barcode}
                    onChange={(e) => handleSearchChange('barcode', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="text"
                    placeholder="Enter Strength"
                    value={searchValues.strength}
                    onChange={(e) => handleSearchChange('strength', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="text"
                    placeholder="Enter Manufacturer"
                    value={searchValues.manufacturer}
                    onChange={(e) => handleSearchChange('manufacturer', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="text"
                    placeholder="Enter Generic Name"
                    value={searchValues.genericName}
                    onChange={(e) => handleSearchChange('genericName', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
        </div>
    );
};

export default MedicineFilters;
