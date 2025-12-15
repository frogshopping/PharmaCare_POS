'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface MedicineHeaderProps {
    totalCount?: number;
    onAddItem?: () => void;
}

const MedicineHeader: React.FC<MedicineHeaderProps> = ({ totalCount = 0, onAddItem }) => {
    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-3xl font-semibold text-white mb-2">Medicine Inventory</h1>
                    <p className="text-sm text-slate-400">Comprehensive medicine stock management</p>
                </div>
                <button
                    onClick={onAddItem}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                    <Plus size={20} />
                    <span>+ Add Item</span>
                </button>
            </div>
        </div>
    );
};

export default MedicineHeader;
