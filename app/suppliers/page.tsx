'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, User, Phone, Eye, ArrowRight, Building2, Smartphone, FileText } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { medicineService } from '@/services/medicineService';
import { Supplier } from '@/lib/types';
import { AddSupplierModal } from '@/components/suppliers/AddSupplierModal';
import { Plus } from 'lucide-react';

import Link from 'next/link';

export default function SuppliersPage() {
    const router = useRouter();
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [contactSearch, setContactSearch] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleCreateSupplier = async (supplier: Partial<Supplier>) => {
        return await medicineService.createSupplier(supplier);
    };

    const handleSupplierCreated = (newSupplier: Supplier) => {
        setSuppliers([...suppliers, newSupplier]);
        setIsAddModalOpen(false);
    };

    useEffect(() => {
        const fetchSuppliers = async () => {
            const data = await medicineService.getSuppliers();
            setSuppliers(data);
        };
        fetchSuppliers();
    }, []);

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        supplier.phone.includes(contactSearch)
    );

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 bg-white border-b border-slate-200">
                    <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <User className="text-blue-600" size={24} />
                        Contact persons
                    </h1>
                </div>

                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 bg-white shadow-sm z-10 flex justify-between items-center">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <Input
                                placeholder="Enter Supplier Name"
                                className="pl-9 h-10 bg-slate-50 border-slate-200 focus:bg-white"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative w-64">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <Input
                                placeholder="Enter Contact Number"
                                className="pl-9 h-10 bg-slate-50 border-slate-200 focus:bg-white"
                                value={contactSearch}
                                onChange={e => setContactSearch(e.target.value)}
                            />
                        </div>
                        <Button size="icon" className="bg-blue-600 hover:bg-blue-700 text-white h-10 w-10">
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
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead className="bg-slate-50/50 border-b border-slate-200 sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-slate-600 w-16 text-center">#</th>
                                    <th className="px-4 py-3 font-semibold text-slate-600">Supplier Name</th>
                                    <th className="px-4 py-3 font-semibold text-slate-600">Pharmaceutical Company</th>
                                    <th className="px-4 py-3 font-semibold text-slate-600">Contact Number</th>
                                    <th className="px-4 py-3 font-semibold text-slate-600 text-center">Status</th>
                                    <th className="px-4 py-3 font-semibold text-slate-600 text-right">Purchase Invoice</th>
                                    <th className="px-4 py-3 font-semibold text-slate-600 text-right w-32">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredSuppliers.map((supplier, idx) => (
                                    <tr key={supplier.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-4 py-2 text-slate-500 text-center">{idx + 1}</td>
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
                                            <div className="flex items-center gap-2">
                                                <Smartphone size={14} className="text-slate-400" />
                                                {supplier.phone || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide
                                                ${supplier.status === 'Active' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                                {supplier.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-right">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold
                                                ${supplier.purchaseInvoiceCount > 0 ? 'bg-blue-50 text-blue-700' : 'text-slate-400'}`}>
                                                <FileText size={12} className="mr-1" />
                                                {supplier.purchaseInvoiceCount}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-right">
                                            <Button
                                                size="sm"
                                                className="h-7 px-3 bg-sky-500 hover:bg-sky-600 text-white shadow-sm border-0 text-[10px] gap-1 rounded-full uppercase tracking-wider font-bold"
                                                onClick={() => router.push(`/suppliers/${supplier.id}`)}
                                            >
                                                <Eye size={12} /> Profile
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredSuppliers.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
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
