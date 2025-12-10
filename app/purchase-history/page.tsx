'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Search, Plus, FileText, Eye, Edit, Trash2, Filter, ShoppingBag } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Invoice, getDummyPurchaseHistory } from '@/services/purchaseDummyData';
import InvoiceDetailModal from '@/components/medicine-rack/InvoiceDetailModal';
import AddPurchaseModal from '@/components/purchase-history/AddPurchaseModal';

export default function PurchaseHistoryPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

    useEffect(() => {
        setInvoices(getDummyPurchaseHistory());
    }, []);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

    const handleEdit = (inv: Invoice) => {
        setEditingInvoice(inv);
        setIsAddModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingInvoice(null);
        setIsAddModalOpen(true);
    };

    // Summary Calculations
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
    const totalDue = invoices.reduce((sum, inv) => sum + inv.dueAmount, 0);

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden relative">

                {/* Header */}
                <div className="px-6 py-4 bg-white border-b border-slate-200">
                    <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                                <div className="p-1.5 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20 text-white">
                                    <ShoppingBag size={18} />
                                </div>
                                Purchase History
                            </h1>
                            <p className="text-xs text-slate-500 mt-1 ml-9">Manage and track your pharmaceutical purchases</p>
                        </div>
                        <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white gap-2 shadow-sm h-8"
                            onClick={handleAddNew}
                        >
                            <Plus size={16} /> Add New Purchase
                        </Button>
                    </div>
                </div>

                {/* Filters Toolbar */}
                <div className="px-6 py-4">
                    <div className="max-w-[1600px] mx-auto bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-end">
                        <div className="space-y-1 flex-1 min-w-[150px]">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">From Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <Input type="date" className="pl-8 h-9 text-xs" />
                            </div>
                        </div>
                        <div className="space-y-1 flex-1 min-w-[150px]">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">To Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <Input type="date" className="pl-8 h-9 text-xs" />
                            </div>
                        </div>
                        <div className="space-y-1 flex-1 min-w-[200px]">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Supplier Name</label>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <Input placeholder="Search supplier..." className="pl-8 h-9 text-xs" />
                            </div>
                        </div>
                        <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                            <Filter size={16} className="text-slate-600" />
                        </Button>
                        <Button variant="outline" className="h-9 shrink-0 text-slate-600 gap-2 text-xs font-semibold">
                            <FileText size={14} /> Export Report
                        </Button>
                    </div>
                </div>

                {/* Table Content */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2">
                    <div className="max-w-[1600px] mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-slate-600 w-12 text-center">SL</th>
                                    <th className="px-4 py-3 font-semibold text-slate-600">Date</th>
                                    <th className="px-4 py-3 font-semibold text-slate-600">Invoice ID</th>
                                    <th className="px-4 py-3 font-semibold text-slate-600">Company</th>
                                    <th className="px-4 py-3 font-semibold text-slate-600">Supplier</th>
                                    <th className="px-4 py-3 text-right font-semibold text-slate-600">Total (BDT)</th>
                                    <th className="px-4 py-3 text-right font-semibold text-slate-600">Paid (BDT)</th>
                                    <th className="px-4 py-3 text-right font-semibold text-slate-600">Due (BDT)</th>
                                    <th className="px-4 py-3 text-center font-semibold text-slate-600">Status</th>
                                    <th className="px-4 py-3 text-center font-semibold text-slate-600 w-32">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {invoices.map((inv, idx) => (
                                    <tr key={inv.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-4 py-2.5 text-slate-500 text-center">{idx + 1}</td>
                                        <td className="px-4 py-2.5 text-slate-600">{inv.purchaseDate}</td>
                                        <td className="px-4 py-2.5 font-medium text-blue-600"><span className="bg-blue-50 px-1.5 py-0.5 rounded">{inv.id}</span></td>
                                        <td className="px-4 py-2.5 text-slate-800 font-medium truncate max-w-[200px]" title={inv.pharmaceuticalCompany}>
                                            {inv.pharmaceuticalCompany}
                                        </td>
                                        <td className="px-4 py-2.5 text-slate-600 truncate max-w-[150px]">{inv.supplierName}</td>
                                        <td className="px-4 py-2.5 text-right font-bold text-slate-700">{inv.totalAmount.toFixed(2)}</td>
                                        <td className="px-4 py-2.5 text-right text-green-600 font-medium">{inv.paidAmount.toFixed(2)}</td>
                                        <td className="px-4 py-2.5 text-right text-red-500 font-medium">{inv.dueAmount > 0 ? inv.dueAmount.toFixed(2) : '-'}</td>
                                        <td className="px-4 py-2.5 text-center">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold capitalize
                                                ${inv.status === 'Paid' ? 'bg-green-100 text-green-700 border border-green-200' :
                                                    inv.status === 'Due' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'}`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2.5">
                                            <div className="flex items-center justify-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                                                <Button
                                                    size="sm"
                                                    className="h-6 px-2 bg-sky-500 hover:bg-sky-600 text-white shadow-sm border-0 text-[10px] gap-1"
                                                    onClick={() => setSelectedInvoice(inv)}
                                                >
                                                    <Eye size={10} /> View
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-6 w-6 text-slate-500 hover:text-blue-600 border-slate-200"
                                                    onClick={() => handleEdit(inv)}
                                                >
                                                    <Edit size={10} />
                                                </Button>
                                                <Button size="icon" variant="outline" className="h-6 w-6 text-slate-500 hover:text-red-600 border-slate-200">
                                                    <Trash2 size={10} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-slate-50 border-t border-slate-200">
                                <tr>
                                    <td colSpan={5} className="px-4 py-3 text-right font-bold text-slate-500 uppercase text-[10px] tracking-wider">Totals</td>
                                    <td className="px-4 py-3 text-right font-bold text-slate-800">{totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'BDT' })}</td>
                                    <td className="px-4 py-3 text-right font-bold text-green-600">{totalPaid.toLocaleString('en-US', { style: 'currency', currency: 'BDT' })}</td>
                                    <td className="px-4 py-3 text-right font-bold text-red-600">{totalDue.toLocaleString('en-US', { style: 'currency', currency: 'BDT' })}</td>
                                    <td colSpan={2}></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Detail Modal */}
                {selectedInvoice && (
                    <InvoiceDetailModal
                        invoice={selectedInvoice}
                        onClose={() => setSelectedInvoice(null)}
                        onBack={() => setSelectedInvoice(null)}
                    />
                )}

                {/* Add Purchase Modal */}
                <AddPurchaseModal
                    isOpen={isAddModalOpen}
                    onClose={() => {
                        setIsAddModalOpen(false);
                        setEditingInvoice(null);
                    }}
                    initialData={editingInvoice}
                />
            </div>
        </DashboardLayout>
    );
}
