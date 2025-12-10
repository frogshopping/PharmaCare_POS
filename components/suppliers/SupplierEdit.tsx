import React, { useState } from 'react';
import { Supplier } from '@/lib/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface SupplierEditProps {
    supplier: Supplier;
}

export const SupplierEdit: React.FC<SupplierEditProps> = ({ supplier }) => {
    const [formData, setFormData] = useState({
        name: supplier.name,
        company: supplier.company,
        email: supplier.email || '',
        phone: supplier.phone,
        nid: supplier.nid || '',
        address: supplier.address || '',
        city: supplier.city || '',
        state: supplier.state || '',
        country: supplier.country || 'Bangladesh',
        status: supplier.status,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500 p-6">
            <h3 className="font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Edit Supplier Details</h3>

            <form className="space-y-4 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Contact Person Name</label>
                        <Input name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Pharmaceutical Company</label>
                        <Input name="company" value={formData.company} onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Email</label>
                        <Input name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Phone</label>
                        <Input name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">National ID#</label>
                        <Input name="nid" value={formData.nid} onChange={handleChange} />
                    </div>
                    <div className="col-span-1 md:col-span-2 space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Address</label>
                        <Input name="address" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">City</label>
                        <Input name="city" value={formData.city} onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">State</label>
                        <Input name="state" value={formData.state} onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Country</label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    {/* Password field was shown in image but optional/hidden for now as it's supplier management */}
                </div>

                <div className="pt-4">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-32">Submit</Button>
                </div>
            </form>
        </div>
    );
};
