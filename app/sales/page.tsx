"use client"

import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { getSalesHistory, Sale } from '@/services/mockSalesData';
import {
    ShoppingCart,
    DollarSign,
    CalendarRange,
    Search,
    Download,
    Plus,
    Filter,
    ArrowUpRight,
    MoreHorizontal
} from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function SalesPage() {
    const router = useRouter();
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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
        return sales.filter(sale =>
            sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sale.customerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sales, searchTerm]);

    // Statistics
    const todaysSalesCount = 3;
    const todaysRevenue = 479.50;
    const averageSale = 159.83;

    const getStatusVariant = (status: Sale['status']) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'Pending': return 'warning';
            case 'Refunded': return 'danger';
            case 'Cancelled': return 'secondary';
            default: return 'default';
        }
    };

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">

                {/* Header */}
                <div className="bg-white border-b border-slate-200 px-8 py-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Sales & Transactions</h1>
                            <p className="text-slate-500 text-sm mt-1">Track daily sales, revenue and transaction history</p>
                        </div>
                        <Button
                            className="gap-2 shadow-lg shadow-blue-600/20 bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => router.push('/sales/create')}
                        >
                            <Plus size={18} />
                            New Sale
                        </Button>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-7xl mx-auto">
                        <Card className="p-5 flex items-center justify-between border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">Today's Sales</p>
                                <h3 className="text-2xl font-bold text-slate-800">{todaysSalesCount}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <ShoppingCart size={20} />
                            </div>
                        </Card>
                        <Card className="p-5 flex items-center justify-between border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">Today's Revenue</p>
                                <h3 className="text-2xl font-bold text-slate-800">${todaysRevenue.toFixed(2)}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <DollarSign size={20} />
                            </div>
                        </Card>
                        <Card className="p-5 flex items-center justify-between border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">Average Sale</p>
                                <h3 className="text-2xl font-bold text-slate-800">${averageSale.toFixed(2)}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                <ArrowUpRight size={20} />
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    <div className="max-w-7xl mx-auto space-y-6">

                        {/* Filters */}
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <Input
                                    placeholder="Search invoice or customer..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white border-slate-200"
                                />
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <Button variant="outline" className="gap-2 bg-white text-slate-600 border-slate-200 hover:bg-slate-50">
                                    <CalendarRange size={16} />
                                    This Month
                                </Button>
                                <Button variant="outline" className="gap-2 bg-white text-slate-600 border-slate-200 hover:bg-slate-50">
                                    <Filter size={16} />
                                    Filter
                                </Button>
                                <Button variant="outline" className="gap-2 bg-white text-slate-600 border-slate-200 hover:bg-slate-50">
                                    <Download size={16} />
                                    Export
                                </Button>
                            </div>
                        </div>

                        {/* Table Card */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50/50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Invoice ID</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Customer</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date & Time</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Items</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Payment</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                                                    Loading...
                                                </td>
                                            </tr>
                                        ) : filteredSales.length === 0 ? (
                                            <tr>
                                                <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                                                    No transactions found.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredSales.map((sale) => (
                                                <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <span className="font-mono text-sm text-slate-600 group-hover:text-blue-600 transition-colors">{sale.id}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-slate-800">{sale.customerName}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-slate-600">{format(new Date(sale.date), 'MMM dd, yyyy')}</div>
                                                        <div className="text-xs text-slate-400">{format(new Date(sale.date), 'hh:mm a')}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                                            {sale.itemsCount} Items
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-slate-800">
                                                        ${sale.totalAmount.toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-600">
                                                        {sale.paymentMethod}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Badge variant={getStatusVariant(sale.status)}>
                                                            {sale.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                                                            <MoreHorizontal size={18} />
                                                        </Button>
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

            </div>
        </DashboardLayout>
    );
}
