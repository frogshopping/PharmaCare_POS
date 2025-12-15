import React from 'react';
import { Sale } from '@/services/mockSalesData';
import { X, ArrowLeft, Mail, Truck, CheckSquare, Plus, RotateCcw, Edit, Printer } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface InvoiceViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    sale: Sale | null;
}

export function InvoiceViewModal({ isOpen, onClose, sale }: InvoiceViewModalProps) {
    if (!isOpen || !sale) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-lg shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                    <h2 className="text-lg font-semibold text-slate-700">
                        Invoice - {sale.id}
                    </h2>

                    {/* Action Bar */}
                    <div className="flex items-center gap-2">
                        <Button onClick={onClose} variant="secondary" size="sm" className="bg-sky-400 hover:bg-sky-500 text-white border-none gap-1 h-8 text-xs font-normal">
                            <ArrowLeft size={14} /> Back
                        </Button>

                        <div className="relative group">
                            <Button variant="secondary" size="sm" className="bg-green-500 hover:bg-green-600 text-white border-none gap-1 h-8 text-xs font-normal">
                                <Mail size={14} /> Send Mail
                            </Button>
                        </div>

                        <div className="relative group">
                            <Button variant="secondary" size="sm" className="bg-sky-400 hover:bg-sky-500 text-white border-none gap-1 h-8 text-xs font-normal">
                                <Truck size={14} /> Delivery Status
                            </Button>
                        </div>

                        <div className="relative group">
                            <Button variant="secondary" size="sm" className="bg-purple-500 hover:bg-purple-600 text-white border-none gap-1 h-8 text-xs font-normal">
                                <CheckSquare size={14} /> Mark As
                            </Button>
                        </div>

                        <Button variant="secondary" size="sm" className="bg-amber-400 hover:bg-amber-500 text-white border-none gap-1 h-8 text-xs font-normal">
                            <Plus size={14} /> Add Payment
                        </Button>

                        <Button variant="outline" size="sm" className="text-slate-600 border-slate-300 gap-1 h-8 text-xs font-normal hover:bg-slate-50">
                            <RotateCcw size={14} /> Add Return
                        </Button>

                        <Button variant="secondary" size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white border-none gap-1 h-8 text-xs font-normal">
                            <Edit size={14} /> Edit
                        </Button>

                        <Button variant="outline" size="sm" className="text-slate-600 border-slate-300 gap-1 h-8 text-xs font-normal hover:bg-slate-50">
                            <Printer size={14} /> A4 Print
                        </Button>

                        <Button variant="outline" size="sm" className="text-slate-600 border-slate-300 gap-1 h-8 text-xs font-normal hover:bg-slate-50">
                            <Printer size={14} /> POS Print
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-white">

                    {/* Status Banners */}
                    <div className="space-y-2 mb-8">
                        <div className={`w-full py-2 px-4 text-center text-white text-sm font-medium rounded-sm ${sale.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'}`}>
                            {sale.status}
                        </div>
                        <div className="w-full py-2 px-4 text-center text-white text-sm font-medium bg-cyan-500 rounded-sm">
                            Not Delivered
                        </div>
                    </div>

                    <div className="flex justify-between items-start mb-8">
                        {/* Info Table */}
                        <div className="w-full max-w-xl border border-slate-200 rounded-sm overflow-hidden text-sm">
                            <div className="flex border-b border-slate-200">
                                <div className="w-40 bg-slate-50 p-3 font-medium text-slate-600 border-r border-slate-200">Order Type</div>
                                <div className="flex-1 p-3 text-slate-800">{sale.orderType}</div>
                            </div>
                            <div className="flex border-b border-slate-200">
                                <div className="w-40 bg-slate-50 p-3 font-medium text-slate-600 border-r border-slate-200">Name</div>
                                <div className="flex-1 p-3 text-slate-800">{sale.customerName}</div>
                            </div>
                            <div className="flex border-b border-slate-200">
                                <div className="w-40 bg-slate-50 p-3 font-medium text-slate-600 border-r border-slate-200">Phone</div>
                                <div className="flex-1 p-3 text-slate-800">{sale.phone}</div>
                            </div>
                            <div className="flex border-b border-slate-200">
                                <div className="w-40 bg-slate-50 p-3 font-medium text-slate-600 border-r border-slate-200">Email</div>
                                <div className="flex-1 p-3 text-slate-800"></div>
                            </div>
                            <div className="flex border-b border-slate-200">
                                <div className="w-40 bg-slate-50 p-3 font-medium text-slate-600 border-r border-slate-200">Order Date</div>
                                <div className="flex-1 p-3 text-slate-800">{new Date(sale.date).toLocaleDateString()}</div>
                            </div>
                            <div className="flex border-b border-slate-200">
                                <div className="w-40 bg-slate-50 p-3 font-medium text-slate-600 border-r border-slate-200">Invoice Created At</div>
                                <div className="flex-1 p-3 text-slate-800">{new Date(sale.date).toLocaleString()}</div>
                            </div>
                            <div className="flex">
                                <div className="w-40 bg-slate-50 p-3 font-medium text-slate-600 border-r border-slate-200">Delivery Status</div>
                                <div className="flex-1 p-3 text-slate-800">Not Delivered</div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-sm font-medium text-slate-500 mb-1">IQBAL</div>
                            <div className="text-xs text-slate-400 mt-8 max-w-[200px]">
                                Opposite Police Staff College, Besides BRB Garments.
                                <br />
                                <br />
                                Bangladesh
                            </div>
                        </div>
                    </div>


                    {/* Item Table */}
                    <div className="border border-slate-200 rounded-sm overflow-hidden mb-6">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                                <tr>
                                    <th className="p-3">Item Details</th>
                                    <th className="p-3 text-center w-24">Qty.</th>
                                    <th className="p-3 text-right w-32">Unit Price</th>
                                    <th className="p-3 text-right w-24">Vat</th>
                                    <th className="p-3 text-right w-32">Total</th>
                                    <th className="p-3 text-center w-24">Stock Out</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50/50">
                                    <td className="p-3 text-slate-700">Tablet Nebita 2.5 mg</td>
                                    <td className="p-3 text-center text-slate-600">10</td>
                                    <td className="p-3 text-right text-slate-600">7.02</td>
                                    <td className="p-3 text-right text-slate-600">0.00</td>
                                    <td className="p-3 text-right text-slate-800 font-medium">70.20</td>
                                    <td className="p-3 text-center text-slate-600">10</td>
                                </tr>
                            </tbody>
                            <tfoot className="bg-slate-50/30 font-medium text-xs text-slate-600">
                                <tr>
                                    <td colSpan={4} className="p-2 text-right border-t border-slate-100">Subtotal</td>
                                    <td className="p-2 text-right border-t border-slate-100">70.20</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colSpan={4} className="p-2 text-right border-t border-slate-100">Discount</td>
                                    <td className="p-2 text-right border-t border-slate-100">0.20</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colSpan={4} className="p-2 text-right border-t border-slate-100">Vat</td>
                                    <td className="p-2 text-right border-t border-slate-100">0.00</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colSpan={4} className="p-2 text-right border-t border-slate-100 font-bold text-slate-800">Total</td>
                                    <td className="p-2 text-right border-t border-slate-100 font-bold text-slate-800">{sale.billingAmount.toFixed(2)}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colSpan={4} className="p-2 text-right border-t border-slate-100">Total Paid</td>
                                    <td className="p-2 text-right border-t border-slate-100">{sale.paidAmount.toFixed(2)}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colSpan={4} className="p-2 text-right border-t border-slate-100">Amount Due</td>
                                    <td className="p-2 text-right border-t border-slate-100">{sale.dueAmount.toFixed(2)}</td>
                                    <td></td>
                                </tr>
                                <tr className="bg-slate-100">
                                    <td colSpan={4} className="p-2 text-right border-t border-slate-200 font-bold text-slate-800">Total Outstanding Amount(BDT)</td>
                                    <td className="p-2 text-right border-t border-slate-200 font-bold text-slate-800">{sale.dueAmount.toFixed(2)}</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}
