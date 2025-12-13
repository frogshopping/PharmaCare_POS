"use client"

import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getSalesHistory, Sale } from '@/services/mockSalesData';
import { SalesFilters } from '@/components/sales/SalesFilters';
import { InvoiceViewModal } from '@/components/sales/invoice-view-modal';
import { StatusUpdateModal } from '@/components/sales/status-update-modal';
import { ReturnModal } from '@/components/sales/return-modal';
import {
    Plus,
    MoreHorizontal,
    Trash2,
    Eye,
    Settings,
    Download
} from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function SalesPage() {
    const router = useRouter();
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Modal State
    const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                setLoading(true);
                const data = await getSalesHistory();
                setSales(data);
            } catch (error) {
                console.error("Failed to fetch sales history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSales();
    }, []);

    const filteredSales = useMemo(() => {
        return sales.filter(sale => {
            const matchesSearch =
                sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sale.customerName.toLowerCase().includes(searchTerm.toLowerCase());
            // Add date filtering logic here if needed
            return matchesSearch;
        });
    }, [sales, searchTerm, startDate, endDate]);

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Paid': return 'success'; // Green
            case 'Unpaid': return 'warning'; // Yellow/Orange (Use appropriate badge variant or custom class)
            case 'Partial': return 'default'; // Blue-ish
            case 'Canceled': return 'danger'; // Red
            default: return 'secondary';
        }
    };

    // Status colors based on the image: Paid (Dark grey/Black bg?), Unpaid (Yellow bg), etc. 
    // The shadcn Badge variants might need tweaking or custom classes to match exactly.
    // Image 1 shows: Unpaid = Yellow/Gold background, Paid = Dark Grey background.
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Paid': return 'bg-slate-700 hover:bg-slate-800 text-white border-transparent';
            case 'Unpaid': return 'bg-yellow-400 hover:bg-yellow-500 text-yellow-950 border-transparent';
            case 'Partial': return 'bg-blue-500 hover:bg-blue-600 text-white border-transparent';
            case 'Canceled': return 'bg-red-500 hover:bg-red-600 text-white border-transparent';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    const handleViewInvoice = (sale: Sale) => {
        setSelectedSale(sale);
        setIsViewModalOpen(true);
    };

    const handleOpenStatusModal = (sale: Sale) => {
        setSelectedSale(sale);
        setIsStatusModalOpen(true);
    };

    const handleStatusUpdate = (newStatus: Sale['status']) => {
        if (selectedSale) {
            setSales(sales.map(s => s.id === selectedSale.id ? { ...s, status: newStatus } : s));
            // In a real app, call API here
        }
    };

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">

                {/* Header */}
                <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-slate-800">List POS</h1>
                    <Button
                        className="gap-2 bg-green-500 hover:bg-green-600 text-white h-9 text-sm font-medium"
                        onClick={() => router.push('/sales/create')}
                    >
                        <Plus size={16} />
                        Add New
                    </Button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    <div className="max-w-[1600px] mx-auto space-y-4">

                        <SalesFilters
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            startDate={startDate}
                            onStartDateChange={setStartDate}
                            endDate={endDate}
                            onEndDateChange={setEndDate}
                            onFilter={() => { }}
                        />

                        <div className="flex justify-end mb-2">
                            <Button variant="outline" size="sm" className="bg-slate-600 text-white border-none hover:bg-slate-700 h-8 text-xs gap-1">
                                <Download size={14} /> Export
                            </Button>
                        </div>

                        {/* Table Card */}
                        <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-600 leading-tight">SRL. No.</th>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-600 leading-tight">Date & Time</th>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-600 leading-tight">Invoice ID</th>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-600 leading-tight">Store/Pharmacy</th>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-600 leading-tight">Name</th>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-600 leading-tight">Order Type</th>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-600 leading-tight text-center">Billing Amount(BDT)</th>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-600 leading-tight text-center">Paid(BDT)</th>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-600 leading-tight text-center">Due(BDT)</th>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-600 leading-tight text-center">Return(BDT)</th>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-600 leading-tight">Status</th>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-600 leading-tight">Post By</th>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-600 leading-tight">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {loading ? (
                                            <tr><td colSpan={13} className="px-4 py-12 text-center text-slate-500 text-xs">Loading...</td></tr>
                                        ) : filteredSales.length === 0 ? (
                                            <tr><td colSpan={13} className="px-4 py-12 text-center text-slate-500 text-xs">No transactions found.</td></tr>
                                        ) : (
                                            filteredSales.map((sale, index) => (
                                                <tr key={sale.id} className={`hover:bg-slate-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                                                    <td className="px-4 py-3 text-xs text-slate-600">{index + 76}</td>
                                                    <td className="px-4 py-3 text-xs text-slate-600">
                                                        <div>{format(new Date(sale.date), 'dd/MM/yyyy')}</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-slate-600">{sale.id}</td>
                                                    <td className="px-4 py-3 text-xs text-slate-600">{sale.storeName}</td>
                                                    <td className="px-4 py-3 text-xs text-slate-600 max-w-[200px] truncate" title={sale.customerName}>
                                                        <div>{sale.customerName}</div>
                                                        {sale.phone && <div className="text-[10px] text-slate-400">{sale.phone}</div>}
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-slate-600">{sale.orderType}</td>
                                                    <td className="px-4 py-3 text-xs text-slate-800 text-center font-medium bg-amber-50/50">{sale.billingAmount}</td>
                                                    <td className="px-4 py-3 text-xs text-slate-800 text-center font-medium bg-emerald-50/50">{sale.paidAmount.toFixed(2)}</td>
                                                    <td className="px-4 py-3 text-xs text-slate-800 text-center font-medium bg-red-50/50">{sale.dueAmount}</td>
                                                    <td className="px-4 py-3 text-xs text-slate-800 text-center font-medium">{sale.returnAmount.toFixed(2)}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex flex-col gap-1 items-start">
                                                            <Badge className={`text-[10px] px-2 py-0.5 rounded-sm font-normal cursor-pointer ${getStatusClass(sale.status)}`}
                                                                onClick={() => handleOpenStatusModal(sale)}
                                                            >
                                                                {sale.status}
                                                            </Badge>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-slate-600 uppercase">{sale.postBy}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-1">
                                                            <Button
                                                                onClick={() => handleViewInvoice(sale)}
                                                                size="sm"
                                                                className="h-7 px-2 text-[10px] bg-cyan-500 hover:bg-cyan-600 text-white gap-1 rounded-sm"
                                                            >
                                                                <Eye size={12} /> View
                                                            </Button>

                                                            <Button
                                                                size="sm"
                                                                className="h-7 w-7 p-0 bg-indigo-500 hover:bg-indigo-600 text-white rounded-sm"
                                                            >
                                                                <Settings size={12} />
                                                            </Button>

                                                            <Button
                                                                size="sm"
                                                                className="h-7 w-auto px-2 text-[10px] bg-red-400 hover:bg-red-500 text-white gap-1 rounded-sm"
                                                            >
                                                                <Trash2 size={12} /> Delete
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <InvoiceViewModal
                    isOpen={isViewModalOpen}
                    onClose={() => setIsViewModalOpen(false)}
                    sale={selectedSale}
                />

                <StatusUpdateModal
                    isOpen={isStatusModalOpen}
                    onClose={() => setIsStatusModalOpen(false)}
                    sale={selectedSale}
                    onUpdateStatus={handleStatusUpdate}
                />

                <ReturnModal
                    isOpen={isReturnModalOpen}
                    onClose={() => setIsReturnModalOpen(false)}
                    sale={selectedSale}
                />

            </div>
        </DashboardLayout>
    );
}
