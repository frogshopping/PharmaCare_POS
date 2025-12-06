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
    SlidersHorizontal,
    Box,
    LayoutGrid,
    List,
    Grid,
    HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

// Rack Imports
import RackCard from '@/components/medicine-rack/RackCard';
import RackDetailModal from '@/components/medicine-rack/RackDetailModal';
import MedicineDetailsModal from '@/components/medicine-rack/MedicineDetailsModal';
import KeyLegendModal from '@/components/medicine-rack/KeyLegendModal';
import { getDummyRackData, DummyRackCategory, DummyMedicine } from '@/services/rackDummyData';

export default function InventoryPage() {
    // === Shared State ===
    const [viewMode, setViewMode] = useState<'list' | 'rack'>('list');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLegendOpen, setIsLegendOpen] = useState(false);

    // === Inventory List State ===
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [isEditProductOpen, setIsEditProductOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Medicine | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<'all' | 'low' | 'out'>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        strength: '',
        manufacturer: '',
        genericName: ''
    });

    // === Rack View State ===
    const [rackData, setRackData] = useState<DummyRackCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<DummyRackCategory | null>(null);
    const [selectedMedicine, setSelectedMedicine] = useState<DummyMedicine | null>(null); // Shared for both views now?
    const [selectedListMedicine, setSelectedListMedicine] = useState<Medicine | null>(null); // Type safe for list


    const itemsPerPage = 10;

    // === Data Fetching ===
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch Inventory Data
            const inventoryData = await getMedicines();
            setMedicines(inventoryData);

            // Fetch Rack Data (Simulated)
            const racks = getDummyRackData();
            setRackData(racks);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load inventory data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // === Derived Stats (Shared) ===
    const stats = useMemo(() => {
        return {
            total: medicines.length,
            lowStock: medicines.filter(m => m.inStock > 0 && m.inStock < 20).length,
            outOfStock: medicines.filter(m => m.inStock === 0).length,
            goodStock: medicines.filter(m => m.inStock >= 20).length
        };
    }, [medicines]);

    // === Filtering Logic (List View) ===
    const filteredMedicines = useMemo(() => {
        let filtered = [...medicines];

        if (statusFilter === 'low') filtered = filtered.filter(m => m.inStock > 0 && m.inStock < 20);
        else if (statusFilter === 'out') filtered = filtered.filter(m => m.inStock === 0);

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(m =>
                m.name.toLowerCase().includes(lowerQuery) ||
                m.barcode.toLowerCase().includes(lowerQuery) ||
                m.productCode.toLowerCase().includes(lowerQuery)
            );
        }

        if (filters.strength) filtered = filtered.filter(m => m.strength?.toLowerCase().includes(filters.strength.toLowerCase()));
        if (filters.manufacturer) filtered = filtered.filter(m => m.manufacture.toLowerCase().includes(filters.manufacturer.toLowerCase()));
        if (filters.genericName) filtered = filtered.filter(m => m.genericName.toLowerCase().includes(filters.genericName.toLowerCase()));

        return filtered;
    }, [medicines, statusFilter, searchQuery, filters]);

    // === Pagination (List View) ===
    const paginatedMedicines = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredMedicines.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredMedicines, currentPage]);
    const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
    useEffect(() => setCurrentPage(1), [statusFilter, searchQuery, filters, viewMode]);


    // === Filtering Logic (Rack View) ===
    const filteredRacks = useMemo(() => {
        if (!searchQuery) return rackData;

        // Unified search for racks
        const lowerQuery = searchQuery.toLowerCase();
        return rackData.map(category => {
            const matchesCategory = category.title.toLowerCase().includes(lowerQuery);
            const matchingMedicines = category.medicines.filter(m =>
                m.name.toLowerCase().includes(lowerQuery) ||
                m.manufacturer.toLowerCase().includes(lowerQuery)
            );

            if (matchesCategory || matchingMedicines.length > 0) {
                return {
                    ...category,
                    medicines: matchesCategory ? category.medicines : matchingMedicines
                };
            }
            return null;
        }).filter(Boolean) as DummyRackCategory[];
    }, [rackData, searchQuery]);


    // === Handlers ===
    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({ strength: '', manufacturer: '', genericName: '' });
        setSearchQuery('');
        setStatusFilter('all');
    };

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

    const handleAddSuccess = () => fetchData();
    const handleEditSuccess = (updatedProduct: Partial<Medicine> & { id: string }) => {
        setMedicines(prev => prev.map(m => m.id === updatedProduct.id ? { ...m, ...updatedProduct } : m));
        setIsEditProductOpen(false);
        setEditingProduct(null);
        fetchData();
    };

    // Handler for Rack Grid Items (DummyMedicine type)
    const handleRackMedicineClick = (medicine: DummyMedicine) => {
        setSelectedCategory(null);
        // Convert DummyMedicine to internal structure for modal if needed, or pass transparently
        // Since both modals might use similar structure, we might need to unify the types or props.
        // For now, MedicineDetailsModal uses `DummyMedicine` compatible props mostly.
        setTimeout(() => setSelectedMedicine(medicine), 100);
    };

    // Handler for Inventory List Items (Medicine type from API)
    const handleListMedicineView = (medicine: Medicine) => {
        // Convert API Medicine to DummyMedicine format for the shared Modal
        // or update Modal to accept both.
        // Let's simpler: Map API Medicine to DummyMedicine structure on the fly
        const mappedMed: DummyMedicine = {
            name: medicine.name,
            strength: medicine.strength,
            manufacturer: medicine.manufacture, // Note: manufacture vs manufacturer
            type: medicine.type || 'Tablet',
            genericName: medicine.genericName,
            productCode: medicine.productCode,
            tradePrice: medicine.price * 0.8, // Estimate if missing
            sellingPrice: medicine.price,
            wholesalePrice: medicine.price * 0.7, // Estimate
            inStock: medicine.inStock,
            purchaseDate: medicine.purchaseDate || 'N/A',
            expiryDate: medicine.expiryDate || 'N/A',
            batchId: medicine.batchId || 'N/A',
            supplier: medicine.supplier || 'N/A',
        };
        setSelectedMedicine(mappedMed);
    };


    const hasActiveFilters = searchQuery || Object.values(filters).some(Boolean) || statusFilter !== 'all';


    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden relative">

                {/* === Unified Header === */}
                <div className="px-8 py-8 bg-white border-b border-slate-200">
                    <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20 text-white">
                                    <Box size={24} />
                                </div>
                                Inventory Management
                            </h1>
                            <p className="text-slate-500 mt-1 ml-12">Track stock, pricing, and organized racks</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                className="bg-white text-slate-600 border-slate-200 gap-2 shadow-sm"
                                onClick={() => setIsLegendOpen(true)}
                            >
                                <HelpCircle size={18} /> Icon Guide
                            </Button>
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm"
                                onClick={() => setIsAddProductOpen(true)}
                            >
                                <Plus size={18} /> Add Product
                            </Button>
                        </div>
                    </div>

                    {/* === Stats (Universal) === */}
                    <div className="max-w-[1600px] mx-auto mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-colors">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Products</p>
                                <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.total}</h3>
                            </div>
                            <div className="p-3 bg-slate-50 text-slate-400 rounded-lg group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                                <Package size={20} />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-emerald-300 transition-colors">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">In Stock</p>
                                <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.goodStock}</h3>
                            </div>
                            <div className="p-3 bg-slate-50 text-slate-400 rounded-lg group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                                <CheckCircle2 size={20} />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-amber-300 transition-colors">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Low Stock</p>
                                <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.lowStock}</h3>
                            </div>
                            <div className="p-3 bg-slate-50 text-slate-400 rounded-lg group-hover:text-amber-600 group-hover:bg-amber-50 transition-colors">
                                <AlertCircle size={20} />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-red-300 transition-colors">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Out of Stock</p>
                                <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.outOfStock}</h3>
                            </div>
                            <div className="p-3 bg-slate-50 text-slate-400 rounded-lg group-hover:text-red-600 group-hover:bg-red-50 transition-colors">
                                <AlertTriangle size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* === Unified Toolbar === */}
                <div className="px-8 py-6">
                    <div className="max-w-[1600px] mx-auto bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-end">

                        {/* View Switcher Toggle */}
                        <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'list'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <List size={16} /> List
                            </button>
                            <button
                                onClick={() => setViewMode('rack')}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'rack'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <Grid size={16} /> Racks
                            </button>
                        </div>

                        <div className="w-px h-10 bg-slate-200 mx-2 hidden md:block"></div>

                        {/* Search (Universal) */}
                        <div className="space-y-1.5 flex-1 min-w-[250px]">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Search</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <Input
                                    placeholder={viewMode === 'list' ? "Search by name, barcode..." : "Search racks..."}
                                    className="pl-10 h-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Filters (List View Only for now) */}
                        {viewMode === 'list' && (
                            <>
                                <div className="space-y-1.5 flex-initial min-w-[180px]">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Stock Status</label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-600"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value as any)}
                                    >
                                        <option value="all">All Products</option>
                                        <option value="low">Low Stock only</option>
                                        <option value="out">Out of Stock only</option>
                                    </select>
                                </div>
                                <Button
                                    variant={showFilters ? 'default' : 'outline'}
                                    className={`h-10 shrink-0 gap-2 ${showFilters ? 'bg-slate-800 text-white' : 'border-slate-200 text-slate-600'}`}
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    <SlidersHorizontal size={16} /> Filters
                                </Button>
                            </>
                        )}

                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                className="h-10 text-red-500 hover:bg-red-50"
                                onClick={clearFilters}
                            >
                                Clear
                            </Button>
                        )}
                    </div>

                    {/* Advanced Filters Panel (List Only) */}
                    {showFilters && viewMode === 'list' && (
                        <div className="max-w-[1600px] mx-auto mt-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-2">
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

                {/* === Main Content === */}
                <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
                    <div className="max-w-[1600px] mx-auto">
                        {loading ? (
                            <div className="flex justify-center p-24">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                    <p className="text-slate-500 text-sm font-medium">Loading inventory...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md mx-auto my-12">
                                <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                                <h3 className="text-lg font-semibold text-red-700 mb-2">Failed to load data</h3>
                                <p className="text-red-600 mb-6 text-sm">{error}</p>
                                <Button onClick={() => window.location.reload()} className="bg-red-600 text-white">Retry</Button>
                            </div>
                        ) : (
                            <>
                                {/* LIST VIEW */}
                                {viewMode === 'list' && (
                                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                                        {paginatedMedicines.length > 0 ? (
                                            <>
                                                <MedicineTable
                                                    medicines={paginatedMedicines}
                                                    onRetail={(medicine) => console.log('Retail:', medicine)}
                                                    onEdit={(medicine) => {
                                                        setEditingProduct(medicine);
                                                        setIsEditProductOpen(true);
                                                    }}
                                                    onDelete={handleDelete}
                                                    onViewDetails={handleListMedicineView}
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
                                            <div className="flex flex-col items-center justify-center p-24 text-slate-400">
                                                <LayoutGrid size={48} className="mb-4 opacity-20" />
                                                <p className="text-lg font-medium text-slate-500">No products found</p>
                                                <p className="text-sm">Try adjusting your filters</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* RACK VIEW */}
                                {viewMode === 'rack' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        {filteredRacks.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                                {filteredRacks.map((category) => (
                                                    <RackCard
                                                        key={category.id}
                                                        category={category}
                                                        onClick={() => setSelectedCategory(category)}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center p-24 bg-white rounded-xl border border-slate-200 border-dashed text-slate-400">
                                                <Package size={48} className="mb-4 opacity-30" />
                                                <p className="text-lg font-medium text-slate-500">No racks found</p>
                                                <p className="text-sm">Try adjusting your search terms</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Modals */}
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
                {/* Rack Modals */}
                <RackDetailModal
                    category={selectedCategory}
                    onClose={() => setSelectedCategory(null)}
                    onMedicineClick={handleRackMedicineClick}
                />
                {selectedMedicine && (
                    <MedicineDetailsModal
                        medicine={selectedMedicine}
                        onClose={() => setSelectedMedicine(null)}
                    />
                )}
                {isLegendOpen && (
                    <KeyLegendModal
                        onClose={() => setIsLegendOpen(false)}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}
