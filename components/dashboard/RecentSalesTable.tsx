'use client';

import React from 'react';
import { MoreVertical } from 'lucide-react';

interface RecentSale {
    id: string;
    invoice: string;
    customer: string;
    date: string;
    amount: number;
    status: 'Completed' | 'Pending' | 'Cancelled';
}

interface RecentSalesTableProps {
    sales: RecentSale[];
}

const RecentSalesTable: React.FC<RecentSalesTableProps> = ({ sales }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Sales</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-600 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3 font-medium">Invoice</th>
                            <th className="px-4 py-3 font-medium">Customer</th>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3 font-medium">Amount</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                    No recent sales
                                </td>
                            </tr>
                        ) : (
                            sales.map((sale) => (
                                <tr key={sale.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 text-gray-900 font-medium">{sale.invoice}</td>
                                    <td className="px-4 py-3 text-gray-900">{sale.customer}</td>
                                    <td className="px-4 py-3 text-gray-600">{sale.date}</td>
                                    <td className="px-4 py-3 text-gray-900 font-semibold">${sale.amount.toFixed(2)}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                                            {sale.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentSalesTable;

