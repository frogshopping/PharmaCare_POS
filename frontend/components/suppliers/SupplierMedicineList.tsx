import React, { useEffect, useState } from 'react';
import { Medicine, Supplier } from '@/lib/types';
import { medicineService } from '@/services/medicineService';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

interface SupplierMedicineListProps {
    supplier: Supplier;
}

export const SupplierMedicineList: React.FC<SupplierMedicineListProps> = ({ supplier }) => {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMedicines = async () => {
            // In a real app, we'd filter by supplier ID in the API
            // For mock, we'll fetch all and filter client-side if the supplier field matches
            // However, mock data names might not match exactly, so we'll show a subset or all for demo
            const allMedicines = await medicineService.getAll();
            // Simple filtering simulation
            const supplierMedicines = allMedicines.filter(m =>
                m.supplier?.toLowerCase().includes(supplier.name.toLowerCase()) ||
                m.supplier?.toLowerCase().includes(supplier.company.toLowerCase()) ||
                !m.supplier // Include some without supplier for demo population if needed, but ideally match
            ).slice(0, 10); // Limit for demo

            // If no matches found (likely in mock data mismatch), show some random ones for UI demo
            if (supplierMedicines.length === 0) {
                setMedicines(allMedicines.slice(0, 8));
            } else {
                setMedicines(supplierMedicines);
            }
        };
        fetchMedicines();
    }, [supplier]);

    const filteredMedicines = medicines.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.genericName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Medicine Items</h3>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <Input
                        placeholder="Search medicines..."
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
                            <th className="px-6 py-3 font-semibold text-slate-600">SL No.</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Medicine Name</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Barcode</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Strength</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Generic Name</th>
                            <th className="px-6 py-3 font-semibold text-slate-600">Stock</th>
                            <th className="px-6 py-3 font-semibold text-slate-600 text-right">Trade Price</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredMedicines.map((item, idx) => (
                            <tr key={item.id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-3 text-slate-500">{idx + 1}</td>
                                <td className="px-6 py-3 font-medium text-slate-800">{item.name}</td>
                                <td className="px-6 py-3 text-slate-600 font-mono text-xs">{item.barcode}</td>
                                <td className="px-6 py-3 text-slate-600">{item.strength}</td>
                                <td className="px-6 py-3 text-slate-600">{item.genericName}</td>
                                <td className="px-6 py-3">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium 
                                        ${item.inStock > 20 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {item.inStock}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-right font-medium text-slate-700">{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-3 border-t border-slate-200 text-xs text-slate-500 text-center">
                Showing {filteredMedicines.length} entries
            </div>
        </div>
    );
};
