'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SalesTrendChartProps {
    data: { day: string; value: number }[];
}

const SalesTrendChart: React.FC<SalesTrendChartProps> = ({ data }) => {
    const chartData = data.map(item => ({
        day: item.day,
        sales: item.value
    }));

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Trend (7 Days)</h3>
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                        dataKey="day" 
                        stroke="#6B7280"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                        stroke="#6B7280"
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => value.toLocaleString()}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: 'none', 
                            borderRadius: '6px',
                            color: '#F9FAFB'
                        }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorSales)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesTrendChart;

