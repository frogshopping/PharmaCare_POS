"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import {
    Line,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const purchaseSummaryData = [
    { supplier: 'MedSupply Pharma', total: 145000, grn: 24, due: 12000 },
    { supplier: 'PharmaDirect Solutions', total: 98000, grn: 18, due: 8500 },
    { supplier: 'HealthCare Plus', total: 76000, grn: 15, due: 0 },
    { supplier: 'Global Meds Inc', total: 54000, grn: 12, due: 4200 },
];

const trendData = [
    { month: 'Jul', purchase: 45000 },
    { month: 'Aug', purchase: 52000 },
    { month: 'Sep', purchase: 48000 },
    { month: 'Oct', purchase: 61000 },
    { month: 'Nov', purchase: 58000 },
    { month: 'Dec', purchase: 68000 },
];

export function PurchaseReport() {
    return (
        <div className="space-y-6">
            {/* Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-6 bg-white shadow-sm border-slate-100">
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Purchases</p>
                    <h3 className="text-2xl font-bold text-slate-800">$319K</h3>
                </Card>
                <Card className="p-6 bg-white shadow-sm border-slate-100">
                    <p className="text-sm font-medium text-slate-500 mb-1">Pending PO</p>
                    <h3 className="text-2xl font-bold text-slate-800">3</h3>
                </Card>
                <Card className="p-6 bg-white shadow-sm border-slate-100">
                    <p className="text-sm font-medium text-slate-500 mb-1">Outstanding Dues</p>
                    <h3 className="text-2xl font-bold text-slate-800">$20.5K</h3>
                </Card>
                <Card className="p-6 bg-white shadow-sm border-slate-100">
                    <p className="text-sm font-medium text-slate-500 mb-1">GRN Count</p>
                    <h3 className="text-2xl font-bold text-slate-800">57</h3>
                </Card>
            </div>

            {/* Middle Row: Table & Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Supplier Summary Table */}
                <Card className="p-6 bg-white shadow-sm border-slate-100 overflow-hidden">
                    <h3 className="text-base font-semibold text-slate-800 mb-4">Supplier Purchase Summary</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                <tr>
                                    <th className="px-3 py-2">Supplier</th>
                                    <th className="px-3 py-2 text-right">Total Purchase</th>
                                    <th className="px-3 py-2 text-center">GRN</th>
                                    <th className="px-3 py-2 text-right">Due</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {purchaseSummaryData.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50">
                                        <td className="px-3 py-3 font-medium text-slate-800">{item.supplier}</td>
                                        <td className="px-3 py-3 text-right text-slate-800">${item.total.toLocaleString()}</td>
                                        <td className="px-3 py-3 text-center text-blue-600">{item.grn}</td>
                                        <td className="px-3 py-3 text-right font-medium text-slate-800">${item.due.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Trend Line Chart */}
                <Card className="p-6 bg-white shadow-sm border-slate-100">
                    <h3 className="text-base font-semibold text-slate-800 mb-4">Monthly Purchase Trend</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Purchase']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="purchase"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
}
