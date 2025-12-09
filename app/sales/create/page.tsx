"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomerInfo, CustomerInfoSidebar } from '@/components/sales/CustomerInfoSidebar';
import { ProductSearch } from '@/components/sales/ProductSearch';
import { CartItem, CartTable } from '@/components/sales/CartTable';
import { PaymentInfo, PaymentSection } from '@/components/sales/PaymentSection';
import { getMedicines, Medicine } from '@/services/api';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AddCustomerModal } from '@/components/customers/AddCustomerModal';

export default function CreateSalePage() {
    const router = useRouter();
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

    // --- State ---
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        clientType: 'General',
        discountType: 'General',
        invoiceNumber: '',
        invoiceDate: new Date().toISOString().split('T')[0],
        orderType: 'Collection',
        phone: '',
        name: 'Walk-in Customer',
        memberId: '',
        email: '',
        address: '',
        billingType: 'Invoice'
    });

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
        subTotal: 0,
        discountPercent: 0,
        discountAmount: 0,
        shippingFee: 0,
        vatPercent: 0,
        totalVat: 0,
        grandTotal: 0,
        totalPaid: 0,
        paymentMethod: 'Cash',
        receivedAccount: 'Cash',
        receivedAmount: 0,
        returnAmount: 0,
        dueAmount: 0
    });

    // --- Effects ---

    // Load Medicines
    useEffect(() => {
        getMedicines().then(setMedicines);
    }, []);

    // Recalculate Totals whenever Cart or Payment inputs change
    useEffect(() => {
        const subTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

        // Calculate Discount
        let discount = paymentInfo.discountAmount;
        if (paymentInfo.discountPercent > 0 && paymentInfo.discountAmount === 0) {
            discount = subTotal * (paymentInfo.discountPercent / 100);
        }

        // Calculate VAT
        const vat = subTotal * (paymentInfo.vatPercent / 100);

        const grandTotal = subTotal + vat + paymentInfo.shippingFee - discount;

        // Calculate Return/Due
        const paid = paymentInfo.receivedAmount;
        // Due is what is left to pay. If paid >= grandTotal, due is 0.
        const due = Math.max(0, grandTotal - paid);
        // Return is what specifically needs to be returned. If paid > grandTotal, return the difference.
        const ret = Math.max(0, paid - grandTotal);

        setPaymentInfo(prev => ({
            ...prev,
            subTotal,
            totalVat: vat,
            grandTotal,
            discountAmount: discount,
            dueAmount: due,
            returnAmount: ret
        }));

    }, [cartItems, paymentInfo.vatPercent, paymentInfo.discountPercent, paymentInfo.discountAmount, paymentInfo.shippingFee, paymentInfo.receivedAmount]);


    // --- Handlers ---

    const handleCustomerUpdate = (updates: Partial<CustomerInfo>) => {
        setCustomerInfo(prev => ({ ...prev, ...updates }));
    };

    const handlePaymentUpdate = (updates: Partial<PaymentInfo>) => {
        setPaymentInfo(prev => {
            const newState = { ...prev, ...updates };

            // Current subTotal for calculation
            const subTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

            if (updates.discountPercent !== undefined) {
                // If % updated -> recalculate Amount
                if (subTotal > 0) {
                    newState.discountAmount = +(subTotal * (updates.discountPercent / 100)).toFixed(2);
                } else {
                    newState.discountAmount = 0;
                }
            } else if (updates.discountAmount !== undefined) {
                // If Amount updated -> recalculate %
                if (subTotal > 0) {
                    newState.discountPercent = +((updates.discountAmount / subTotal) * 100).toFixed(2);
                } else {
                    newState.discountPercent = 0;
                }
            }

            return newState;
        });
    };

    const handleSearchProduct = (term: string) => {
        const match = medicines.find(m =>
            m.name.toLowerCase() === term.toLowerCase() ||
            m.barcode === term
        );

        if (match) {
            addToCart(match);
        }
    };

    const handleSelectHelper = (type: string) => {
        if (type === 'list' && medicines.length > 0) {
            const random = medicines[Math.floor(Math.random() * medicines.length)];
            addToCart(random);
        }
    };

    const addToCart = (medicine: Medicine) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.medicineId === medicine.id);
            if (existing) {
                if (existing.quantity >= existing.stock) return prev;
                return prev.map(i =>
                    i.medicineId === medicine.id
                        ? { ...i, quantity: i.quantity + 1, totalPrice: (i.quantity + 1) * i.unitPrice }
                        : i
                );
            }
            return [...prev, {
                id: Math.random().toString(36).substr(2, 9),
                medicineId: medicine.id,
                name: medicine.name,
                stock: medicine.inStock,
                quantity: 1,
                unitPrice: medicine.price,
                unit: 'pcs',
                vat: 0,
                totalPrice: medicine.price
            }];
        });
    };

    const updateCartQuantity = (id: string, quantity: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, Math.min(quantity, item.stock));
                return { ...item, quantity: newQty, totalPrice: newQty * item.unitPrice };
            }
            return item;
        }));
    };

    const removeCartItem = (id: string) => {
        setCartItems(prev => prev.filter(i => i.id !== id));
    };

    const updateCartPrice = (id: string, price: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, unitPrice: price, totalPrice: item.quantity * price };
            }
            return item;
        }));
    };

    const updateCartUnit = (id: string, unit: string) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, unit };
            }
            return item;
        }));
    };

    const handleSaveInvoice = () => {
        console.log("Saving Sale:", { customerInfo, cartItems, paymentInfo });
        router.push('/sales');
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col h-full bg-slate-50">
                {/* Top Nav */}
                <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm z-20">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-slate-500 hover:text-slate-800">
                            <ArrowLeft size={20} />
                        </Button>
                        <h1 className="text-xl font-bold text-slate-800">Add Sale</h1>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden">
                    <div className="h-full flex">
                        {/* LEFT: Customer Info */}
                        <div className="w-[320px] 2xl:w-[380px] shrink-0 h-full">
                            <CustomerInfoSidebar
                                info={customerInfo}
                                onChange={handleCustomerUpdate}
                                onAddCustomer={() => setIsAddCustomerOpen(true)}
                            />
                        </div>

                        {/* RIGHT: Cart & Payment */}
                        <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-100/50">
                            <div className="m-4 flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <ProductSearch
                                    onSearch={handleSearchProduct}
                                    onSelectHelper={handleSelectHelper}
                                />
                                <CartTable
                                    items={cartItems}
                                    onUpdateQuantity={updateCartQuantity}
                                    onRemoveItem={removeCartItem}
                                    onUpdatePrice={updateCartPrice}
                                    onUpdateUnit={updateCartUnit}
                                />
                                <PaymentSection
                                    info={paymentInfo}
                                    onChange={handlePaymentUpdate}
                                    onSave={handleSaveInvoice}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <AddCustomerModal
                    isOpen={isAddCustomerOpen}
                    onClose={() => setIsAddCustomerOpen(false)}
                    onSuccess={() => {
                        // Optional: Logic to auto-select the new customer
                    }}
                />
            </div>
        </DashboardLayout>
    );
}
