import React, { useState } from 'react';
import { Supplier } from '@/lib/types';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface SupplierTransactionListProps {
    supplier: Supplier;
}

export const SupplierTransactionList: React.FC<SupplierTransactionListProps> = ({ supplier }) => {
    // Mock transactions
    const [transactions] = useState([
        { date: '18/01/2025', account: 'Cash', category: 'Purchase', description: 'Payment of INCEPTA180125', amount: 2776.84 },
        { date: '28/01/2025', account: 'Cash', category: 'Purchase', description: 'Payment of INCEPTA280125', amount: 316.00 },
        { date: '04/02/2025', account: 'Cash', category: 'Purchase', description: 'Payment of 24L1442063', amount: 2210.29 },
        { date: '10/02/2025', account: 'Cash', category: 'Purchase', description: `Payment of ${supplier.company} #24L1449496`, amount: 3400.00 },
        { date: '15/02/2025', account: 'Cash', category: 'Purchase', description: `Payment of ${supplier.company} #24L1455762`, amount: 2644.00 },
    ]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTransactions = transactions.filter(t =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const total = transactions.reduce((acc, curr) => acc + curr.amount, 0);

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
                        placeholder="Search..."
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
                            <th className="px-6 py-3 font-semibold text-slate-600">Date</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Account</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Category</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Description</th>
                            <th className="px-6 py-3 font-semibold text-slate-600 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredTransactions.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                                <td className="px-6 py-3 text-slate-600">{item.date}</td>
                                <td className="px-6 py-3 text-slate-600">{item.account}</td>
                                <td className="px-6 py-3 text-slate-600">{item.category}</td>
                                <td className="px-6 py-3 text-slate-600">{item.description}</td>
                                <td className="px-6 py-3 text-right font-medium text-slate-700">{item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-slate-50 border-t border-slate-200">
                        <tr>
                            <td colSpan={4} className="px-6 py-3 text-right font-bold text-slate-600">Total</td>
                            <td className="px-6 py-3 text-right font-bold text-slate-800">{total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="p-3 border-t border-slate-200 text-xs text-slate-500 text-center">
                Showing {filteredTransactions.length} entries
            </div>
        </div>
    );
};
