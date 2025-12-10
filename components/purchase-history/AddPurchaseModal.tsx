'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Calendar, User, FileText, ShoppingCart, Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Invoice } from '@/services/purchaseDummyData';

interface AddPurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Invoice | null;
}

interface NewItem {
    id: number;
    name: string;
    strength: string;
    type: string;
    mfrDate: string;
    expiryDate: string;
    qty: number;
    unit: string;
    unitPrice: number;
    mrp: number;
    tradePrice: number;
    discountPercent: number;
    vat: number;
    totalAmount: number;
}

const AddPurchaseModal: React.FC<AddPurchaseModalProps> = ({ isOpen, onClose, initialData }) => {
    // Header State
    const [refId, setRefId] = useState(new Date().toLocaleDateString('en-GB'));
    const [company, setCompany] = useState('Renata Limited');
    const [contactName, setContactName] = useState('Mohammad Ali');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [invoiceDate, setInvoiceDate] = useState(new Date().toLocaleDateString('en-GB'));
    const [status, setStatus] = useState('Draft');
    const [remarks, setRemarks] = useState('');

    const [items, setItems] = useState<NewItem[]>([]);

    // Item Input State
    const [itemName, setItemName] = useState('');
    const [strength, setStrength] = useState('');
    const [type, setType] = useState('Tablet');
    const [mfrDate, setMfrDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [qty, setQty] = useState<number | ''>('');
    const [unit, setUnit] = useState('Pcs');
    const [unitPrice, setUnitPrice] = useState<number | ''>('');
    const [mrp, setMrp] = useState<number | ''>('');
    const [discountPercent, setDiscountPercent] = useState<number | ''>('');
    const [itemVat, setItemVat] = useState<number | ''>(0);

    // Populate data for Edit Mode
    useEffect(() => {
        if (isOpen && initialData) {
            setRefId(initialData.id); // Using ID as Ref ID for now
            setCompany(initialData.pharmaceuticalCompany);
            setContactName(initialData.supplierName);
            setPhone(initialData.supplierContact);
            setInvoiceDate(initialData.purchaseDate);
            setStatus(initialData.status);

            // Map existing items to form items
            const mappedItems: NewItem[] = initialData.items.map(item => ({
                id: item.id,
                name: item.name,
                strength: item.strength,
                type: 'Tablet', // Default
                mfrDate: '', // Default as not in dummy data
                expiryDate: '', // Default as not in dummy data
                qty: item.qty,
                unit: 'Pcs', // Default
                unitPrice: item.unitPrice,
                mrp: 0, // Default
                tradePrice: item.qty * item.unitPrice,
                discountPercent: 0, // Default
                vat: 0, // Default
                totalAmount: item.total
            }));
            setItems(mappedItems);
        } else if (isOpen && !initialData) {
            // Reset for Add Mode
            setRefId(new Date().toLocaleDateString('en-GB'));
            setCompany('Renata Limited');
            setContactName('Mohammad Ali');
            setPhone('');
            setEmail('');
            setInvoiceDate(new Date().toLocaleDateString('en-GB'));
            setStatus('Draft');
            setItems([]);
            setRemarks('');
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleAddItem = () => {
        if (!itemName || !qty || !unitPrice) return;

        const q = Number(qty);
        const p = Number(unitPrice);
        const v = Number(itemVat || 0);
        const dPercent = Number(discountPercent || 0);

        const trade = q * p;
        const discountAmount = trade * (dPercent / 100);
        const total = (trade - discountAmount) + v;

        const newItem: NewItem = {
            id: Date.now(),
            name: itemName,
            strength,
            type,
            mfrDate,
            expiryDate,
            qty: q,
            unit,
            unitPrice: p,
            mrp: Number(mrp || 0),
            tradePrice: trade,
            discountPercent: dPercent,
            vat: v,
            totalAmount: total
        };

        setItems([...items, newItem]);

        // Reset inputs
        setItemName('');
        setStrength('');
        setQty('');
        setUnitPrice('');
        setMrp('');
        setDiscountPercent('');
        setItemVat(0);
        // Keep dates or reset? Usually reset for new item or keep same batch? Resetting is safer.
        setMfrDate('');
        setExpiryDate('');
    };

    const handleRemoveItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    // Footer Calculations
    const subTradeTotal = items.reduce((sum, item) => sum + item.tradePrice, 0);
    const vatTotal = items.reduce((sum, item) => sum + item.vat, 0);
    const discountTotal = items.reduce((sum, item) => sum + (item.tradePrice * (item.discountPercent / 100)), 0);
    const subTotal = subTradeTotal - discountTotal + vatTotal;
    const grandTotal = subTotal;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Reduced max-width and height */}
            <div className="bg-slate-50 rounded-xl shadow-2xl w-full max-w-[90vw] h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">

                {/* Header Toolbar */}
                <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-slate-800">
                            {initialData ? `Edit Purchase ${initialData.id}` : 'Add New Purchase'}
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        {/* Neutral Back Button */}
                        <Button variant="outline" className="text-slate-600 hover:bg-slate-100 gap-2" onClick={onClose}>
                            <ArrowLeft size={16} /> Back
                        </Button>
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6 shadow-sm">

                        {/* Top Form Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500 italic">Ref Id (If you keep blank, the ref id should be Random)</label>
                                    <Input value={refId} onChange={(e) => setRefId(e.target.value)} className="bg-white" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                                        Contact Person Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <Input value={contactName} onChange={(e) => setContactName(e.target.value)} className="bg-white" />
                                        <Button variant="outline" size="icon" className="shrink-0"><Plus size={14} /></Button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">Email</label>
                                    <Input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white" />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                                        Pharmaceutical company <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                        >
                                            <option>Renata Limited</option>
                                            <option>Square Pharma</option>
                                            <option>Beximco</option>
                                        </select>
                                        <Button variant="outline" size="icon" className="shrink-0"><Plus size={14} /></Button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">Phone</label>
                                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-600">Invoice Date</label>
                                        <Input value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="bg-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-600">Status</label>
                                        <select
                                            className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option>Draft</option>
                                            <option>Pending</option>
                                            <option>Received</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            {/* Neutral Export Button */}
                            <Button variant="outline" className="text-slate-600 gap-2 text-xs">
                                <Download size={14} /> Export
                            </Button>
                        </div>
                    </div>

                    {/* Add Item Section */}
                    <div className="bg-white rounded-lg border border-slate-200 mb-6 shadow-sm overflow-hidden">
                        {/* Search Bar */}
                        <div className="p-4 border-b border-slate-200">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    {/* Neutral Icon */}
                                    <ShoppingCart className="h-4 w-4 text-slate-400" />
                                </div>
                                <Input
                                    className="pl-10 border-0 shadow-none focus-visible:ring-0 text-lg placeholder:text-slate-300"
                                    placeholder="Medicine Name"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Add Item Inputs Grid */}
                        <div className="p-4 bg-slate-50 border-b border-slate-200">
                            <div className="grid grid-cols-12 gap-2 items-end">
                                <div className="col-span-2 space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-500">Medicine Name <span className="text-red-500">*</span></label>
                                    <Input value={itemName} readOnly className="bg-slate-100 text-slate-500 h-8 text-xs" />
                                </div>
                                <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-500">Strength</label>
                                    <Input value={strength} onChange={(e) => setStrength(e.target.value)} className="h-8 text-xs" placeholder="25mg" />
                                </div>
                                <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-500">Type <span className="text-red-500">*</span></label>
                                    <Input value={type} onChange={(e) => setType(e.target.value)} className="h-8 text-xs" />
                                </div>
                                <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-500">Mfr. Date</label>
                                    <Input type="date" value={mfrDate} onChange={(e) => setMfrDate(e.target.value)} className="h-8 text-xs px-1" />
                                </div>
                                <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-500">Expiry Date</label>
                                    <Input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="h-8 text-xs px-1" />
                                </div>
                                <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-500">Quantity</label>
                                    <Input type="number" value={qty} onChange={(e) => setQty(e.target.value === '' ? '' : Number(e.target.value))} className="h-8 text-xs" placeholder="0" />
                                </div>
                                <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-500">Prod. Unit</label>
                                    <select className="w-full h-8 text-xs rounded-md border border-slate-200 px-2" value={unit} onChange={(e) => setUnit(e.target.value)}>
                                        <option>Pcs</option>
                                        <option>Box</option>
                                        <option>Strip</option>
                                        <option>Syrup</option>
                                        <option>Kg</option>
                                        <option>Mg</option>
                                        <option>Gm</option>
                                        <option>Ltr</option>
                                    </select>
                                </div>
                                <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-500">Unit Price</label>
                                    <Input type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value === '' ? '' : Number(e.target.value))} className="h-8 text-xs" placeholder="0" />
                                </div>
                                <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-500">MRP/Unit <span className="text-red-500">*</span></label>
                                    <Input type="number" value={mrp} onChange={(e) => setMrp(e.target.value === '' ? '' : Number(e.target.value))} className="h-8 text-xs" placeholder="0" />
                                </div>
                                <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-500">Disc(TP%)</label>
                                    <Input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value === '' ? '' : Number(e.target.value))} className="h-8 text-xs" placeholder="0" />
                                </div>
                                <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-500">VAT</label>
                                    <Input type="number" value={itemVat} onChange={(e) => setItemVat(e.target.value === '' ? '' : Number(e.target.value))} className="h-8 text-xs" placeholder="0" />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <Button size="sm" onClick={handleAddItem} className="h-9 px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-semibold">
                                    Add Item
                                </Button>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="overflow-x-auto min-h-[150px]">
                            <table className="w-full text-xs text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-3 py-3 font-semibold text-slate-600 w-10">SL</th>
                                        <th className="px-3 py-3 font-semibold text-slate-600">Medicine Name <span className="text-red-500">*</span></th>
                                        <th className="px-3 py-3 font-semibold text-slate-600">Strength</th>
                                        <th className="px-3 py-3 font-semibold text-slate-600">Type <span className="text-red-500">*</span></th>
                                        <th className="px-3 py-3 font-semibold text-slate-600">Mfr. Date</th>
                                        <th className="px-3 py-3 font-semibold text-slate-600">Exp. Date</th>
                                        <th className="px-3 py-3 text-right font-semibold text-slate-600">Qty</th>
                                        <th className="px-3 py-3 font-semibold text-slate-600">Prod. Unit</th>
                                        <th className="px-3 py-3 text-right font-semibold text-slate-600">Unit Price</th>
                                        <th className="px-3 py-3 text-right font-semibold text-slate-600">MRP/Unit <span className="text-red-500">*</span></th>
                                        <th className="px-3 py-3 text-right font-semibold text-slate-600">Trade Price</th>
                                        <th className="px-3 py-3 text-right font-semibold text-slate-600">Disc(%)</th>
                                        <th className="px-3 py-3 text-right font-semibold text-slate-600">VAT</th>
                                        <th className="px-3 py-3 text-center font-semibold text-slate-600 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {items.length === 0 ? (
                                        <tr>
                                            <td colSpan={14} className="px-4 py-8 text-center text-slate-400 italic">
                                                No items added yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        items.map((item, idx) => (
                                            <tr key={item.id} className="hover:bg-slate-50 group">
                                                <td className="px-3 py-2 text-slate-500">{idx + 1}</td>
                                                <td className="px-3 py-2 font-medium text-slate-800">{item.name}</td>
                                                <td className="px-3 py-2 text-slate-500">{item.strength || '-'}</td>
                                                <td className="px-3 py-2 text-slate-500">{item.type}</td>
                                                <td className="px-3 py-2 text-slate-500">{item.mfrDate || '-'}</td>
                                                <td className="px-3 py-2 text-slate-500">{item.expiryDate || '-'}</td>
                                                <td className="px-3 py-2 text-right text-slate-600">{item.qty}</td>
                                                <td className="px-3 py-2 text-slate-500">{item.unit}</td>
                                                <td className="px-3 py-2 text-right text-slate-600">{item.unitPrice.toFixed(2)}</td>
                                                <td className="px-3 py-2 text-right text-slate-600">{item.mrp.toFixed(2)}</td>
                                                <td className="px-3 py-2 text-right text-slate-600">{item.tradePrice.toFixed(2)}</td>
                                                <td className="px-3 py-2 text-right text-slate-600">{item.discountPercent > 0 ? `${item.discountPercent}%` : '-'}</td>
                                                <td className="px-3 py-2 text-right text-slate-600">{item.vat.toFixed(2)}</td>
                                                <td className="px-3 py-2 text-center">
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Totals */}
                        <div className="bg-white border-t border-slate-200">
                            <div className="flex justify-end p-2 border-b border-slate-100">
                                <div className="w-64 flex justify-between items-center text-xs">
                                    <span className="font-semibold text-slate-500">Sub Trade Total:</span>
                                    <span className="font-bold text-slate-700">{subTradeTotal.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex justify-end p-2 border-b border-slate-100">
                                <div className="w-64 flex justify-between items-center text-xs">
                                    <span className="font-semibold text-slate-500">Discount Total:</span>
                                    <span className="font-bold text-red-500">-{discountTotal.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex justify-end p-2 border-b border-slate-100">
                                <div className="w-64 flex justify-between items-center text-xs">
                                    <span className="font-semibold text-slate-500">Vat Total:</span>
                                    <div className="flex gap-2 items-center">
                                        <Input className="w-24 h-7 text-right text-xs" value={vatTotal.toFixed(2)} readOnly />
                                    </div>
                                </div>
                            </div>
                            {/* Neutral/Light Gray Footer Background */}
                            <div className="flex justify-end p-2 bg-slate-50">
                                <div className="w-64 flex justify-between items-center text-sm">
                                    <span className="font-bold text-slate-600">Total:</span>
                                    {/* Slate Colored Total */}
                                    <span className="font-bold text-slate-800">{grandTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Remarks Section */}
                    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                        <label className="text-sm font-bold text-slate-600 block mb-2">Remarks</label>
                        <textarea
                            className="w-full rounded-md border border-slate-200 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            rows={3}
                            placeholder="Enter remarks here..."
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    </div>
                </div>

                {/* Footer - Professional Blue Button */}
                <div className="bg-slate-50 border-t border-slate-200 p-4 flex justify-between items-center shrink-0">
                    <div className="text-xs text-slate-400">
                        © 2025 By 2pi-bd.com
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm px-6">
                        <Plus size={16} />
                        {initialData ? 'Update Purchase' : 'Save Purchase'}
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default AddPurchaseModal;
