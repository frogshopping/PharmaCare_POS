'use client';

import React from 'react';

interface SlowMovingItem {
    name: string;
    stock: number;
    sold: number;
}

interface SlowMovingItemsCardProps {
    items: SlowMovingItem[];
}

const SlowMovingItemsCard: React.FC<SlowMovingItemsCardProps> = ({ items }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Slow Moving Items</h3>
                {items.length > 0 && (
                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">
                        {items.length}
                    </span>
                )}
            </div>
            <div className="space-y-3">
                {items.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No slow moving items</p>
                ) : (
                    items.slice(0, 5).map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-500">Stock: {item.stock}</p>
                            </div>
                            <span className="text-xs text-gray-500">{item.sold} sold</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SlowMovingItemsCard;

