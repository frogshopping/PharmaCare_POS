'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, User, Building2, Plus, Eye, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { supplierService } from '@/services/supplierService';
import { Supplier } from '@/lib/types';
import { AddSupplierModal } from '@/components/suppliers/AddSupplierModal';

export default function SuppliersPage() {
    const router = useRouter();
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(false);

    // Search states
    const [searchTerm, setSearchTerm] = useState('');
    const [companySearch, setCompanySearch] = useState(''); // New search field

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const fetchSuppliers = async () => {
        setLoading(true);
        try {
            const response = await supplierService.getAll(currentPage, itemsPerPage, searchTerm, companySearch);
            setSuppliers(response.data);
            if (response.pagination) {
                setTotalItems(response.pagination.totalItems);
                setTotalPages(response.pagination.totalPages);
            }
        } catch (error) {
            console.error('Failed to fetch suppliers', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, [currentPage, itemsPerPage]);

    const handleSearch = () => {
        setCurrentPage(1);
        fetchSuppliers();
    };

    const handleCreateSupplier = async (supplier: Partial<Supplier>) => {
        return await supplierService.create(supplier);
    };

    const handleSupplierCreated = (newSupplier: Supplier) => {
        fetchSuppliers();
        setIsAddModalOpen(false);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 bg-white border-b border-slate-200">
                    <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <User className="text-blue-600" size={24} />
                        Suppliers
                    </h1>
                </div>

                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 bg-white shadow-sm z-10 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <Input
                                placeholder="Search by Name/Phone"
                                className="pl-9 h-10 bg-slate-50 border-slate-200 focus:bg-white"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                        <div className="relative w-full md:w-64">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <Input
                                placeholder="Search Pharmaceutical Company"
                                className="pl-9 h-10 bg-slate-50 border-slate-200 focus:bg-white"
                                value={companySearch}
                                onChange={e => setCompanySearch(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                        <Button onClick={handleSearch} size="icon" className="bg-blue-600 hover:bg-blue-700 text-white h-10 w-10 shrink-0">
                            <Search size={18} />
                        </Button>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2" onClick={() => setIsAddModalOpen(true)}>
                        <Plus size={18} />
                        Add Supplier
                    </Button>
                </div>

                {/* Table Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
                        <div className="overflow-auto flex-1">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead className="bg-slate-50/50 border-b border-slate-200 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-slate-600 w-16 text-center">#</th>
                                        <th className="px-4 py-3 font-semibold text-slate-600">Supplier Name</th>
                                        <th className="px-4 py-3 font-semibold text-slate-600">Pharmaceutical Company</th>
                                        <th className="px-4 py-3 font-semibold text-slate-600">Contact Number</th>
                                        <th className="px-4 py-3 font-semibold text-slate-600 text-right w-32">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-12 text-center text-slate-400">Loading...</td>
                                        </tr>
                                    ) : suppliers.length > 0 ? (
                                        suppliers.map((supplier, idx) => (
                                            <tr key={supplier.id} className="hover:bg-blue-50/30 transition-colors group">
                                                <td className="px-4 py-2 text-slate-500 text-center">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                                <td className="px-4 py-2 font-medium text-slate-800">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                                                            {supplier.name.substring(0, 2)}
                                                        </div>
                                                        {supplier.name}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 text-slate-600">
                                                    <div className="flex items-center gap-2">
                                                        <Building2 size={14} className="text-slate-400" />
                                                        {supplier.company}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 text-slate-600 font-mono text-xs">
                                                    {supplier.phone || 'N/A'}
                                                </td>
                                                <td className="px-4 py-2 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            className="h-7 px-3 bg-sky-500 hover:bg-sky-600 text-white shadow-sm border-0 text-[10px] gap-1 rounded-full uppercase tracking-wider font-bold"
                                                            onClick={() => router.push(`/suppliers/${supplier.id}`)}
                                                        >
                                                            <Eye size={12} /> Profile
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="h-7 px-3 bg-red-500 hover:bg-red-600 text-white shadow-sm border-0 text-[10px] gap-1 rounded-full uppercase tracking-wider font-bold"
                                                            onClick={() => {
                                                                if (window.confirm('Are you sure you want to delete this supplier?')) {
                                                                    supplierService.delete(supplier.id).then(() => fetchSuppliers());
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 size={12} /> Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-12 text-center text-slate-400">
                                                <div className="flex flex-col items-center gap-2">
                                                    <Search size={32} className="opacity-20" />
                                                    <p>No suppliers found matching your criteria</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="border-t border-slate-200 p-4 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <span>Rows per page:</span>
                                <select
                                    className="border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <span>
                                    {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    <ChevronLeft size={16} />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    <ChevronRight size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AddSupplierModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleSupplierCreated}
                createSupplier={handleCreateSupplier}
            />
        </DashboardLayout>
    );
}
