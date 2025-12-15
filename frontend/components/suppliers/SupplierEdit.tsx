import React, { useState, useEffect } from 'react';
import { Supplier } from '@/lib/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { supplierService } from '@/services/supplierService';
import CreatableSelect from 'react-select/creatable';

interface SupplierEditProps {
    supplier: Supplier;
}

interface Option {
    readonly label: string;
    readonly value: string;
}

export const SupplierEdit: React.FC<SupplierEditProps> = ({ supplier }) => {
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState<Option[]>([]);
    const [formData, setFormData] = useState<Partial<Supplier>>({
        name: supplier.name,
        company: supplier.company,
        email: supplier.email || '',
        phone: supplier.phone,
        address: supplier.address || '',
    });

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const names = await supplierService.getCompanies();
                setCompanies(names.map(name => ({ label: name, value: name })));
            } catch (error) {
                console.error('Failed to fetch companies', error);
            }
        };
        fetchCompanies();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCompanyChange = (newValue: any) => {
        setFormData({ ...formData, company: newValue ? newValue.value : '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await supplierService.update(supplier.id, formData);
            // Optionally show success message or refresh
            alert('Supplier updated successfully');
        } catch (error) {
            console.error('Failed to update supplier', error);
            alert('Failed to update supplier');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500 p-6">
            <h3 className="font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Edit Supplier Details</h3>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Contact Person Name</label>
                        <Input name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Pharmaceutical Company</label>
                        <CreatableSelect
                            isClearable
                            options={companies}
                            onChange={handleCompanyChange}
                            value={formData.company ? { label: formData.company, value: formData.company } : null}
                            placeholder="Select or type..."
                            className="text-sm"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    height: '40px',
                                    borderColor: '#e2e8f0',
                                    '&:hover': { borderColor: '#cbd5e1' }
                                })
                            }}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Email</label>
                        <Input name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Phone</label>
                        <Input name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="col-span-1 md:col-span-2 space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Address</label>
                        <Input name="address" value={formData.address} onChange={handleChange} />
                    </div>
                </div>

                <div className="pt-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-32" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
