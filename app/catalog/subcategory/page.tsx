'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Subcategory, getSubcategories } from '@/services/api';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

export default function SubcategoryPage() {
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSubcategories().then((data) => {
            setSubcategories(data);
            setLoading(false);
        });
    }, []);

    return (
        <DashboardLayout>
            <div className="min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-light text-slate-700">Subcategory</h1>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600">
                        <Plus size={16} />
                        <span>Add New</span>
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded shadow-sm overflow-hidden">
                        <div className="p-4 border-b">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="max-w-xs border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">#</th>
                                        <th className="px-6 py-3 font-medium">Name</th>
                                        <th className="px-6 py-3 font-medium">Category Name</th>
                                        <th className="px-6 py-3 font-medium">Image</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                        <th className="px-6 py-3 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subcategories.map((item) => (
                                        <tr key={item.id} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-4">{item.number}</td>
                                            <td className="px-6 py-4">{item.name}</td>
                                            <td className="px-6 py-4 text-gray-500">{item.categoryName || '-'}</td>
                                            <td className="px-6 py-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center">
                                                    <span className="text-xs text-gray-400">No image</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
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
                )}
            </div>
        </DashboardLayout>
    );
}
