'use client';

import React, { useEffect, useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MedicineTable from '@/components/catalog/MedicineTable';
import Pagination from '@/components/catalog/Pagination';
import { Medicine, getMedicines, deleteMedicine } from '@/services/api';
import { AddProductModal } from '@/components/inventory/AddProductModal';
import { EditProductModal } from '@/components/inventory/EditProductModal';
import {
    Search,
    Plus,
    Filter,
    Package,
    AlertTriangle,
    AlertCircle,
    CheckCircle2,
    X,
    SlidersHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function InventoryPage() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [isEditProductOpen, setIsEditProductOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Medicine | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // UI State
    const [activeTab, setActiveTab] = useState<'all' | 'low-stock' | 'out-of-stock'>('all');
    const [showFilters, setShowFilters] = useState(false);

    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        strength: '',
        manufacturer: '',
        genericName: ''
    });

    const itemsPerPage = 10;

    const fetchMedicines = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getMedicines();
            setMedicines(data);
        } catch (err) {
            console.error('Error fetching medicines:', err);
            setError('Failed to load medicines. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    // Derived Stats
    const stats = useMemo(() => {
        return {
            total: medicines.length,
            lowStock: medicines.filter(m => m.inStock > 0 && m.inStock < 20).length,
            outOfStock: medicines.filter(m => m.inStock === 0).length,
            goodStock: medicines.filter(m => m.inStock >= 20).length
        };
    }, [medicines]);

    // Filtering Logic
    const filteredMedicines = useMemo(() => {
        let filtered = [...medicines];

        // 1. Tab Filter
        if (activeTab === 'low-stock') {
            filtered = filtered.filter(m => m.inStock > 0 && m.inStock < 20);
        } else if (activeTab === 'out-of-stock') {
            filtered = filtered.filter(m => m.inStock === 0);
        }

        // 2. Global Search (Name, Barcode, Code)
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(m =>
                m.name.toLowerCase().includes(lowerQuery) ||
                m.barcode.toLowerCase().includes(lowerQuery) ||
                m.productCode.toLowerCase().includes(lowerQuery)
            );
        }

        // 3. Advanced Filters
        if (filters.strength) {
            filtered = filtered.filter(m => m.strength?.toLowerCase().includes(filters.strength.toLowerCase()));
        }
        if (filters.manufacturer) {
            filtered = filtered.filter(m => m.manufacture.toLowerCase().includes(filters.manufacturer.toLowerCase()));
        }
        if (filters.genericName) {
            filtered = filtered.filter(m => m.genericName.toLowerCase().includes(filters.genericName.toLowerCase()));
        }

        // Sort by ID/Creation implicitly (mock data order) or add sorting logic here
        return filtered;
    }, [medicines, activeTab, searchQuery, filters]);

    // Pagination Logic
    const paginatedMedicines = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredMedicines.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredMedicines, currentPage]);

    const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchQuery, filters]);

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({ strength: '', manufacturer: '', genericName: '' });
        setSearchQuery('');
    };

    const hasActiveFilters = searchQuery || Object.values(filters).some(Boolean);

    const handleDelete = async (medicine: Medicine) => {
        if (!confirm(`Are you sure you want to delete ${medicine.name}?`)) return;

        try {
            await deleteMedicine(medicine.id);
            setMedicines(prev => prev.filter(m => m.id !== medicine.id));
        } catch (error) {
            console.error('Failed to delete medicine:', error);
            alert('Failed to delete medicine');
        }
    };

    const handleAddSuccess = () => {
        fetchMedicines(); // Reload list to get new ID and data from server
    };

    const handleEditSuccess = (updatedProduct: Partial<Medicine> & { id: string }) => {
        // Optimistic update
        setMedicines(prev => prev.map(m => m.id === updatedProduct.id ? { ...m, ...updatedProduct } : m));
        setIsEditProductOpen(false);
        setEditingProduct(null);
        fetchMedicines(); // Refresh to ensure data sync
    };

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
                {/* Header Section */}
                <div className="bg-white border-b border-slate-200 px-8 py-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Inventory</h1>
                            <p className="text-slate-500 text-sm mt-1">Manage product stock, pricing, and details</p>
                        </div>
                        <Button
                            className="gap-2 shadow-lg shadow-blue-600/20 bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => setIsAddProductOpen(true)}
                        >
                            <Plus size={18} />
                            Add Product
                        </Button>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 max-w-7xl mx-auto">
                        <Card className="p-4 border-slate-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Package size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Products</p>
                                <h3 className="text-xl font-bold text-slate-800">{stats.total}</h3>
                            </div>
                        </Card>
                        <Card className="p-4 border-slate-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Good Stock</p>
                                <h3 className="text-xl font-bold text-slate-800">{stats.goodStock}</h3>
                            </div>
                        </Card>
                        <Card className="p-4 border-slate-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                                <AlertCircle size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Low Stock</p>
                                <h3 className="text-xl font-bold text-slate-800">{stats.lowStock}</h3>
                            </div>
                        </Card>
                        <Card className="p-4 border-slate-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                                <AlertTriangle size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Out of Stock</p>
                                <h3 className="text-xl font-bold text-slate-800">{stats.outOfStock}</h3>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    <div className="max-w-7xl mx-auto space-y-6">

                        {/* Toolbar */}
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                {/* Tabs */}
                                <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                                    <button
                                        onClick={() => setActiveTab('all')}
                                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'all'
                                            ? 'bg-slate-100 text-slate-800 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        All Products
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('low-stock')}
                                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'low-stock'
                                            ? 'bg-amber-50 text-amber-700 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        Low Stock
                                        {stats.lowStock > 0 && (
                                            <span className="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[10px]">
                                                {stats.lowStock}
                                            </span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('out-of-stock')}
                                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'out-of-stock'
                                            ? 'bg-red-50 text-red-700 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        Out of Stock
                                        {stats.outOfStock > 0 && (
                                            <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px]">
                                                {stats.outOfStock}
                                            </span>
                                        )}
                                    </button>
                                </div>

                                {/* Search & toggles */}
                                <div className="flex items-center gap-2 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-80">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <Input
                                            placeholder="Search by name, barcode..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 bg-white border-slate-200 shadow-sm"
                                        />
                                    </div>
                                    <Button
                                        variant={showFilters ? 'default' : 'outline'}
                                        className={`gap-2 ${showFilters ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border-slate-200'}`}
                                        onClick={() => setShowFilters(!showFilters)}
                                    >
                                        <SlidersHorizontal size={16} />
                                        Filters
                                        {Object.values(filters).some(Boolean) && (
                                            <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-2 right-2"></span>
                                        )}
                                    </Button>
                                    {hasActiveFilters && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                                            onClick={clearFilters}
                                            title="Clear all filters"
                                        >
                                            <X size={18} />
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Advanced Filters Panel */}
                            {showFilters && (
                                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-200">
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Manufacturer</label>
                                        <Input
                                            placeholder="e.g. Pfizer"
                                            value={filters.manufacturer}
                                            onChange={(e) => handleFilterChange('manufacturer', e.target.value)}
                                            className="bg-slate-50 border-slate-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Generic Name</label>
                                        <Input
                                            placeholder="e.g. Paracetamol"
                                            value={filters.genericName}
                                            onChange={(e) => handleFilterChange('genericName', e.target.value)}
                                            className="bg-slate-50 border-slate-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Strength</label>
                                        <Input
                                            placeholder="e.g. 500mg"
                                            value={filters.strength}
                                            onChange={(e) => handleFilterChange('strength', e.target.value)}
                                            className="bg-slate-50 border-slate-200"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Table Section */}
                        {loading ? (
                            <div className="flex justify-center p-24">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                                    <p className="text-slate-500 text-sm font-medium">Loading inventory...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md mx-auto my-12">
                                <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                                <h3 className="text-lg font-semibold text-red-700 mb-2">Failed to load inventory</h3>
                                <p className="text-red-600 mb-6 text-sm">{error}</p>
                                <Button
                                    onClick={() => window.location.reload()}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                    Retry Connection
                                </Button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                                {paginatedMedicines.length > 0 ? (
                                    <>
                                        <MedicineTable
                                            medicines={paginatedMedicines}
                                            onRetail={(medicine) => {
                                                console.log('Retail:', medicine);
                                            }}
                                            onEdit={(medicine) => {
                                                setEditingProduct(medicine);
                                                setIsEditProductOpen(true);
                                            }}
                                            onDelete={handleDelete}
                                        />
                                        <div className="border-t border-slate-100 p-4 mt-auto bg-slate-50">
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                                itemsPerPage={itemsPerPage}
                                                totalItems={filteredMedicines.length}
                                                onPageChange={setCurrentPage}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-24 text-slate-400">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                            <Search size={32} className="opacity-20 text-slate-900" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-800">No products found</h3>
                                        <p className="text-sm">Try adjusting your active filters or search terms</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <AddProductModal
                    isOpen={isAddProductOpen}
                    onClose={() => setIsAddProductOpen(false)}
                    onSuccess={handleAddSuccess}
                />

                <EditProductModal
                    isOpen={isEditProductOpen}
                    onClose={() => setIsEditProductOpen(false)}
                    product={editingProduct}
                    onSuccess={handleEditSuccess}
                />
            </div>
        </DashboardLayout>
    );
}

