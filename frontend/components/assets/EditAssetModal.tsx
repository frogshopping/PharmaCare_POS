'use client';

import React, { useState } from 'react';
import { Asset } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X, Upload, Trash2 } from 'lucide-react';

interface EditAssetModalProps {
    asset: Asset;
    isOpen: boolean;
    isViewMode: boolean;
    onClose: () => void;
    onSave: (asset: Asset) => void;
}

export function EditAssetModal({ asset, isOpen, isViewMode, onClose, onSave }: EditAssetModalProps) {
    const [formData, setFormData] = useState<Asset>(asset);

    if (!isOpen) return null;

    const handleChange = (field: keyof Asset, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-yellow-400 px-6 py-3 flex items-center justify-between border-b">
                    <h2 className="text-lg font-bold text-slate-800">
                        {isViewMode ? 'View Asset' : `Edit Asset #${asset.id.split('-')[1]}`}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-600 hover:text-slate-800 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Column 1 */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Asset Name</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    disabled={isViewMode}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Asset Type</label>
                                <select
                                    value={formData.assetType}
                                    onChange={(e) => handleChange('assetType', e.target.value)}
                                    disabled={isViewMode}
                                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="Operating Asset">Operating Asset</option>
                                    <option value="Tangible Fixed Asset">Tangible Fixed Asset</option>
                                    <option value="Intangible Asset">Intangible Asset</option>
                                    <option value="Capital Asset">Capital Asset</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Depreciation Type</label>
                                <select
                                    value={formData.depreciationType}
                                    onChange={(e) => handleChange('depreciationType', e.target.value)}
                                    disabled={isViewMode}
                                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="Monthly">Monthly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Depreciation</label>
                                <Input
                                    value={formData.depreciation}
                                    onChange={(e) => handleChange('depreciation', e.target.value)}
                                    disabled={isViewMode}
                                    placeholder="$31.50 Per Month"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Note</label>
                                <textarea
                                    value={formData.note || ''}
                                    onChange={(e) => handleChange('note', e.target.value)}
                                    disabled={isViewMode}
                                    className="w-full h-24 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                                    placeholder="Enter notes..."
                                />
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Asset Cost*</label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={formData.assetCost}
                                    onChange={(e) => handleChange('assetCost', parseFloat(e.target.value))}
                                    disabled={isViewMode}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Salvage Value</label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={formData.salvageValue}
                                    onChange={(e) => handleChange('salvageValue', parseFloat(e.target.value))}
                                    disabled={isViewMode}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Rate</label>
                                <Input
                                    type="number"
                                    step="0.001"
                                    value={formData.rate}
                                    onChange={(e) => handleChange('rate', parseFloat(e.target.value))}
                                    disabled={isViewMode}
                                />
                            </div>
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Depreciation Status</label>
                                <select
                                    value={formData.depreciationStatus}
                                    onChange={(e) => handleChange('depreciationStatus', e.target.value)}
                                    disabled={isViewMode}
                                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Useful Life (months)</label>
                                <Input
                                    type="number"
                                    value={formData.usefulLife}
                                    onChange={(e) => handleChange('usefulLife', parseInt(e.target.value))}
                                    disabled={isViewMode}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => handleChange('status', e.target.value)}
                                    disabled={isViewMode}
                                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Asset Image Section */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Asset Image</label>
                        <div className="flex items-center gap-4">
                            {formData.image ? (
                                <div className="relative">
                                    <img src={formData.image} alt="Asset" className="w-32 h-32 object-cover rounded border" />
                                    {!isViewMode && (
                                        <button
                                            type="button"
                                            onClick={() => handleChange('image', undefined)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="w-32 h-32 border-2 border-dashed border-slate-300 rounded flex items-center justify-center bg-slate-50">
                                    <div className="text-center text-slate-400 text-xs">
                                        <Upload size={24} className="mx-auto mb-1" />
                                        <p>No Image</p>
                                    </div>
                                </div>
                            )}
                            {!isViewMode && (
                                <div>
                                    <Button type="button" className="bg-green-600 hover:bg-green-700 text-white">
                                        <Upload size={16} className="mr-2" />
                                        Add Image
                                    </Button>
                                    <p className="text-xs text-slate-500 mt-1">Upload asset image</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {!isViewMode && (
                        <div className="mt-6 flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                                Save Asset
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
