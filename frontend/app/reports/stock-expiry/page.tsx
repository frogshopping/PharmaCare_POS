"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import {
    Search,
    Calendar,
    Filter,
    Download,
    Printer,
    ChevronLeft,
    AlertTriangle,
    CheckCircle,
    ArrowUpDown,
    FileSpreadsheet,
    MoreVertical
} from 'lucide-react';
import Link from 'next/link';

// Mock Data for the report
const MOCK_DATA = [
    { id: 8, name: "Nizoder", type: "Cream", strength: "2%", barcode: "8901234567890", code: "DB379-0000008", stock: 15, mfg: "2023-10-31", exp: "2028-10-31" },
    { id: 11, name: "Select Plus", type: "Shampoo", strength: "75 ml", barcode: "8901234567891", code: "DB417-0000011", stock: 8, mfg: "2023-07-18", exp: "2028-07-18" },
    { id: 16, name: "Gelora", type: "Oral Gel", strength: "15 g", barcode: "8901234567892", code: "DB010-0000016", stock: 22, mfg: "2024-01-15", exp: "2026-05-20" },
    { id: 45, name: "Terbex", type: "Cream", strength: "10 gm", barcode: "8901234567893", code: "DB009-0000045", stock: 12, mfg: "2023-01-31", exp: "2027-01-31" },
    { id: 46, name: "Terbifin", type: "Tablet", strength: "250 mg", barcode: "8901234567894", code: "DB025-0000046", stock: 120, mfg: "2023-07-31", exp: "2028-07-31" },
    { id: 52, name: "Xfin", type: "Cream", strength: "1%", barcode: "8901234567895", code: "DB010-0000052", stock: 25, mfg: "2024-02-10", exp: "2026-08-15" },
    { id: 63, name: "Terbex", type: "Cream", strength: "5 gm", barcode: "8901234567896", code: "DB009-0000063", stock: 18, mfg: "2023-01-31", exp: "2027-01-31" },
    { id: 64, name: "Terbifin", type: "Cream", strength: "1%", barcode: "8901234567897", code: "DB025-0000064", stock: 14, mfg: "2023-11-30", exp: "2026-11-30" },
    { id: 65, name: "Terbin", type: "Cream", strength: "1%", barcode: "8901234567898", code: "DB005-0000065", stock: 10, mfg: "2023-11-30", exp: "2027-11-30" },
    { id: 72, name: "Amodis", type: "Tablet", strength: "400 mg", barcode: "8901234567899", code: "DB010-0000072", stock: 1285, mfg: "2024-03-20", exp: "2026-03-20" },
    { id: 73, name: "Napa Extend", type: "Tablet", strength: "665 mg", barcode: "8901234567100", code: "DB010-0000073", stock: 500, mfg: "2023-05-15", exp: "2025-05-15" },
    { id: 74, name: "Seclo", type: "Capsule", strength: "20 mg", barcode: "8901234567101", code: "DB010-0000074", stock: 340, mfg: "2023-06-10", exp: "2025-01-10" },
];

