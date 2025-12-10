import React, { useState } from 'react';
import { Supplier } from '@/lib/types';
import { Search, Eye, Edit } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface SupplierInvoiceListProps {
    supplier: Supplier;
}

export const SupplierInvoiceList: React.FC<SupplierInvoiceListProps> = ({ supplier }) => {
    // Mock invoices
    const [invoices] = useState([
        { id: '24L1379849', date: '2025-01-10', total: 3520.00, status: 'Paid' },
        { id: 'INCEPTA280125', date: '2025-01-28', total: 316.00, status: 'Paid' },
        { id: '24L1442063', date: '2025-02-04', total: 2210.29, status: 'Paid' },
        { id: '24L16495', date: '2025-02-08', total: 880.00, status: 'Paid' },
        { id: '24L1449496', date: '2025-02-10', total: 3400.00, status: 'Paid' },
        { id: '24L1455762', date: '2025-02-15', total: 2644.00, status: 'Paid' },
        { id: '24L1470847', date: '2025-02-28', total: 1060.00, status: 'Paid' },
        { id: '24L151558', date: '2025-04-12', total: 4625.00, status: 'Paid' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredInvoices = invoices.filter(inv =>
        inv.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">CSV</Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs">Excel</Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs">Print</Button>
                </div>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <Input
                        placeholder="Search invoice..."
                        className="pl-9 h-8 text-xs"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-slate-600 w-16">SL No.</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Purchase Date</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Invoice</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Pharmaceutical Company</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Supplier</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Supplier Contact</th>
                            <th className="px-6 py-3 font-semibold text-slate-600 text-right">Total Amount (BDT)</th>
                            <th className="px-6 py-3 font-semibold text-slate-600 text-center">Status</th>
                            <th className="px-6 py-3 font-semibold text-slate-600 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredInvoices.map((inv, idx) => (
                            <tr key={inv.id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-3 text-slate-500">{idx + 1}</td>
                                <td className="px-6 py-3 text-slate-600">{inv.date}</td>
                                <td className="px-6 py-3 font-mono text-xs text-blue-600">{inv.id}</td>
                                <td className="px-6 py-3 text-slate-800">{supplier.company}</td>
                                <td className="px-6 py-3 text-slate-600">{supplier.name}</td>
                                <td className="px-6 py-3 text-slate-600">{supplier.phone}</td>
                                <td className="px-6 py-3 text-right font-medium text-slate-700">{inv.total.toFixed(2)}</td>
                                <td className="px-6 py-3 text-center">
                                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="px-6 py-3 flex justify-center gap-1">
                                    <Button size="sm" className="h-6 px-2 bg-sky-500 hover:bg-sky-600 text-white text-[10px]" onClick={() => { }}>
                                        <Eye size={10} className="mr-1" /> View
                                    </Button>
                                    <Button size="sm" className="h-6 px-2 bg-indigo-500 hover:bg-indigo-600 text-white text-[10px]" onClick={() => { }}>
                                        <Edit size={10} className="mr-1" /> Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
