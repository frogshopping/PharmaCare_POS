"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import {
    Bar,
    BarChart,
    Line,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

const profitByProductData = [
    { product: 'Paracetamol 500mg', cost: 2.50, selling: 4.00, margin: 37.5, profit: 525 },
    { product: 'Amoxicillin', cost: 15.00, selling: 20.00, margin: 25.0, profit: 750 },
    { product: 'Ibuprofen', cost: 8.00, selling: 12.00, margin: 33.3, profit: 480 },
    { product: 'Cetirizine', cost: 5.00, selling: 8.00, margin: 37.5, profit: 300 },
    { product: 'Omeprazole', cost: 10.00, selling: 14.00, margin: 28.5, profit: 400 },
];

const categoryData = [
    { name: 'Antibiotics', value: 36, color: '#3b82f6' }, // Blue
    { name: 'Pain Relief', value: 26, color: '#10b981' }, // Emerald
    { name: 'Vitamins', value: 21, color: '#f59e0b' },   // Amber
    { name: 'Cold & Flu', value: 17, color: '#ef4444' },  // Red
];

const trendData = [
    { month: 'Jul', profit: 12000 },
    { month: 'Aug', profit: 14500 },
    { month: 'Sep', profit: 13800 },
    { month: 'Oct', profit: 16200 },
    { month: 'Nov', profit: 15500 },
    { month: 'Dec', profit: 18000 },
];

export function ProfitabilityReport() {
    return (
        <div className="space-y-6">
            {/* Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 bg-white shadow-sm border-slate-100">
                    <p className="text-sm font-medium text-slate-500 mb-1">Gross Profit</p>
                    <h3 className="text-2xl font-bold text-slate-800">$45,820</h3>
                </Card>
                <Card className="p-6 bg-white shadow-sm border-slate-100">
                    <p className="text-sm font-medium text-slate-500 mb-1">Net Profit</p>
                    <h3 className="text-2xl font-bold text-slate-800">$31,200</h3>
                </Card>
                <Card className="p-6 bg-white shadow-sm border-slate-100">
                    <p className="text-sm font-medium text-slate-500 mb-1">Profit Margin</p>
                    <h3 className="text-2xl font-bold text-slate-800">28.5%</h3>
                </Card>
            </div>

            {/* Middle Row: Table & Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profit by Product Table */}
                <Card className="p-6 bg-white shadow-sm border-slate-100 overflow-hidden">
                    <h3 className="text-base font-semibold text-slate-800 mb-4">Profit by Product</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                <tr>
                                    <th className="px-3 py-2">Product</th>
                                    <th className="px-3 py-2 text-right">Cost</th>
                                    <th className="px-3 py-2 text-right">Selling</th>
                                    <th className="px-3 py-2 text-right">Margin %</th>
                                    <th className="px-3 py-2 text-right">Profit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {profitByProductData.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50">
                                        <td className="px-3 py-3 font-medium text-slate-800">{item.product}</td>
                                        <td className="px-3 py-3 text-right text-blue-600">${item.cost}</td>
                                        <td className="px-3 py-3 text-right text-blue-600">${item.selling}</td>
                                        <td className="px-3 py-3 text-right text-emerald-500">{item.margin}%</td>
                                        <td className="px-3 py-3 text-right font-semibold text-slate-800">${item.profit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Profit by Category Pie Chart */}
                <Card className="p-6 bg-white shadow-sm border-slate-100">
                    <h3 className="text-base font-semibold text-slate-800 mb-4">Profit by Category</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend
                                    verticalAlign="middle"
                                    align="right"
                                    layout="vertical"
                                    iconType="circle"
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Bottom Row: Trend Line Chart */}
            <Card className="p-6 bg-white shadow-sm border-slate-100">
                <h3 className="text-base font-semibold text-slate-800 mb-4">Monthly Profit Trend</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `$${value}`} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                formatter={(value: number) => [`$${value}`, 'Profit']}
                            />
                            <Line
                                type="monotone"
                                dataKey="profit"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}
