import React from 'react';
import { Sale } from '@/services/mockSalesData';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ReturnModalProps {
    isOpen: boolean;
    onClose: () => void;
    sale: Sale | null;
}

export function ReturnModal({ isOpen, onClose, sale }: ReturnModalProps) {
    if (!isOpen || !sale) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-lg shadow-xl flex flex-col animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-700">
                        Invoice: {sale.id}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="bg-red-500 text-white text-center py-2 text-sm font-medium rounded-sm">Unpaid</div>
                            <div className="bg-cyan-500 text-white text-center py-2 text-sm font-medium rounded-sm">Not Delivered</div>

                            <div className="grid grid-cols-2 text-sm border border-slate-200 rounded-sm">
                                <div className="p-3 bg-slate-50 font-medium text-slate-600 border-b border-r border-slate-200">Order Type</div>
                                <div className="p-3 border-b border-slate-200">{sale.orderType}</div>

                                <div className="p-3 bg-slate-50 font-medium text-slate-600 border-b border-r border-slate-200">Name</div>
                                <div className="p-3 border-b border-slate-200">{sale.customerName}</div>

                                <div className="p-3 bg-slate-50 font-medium text-slate-600 border-b border-r border-slate-200">Phone</div>
                                <div className="p-3 border-b border-slate-200">{sale.phone}</div>

                                <div className="p-3 bg-slate-50 font-medium text-slate-600 border-b border-r border-slate-200">Email</div>
                                <div className="p-3 border-b border-slate-200"></div>

                                <div className="p-3 bg-slate-50 font-medium text-slate-600 border-r border-slate-200">Delivery Status</div>
                                <div className="p-3">Not Delivered</div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Return To*</label>
                                <Input value={sale.customerName} disabled className="bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
                                <Input disabled className="bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Phone</label>
                                <Input value={sale.phone} disabled className="bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Return Date*</label>
                                <Input type="date" value={new Date().toISOString().split('T')[0]} />
                            </div>
                        </div>
                    </div>

                    {/* Return Items Table */}
                    <div className="border border-slate-200 rounded-sm overflow-hidden mb-6">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200 text-xs">
                                <tr>
                                    <th className="p-3">Item Details</th>
                                    <th className="p-3 text-center w-16">Qty.</th>
                                    <th className="p-3 text-right w-24">Unit Price</th>
                                    <th className="p-3 text-right w-16">Vat</th>
                                    <th className="p-3 text-right w-24">Total</th>
                                    <th className="p-3 w-28">Return Qty.</th>
                                    <th className="p-3 w-28">Return unit price</th>
                                    <th className="p-3 w-24">Return Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50/50">
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" className="rounded border-slate-300" />
                                            <span className="text-xs text-slate-700">Tablet Nebita 2.5 mg</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-center text-xs text-slate-600">10</td>
                                    <td className="p-3 text-right text-xs text-slate-600">7.02</td>
                                    <td className="p-3 text-right text-xs text-slate-600">0.00</td>
                                    <td className="p-3 text-right text-xs text-slate-800">70.20</td>
                                    <td className="p-3"><Input className="h-7 text-xs" /></td>
                                    <td className="p-3"><Input className="h-7 text-xs" value="7.02" /></td>
                                    <td className="p-3"><Input className="h-7 text-xs" value="70.20" /></td>
                                </tr>
                            </tbody>
                            <tfoot className="bg-slate-50/30 font-medium text-xs text-slate-600">
                                <tr>
                                    <td colSpan={5} className="p-2 text-right border-t border-slate-100">Subtotal</td>
                                    <td className="p-2 text-right border-t border-slate-100">70.20</td>
                                    <td className="p-2 text-right border-t border-slate-100">Subtotal</td>
                                    <td className="p-2 border-t border-slate-100"><Input className="h-7 text-xs" value="70.20" /></td>
                                </tr>
                                <tr>
                                    <td colSpan={5} className="p-2 text-right border-t border-slate-100">Discount(0.28 %)</td>
                                    <td className="p-2 text-right border-t border-slate-100">0.20</td>
                                    <td className="p-2 text-right border-t border-slate-100 flex items-center justify-end gap-1">
                                        Discount( <Input className="h-6 w-12 text-xs p-1" value="0.28" /> %)
                                    </td>
                                    <td className="p-2 border-t border-slate-100"><Input className="h-7 text-xs" value="0.00" /></td>
                                </tr>
                                <tr>
                                    <td colSpan={5} className="p-2 text-right border-t border-slate-100">Vat</td>
                                    <td className="p-2 text-right border-t border-slate-100">0.00</td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr>
                                    <td colSpan={5} className="p-2 text-right border-t border-slate-100">Shipping Fee</td>
                                    <td className="p-2 text-right border-t border-slate-100">0.00</td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr>
                                    <td colSpan={5} className="p-2 text-right border-t border-slate-100">Total</td>
                                    <td className="p-2 text-right border-t border-slate-100">70.00</td>
                                    <td className="p-2 text-right border-t border-slate-100">Total Returnable Amount</td>
                                    <td className="p-2 border-t border-slate-100"><Input className="h-7 text-xs" value="70.20" /></td>
                                </tr>
                                <tr>
                                    <td colSpan={5} className="p-2 text-right border-t border-slate-100">Total Paid Amount</td>
                                    <td className="p-2 text-right border-t border-slate-100">0.00</td>
                                    <td className="p-2 text-right border-t border-slate-100">Returned Amount</td>
                                    <td className="p-2 border-t border-slate-100"><Input className="h-7 text-xs" /></td>
                                </tr>
                                <tr>
                                    <td colSpan={5} className="p-2 text-right border-t border-slate-100">Amount Due</td>
                                    <td className="p-2 text-right border-t border-slate-100">70.00</td>
                                    <td className="p-2 text-right border-t border-slate-100">Amount Due</td>
                                    <td className="p-2 border-t border-slate-100"><Input className="h-7 text-xs" value="70.20" /></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-medium text-slate-600 mb-1">Remarks</label>
                        <textarea className="w-full border border-slate-200 rounded-md p-2 text-xs h-20 focus:outline-none focus:border-slate-400"></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Account*</label>
                            <select className="w-full h-9 border border-slate-200 rounded-md px-2 text-xs bg-white">
                                <option>--Select One--</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Payment method*</label>
                            <select className="w-full h-9 border border-slate-200 rounded-md px-2 text-xs bg-white">
                                <option>--Select One--</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Status*</label>
                            <select className="w-full h-9 border border-slate-200 rounded-md px-2 text-xs bg-white">
                                <option>--Select One--</option>
                            </select>
                        </div>
                    </div>

                    {/* Related Transactions */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-2">Related Transactions</h3>
                        <div className="border border-slate-200 rounded-sm overflow-hidden">
                            <table className="w-full text-xs text-left">
                                <thead className="bg-slate-50 text-slate-600 font-medium">
                                    <tr>
                                        <th className="p-2 border-r border-slate-200">Date</th>
                                        <th className="p-2 border-r border-slate-200">Account</th>
                                        <th className="p-2 border-r border-slate-200">Amount</th>
                                        <th className="p-2">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-4 text-center text-slate-400" colSpan={4}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                        <span className="text-lg">💾</span> Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}
