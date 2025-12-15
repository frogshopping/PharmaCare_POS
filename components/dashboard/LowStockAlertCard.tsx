'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface LowStockAlertCardProps {
    items: { name: string; stock: number; status: string }[];
}

const LowStockAlertCard: React.FC<LowStockAlertCardProps> = ({ items }) => {
    const hasAlerts = items.length > 0 && items[0].name !== 'All items well stocked';
    const alertCount = hasAlerts ? items.length : 0;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Low Stock Alert</h3>
                {alertCount > 0 && (
                    <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                        {alertCount}
                    </span>
                )}
            </div>
            {!hasAlerts ? (
                <div className="text-center py-8">
                    <AlertCircle className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm text-gray-500">All items well stocked</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-500">Stock: {item.stock}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                                item.status === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                            }`}>
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LowStockAlertCard;

