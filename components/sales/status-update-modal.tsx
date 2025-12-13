import React from 'react';
import { Sale } from '@/services/mockSalesData';

interface StatusUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    sale: Sale | null;
    onUpdateStatus: (status: Sale['status']) => void;
}

export function StatusUpdateModal({ isOpen, onClose, sale, onUpdateStatus }: StatusUpdateModalProps) {
    if (!isOpen || !sale) return null;

    // This effectively mimics the look of the ContextMenu or simple Popover shown in the image, 
    // but implemented as a simple absolute positioned list or a small modal for simplicity in this iteration if not using a library like Radix UI.
    // However, the request asks for a "modal" type popup behavior when clicking the Status button.

    // Given the image shows a dropdown-like menu, we'll implement it as such but if it needs to be a full modal, we can adjust.
    // Wait, the prompt says "pop up a modal allowing user to select". A small centered modal is safer for explicit user interaction.

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent" onClick={onClose}>
            {/* Transparent overlay to close on click outside, but we want the menu to appear near the button usually. 
                 For now, we'll make a centered simple option list as requested "modal". 
             */}
            <div className="bg-white rounded-md shadow-lg border border-slate-200 w-48 overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-1">
                    <button
                        onClick={() => { onUpdateStatus('Paid'); onClose(); }}
                        className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-sm"
                    >
                        Paid
                    </button>
                    <button
                        onClick={() => { onUpdateStatus('Unpaid'); onClose(); }}
                        className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-sm"
                    >
                        Unpaid
                    </button>
                    <button
                        onClick={() => { onUpdateStatus('Canceled'); onClose(); }}
                        className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-sm"
                    >
                        Canceled
                    </button>
                    <button
                        onClick={() => { onUpdateStatus('Partial'); onClose(); }}
                        className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-sm"
                    >
                        Partially Paid
                    </button>
                </div>
            </div>
        </div>
    );
}
