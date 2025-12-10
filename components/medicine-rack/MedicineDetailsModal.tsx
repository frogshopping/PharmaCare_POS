'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import {
    Package, Hash, Truck, Building2, Phone, CalendarCheck, Tag, Percent, ShoppingBag, Eye, Edit2, RotateCcw, ArrowLeft
} from 'lucide-react';
import { Medicine } from '@/services/api'; // Using api service types
import { DummyMedicine } from '@/services/rackDummyData';

// Type that can accept both Medicine and DummyMedicine
type MedicineData = Medicine | DummyMedicine;

interface MedicineDetailsModalProps {
    medicine: MedicineData;
    onClose: () => void;
    onEdit?: (medicine: MedicineData) => void;
}

// Helper to normalize data from both types
function normalizeData(med: MedicineData) {
    const isMedicineType = 'id' in med;
    return {
        id: isMedicineType ? (med as Medicine).id : undefined,
        srlNo: isMedicineType ? (med as Medicine).srlNo : 0,
        name: med.name,
        type: med.type || 'Tablet',
        strength: med.strength || 'N/A',
        manufacturer: canHaveManufacturer(med) ? med.manufacturer : (med as Medicine).manufacture,
        genericName: med.genericName || 'N/A',
        productCode: med.productCode || 'N/A',
        barcode: isMedicineType ? (med as Medicine).barcode : undefined,
        description: isMedicineType ? (med as Medicine).description : undefined,
        buyingPrice: isMedicineType ? (med as Medicine).buyingPrice : (med as DummyMedicine).tradePrice,
        sellingPrice: isMedicineType ? (med as Medicine).price : (med as DummyMedicine).sellingPrice,
        mrp: isMedicineType ? (med as Medicine).mrp : undefined,
        discount: isMedicineType ? (med as Medicine).discount : undefined,
        wholesalePrice: !isMedicineType ? (med as DummyMedicine).wholesalePrice : undefined,
        inStock: med.inStock,
        rackLocation: isMedicineType ? ((med as Medicine).rackLocation || (med as Medicine).rackNo) : undefined,
        packSize: isMedicineType ? (med as Medicine).packSize : undefined,
        packPrice: isMedicineType ? (med as Medicine).packPrice : undefined,
        supplier: med.supplier || 'N/A',
        supplierContact: isMedicineType ? (med as Medicine).supplierContact : undefined,
        batchId: med.batchId || '---',
        expiryDate: med.expiryDate || 'N/A',
        purchaseDate: med.purchaseDate,
    };
}
function canHaveManufacturer(med: any): med is DummyMedicine {
    return 'manufacturer' in med;
}

