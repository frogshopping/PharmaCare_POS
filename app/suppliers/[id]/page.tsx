'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { medicineService } from '@/services/medicineService';
import { Supplier } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    CreditCard,
    Edit,
    ArrowLeft,
    User,
    Camera
} from 'lucide-react';
import { SupplierSummary } from '@/components/suppliers/SupplierSummary';
import { SupplierMedicineList } from '@/components/suppliers/SupplierMedicineList';
import { SupplierInvoiceList } from '@/components/suppliers/SupplierInvoiceList';
import { SupplierTransactionList } from '@/components/suppliers/SupplierTransactionList';
import { SupplierEdit } from '@/components/suppliers/SupplierEdit';

export default function SupplierDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [supplier, setSupplier] = useState<Supplier | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('summary');

    useEffect(() => {
        const fetchSupplier = async () => {
            if (params.id) {
                const data = await medicineService.getSupplierById(params.id as string);
                setSupplier(data);
                setLoading(false);
            }
        };
        fetchSupplier();
    }, [params.id]);

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex-1 flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </DashboardLayout>
        );
    }

    if (!supplier) {
        return (
            <DashboardLayout>
                <div className="flex-1 flex flex-col items-center justify-center h-full gap-4">
                    <p className="text-slate-500">Supplier not found</p>
                    <Button onClick={() => router.push('/suppliers')} variant="outline">Back to Suppliers</Button>
                </div>
            </DashboardLayout>
        );
    }

    const tabs = [
        { id: 'summary', label: 'Summary', icon: LayoutDashboard },
        { id: 'medicines', label: 'Medicine Items', icon: Package },
        { id: 'invoices', label: 'Purchase Invoices (32)', icon: ShoppingCart },
        { id: 'transactions', label: 'Transactions', icon: CreditCard },
        { id: 'edit', label: 'Edit', icon: Edit },
    ];

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
                {/* Header with Back Button */}
                <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/suppliers')} className="text-slate-500 hover:text-slate-700">
                        <ArrowLeft size={20} />
                    </Button>
                    <h1 className="text-xl font-bold text-slate-800">Supplier Profile</h1>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto">
                        <div className="p-6 flex flex-col items-center border-b border-slate-100">
                            <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 relative mb-3 group cursor-pointer">
                                <User size={48} />
                                <div className="absolute top-0 right-0 p-1 bg-white rounded-full border border-slate-200 shadow-sm text-slate-500 group-hover:text-blue-600 transition-colors">
                                    <Camera size={14} />
                                </div>
                            </div>
                            <h2 className="text-lg font-bold text-slate-800 text-center">{supplier.name.split(' ')[0]}</h2>
                            <p className="text-xs text-slate-500 text-center mt-1">{supplier.company}</p>
                        </div>

                        <nav className="p-4 space-y-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all
                                        ${activeTab === tab.id
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    <tab.icon size={18} />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                        <div className="max-w-[1600px] mx-auto">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">
                                    {activeTab === 'summary' && 'Supplier Dashboard'}
                                    {activeTab === 'medicines' && 'Medicine Items'}
                                    {activeTab === 'invoices' && 'Purchase Invoices'}
                                    {activeTab === 'transactions' && 'Transactions'}
                                    {activeTab === 'edit' && 'Edit Profile'}
                                </h2>
                            </div>

                            {activeTab === 'summary' && <SupplierSummary supplier={supplier} />}
                            {activeTab === 'medicines' && <SupplierMedicineList supplier={supplier} />}
                            {activeTab === 'invoices' && <SupplierInvoiceList supplier={supplier} />}
                            {activeTab === 'transactions' && <SupplierTransactionList supplier={supplier} />}
                            {activeTab === 'edit' && <SupplierEdit supplier={supplier} />}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
