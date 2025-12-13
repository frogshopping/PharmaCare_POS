'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CustomerStatCard from '@/components/customers/CustomerStatCard';
import CustomerTable from '@/components/customers/CustomerTable';
import { Customer } from '@/lib/types';
import { customerService } from '@/services/customerService';
import { AddCustomerModal } from '@/components/customers/AddCustomerModal';
import { EditCustomerModal } from '@/components/customers/EditCustomerModal';
import { Users, Search, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
    const [isEditCustomerOpen, setIsEditCustomerOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [pagination, setPagination] = useState({ currentPage: 1, totalItems: 0, itemsPerPage: 20 });

    const fetchCustomers = async (search = searchTerm) => {
        setIsLoading(true);
        try {
            const { data, pagination: pag } = await customerService.getAll(1, 20, search);
            setCustomers(data);
            setPagination(pag);
        } catch (error) {
            console.error('Failed to fetch customers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCustomers(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleDelete = async (customer: Customer) => {
        if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
            try {
                await customerService.delete(customer.id);
                // Refresh list
                fetchCustomers();
            } catch (error) {
                console.error("Failed to delete customer:", error);
                alert("Failed to delete customer. Please try again.");
            }
        }
    };

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b border-slate-200 px-8 py-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
                            <p className="text-slate-500 text-sm mt-1">Manage customer profiles and history</p>
                        </div>
                        <Button
                            className="gap-2 shadow-lg shadow-blue-600/20 bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => setIsAddCustomerOpen(true)}
                        >
                            <UserPlus size={18} />
                            Add Customer
                        </Button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-7xl mx-auto">
                        <CustomerStatCard
                            title="Total Customers"
                            value={pagination.totalItems}
                            icon={Users}
                            color="blue"
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    <div className="max-w-7xl mx-auto space-y-6">

                        {/* Search Toolbar */}
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <Input
                                    placeholder="Search by name, phone, or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-slate-200"
                                />
                            </div>
                            <div className="flex gap-2 text-sm text-slate-500">
                                {isLoading ? 'Loading...' : (
                                    <>Showing <span className="font-semibold text-slate-800">{customers.length}</span> of {pagination.totalItems} customers</>
                                )}
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                            <CustomerTable
                                customers={customers}
                                onEdit={(customer) => {
                                    setEditingCustomer(customer);
                                    setIsEditCustomerOpen(true);
                                }}
                                onDelete={handleDelete}
                            />
                        </div>
                    </div>
                </div>

                <AddCustomerModal
                    isOpen={isAddCustomerOpen}
                    onClose={() => setIsAddCustomerOpen(false)}
                    onSuccess={() => fetchCustomers()}
                />

                <EditCustomerModal
                    isOpen={isEditCustomerOpen}
                    onClose={() => setIsEditCustomerOpen(false)}
                    customer={editingCustomer}
                    onSuccess={() => fetchCustomers()}
                />
            </div>
        </DashboardLayout>
    );
}
