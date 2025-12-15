import React from 'react';
import { Input } from '@/components/ui/Input';
import { Search, User, Mail, MapPin, Hash, Phone, FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface CustomerInfo {
    clientType: 'General' | 'Wholesale';
    discountType: 'General' | 'Pharmaceuticals Wis Discount';
    invoiceNumber: string; // Optional/Auto
    invoiceDate: string;
    orderType: string;
    phone: string;
    name: string;
    memberId: string;
    email: string;
    address: string;
    billingType: 'Invoice' | 'Quote';
}

export interface CustomerInfoSidebarProps {
    info: CustomerInfo;
    onChange: (updates: Partial<CustomerInfo>) => void;
    onAddCustomer: () => void;
}

export function CustomerInfoSidebar({ info, onChange, onAddCustomer }: CustomerInfoSidebarProps) {
    const handleChange = (field: keyof CustomerInfo, value: any) => {
        onChange({ [field]: value });
    };

    return (
        <div className="bg-white border-r border-slate-200 h-full flex flex-col overflow-y-auto custom-scrollbar">
            <div className="p-6 space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-slate-800">Customer Info.</h2>
                    <div className="flex bg-slate-100 rounded-lg p-1">
                        <button
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${info.billingType === 'Invoice' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            onClick={() => handleChange('billingType', 'Invoice')}
                        >
                            Invoice
                        </button>
                        <button
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${info.billingType === 'Quote' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            onClick={() => handleChange('billingType', 'Quote')}
                        >
                            Quote
                        </button>
                    </div>
                </div>

                {/* Client Type */}
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Client/Consumer Type</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="clientType"
                                checked={info.clientType === 'General'}
                                onChange={() => handleChange('clientType', 'General')}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-sm text-slate-700">General</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="clientType"
                                checked={info.clientType === 'Wholesale'}
                                onChange={() => handleChange('clientType', 'Wholesale')}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-sm text-slate-700">Wholesale</span>
                        </label>
                    </div>
                </div>

                {/* Discount Type */}
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Discount Type</label>
                    <div className="flex gap-4 flex-wrap">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="discountType"
                                checked={info.discountType === 'General'}
                                onChange={() => handleChange('discountType', 'General')}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-sm text-slate-700">General</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="discountType"
                                checked={info.discountType === 'Pharmaceuticals Wis Discount'}
                                onChange={() => handleChange('discountType', 'Pharmaceuticals Wis Discount')}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-sm text-slate-700">Pharma. Wis Discount</span>
                        </label>
                    </div>
                </div>

                {/* Invoice Number */}
                <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Invoice #</label>
                    <Input
                        placeholder="Auto Generated"
                        value={info.invoiceNumber}
                        onChange={(e) => handleChange('invoiceNumber', e.target.value)}
                        icon={<Hash size={16} />}
                        className="bg-slate-50"
                    />
                    <p className="text-[10px] text-slate-400 mt-1 italic">(Keep it blank to Generate Invoice Number Automatically)</p>
                </div>

                {/* Invoice Date */}
                <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Invoice Date*</label>
                    <Input
                        type="date"
                        value={info.invoiceDate}
                        onChange={(e) => handleChange('invoiceDate', e.target.value)}
                    />
                </div>

                {/* Order Type */}
                <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Order Type*</label>
                    <div className="relative">
                        <select
                            className="w-full flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all shadow-sm appearance-none"
                            value={info.orderType}
                            onChange={(e) => handleChange('orderType', e.target.value)}
                        >
                            <option value="Collection">Collection</option>
                            <option value="Delivery">Delivery</option>
                            <option value="Courier">Courier</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-slate-100 my-4" />

                {/* Customer Search / Details */}
                <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Phone</label>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Type phone & enter"
                            value={info.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            icon={<Phone size={16} />}
                        />
                        <Button variant="outline" size="icon" className="shrink-0">
                            <Search size={16} />
                        </Button>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Name*</label>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Customer Name"
                            value={info.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            icon={<User size={16} />}
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 text-blue-600 border-blue-200 hover:bg-blue-50"
                            onClick={onAddCustomer}
                            title="Add New Customer"
                        >
                            <Plus size={16} />
                        </Button>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Patient Member ID</label>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter Member ID"
                            value={info.memberId}
                            onChange={(e) => handleChange('memberId', e.target.value)}
                            icon={<FileText size={16} />}
                        />
                        <Button variant="outline" className="shrink-0 text-xs">
                            Check
                        </Button>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Email</label>
                    <Input
                        type="email"
                        placeholder="email@address.com"
                        value={info.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        icon={<Mail size={16} />}
                    />
                </div>

                <div className="pt-2">
                    <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-blue-600 gap-2 pl-0">
                        <MapPin size={16} />
                        Billing Address
                    </Button>
                    {/* Collapsible address field could go here */}
                </div>

            </div>
        </div>
    );
}