export default function StockExpiryPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const calculateDaysLeft = (expDate: string) => {
        const today = new Date();
        const exp = new Date(expDate);
        const diffTime = exp.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const filteredData = MOCK_DATA.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="flex-1 overflow-y-auto bg-slate-50 custom-scrollbar">
                <div className="px-8 py-6 max-w-7xl mx-auto space-y-6">

                    {/* Header & Breadcrumbs */}
                    <div className="flex flex-col gap-2">
                        <Link href="/reports" className="inline-flex items-center text-sm text-slate-500 hover:text-emerald-600 transition-colors w-fit">
                            <ChevronLeft size={16} className="mr-1" />
                            Back to Reports
                        </Link>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">Stock Expiry Report</h1>
                                <p className="text-sm text-slate-500">Comprehensive list of medicine expiry dates and stock levels</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-medium shadow-sm">
                                    <Printer size={16} />
                                    <span>Print</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm font-medium shadow-sm shadow-emerald-200">
                                    <FileSpreadsheet size={16} />
                                    <span>Export CSV</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="p-4 flex items-center gap-4 border-l-4 border-l-red-500 shadow-sm">
                            <div className="p-3 bg-red-50 rounded-full text-red-600">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Critical ({"<"}30 Days)</p>
                                <h3 className="text-2xl font-bold text-slate-800">12 Items</h3>
                            </div>
                        </Card>
                        <Card className="p-4 flex items-center gap-4 border-l-4 border-l-orange-500 shadow-sm">
                            <div className="p-3 bg-orange-50 rounded-full text-orange-600">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Warning ({"<"}90 Days)</p>
                                <h3 className="text-2xl font-bold text-slate-800">45 Items</h3>
                            </div>
                        </Card>
                        <Card className="p-4 flex items-center gap-4 border-l-4 border-l-emerald-500 shadow-sm">
                            <div className="p-3 bg-emerald-50 rounded-full text-emerald-600">
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Products</p>
                                <h3 className="text-2xl font-bold text-slate-800">{MOCK_DATA.length} Items</h3>
                            </div>
                        </Card>
                    </div>

                    {/* Controls */}
                    <Card className="p-4 shadow-sm border-slate-200">
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                            <div className="flex flex-wrap gap-3 w-full md:w-auto">
                                {/* Date Range Placeholders */}
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="date"
                                        className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                    />
                                </div>
                                <span className="text-slate-400 self-center hidden md:inline">-</span>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="date"
                                        className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                    />
                                </div>

                                {/* Manufacturer Dropdown */}
                                <div className="relative">
                                    <select className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none cursor-pointer hover:bg-slate-100 transition-colors min-w-[180px]">
                                        <option value="">Select Manufacturer</option>
                                        <option value="square">Square Pharam</option>
                                        <option value="beximco">Beximco</option>
                                        <option value="incepta">Incepta</option>
                                    </select>
                                    <ChevronLeft size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 -rotate-90 pointer-events-none" />
                                </div>
                            </div>

                            <div className="w-full md:w-auto relative">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search medicine, code..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full md:w-80 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Data Table */}
                    <Card className="overflow-hidden shadow-sm border-slate-200">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-600">
                                                Product ID <ArrowUpDown size={14} />
                                            </div>
                                        </th>
                                        <th className="px-6 py-4">Medicine Name</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Strength</th>
                                        <th className="px-6 py-4">Barcode</th>
                                        <th className="px-6 py-4">Product Code</th>
                                        <th className="px-6 py-4 text-center">Stock Left</th>
                                        <th className="px-6 py-4">EXP Date</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredData.length > 0 ? (
                                        filteredData.map((item) => {
                                            const daysLeft = calculateDaysLeft(item.exp);
                                            const isExpired = daysLeft < 0;
                                            const isCritical = daysLeft < 90 && daysLeft >= 0;

                                            return (
                                                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                                                    <td className="px-6 py-4 text-slate-500">#{item.id}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="font-medium text-slate-800">{item.name}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                                            {item.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600">{item.strength}</td>
                                                    <td className="px-6 py-4 font-mono text-xs text-slate-400">{item.barcode || "-"}</td>
                                                    <td className="px-6 py-4 font-mono text-xs text-blue-600/80">{item.code}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`font-semibold ${item.stock < 20 ? 'text-red-600' : 'text-slate-700'}`}>
                                                            {item.stock}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className={`font-medium ${isExpired ? 'text-red-600' :
                                                                    isCritical ? 'text-orange-600' : 'text-emerald-600'
                                                                }`}>
                                                                {item.exp}
                                                            </span>
                                                            <span className="text-[10px] text-slate-400">
                                                                {isExpired ? 'Expired' : `${daysLeft} days left`}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                                                            <MoreVertical size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={9} className="px-6 py-12 text-center text-slate-500">
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <Search size={32} className="text-slate-300" />
                                                    <p>No products found matching your search.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination Controls */}
                        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                            <span className="text-sm text-slate-500">Showing 1 to {filteredData.length} of {MOCK_DATA.length} entries</span>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 text-sm border border-slate-200 bg-white rounded hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                                <button className="px-3 py-1 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700">1</button>
                                <button className="px-3 py-1 text-sm border border-slate-200 bg-white rounded hover:bg-slate-50">2</button>
                                <button className="px-3 py-1 text-sm border border-slate-200 bg-white rounded hover:bg-slate-50">3</button>
                                <button className="px-3 py-1 text-sm border border-slate-200 bg-white rounded hover:bg-slate-50">Next</button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
