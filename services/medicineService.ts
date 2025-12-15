'use client';

/**
 * Medicine Service
 * Handles all medicine-related API calls
 */

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/config/api';
import { Medicine, Rack, GenericName, Supplier } from '@/lib/types';
import { mockMedicines, mockRacks, mockGenerics } from '@/lib/data/mockData';

const USE_MOCK_DATA = false; // Toggle for development

export const medicineService = {
    /**
     * Get all medicines
     */
    async getAll(
        page: number = 1,
        limit: number = 20,
        search: string = '',
        status: string = '',
        rack: string = ''
    ): Promise<{ data: Medicine[]; pagination?: any }> {
        if (USE_MOCK_DATA) {
            // ... kept for fallback if needed, but we are switching off
            return new Promise((resolve) => {
                // Simple mock filtering could go here, but we are relying on API now
                setTimeout(() => resolve({ data: mockMedicines, pagination: { currentPage: 1, totalPages: 1, totalItems: mockMedicines.length } }), 300);
            });
        }

        // For top-selling and low-selling, we need to fetch more data and sort client-side
        // because the backend doesn't support sorting by totalSold
        const needsClientSideSorting = status === 'top-selling' || status === 'low-selling';
        const fetchLimit = needsClientSideSorting ? 1000 : limit; // Fetch more for sorting
        const fetchPage = needsClientSideSorting ? 1 : page; // Always page 1 when sorting

        const queryParams = new URLSearchParams({
            page: fetchPage.toString(),
            limit: (fetchLimit + 1).toString(), // Request one extra item to bypass backend overwriting bug
            search,
            status: status === 'all' || needsClientSideSorting ? '' : status, // Don't pass top/low-selling to backend
            rack
        });

        const response = await apiClient.get<any>(`${API_ENDPOINTS.MEDICINES}?${queryParams.toString()}`);

        // The API returns { success: true, data: [...], pagination: {...} }
        // apiClient wraps this in { success: true, data: { ...body } }
        if (response.success && response.data) {
            let rawData = response.data.data || [];

            // Remove the extra item (Pushti bug workaround)
            rawData = rawData.slice(0, fetchLimit);

            // Client-side sorting for top-selling and low-selling
            if (needsClientSideSorting) {
                rawData.sort((a: Medicine, b: Medicine) => {
                    if (status === 'top-selling') {
                        return (b.totalSold || 0) - (a.totalSold || 0); // Descending
                    } else {
                        return (a.totalSold || 0) - (b.totalSold || 0); // Ascending
                    }
                });

                // Manual pagination
                const startIndex = (page - 1) * limit;
                const endIndex = startIndex + limit;
                const paginatedData = rawData.slice(startIndex, endIndex);
                const totalItems = rawData.length;
                const totalPages = Math.ceil(totalItems / limit);

                return {
                    data: paginatedData,
                    pagination: {
                        currentPage: page,
                        totalPages,
                        totalItems,
                        itemsPerPage: limit
                    }
                };
            }

            // For other filters, return as-is
            return {
                data: rawData,
                pagination: response.data.pagination
            };
        }

        return { data: [], pagination: null };
    },

    /**
     * Get all racks with their medicines
     */
    async getRacksWithMedicines(): Promise<{ data: any[]; total_racks: number }> {
        if (USE_MOCK_DATA) {
            // Mock implementation if needed
            return Promise.resolve({ data: [], total_racks: 0 });
        }

        const response = await apiClient.get<any>(API_ENDPOINTS.RACKS_MEDICINES);

        if (response.success && response.data) {
            // The API returns { data: [...], total_racks: number }
            return {
                data: response.data.data || [],
                total_racks: response.data.total_racks || 0
            };
        }

        return { data: [], total_racks: 0 };
    },

    /**
     * Get medicine by ID
     */
    async getById(id: string | number): Promise<Medicine | null> {
        if (USE_MOCK_DATA) {
            const medicine = mockMedicines.find((m) => m.id === id.toString());
            return Promise.resolve(medicine || null);
        }

        const response = await apiClient.get<any>(API_ENDPOINTS.MEDICINE_BY_ID(id.toString()));

        // The API returns { data: { ...medicine } }
        if (response.success && response.data) {
            return response.data.data || null;
        }

        return null;
    },

    /**
     * Create new medicine
     */
    async create(medicine: Partial<Medicine>): Promise<Medicine> {
        if (USE_MOCK_DATA) {
            // Calculate profit margin
            const buyingPrice = medicine.buyingPrice || 0;
            const sellingPrice = medicine.price || 0;
            let profitMargin = 0;
            if (buyingPrice > 0) {
                profitMargin = ((sellingPrice - buyingPrice) / buyingPrice) * 100;
            }

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
                profitMargin,
                buyingPrice: medicine.buyingPrice,
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

        const response = await apiClient.get<any>(API_ENDPOINTS.RACKS);

        // Handle both { data: [...] } and [...] response formats
        const racksData = (response.success && response.data)
            ? (Array.isArray(response.data) ? response.data : response.data.data)
            : null;

        if (Array.isArray(racksData)) {
            return racksData.map((item: any) => ({
                id: item.id,
                name: item.rack_name || item.name || 'Unknown Rack'
            }));
        }
        return [];
    },

    /**
     * Create new rack
     */
    async createRack(name: string, location?: string): Promise<Rack> {
        if (USE_MOCK_DATA) {
            const newRack = { id: Date.now(), name, location };
            mockRacks.push(newRack);
            return Promise.resolve(newRack);
        }

        const response = await apiClient.post<Rack>(API_ENDPOINTS.RACKS, { name, location });
        if (!response.success || !response.data) {
            throw new Error(response.error || 'Failed to create rack');
        }
        return response.data;
    },

    /**
     * Update rack
     */
    async updateRack(id: string | number, name: string, location?: string): Promise<Rack> {
        // Implementation for API
        const response = await apiClient.put<Rack>(`${API_ENDPOINTS.RACKS}/${id}`, { name, location });
        if (!response.success || !response.data) {
            throw new Error(response.error || 'Failed to update rack');
        }
        return response.data;
    },

    /**
     * Delete rack
     */
    async deleteRack(id: string | number): Promise<void> {
        // Implementation for API
        const response = await apiClient.delete(`${API_ENDPOINTS.RACKS}/${id}`);
        if (!response.success) {
            throw new Error(response.error || 'Failed to delete rack');
        }
    },

    /**
     * Get all generics
     */
    async getGenerics(): Promise<GenericName[]> {
        if (USE_MOCK_DATA) {
            return Promise.resolve(mockGenerics);
        }

        const response = await apiClient.get<any[]>(API_ENDPOINTS.GENERICS);
        if (response.success && Array.isArray(response.data)) {
            return response.data.map((item: any) => ({
                id: item.id,
                name: item.generic_name || item.name || 'Unknown Generic'
            }));
        }
        return mockGenerics;
    },

    /**
     * Get all suppliers
     */
    async getSuppliers(): Promise<Supplier[]> {
        if (USE_MOCK_DATA) {
            const { mockSuppliers } = await import('@/lib/data/mockData');
            return Promise.resolve(mockSuppliers);
        }
        // Fallback or API call
        return Promise.resolve([]);
    },

    /**
     * Get supplier by ID
     */
    async getSupplierById(id: string): Promise<Supplier | null> {
        if (USE_MOCK_DATA) {
            const { mockSuppliers } = await import('@/lib/data/mockData');
            const supplier = mockSuppliers.find((s) => s.id === id);
            return Promise.resolve(supplier || null);
        }
        return Promise.resolve(null);
    },

    /**
     * Create new supplier
     */
    async createSupplier(supplier: Partial<Supplier>): Promise<Supplier> {
        if (USE_MOCK_DATA) {
            const { mockSuppliers } = await import('@/lib/data/mockData');
            const newSupplier: Supplier = {
                id: `SUP-${String(mockSuppliers.length + 1).padStart(3, '0')}`,
                name: supplier.name || '',
                company: supplier.company || '',
                phone: supplier.phone || '',
                email: supplier.email,
                address: supplier.address,
                nid: supplier.nid,
                city: supplier.city,
                state: supplier.state,
                country: supplier.country || 'Bangladesh',
                status: supplier.status || 'Active',
                purchaseInvoiceCount: 0
            };
            mockSuppliers.push(newSupplier);
            return Promise.resolve(newSupplier);
        }
        // Fallback or API call
        return Promise.reject('API not implemented');
    },
};
