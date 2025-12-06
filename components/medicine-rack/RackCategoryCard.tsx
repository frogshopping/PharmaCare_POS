'use client';

import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { CategoryGroup } from '@/services/api';
import MedicineList from './MedicineList';

interface RackCategoryCardProps {
    group: CategoryGroup;
    isExpanded: boolean;
    onToggle: () => void;
}

const RackCategoryCard: React.FC<RackCategoryCardProps> = ({ group, isExpanded, onToggle }) => {
    return (
        <div className={`transition-all duration-300 ${isExpanded ? 'row-span-2' : ''}`}>
            <button
                onClick={onToggle}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 
                    ${isExpanded
                        ? 'bg-blue-600 text-white rounded-b-none shadow-lg shadow-blue-600/20'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                    }`}
            >
                <div className="text-left">
                    <h3 className="font-bold text-lg">{group.category}</h3>
                    <p className="text-blue-100 text-xs mt-0.5">{group.count} medicines</p>
                </div>
                {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>

            {isExpanded && (
                <MedicineList medicines={group.medicines} />
            )}
        </div>
    );
};

export default RackCategoryCard;
