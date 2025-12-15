import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Supplier } from '@/lib/types';
import { FileText, Download, Printer } from 'lucide-react';

interface SupplierSummaryProps {
    supplier: Supplier;
}

export const SupplierSummary: React.FC<SupplierSummaryProps> = ({ supplier }) => {
    // Mock dashboard stats based on supplier data (or random for demo)
    const stats = {
        totalInvoices: supplier.purchaseInvoiceCount,
        totalAmount: 113627.29,
        totalPaid: 113627.29,
        totalDue: 0.00
    };

    const paymentHistory = [
        { date: '21/10/2025', amount: 1747.00 },
        { date: '18/10/2025', amount: 1710.00 },
        { date: '07/10/2025', amount: 1280.00 },
        { date: '27/09/2025', amount: 2794.00 },
        { date: '25/09/2025', amount: 5252.00 },
        { date: '16/09/2025', amount: 8020.00 },
        { date: '06/09/2025', amount: 2732.00 },
        { date: '16/08/2025', amount: 2582.00 },
        { date: '05/08/2025', amount: 476.00 },
        { date: '24/07/2025', amount: 4075.00 },
    ];

    const totalHistoryAmount = paymentHistory.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-indigo-600 text-white p-6 border-0 shadow-lg shadow-indigo-600/20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-1">{stats.totalInvoices}</h3>
                        <p className="text-indigo-100 text-sm font-medium">Total Invoices</p>
                    </div>
                    <div className="absolute right-[-20px] top-[-20px] opacity-10">
                        <FileText size={100} />
                    </div>
                </Card>
                <Card className="bg-sky-500 text-white p-6 border-0 shadow-lg shadow-sky-500/20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-1">{stats.totalAmount.toLocaleString()} BDT</h3>
                        <p className="text-sky-100 text-sm font-medium">Total Invoice Amount (Tk.)</p>
                    </div>
                </Card>
                <Card className="bg-emerald-500 text-white p-6 border-0 shadow-lg shadow-emerald-500/20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-1">{stats.totalPaid.toLocaleString()} BDT</h3>
                        <p className="text-emerald-100 text-sm font-medium">Total Paid (Tk.)</p>
                    </div>
                </Card>
                <Card className="bg-cyan-500 text-white p-6 border-0 shadow-lg shadow-cyan-500/20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-1">{stats.totalDue.toLocaleString()} BDT</h3>
                        <p className="text-cyan-100 text-sm font-medium">Total Due (Tk.)</p>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Info */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200 bg-slate-50">
                        <h3 className="font-bold text-slate-800">Supplier Details</h3>
                    </div>
                    <div className="p-6">
                        <table className="w-full text-sm">
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="py-3 font-semibold text-slate-500 w-1/3">Full Name:</td>
                                    <td className="py-3 text-slate-800 font-medium">{supplier.name}</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-semibold text-slate-500">Pharmaceutical Company:</td>
                                    <td className="py-3 text-slate-800">{supplier.company}</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-semibold text-slate-500">Address:</td>
                                    <td className="py-3 text-slate-600">{supplier.address || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-semibold text-slate-500">NID:</td>
                                    <td className="py-3 text-slate-600">{supplier.nid || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-semibold text-slate-500">Phone:</td>
                                    <td className="py-3 text-blue-600 font-medium">{supplier.phone}</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-semibold text-slate-500">Email:</td>
                                    <td className="py-3 text-slate-600">{supplier.email || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment History */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800">Supplier Payment History</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-7 text-xs gap-1"><Download size={12} /> CSV</Button>
                            <Button variant="outline" size="sm" className="h-7 text-xs gap-1"><Download size={12} /> Excel</Button>
                            <Button variant="outline" size="sm" className="h-7 text-xs gap-1"><Printer size={12} /> Print</Button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto max-h-[400px]">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 text-left font-semibold text-slate-600">Date</th>
                                    <th className="px-6 py-3 text-right font-semibold text-slate-600">Amount (BDT)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paymentHistory.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-3 text-slate-600">{item.date}</td>
                                        <td className="px-6 py-3 text-right font-mono text-slate-700">{item.amount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-slate-50 border-t border-slate-200 sticky bottom-0">
                                <tr>
                                    <td className="px-6 py-3 text-right font-bold text-slate-600">Total</td>
                                    <td className="px-6 py-3 text-right font-bold text-slate-800">{totalHistoryAmount.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="p-3 border-t border-slate-200 text-xs text-slate-500 text-center">
                        Showing 1 to 10 of 31 entries
                    </div>
                </div>
            </div>
        </div>
    );
};
