'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CustomerStatCard from '@/components/customers/CustomerStatCard';
import CustomerTable from '@/components/customers/CustomerTable';
import { customers as initialCustomers } from '@/services/mockCustomerData';
import { AddCustomerModal } from '@/components/customers/AddCustomerModal';
import { Users, AlertTriangle, Star, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function CustomersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

    // Filter customers
    const filteredCustomers = initialCustomers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );

    const totalCustomers = initialCustomers.length;
    const withAllergies = initialCustomers.filter(c => c.allergies.length > 0).length;
    const totalPoints = initialCustomers.reduce((acc, curr) => acc + curr.loyaltyPoints, 0);

    return (
        <DashboardLayout>
            <div className="p-6 space-y-6 h-full overflow-y-auto custom-scrollbar">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Customer Management</h1>
                        <p className="text-slate-500 text-sm">Manage your customer database and records</p>
                    </div>
                    <Button className="gap-2 shadow-lg shadow-blue-600/20" onClick={() => setIsAddCustomerOpen(true)}>
                        <Plus size={20} />
                        Add Customer
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <CustomerStatCard
                        title="Total Customers"
                        value={totalCustomers}
                        icon={Users}
                        color="blue"
                    />
                    <CustomerStatCard
                        title="With Allergies"
                        value={withAllergies}
                        icon={AlertTriangle}
                        color="orange"
                    />
                    <CustomerStatCard
                        title="Total Loyalty Points"
                        value={totalPoints}
                        icon={Star}
                        color="green"
                    />
                </div>

                {/* Search */}
                <div className="max-w-md">
                    <Input
                        icon={<Search size={20} />}
                        placeholder="Search customers by name, phone, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="py-6"
                    />
                </div>

                {/* Table */}
                <CustomerTable customers={filteredCustomers} />
            </div>

            <AddCustomerModal
                isOpen={isAddCustomerOpen}
                onClose={() => setIsAddCustomerOpen(false)}
                onSuccess={() => console.log('Customer Added')}
            />
        </DashboardLayout>
    );
}
