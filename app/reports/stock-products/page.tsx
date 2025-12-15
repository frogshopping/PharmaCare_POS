'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { medicineService } from '@/services/medicineService';
import { Medicine } from '@/lib/types';
import { Search, Download, Printer, FileSpreadsheet, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface StockReportRow {
    medicineId: string;
    productName: string;
    strength: string;
    manufacture: string;
    totalPurchaseQty: number;
    totalSoldQty: number;
    totalReturnQty: number;
    stockQty: number;
    stockTP: number;
    stockMRP: number;
    profit: number;
}

export default function StockProductsReportPage() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await medicineService.getAll();
            setMedicines(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const calculateReportData = (): StockReportRow[] => {
        return medicines.map(med => {
            const stockTP = med.buyingPrice || med.price * 0.7; // Assuming TP is 70% of MRP
            const stockMRP = med.mrp || med.price;
            const profit = (stockMRP - stockTP) * med.totalSold;

            return {
                medicineId: med.id,
                productName: med.name,
                strength: med.strength,
                manufacture: med.manufacture,
                totalPurchaseQty: med.totalPurchase || 0,
                totalSoldQty: med.totalSold || 0,
                totalReturnQty: 0, // Not in current data model
                stockQty: med.inStock,
                stockTP: stockTP,
                stockMRP: stockMRP,
                profit: profit
            };
        });
    };

    const reportData = calculateReportData();
    const filteredData = reportData.filter(row =>
        row.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.manufacture.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate summary totals
    const summary = filteredData.reduce((acc, row) => ({
        totalStockTP: acc.totalStockTP + (row.stockTP * row.stockQty),
        totalStockMRP: acc.totalStockMRP + (row.stockMRP * row.stockQty),
        totalProfit: acc.totalProfit + row.profit
    }), { totalStockTP: 0, totalStockMRP: 0, totalProfit: 0 });

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 bg-white border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/reports">
                                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700">
                                    <ArrowLeft size={20} />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-slate-800">Stock Products Report</h1>
                                <p className="text-xs text-slate-500">Comprehensive inventory and profitability analysis</p>
                            </div>
                        </div>
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
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <Input
                            placeholder="Search products..."
                            className="pl-9 h-8 text-xs"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Excel-like Table */}
                <div className="flex-1 overflow-auto p-4">
                    <div className="bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-xs">
                                <thead className="bg-slate-100 sticky top-0 z-10">
                                    <tr>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left w-12">#</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[100px]">Medicine ID</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[200px]">Product Name</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[100px]">Strength</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[180px]">Manufacture Company</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[100px]">Total Purchase Qty.</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[100px]">Total Sold Qty.</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[100px]">Total Return Qty.</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[80px]">Stock Qty.</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[100px]">Stock TP</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[100px]">Stock MRP</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[100px] bg-green-50">Profit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((row, idx) => (
                                        <tr key={row.medicineId} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="border border-slate-300 px-2 py-1.5 text-slate-500 text-center">{idx + 1}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-slate-600 font-mono">{row.medicineId}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-slate-800 font-medium">{row.productName}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-slate-600">{row.strength}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-slate-600">{row.manufacture}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-right text-slate-700">{row.totalPurchaseQty}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-right text-slate-700">{row.totalSoldQty}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-right text-slate-700">{row.totalReturnQty}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-right font-semibold text-slate-800">{row.stockQty}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-right text-slate-700">{row.stockTP.toFixed(2)}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-right text-slate-700">{row.stockMRP.toFixed(2)}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-right font-semibold text-green-700 bg-green-50/50">{row.profit.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-slate-100 sticky bottom-0">
                                    <tr className="font-bold">
                                        <td colSpan={9} className="border border-slate-300 px-2 py-2 text-right text-slate-700">Summary:</td>
                                        <td className="border border-slate-300 px-2 py-2 text-right text-slate-800">{summary.totalStockTP.toFixed(2)}</td>
                                        <td className="border border-slate-300 px-2 py-2 text-right text-slate-800">{summary.totalStockMRP.toFixed(2)}</td>
                                        <td className="border border-slate-300 px-2 py-2 text-right text-green-700 bg-green-100">{summary.totalProfit.toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div className="mt-3 text-xs text-slate-500 text-center">
                        Showing {filteredData.length} of {reportData.length} products
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
