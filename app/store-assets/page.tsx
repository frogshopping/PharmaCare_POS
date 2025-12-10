'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Asset } from '@/lib/types';
import { mockAssets } from '@/lib/data/mockData';
import { Search, Plus, Eye, Edit2, Trash2, Package } from 'lucide-react';
import { EditAssetModal } from '@/components/assets/EditAssetModal';

export default function StoreAssetsPage() {
    const [assets, setAssets] = useState<Asset[]>(mockAssets);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);

    const filteredAssets = assets.filter(asset =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.assetType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (asset: Asset) => {
        setSelectedAsset(asset);
        setIsViewMode(false);
        setIsEditModalOpen(true);
    };

    const handleView = (asset: Asset) => {
        setSelectedAsset(asset);
        setIsViewMode(true);
        setIsEditModalOpen(true);
    };

    const handleDelete = (asset: Asset) => {
        if (confirm(`Are you sure you want to delete ${asset.name}?`)) {
            setAssets(assets.filter(a => a.id !== asset.id));
        }
    };

    const handleSave = (updatedAsset: Asset) => {
        setAssets(assets.map(a => a.id === updatedAsset.id ? updatedAsset : a));
        setIsEditModalOpen(false);
        setSelectedAsset(null);
    };

    const handleAddNew = () => {
        const newAsset: Asset = {
            id: `AST-${String(assets.length + 1).padStart(3, '0')}`,
            name: '',
            assetType: 'Operating Asset',
            assetCost: 0,
            currentValue: 0,
            salvageValue: 0,
            usefulLife: 12,
            depreciationType: 'Monthly',
            depreciation: '$0.00 Per Month',
            depreciationStatus: 'Yes',
            rate: 0,
            status: 'Active',
            createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        };
        setSelectedAsset(newAsset);
        setIsViewMode(false);
        setIsEditModalOpen(true);
    };

    // Calculate totals
    const totalCost = filteredAssets.reduce((sum, asset) => sum + asset.assetCost, 0);
    const totalValue = filteredAssets.reduce((sum, asset) => sum + asset.currentValue, 0);

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 bg-white border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <Package className="text-indigo-600" size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-800">Store Assets</h1>
                                <p className="text-xs text-slate-500">Manage your store assets and equipment</p>
                            </div>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700 text-white gap-2" onClick={handleAddNew}>
                            <Plus size={18} />
                            Add Asset
                        </Button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="px-6 py-3 bg-white border-b border-slate-200 flex justify-between items-center">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <Input
                            placeholder="Search assets..."
                            className="pl-9 h-8 text-xs"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Excel-like Table */}
                <div className="flex-1 overflow-auto p-4">
                    <div className="bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-xs">
                                <thead className="bg-slate-100 sticky top-0 z-10">
                                    <tr>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left w-12">#</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-center min-w-[80px]">Preview</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[200px]">Asset Name</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[150px]">Asset Type</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[100px]">Asset Cost</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-right min-w-[100px]">Current Value</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-left min-w-[120px]">Created At</th>
                                        <th className="border border-slate-300 px-2 py-2 font-semibold text-slate-700 text-center min-w-[150px]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAssets.map((asset, idx) => (
                                        <tr key={asset.id} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="border border-slate-300 px-2 py-1.5 text-slate-500 text-center">{idx + 1}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-center">
                                                <div className="w-12 h-12 mx-auto bg-slate-100 rounded flex items-center justify-center overflow-hidden">
                                                    {asset.image ? (
                                                        <img src={asset.image} alt={asset.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Package size={20} className="text-slate-400" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-slate-800 font-medium">{asset.name}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-slate-600">{asset.assetType}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-right text-slate-700">৳{asset.assetCost.toFixed(2)}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-right text-slate-700">৳{asset.currentValue.toFixed(2)}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-slate-600">{asset.createdAt}</td>
                                            <td className="border border-slate-300 px-2 py-1.5 text-center">
                                                <div className="flex justify-center gap-1">
                                                    <Button
                                                        size="sm"
                                                        className="h-6 text-[10px] px-2 bg-cyan-500 hover:bg-cyan-600 text-white"
                                                        onClick={() => handleView(asset)}
                                                    >
                                                        <Eye size={12} className="mr-1" /> View
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className="h-6 text-[10px] px-2 bg-blue-600 hover:bg-blue-700 text-white"
                                                        onClick={() => handleEdit(asset)}
                                                    >
                                                        <Edit2 size={12} className="mr-1" /> Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className="h-6 text-[10px] px-2 bg-red-600 hover:bg-red-700 text-white"
                                                        onClick={() => handleDelete(asset)}
                                                    >
                                                        <Trash2 size={12} className="mr-1" /> Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-slate-100 sticky bottom-0">
                                    <tr className="font-bold">
                                        <td colSpan={4} className="border border-slate-300 px-2 py-2 text-right text-slate-700">Total:</td>
                                        <td className="border border-slate-300 px-2 py-2 text-right text-slate-800">৳{totalCost.toFixed(2)}</td>
                                        <td className="border border-slate-300 px-2 py-2 text-right text-slate-800">৳{totalValue.toFixed(2)}</td>
                                        <td colSpan={2} className="border border-slate-300 px-2 py-2"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div className="mt-3 text-xs text-slate-500 text-center">
                        Showing {filteredAssets.length} of {assets.length} assets
                    </div>
                </div>
            </div>

            {/* Edit/View Modal */}
            {isEditModalOpen && selectedAsset && (
                <EditAssetModal
                    asset={selectedAsset}
                    isOpen={isEditModalOpen}
                    isViewMode={isViewMode}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedAsset(null);
                    }}
                    onSave={handleSave}
                />
            )}
        </DashboardLayout>
    );
}
