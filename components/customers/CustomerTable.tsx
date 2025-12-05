'use client';

import React from 'react';
import { Customer } from '@/services/mockCustomerData';
import { Edit, Trash2, Star, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface CustomerTableProps {
    customers: Customer[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-100 text-left bg-slate-50/50">
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Allergies</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Loyalty Points</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Member Since</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {customers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                            {customer.avatar || customer.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{customer.name}</p>
                                            <p className="text-xs text-slate-500">{customer.address}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Phone size={14} />
                                            <span className="text-sm">{customer.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Mail size={14} />
                                            <span className="text-sm">{customer.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {customer.allergies.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {customer.allergies.map((allergy, index) => (
                                                <Badge key={index} variant="danger">
                                                    {allergy}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-slate-400 text-sm">None</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1">
                                        <Star size={16} className="fill-amber-400 text-amber-400" />
                                        <span className="font-medium text-slate-700">{customer.loyaltyPoints}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-slate-600">{customer.memberSince}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                                            <Edit size={16} />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-600">
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerTable;
