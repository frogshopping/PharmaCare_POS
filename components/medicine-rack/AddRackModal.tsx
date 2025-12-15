'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X, Package, Plus } from 'lucide-react';
import { DummyRackCategory } from '@/services/rackDummyData';

interface AddRackModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (rack: DummyRackCategory) => void;
}

export function AddRackModal({ isOpen, onClose, onSave }: AddRackModalProps) {
    const [rackName, setRackName] = useState('');
    const [rackLocation, setRackLocation] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!rackName.trim()) {
            alert('Please enter a rack name');
            return;
        }

        const newRack: DummyRackCategory = {
            id: `rack-${Date.now()}`,
            title: rackName,
            count: 0,
            medicines: [],
            location: rackLocation || 'Unassigned'
        };

        onSave(newRack);
        setRackName('');
        setRackLocation('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="absolute inset-0 z-0" onClick={onClose}></div>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 z-10">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg shadow-sm text-white">
                            <Package size={20} />
                        </div>
                        <h3 className="font-bold text-slate-800">Add New Rack</h3>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-100 rounded-full">
                        <X size={18} />
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">
                                Rack Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                placeholder="e.g., Rack A1, Shelf B"
                                value={rackName}
                                onChange={(e) => setRackName(e.target.value)}
                                className="w-full"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">
                                Location (Optional)
                            </label>
                            <Input
                                placeholder="e.g., North Wall, Storage Room 2"
                                value={rackLocation}
                                onChange={(e) => setRackLocation(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-xs text-blue-700">
                                <strong>Note:</strong> After creating the rack, you can edit it to add/remove medicines.
                            </p>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 gap-2">
                            <Plus size={16} /> Create Rack
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
