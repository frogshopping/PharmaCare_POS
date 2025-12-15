'use client';

import React from 'react';
import { Flame } from 'lucide-react';

interface TopSellingItem {
    name: string;
    price: string | number;
    sold: number;
    trend?: 'hot' | 'stable' | 'cold';
}

interface TopSellingItemsCardProps {
    items: TopSellingItem[];
}

const TopSellingItemsCard: React.FC<TopSellingItemsCardProps> = ({ items }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Top Selling Items</h3>
                {items.length > 0 && items[0].trend === 'hot' && (
                    <span className="flex items-center gap-1 bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1 rounded-full">
                        <Flame size={12} />
                        Hot
                    </span>
                )}
            </div>
            <div className="space-y-3">
                {items.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No data available</p>
                ) : (
                    items.slice(0, 5).map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-gray-400">#{index + 1}</span>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price}
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-500">{item.sold} sold</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TopSellingItemsCard;

