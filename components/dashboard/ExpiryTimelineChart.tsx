'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ExpiryTimelineChartProps {
    data: { period: string; count: number }[];
}

const ExpiryTimelineChart: React.FC<ExpiryTimelineChartProps> = ({ data }) => {
    const chartData = data.map(item => ({
        period: item.period,
        count: item.count
    }));

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Expiry Timeline</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                        dataKey="period" 
                        stroke="#6B7280"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                        stroke="#6B7280"
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: 'none', 
                            borderRadius: '6px',
                            color: '#F9FAFB'
                        }}
                        formatter={(value: number) => [value, 'Items']}
                    />
                    <Bar 
                        dataKey="count" 
                        fill="#F59E0B"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpiryTimelineChart;

