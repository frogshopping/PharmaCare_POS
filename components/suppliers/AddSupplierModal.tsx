import React, { useState, useEffect } from 'react';
import { Supplier } from '@/lib/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import CreatableSelect from 'react-select/creatable';
import { supplierService } from '@/services/supplierService';

interface AddSupplierModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (supplier: Supplier) => void;
    createSupplier: (supplier: Partial<Supplier>) => Promise<Supplier>;
}

interface Option {
    readonly label: string;
    readonly value: string;
}

export const AddSupplierModal: React.FC<AddSupplierModalProps> = ({ isOpen, onClose, onSuccess, createSupplier }) => {
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState<Option[]>([]);
    const [formData, setFormData] = useState<Partial<Supplier>>({
        name: '',
        company: '',
        phone: '',
        email: '',
        address: '',
    });

    useEffect(() => {
        if (isOpen) {
            const fetchCompanies = async () => {
                try {
                    const names = await supplierService.getCompanies();
                    setCompanies(names.map(name => ({ label: name, value: name })));
                } catch (error) {
                    console.error('Failed to fetch companies', error);
                }
            };
            fetchCompanies();
        }
    }, [isOpen]);

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
            const newSupplier = await createSupplier(formData);
            onSuccess(newSupplier);
            onClose();
            // Reset form
            setFormData({
                name: '',
                company: '',
                phone: '',
                email: '',
                address: '',
            });
        } catch (error) {
            console.error('Failed to create supplier', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800">Add New Supplier</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Contact Person Name *</label>
                            <Input name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Company Name *</label>
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
                            <label className="text-xs font-semibold text-slate-500">Phone Number *</label>
                            <Input name="phone" required value={formData.phone} onChange={handleChange} placeholder="e.g. 01700000000" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Email</label>
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. john@example.com" />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Address</label>
                            <Input name="address" value={formData.address} onChange={handleChange} placeholder="Full address" />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-4">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Supplier'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
