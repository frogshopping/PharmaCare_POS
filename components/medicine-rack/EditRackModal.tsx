'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X, Package, Save, Trash2, Plus } from 'lucide-react';
import { DummyRackCategory, DummyMedicine } from '@/services/rackDummyData';
import { getMedicines, Medicine } from '@/services/api';

interface EditRackModalProps {
    isOpen: boolean;
    rack: DummyRackCategory;
    onClose: () => void;
    onSave: (rack: DummyRackCategory) => void;
}

export function EditRackModal({ isOpen, rack, onClose, onSave }: EditRackModalProps) {
    const [rackName, setRackName] = useState(rack.title);
    const [rackLocation, setRackLocation] = useState(rack.location || '');
    const [medicines, setMedicines] = useState<DummyMedicine[]>(rack.medicines);
    const [availableMedicines, setAvailableMedicines] = useState<Medicine[]>([]);
    const [selectedMedicineId, setSelectedMedicineId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMedicines = async () => {
            setLoading(true);
            try {
                const data = await getMedicines();
                setAvailableMedicines(data);
            } catch (error) {
                console.error('Failed to load medicines:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMedicines();
    }, []);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!rackName.trim()) {
            alert('Please enter a rack name');
            return;
        }

        const updatedRack: DummyRackCategory = {
            ...rack,
            title: rackName,
            location: rackLocation,
            medicines: medicines,
            count: medicines.length
        };

        onSave(updatedRack);
    };

    const handleAddMedicine = () => {
        if (!selectedMedicineId) return;

        const medicine = availableMedicines.find(m => m.id === selectedMedicineId);
        if (!medicine) return;

        // Check if already added
        if (medicines.some(m => m.name === medicine.name)) {
            alert('This medicine is already in this rack');
            return;
        }

        const newMedicine: DummyMedicine = {
            name: medicine.name,
            strength: medicine.strength,
            manufacturer: medicine.manufacture,
            type: medicine.type || 'Tablet',
            genericName: medicine.genericName,
            productCode: medicine.productCode,
            tradePrice: medicine.price * 0.8,
            sellingPrice: medicine.price,
            wholesalePrice: medicine.price * 0.7,
            inStock: medicine.inStock,
            purchaseDate: medicine.purchaseDate || 'N/A',
            expiryDate: medicine.expiryDate || 'N/A',
            batchId: medicine.batchId || 'N/A',
            supplier: medicine.supplier || 'N/A'
        };

        setMedicines(prev => [...prev, newMedicine]);
        setSelectedMedicineId('');
    };

    const handleRemoveMedicine = (index: number) => {
        setMedicines(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="absolute inset-0 z-0" onClick={onClose}></div>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 z-10 max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg shadow-sm text-white">
                            <Package size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Edit Rack</h3>
                            <p className="text-xs text-slate-500">Manage medicines in this rack</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-100 rounded-full">
                        <X size={18} />
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">
                        {/* Rack Details */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Rack Details</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">
                                        Rack Name <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        placeholder="e.g., Rack A1"
                                        value={rackName}
                                        onChange={(e) => setRackName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">
                                        Location
                                    </label>
                                    <Input
                                        placeholder="e.g., North Wall"
                                        value={rackLocation}
                                        onChange={(e) => setRackLocation(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Add Medicine */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Assign Medicines</h4>
                            <div className="flex gap-2">
                                <select
                                    className="flex-1 h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedMedicineId}
                                    onChange={(e) => setSelectedMedicineId(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Select a medicine to add...</option>
                                    {availableMedicines.map(med => (
                                        <option key={med.id} value={med.id}>
                                            {med.name} - {med.strength} ({med.manufacture})
                                        </option>
                                    ))}
                                </select>
                                <Button
                                    type="button"
                                    onClick={handleAddMedicine}
                                    disabled={!selectedMedicineId}
                                    className="gap-2 bg-green-600 hover:bg-green-700"
                                >
                                    <Plus size={16} /> Add
                                </Button>
                            </div>
                        </div>

                        {/* Medicine List */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                                Current Medicines ({medicines.length})
                            </h4>
                            {medicines.length === 0 ? (
                                <div className="p-8 text-center text-slate-400 border-2 border-dashed rounded-lg">
                                    <Package size={32} className="mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No medicines assigned to this rack yet</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto border border-slate-200 rounded-lg p-3">
                                    {medicines.map((med, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
                                        >
                                            <div>
                                                <div className="font-semibold text-slate-700 text-sm">{med.name}</div>
                                                <div className="text-xs text-slate-500">{med.strength} • {med.manufacturer}</div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleRemoveMedicine(idx)}
                                                className="text-red-500 hover:bg-red-50 hover:text-red-700"
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 gap-2">
                            <Save size={16} /> Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
