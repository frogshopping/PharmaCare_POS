import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Save, Clock, FileText, CheckCircle } from 'lucide-react';

export interface PaymentInfo {
    subTotal: number;
    discountPercent: number;
    discountAmount: number;
    shippingFee: number;
    vatPercent: number; // Added
    totalVat: number;   // Added
    grandTotal: number;
    totalPaid: number;
    paymentMethod: string;
    receivedAccount: string;
    receivedAmount: number;
    returnAmount: number;
    dueAmount: number;
}

interface PaymentSectionProps {
    info: PaymentInfo;
    onChange: (updates: Partial<PaymentInfo>) => void;
    onSave: () => void;
}

export function PaymentSection({ info, onChange, onSave }: PaymentSectionProps) {
    const handleChange = (field: keyof PaymentInfo, value: any) => {
        onChange({ [field]: value });
    };

    return (
        <div className="bg-slate-50 border-t border-slate-200 p-6">

            {/* Calculation Row 1 */}
            <div className="grid grid-cols-12 gap-6 mb-2">
                {/* Right Side Totals */}
                <div className="col-span-12 space-y-3">
                    <div className="flex justify-end items-center gap-4">
                        <span className="text-sm font-semibold text-slate-600">Sub Total:</span>
                        <span className="text-sm font-bold text-slate-800 w-24 text-right">{info.subTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-end gap-4">
                        <div className="w-1/3">
                            <label className="text-xs text-slate-500 mb-1 block">Discount(%)</label>
                            <Input
                                type="number"
                                value={info.discountPercent}
                                onChange={(e) => handleChange('discountPercent', parseFloat(e.target.value) || 0)}
                                className="bg-slate-100 border-slate-200"
                            />
                        </div>
                        <div className="w-1/3">
                            <label className="text-xs text-slate-500 mb-1 block">or Discount in Amount</label>
                            <Input
                                type="number"
                                value={info.discountAmount}
                                onChange={(e) => handleChange('discountAmount', parseFloat(e.target.value) || 0)}
                                className="bg-slate-100 border-slate-200"
                            />
                        </div>
                        <div className="w-24 text-right flex flex-col justify-center">
                            <span className="text-xs text-slate-500">{info.discountPercent > 0 ? `${info.discountPercent}%` : '0'}</span>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 items-center">
                        <div className="w-1/3">
                            <label className="text-xs text-slate-500 mb-1 block">VAT(%)</label>
                            <Input
                                type="number"
                                value={info.vatPercent}
                                onChange={(e) => handleChange('vatPercent', parseFloat(e.target.value) || 0)}
                                className="bg-slate-100 border-slate-200"
                            />
                        </div>
                        <div className="w-24 text-right flex flex-col justify-center">
                            <span className="text-xs text-slate-500">{info.totalVat.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 items-center">
                        <div className="w-1/3">
                            <label className="text-xs text-slate-500 mb-1 block">Shipping Fee</label>
                            <Input
                                type="number"
                                value={info.shippingFee}
                                onChange={(e) => handleChange('shippingFee', parseFloat(e.target.value) || 0)}
                                className="bg-slate-100 border-slate-200"
                            />
                        </div>
                        <div className="w-24 text-right flex items-center justify-end">
                            <span className="text-sm font-semibold text-slate-600 mr-2">Total:</span>
                            <span className="text-sm font-bold text-slate-900">{info.grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-200 my-4"></div>

            {/* Payment Row */}
            <div className="grid grid-cols-6 gap-4 items-end">
                <div className="col-span-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Payment Method</label>
                    <select
                        className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        value={info.paymentMethod}
                        onChange={(e) => handleChange('paymentMethod', e.target.value)}
                    >
                        <option value="Cash">Cash</option>
                        <option value="Card">Bank/Card</option>
                        <option value="Bkash">Bkash</option>
                        <option value="Nagad">Nagad</option>
                        <option value="Rocket">Rocket</option>
                    </select>
                </div>

                <div className="col-span-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Received Account</label>
                    <select
                        className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        value={info.receivedAccount}
                        onChange={(e) => handleChange('receivedAccount', e.target.value)}
                    >
                        <option value="Cash">Cash</option>
                        <option value="Bank">Bank Account</option>
                    </select>
                </div>

                <div className="col-span-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Received Amount</label>
                    <Input
                        type="number"
                        value={info.receivedAmount}
                        onChange={(e) => handleChange('receivedAmount', parseFloat(e.target.value) || 0)}
                        className="bg-slate-100 border-slate-200"
                    />
                </div>

                <div className="col-span-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Confirm Return</label>
                    <div className="h-10 px-3 flex items-center bg-slate-100 border border-slate-200 rounded-md text-slate-600 text-sm">
                        {info.returnAmount.toFixed(2)}
                    </div>
                </div>

                <div className="col-span-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Due</label>
                    <div className="h-10 px-3 flex items-center bg-white border border-slate-200 rounded-md text-red-500 font-medium text-sm">
                        {info.dueAmount.toFixed(2)}
                    </div>
                </div>

                <div className="col-span-1 text-right space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-slate-500">Total Paid:</span>
                        <span className="text-sm font-bold text-slate-800">{info.totalPaid.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-100 pt-1">
                        <span className="text-xs font-medium text-slate-500">Outstanding:</span>
                        <span className="text-sm font-bold text-red-500">{info.dueAmount.toFixed(2)}</span>
                    </div>
                </div>

            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
                <Button variant="outline" className="text-slate-600 border-slate-300 hover:bg-slate-50 bg-white shadow-sm">
                    <Clock size={16} className="mr-2" />
                    Hold the Invoice
                </Button>
                <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-white shadow-sm">
                    <FileText size={16} className="mr-2" />
                    Today's Sales Invoice
                </Button>
                <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20"
                    onClick={onSave}
                >
                    <Save size={16} className="mr-2" />
                    Save Invoice
                </Button>
            </div>
        </div>
    );
}
