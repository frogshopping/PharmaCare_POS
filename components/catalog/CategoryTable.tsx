'use client';

import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Category } from '@/services/api';

interface CategoryTableProps {
    categories: Category[];
}

const CategoryTable = ({ categories }: CategoryTableProps) => {
    return (
        <div className="bg-white rounded shadow-sm overflow-hidden">
            {/* Search Bar */}
            <div className="p-4 border-b">
                <div className="relative max-w-xs">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 font-medium">#</th>
                            <th className="px-6 py-3 font-medium">Name</th>
                            <th className="px-6 py-3 font-medium">Image</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-900">{category.number}</td>
                                <td className="px-6 py-4 text-gray-900">{category.name}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                                            {category.image ? (
                                                <span className="text-xs text-gray-600 text-center px-1">{category.image}</span>
                                            ) : (
                                                <span className="text-gray-400 text-xs">No image</span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded ${category.status === 'Active'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {category.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center gap-1 px-3 py-1 bg-cyan-400 text-white rounded text-xs hover:bg-cyan-500">
                                            <Eye size={14} />
                                            <span>View</span>
                                        </button>
                                        <button className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700">
                                            <Edit size={14} />
                                            <span>Edit</span>
                                        </button>
                                        <button className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">
                                            <Trash2 size={14} />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryTable;
