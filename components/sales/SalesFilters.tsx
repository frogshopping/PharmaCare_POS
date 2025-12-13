import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface SalesFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    startDate: string;
    onStartDateChange: (value: string) => void;
    endDate: string;
    onEndDateChange: (value: string) => void;
    onFilter: () => void;
}

export function SalesFilters({
    searchTerm,
    onSearchChange,
    startDate,
    onStartDateChange,
    endDate,
    onEndDateChange,
    onFilter
}: SalesFiltersProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                {/* Invoice ID/First Param */}
                <div className="md:col-span-2">
                    <Input
                        placeholder="Enter Invoice ID"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full text-xs h-9"
                    />
                </div>

                {/* Name */}
                <div className="md:col-span-2">
                    <Input
                        placeholder="Enter Name"
                        className="w-full text-xs h-9"
                    />
                </div>

                {/* Date Range */}
                <div className="md:col-span-2">
                    <Input
                        type="date"
                        placeholder="From Order Date"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                        className="w-full text-xs h-9"
                    />
                </div>
                <div className="md:col-span-2">
                    <Input
                        type="date"
                        placeholder="To Order Date"
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                        className="w-full text-xs h-9"
                    />
                </div>

                {/* Type Select */}
                <div className="md:col-span-1">
                    <select className="flex h-9 w-full rounded-md border border-slate-300 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="">--Select Type--</option>
                        <option value="Collection">Collection</option>
                        <option value="Delivery">Delivery</option>
                    </select>
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                    <Input
                        placeholder="Enter Phone"
                        className="w-full text-xs h-9"
                    />
                </div>

                {/* Status Select & Search Button */}
                <div className="md:col-span-1 flex gap-2">
                    <select className="flex h-9 w-full rounded-md border border-slate-300 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950">
                        <option value="">--Select--</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                    </select>
                    <Button
                        onClick={onFilter}
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 bg-slate-100 hover:bg-slate-200 border border-slate-300 shadow-sm shrink-0"
                    >
                        <Search size={16} className="text-slate-600" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
