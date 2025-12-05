'use client';

import React from 'react';
import { Plus } from 'lucide-react';

const CategoryHeader = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-light text-slate-700">Category</h1>

            <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600">
                    <Plus size={16} />
                    <span>Add New</span>
                </button>
            </div>
        </div>
    );
};

export default CategoryHeader;
