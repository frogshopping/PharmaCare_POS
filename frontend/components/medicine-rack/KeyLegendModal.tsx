'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { X, Disc, Pill, GlassWater, Syringe, Info, Package, AlertCircle } from 'lucide-react';

interface KeyLegendModalProps {
    onClose: () => void;
}

const KeyLegendModal: React.FC<KeyLegendModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Info size={20} className="text-blue-500" />
                        Icon Guide
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-200 rounded-full h-8 w-8">
                        <X size={18} className="text-slate-500" />
                    </Button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <p className="text-sm text-slate-500 mb-4">
                        Visual guide to the symbols used in the Medicine Rack.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 border border-slate-100/0 hover:border-slate-100 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                                <Disc size={18} className="text-purple-500" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-700">Tablet</div>
                                <div className="text-xs text-slate-400">Solid dosage form (e.g., Paracetamol)</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 border border-slate-100/0 hover:border-slate-100 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                                <Pill size={18} className="text-orange-500" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-700">Capsule</div>
                                <div className="text-xs text-slate-400">Encapsulated medicine (e.g., Antibiotics)</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 border border-slate-100/0 hover:border-slate-100 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                                <GlassWater size={18} className="text-blue-500" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-700">Syrup / Suspension</div>
                                <div className="text-xs text-slate-400">Liquid medication (e.g., Cough Syrup)</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 border border-slate-100/0 hover:border-slate-100 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                                <Syringe size={18} className="text-red-500" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-700">Injection</div>
                                <div className="text-xs text-slate-400">Injectable solution</div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg text-blue-700">
                            <Info size={16} className="shrink-0 mt-0.5" />
                            <p className="text-xs leading-relaxed">
                                <strong>Tip:</strong> Click on any medicine card to view its full details, including stock, purchase history, and manufacturer.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center">
                    <Button variant="outline" onClick={onClose} className="w-full">Got it</Button>
                </div>
            </div>
        </div>
    );
};

export default KeyLegendModal;
