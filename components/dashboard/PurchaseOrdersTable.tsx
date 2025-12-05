'use client';

import React from 'react';
import { MoreVertical } from 'lucide-react';

interface PurchaseOrder {
    id: string;
    poNumber: string;
    supplier: string;
    date: string;
    amount: number;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Delivered';
}

interface PurchaseOrdersTableProps {
    orders: PurchaseOrder[];
}

const PurchaseOrdersTable: React.FC<PurchaseOrdersTableProps> = ({ orders }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            case 'Delivered':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Purchase Orders</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-600 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3 font-medium">PO Number</th>
                            <th className="px-4 py-3 font-medium">Supplier</th>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3 font-medium">Amount</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                    No purchase orders
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 text-gray-900 font-medium">{order.poNumber}</td>
                                    <td className="px-4 py-3 text-gray-900">{order.supplier}</td>
                                    <td className="px-4 py-3 text-gray-600">{order.date}</td>
                                    <td className="px-4 py-3 text-gray-900 font-semibold">${order.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
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

export default PurchaseOrdersTable;