const MedicineDetailsModal: React.FC<MedicineDetailsModalProps> = ({ medicine, onClose, onEdit }) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'summary' | 'purchase' | 'sales' | 'customer_return' | 'adjustment' | 'log'>('summary');

    if (!medicine) return null;

    const data = normalizeData(medicine);

    // Mock Purchase Data
    const purchaseHistory = [
        { srl: 1, date: '2025-12-04', invoice: '04/12/2025 Noyon Pushti', company: data.manufacturer, supplier: data.supplier, contact: data.supplierContact || '12125', qty: 24, bonus: 0, total: 215.00, expiry: '21/10/2026', added: 24, status: 'Paid' },
        { srl: 2, date: '2025-12-05', invoice: '05/12/2025GH', company: data.manufacturer, supplier: data.supplier, contact: data.supplierContact || '12125', qty: 600, bonus: 0, total: 5375.00, expiry: '21/10/2026', added: 600, status: 'Paid' },
    ];

    // Mock Sales Data
    const salesHistory = [
        { srl: 1, date: '2025-12-04 23:31:29', invoice: 'CIN-2500200115368', customer: 'Walk-in Customer', qty: 1, unitPrice: 10.00, total: 10.00, status: 'Paid' },
        { srl: 2, date: '2025-12-04 23:45:22', invoice: 'CIN-2500200115371', customer: 'Walk-in Customer', qty: 360, unitPrice: 20.00, total: 7200.00, status: 'Paid' },
        { srl: 3, date: '2025-12-05 12:58:42', invoice: 'CIN-2500200115377', customer: 'Walk-in Customer', qty: 240, unitPrice: 20.00, total: 4800.00, status: 'Paid' },
        { srl: 4, date: '2025-12-08 20:33:04', invoice: 'CIN-2500200115594', customer: 'Ismail PRAMA (BUHS) DMF', qty: 1, unitPrice: 20.00, total: 20.00, status: 'Unpaid' },
    ];

    const getStatusColor = (stock: number) => {
        if (stock === 0) return 'text-red-600 bg-red-50 border-red-200';
        if (stock < 20) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    };

    const isExpired = data.expiryDate !== 'N/A' && data.expiryDate ? new Date(data.expiryDate) < new Date() : false;
    const needsPackaging = data.type === 'Tablet' || data.type === 'Capsule';

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="absolute inset-0 z-0 bg-transparent" onClick={onClose}></div>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-[90vw] h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 z-10">

                {/* Tabs & Header */}
                <div className="bg-slate-50 border-b border-slate-200 shrink-0">
                    <div className="flex items-center justify-between px-6 py-3">
                        <div className="flex gap-1 overflow-x-auto no-scrollbar">
                            {['Summary', 'Purchase', 'Sales'].map((tab) => {
                                const id = tab.toLowerCase().replace(' ', '_') as typeof activeTab;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => setActiveTab(id)}
                                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 ${activeTab === id
                                            ? 'bg-white border-blue-600 text-blue-700 shadow-sm'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Buttons removed as per user request */}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 custom-scrollbar">

                    {activeTab === 'summary' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                                        <Package size={18} className="text-blue-500" /> Basic Info
                                    </h3>
                                    <div className="space-y-3">
                                        <InfoRow label="Medicine Name" value={data.name} highlight />
                                        <InfoRow label="Generic Name" value={data.genericName} />
                                        <InfoRow label="Strength" value={data.strength} />
                                        <InfoRow label="Type" value={data.type} />
                                        <InfoRow label="Manufacturer" value={data.manufacturer} />
                                        <InfoRow label="Product Code" value={data.productCode} mono />
                                        {data.barcode && <InfoRow label="Barcode" value={data.barcode} mono />}
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                                        <ShoppingBag size={18} className="text-emerald-500" /> Pricing & Stock
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-4">
                                            <InfoRow label="Buying Price" value={`${data.buyingPrice?.toFixed(2)} BDT`} />
                                            <InfoRow label="Selling Price" value={`${data.sellingPrice?.toFixed(2)} BDT`} highlight />
                                        </div>
                                        {data.mrp && <InfoRow label="MRP" value={`${data.mrp.toFixed(2)} BDT`} />}
                                        <div className="grid grid-cols-2 gap-4">
                                            <InfoRow label="Vat" value={`${0}%`} />
                                            <InfoRow label="Discount" value={`${data.discount || 0}%`} />
                                        </div>
                                        <div className="pt-2 border-t border-slate-50">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-slate-500">Current Stock</span>
                                                <span className={`text-sm font-bold px-2 py-0.5 rounded border ${getStatusColor(data.inStock)}`}>
                                                    {data.inStock} units
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {needsPackaging && data.packSize && (
                                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                                            <Package size={18} className="text-purple-500" /> Packaging Details
                                        </h3>
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-slate-50 text-slate-500">
                                                <tr>
                                                    <th className="px-3 py-2 font-medium">Unit</th>
                                                    <th className="px-3 py-2 font-medium text-center">Qty</th>
                                                    <th className="px-3 py-2 font-medium text-right">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                <tr>
                                                    <td className="px-3 py-2">Per Unit</td>
                                                    <td className="px-3 py-2 text-center">1</td>
                                                    <td className="px-3 py-2 text-right">{data.sellingPrice?.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-3 py-2">Strip</td>
                                                    <td className="px-3 py-2 text-center">{data.packSize.strip}</td>
                                                    <td className="px-3 py-2 text-right">{((data.sellingPrice || 0) * data.packSize.strip).toFixed(2)}</td>
                                                </tr>
                                                {data.packSize.box > 0 && (
                                                    <tr>
                                                        <td className="px-3 py-2">Box</td>
                                                        <td className="px-3 py-2 text-center">{data.packSize.strip * data.packSize.box}</td>
                                                        <td className="px-3 py-2 text-right">{((data.sellingPrice || 0) * data.packSize.strip * data.packSize.box).toFixed(2)}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                                        <Truck size={18} className="text-orange-500" /> Supplier & Batch
                                    </h3>
                                    <div className="space-y-3">
                                        <InfoRow label="Supplier" value={data.supplier} />
                                        <InfoRow label="Contact" value={data.supplierContact || 'N/A'} />
                                        <div className="border-t border-slate-50 pt-2 grid grid-cols-2 gap-4">
                                            <InfoRow label="Batch ID" value={data.batchId} mono />
                                            <div>
                                                <div className="flex justify-between items-start text-sm mb-1">
                                                    <span className="font-medium text-slate-500">Expiry:</span>
                                                    <span className={`font-medium ${isExpired ? 'text-red-600' : 'text-slate-800'}`}>{data.expiryDate || 'N/A'}</span>
                                                </div>
                                                {isExpired && <div className="text-[10px] text-red-500 font-bold text-right">EXPIRED</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'purchase' && (
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                                <h3 className="font-bold text-slate-700">Purchase Invoices</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200">
                                        <tr>
                                            <th className="px-4 py-3">SRL No.</th>
                                            <th className="px-4 py-3">Purchase Date</th>
                                            <th className="px-4 py-3">Invoice</th>
                                            <th className="px-4 py-3">Pharm. Co.</th>
                                            <th className="px-4 py-3">Supplier</th>
                                            <th className="px-4 py-3">Contact</th>
                                            <th className="px-4 py-3 text-center">Qty.</th>
                                            <th className="px-4 py-3 text-right">Total (BDT)</th>
                                            <th className="px-4 py-3 text-center">Expiry</th>
                                            <th className="px-4 py-3 text-center">Added</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 text-xs">
                                        {purchaseHistory.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="px-4 py-3 font-medium text-slate-500">{item.srl}</td>
                                                <td className="px-4 py-3 text-slate-600">{item.date}</td>
                                                <td className="px-4 py-3 text-blue-600">{item.invoice}</td>
                                                <td className="px-4 py-3 text-slate-600 truncate max-w-[150px]">{item.company}</td>
                                                <td className="px-4 py-3 text-slate-600">{item.supplier}</td>
                                                <td className="px-4 py-3 text-slate-600">{item.contact}</td>
                                                <td className="px-4 py-3 text-center font-medium bg-cyan-50 text-cyan-700 rounded-sm">{item.qty}</td>
                                                <td className="px-4 py-3 text-right font-medium text-slate-800">{item.total.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-center text-slate-500">{item.expiry}</td>
                                                <td className="px-4 py-3 text-center text-slate-500">{item.added}</td>
                                                <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold">{item.status}</span></td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <Button size="sm" className="h-6 w-12 text-[10px] bg-cyan-500 hover:bg-cyan-600 text-white rounded">View</Button>
                                                        <Button
                                                            size="sm"
                                                            className="h-6 w-12 text-[10px] bg-purple-500 hover:bg-purple-600 text-white rounded"
                                                            onClick={() => router.push('/purchase-history')}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {/* Total Row */}
                                        <tr className="bg-purple-600 text-white font-bold">
                                            <td className="px-4 py-2" colSpan={6}>Total</td>
                                            <td className="px-4 py-2 text-center">{purchaseHistory.reduce((a, b) => a + b.qty, 0)}</td>
                                            <td className="px-4 py-2 text-right">{purchaseHistory.reduce((a, b) => a + b.total, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                            <td className="px-4 py-2" colSpan={2}></td>
                                            <td className="px-4 py-2" colSpan={2}></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'sales' && (
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                                <h3 className="font-bold text-slate-700">Sales Invoices</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200">
                                        <tr>
                                            <th className="px-4 py-3">SRL No.</th>
                                            <th className="px-4 py-3">Sales Date</th>
                                            <th className="px-4 py-3">Invoice</th>
                                            <th className="px-4 py-3">Customer Info.</th>
                                            <th className="px-4 py-3 text-center">Qty.</th>
                                            <th className="px-4 py-3 text-right">Unit Price</th>
                                            <th className="px-4 py-3 text-right">Total (BDT)</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 text-xs">
                                        {salesHistory.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="px-4 py-3 font-medium text-slate-500">{item.srl}</td>
                                                <td className="px-4 py-3 text-slate-600">{item.date}</td>
                                                <td className="px-4 py-3 text-blue-600">{item.invoice}</td>
                                                <td className="px-4 py-3 text-slate-600">{item.customer}</td>
                                                <td className="px-4 py-3 text-center font-medium">{item.qty}</td>
                                                <td className="px-4 py-3 text-right">{item.unitPrice.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-right font-medium text-slate-800">{item.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${item.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <Button
                                                        size="sm"
                                                        className="h-6 w-12 text-[10px] bg-cyan-500 hover:bg-cyan-600 text-white rounded"
                                                        onClick={() => router.push('/sales')}
                                                    >
                                                        View
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {/* Total Row */}
                                        <tr className="bg-white border-t-2 border-slate-200 font-bold text-slate-700">
                                            <td className="px-4 py-3 text-right" colSpan={4}>Total</td>
                                            <td className="px-4 py-3 text-center">{salesHistory.reduce((a, b) => a + b.qty, 0)}</td>
                                            <td className="px-4 py-3"></td>
                                            <td className="px-4 py-3 text-right">{salesHistory.reduce((a, b) => a + b.total, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                            <td className="px-4 py-3" colSpan={2}></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ label, value, mono, highlight }: { label: string, value: string | undefined | null, mono?: boolean, highlight?: boolean }) => (
    <div className="flex items-start gap-2 text-sm justify-between">
        <span className="font-medium text-slate-500 min-w-[100px] shrink-0">{label}:</span>
        <span className={`font-medium break-words text-right ${mono ? 'font-mono text-slate-600' : 'text-slate-800'} ${highlight ? 'font-bold' : ''}`}>
            {value || '-'}
        </span>
    </div>
);

export default MedicineDetailsModal;
