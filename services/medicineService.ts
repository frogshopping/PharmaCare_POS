'use client';

/**
 * Medicine Service
 * Handles all medicine-related API calls
 */

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/config/api';
import { Medicine, Rack, GenericName } from '@/lib/types';
import { mockMedicines, mockRacks, mockGenerics } from '@/lib/data/mockData';

const USE_MOCK_DATA = true; // Toggle for development

export const medicineService = {
    /**
     * Get all medicines
     */
    async getAll(): Promise<Medicine[]> {
        if (USE_MOCK_DATA) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(mockMedicines), 300);
            });
        }

        const response = await apiClient.get<Medicine[]>(API_ENDPOINTS.MEDICINES);
        return response.success && response.data ? response.data : mockMedicines;
    },

    /**
     * Get medicine by ID
     */
    async getById(id: string): Promise<Medicine | null> {
        if (USE_MOCK_DATA) {
            const medicine = mockMedicines.find((m) => m.id === id);
            return Promise.resolve(medicine || null);
        }

        const response = await apiClient.get<Medicine>(API_ENDPOINTS.MEDICINE_BY_ID(id));
        return response.success && response.data ? response.data : null;
    },

    /**
     * Create new medicine
     */
    async create(medicine: Partial<Medicine>): Promise<Medicine> {
        if (USE_MOCK_DATA) {
            const newMedicine: Medicine = {
                id: `med-${Date.now()}`,
                srlNo: mockMedicines.length + 1,
                barcode: medicine.barcode || `SKU${Date.now()}`,
                productCode: medicine.productCode || String(mockMedicines.length + 1).padStart(5, '0'),
                name: medicine.name || '',
                description: medicine.description,
                strength: medicine.strength || '',
                manufacture: medicine.manufacture || 'Unknown',
                genericName: medicine.genericName || '',
                price: medicine.price || 0,
                mrp: medicine.mrp,
                discount: medicine.discount,
                buyingPrice: medicine.buyingPrice,
                vat: medicine.vat || 0,
                rackNo: medicine.rackNo || '',
                rackLocation: medicine.rackLocation || medicine.rackNo || '',
                totalPurchase: medicine.totalPurchase || 0,
                totalSold: medicine.totalSold || 0,
                inStock: medicine.inStock || 0,
                stockStatus: medicine.stockStatus || (medicine.inStock === 0 ? 'Low Stock' : medicine.inStock && medicine.inStock < 20 ? 'Stock Alert' : 'Normal'),
                type: medicine.type,
                supplier: medicine.supplier,
                supplierContact: medicine.supplierContact,
                batchId: medicine.batchId || `B-${Date.now()}`,
                expiryDate: medicine.expiryDate,
                purchaseDate: medicine.purchaseDate || new Date().toISOString().split('T')[0],
                packSize: medicine.packSize,
                packPrice: medicine.packPrice,
            };
            mockMedicines.push(newMedicine);
            return Promise.resolve(newMedicine);
        }

        const response = await apiClient.post<Medicine>(API_ENDPOINTS.MEDICINES, medicine);
        if (!response.success || !response.data) {
            throw new Error(response.error || 'Failed to create medicine');
        }
        return response.data;
    },

    /**
     * Update existing medicine
     */
    async update(id: string, medicine: Partial<Medicine>): Promise<Medicine> {
        if (USE_MOCK_DATA) {
            const index = mockMedicines.findIndex((m) => m.id === id);
            if (index === -1) {
                throw new Error('Medicine not found');
            }
            mockMedicines[index] = { ...mockMedicines[index]!, ...medicine };
            return Promise.resolve(mockMedicines[index]!);
        }

        const response = await apiClient.put<Medicine>(API_ENDPOINTS.MEDICINE_BY_ID(id), medicine);
        if (!response.success || !response.data) {
            throw new Error(response.error || 'Failed to update medicine');
        }
        return response.data;
    },

    /**
     * Delete medicine
     */
    async delete(id: string): Promise<void> {
        if (USE_MOCK_DATA) {
            const index = mockMedicines.findIndex((m) => m.id === id);
            if (index !== -1) {
                mockMedicines.splice(index, 1);
            }
            return Promise.resolve();
        }

        const response = await apiClient.delete(API_ENDPOINTS.MEDICINE_BY_ID(id));
        if (!response.success) {
            throw new Error(response.error || 'Failed to delete medicine');
        }
    },

    /**
     * Get all racks
     */
    async getRacks(): Promise<Rack[]> {
        if (USE_MOCK_DATA) {
            return Promise.resolve(mockRacks);
        }

        const response = await apiClient.get<Rack[]>(API_ENDPOINTS.RACKS);
        return response.success && response.data ? response.data : mockRacks;
    },

    /**
     * Get all generics
     */
    async getGenerics(): Promise<GenericName[]> {
        if (USE_MOCK_DATA) {
            return Promise.resolve(mockGenerics);
        }

        const response = await apiClient.get<GenericName[]>(API_ENDPOINTS.GENERICS);
        return response.success && response.data ? response.data : mockGenerics;
    },
};
