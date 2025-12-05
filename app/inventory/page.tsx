'use client';

import React, { useEffect, useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MedicineHeader from '@/components/catalog/MedicineHeader';
import MedicineFilters from '@/components/catalog/MedicineFilters';
import MedicineTable from '@/components/catalog/MedicineTable';
import Pagination from '@/components/catalog/Pagination';
import { Medicine, getMedicines } from '@/services/api';
import { AddProductModal } from '@/components/inventory/AddProductModal';

export default function InventoryPage() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState('newest');
    const [searchFilters, setSearchFilters] = useState({
        medicineName: '',
        barcode: '',
        strength: '',
        manufacturer: '',
        genericName: ''
    });

    const itemsPerPage = 10;

    useEffect(() => {
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
        fetchMedicines();
    }, []);

    const filteredMedicines = useMemo(() => {
        let filtered = [...medicines];

        // Apply filter buttons
        switch (activeFilter) {
            case 'available-100':
                filtered = filtered.filter(m => m.inStock >= 100);
                break;
            case 'available-less-100':
                filtered = filtered.filter(m => m.inStock > 0 && m.inStock < 100);
                break;
            case 'out-stock':
                filtered = filtered.filter(m => m.inStock === 0);
                break;
            case 'newest':
            default:
                // Sort by newest (assuming higher srlNo is newer)
                filtered = filtered.sort((a, b) => b.srlNo - a.srlNo);
                break;
        }

        // Apply search filters
        if (searchFilters.medicineName) {
            filtered = filtered.filter(m =>
                m.name.toLowerCase().includes(searchFilters.medicineName.toLowerCase())
            );
        }
        if (searchFilters.barcode) {
            filtered = filtered.filter(m =>
                m.barcode.toLowerCase().includes(searchFilters.barcode.toLowerCase())
            );
        }
        if (searchFilters.strength) {
            filtered = filtered.filter(m =>
                m.strength.toLowerCase().includes(searchFilters.strength.toLowerCase())
            );
        }
        if (searchFilters.manufacturer) {
            filtered = filtered.filter(m =>
                m.manufacture.toLowerCase().includes(searchFilters.manufacturer.toLowerCase())
            );
        }
        if (searchFilters.genericName) {
            filtered = filtered.filter(m =>
                m.genericName.toLowerCase().includes(searchFilters.genericName.toLowerCase())
            );
        }

        return filtered;
    }, [medicines, activeFilter, searchFilters]);

    const paginatedMedicines = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredMedicines.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredMedicines, currentPage]);

    const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
        setCurrentPage(1);
    };

    const handleSearchChange = (field: string, value: string) => {
        setSearchFilters(prev => ({ ...prev, [field]: value }));
        setCurrentPage(1);
    };

    return (
        <DashboardLayout>
            <div className="flex-1 overflow-y-auto bg-slate-50 custom-scrollbar">
                <div className="p-6">
                    <MedicineHeader
                        totalCount={filteredMedicines.length}
                        onAddItem={() => setIsAddProductOpen(true)}
                    />
                    <MedicineFilters
                        totalCount={filteredMedicines.length}
                        activeFilter={activeFilter}
                        onFilterChange={handleFilterChange}
                        onSearchChange={handleSearchChange}
                    />

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                            <p className="text-red-600">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <>
                            <MedicineTable
                                medicines={paginatedMedicines}
                                onRetail={(medicine) => {
                                    console.log('Retail:', medicine);
                                    // TODO: Implement retail functionality
                                }}
                                onEdit={(medicine) => {
                                    console.log('Edit:', medicine);
                                    // TODO: Implement edit functionality
                                }}
                                onBarcode={(medicine) => {
                                    console.log('Barcode:', medicine);
                                    // TODO: Implement barcode functionality
                                }}
                                onDelete={(medicine) => {
                                    if (confirm(`Are you sure you want to delete ${medicine.name}?`)) {
                                        console.log('Delete:', medicine);
                                        // TODO: Implement delete functionality
                                    }
                                }}
                            />
                            {totalPages > 0 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    itemsPerPage={itemsPerPage}
                                    totalItems={filteredMedicines.length}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>

            <AddProductModal
                isOpen={isAddProductOpen}
                onClose={() => setIsAddProductOpen(false)}
                onSuccess={() => {
                    console.log('Product Added');
                    // In real app, reload medicines here
                }}
            />
        </DashboardLayout>
    );
}

