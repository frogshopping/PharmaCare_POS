import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/config/api';
import { Supplier } from '@/lib/types';

export const supplierService = {
    /**
     * Get all suppliers with pagination and search
     */
    async getAll(
        page: number = 1,
        limit: number = 20,
        search: string = '',
        company: string = ''
    ): Promise<{ data: Supplier[]; pagination: any }> {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            search,
            company
        });

        const response = await apiClient.get<any>(`${API_ENDPOINTS.SUPPLIERS}?${queryParams.toString()}`);

        if (response.success && response.data) {
            return {
                data: response.data.data || [],
                pagination: response.data.pagination || {
                    currentPage: page,
                    totalPages: 1,
                    totalItems: 0,
                    itemsPerPage: limit
                }
            };
        }

        return {
            data: [],
            pagination: {
                currentPage: 1,
                totalPages: 1,
                totalItems: 0,
                itemsPerPage: limit
            }
        };
    },

    /**
     * Get all pharmaceutical companies (for dropdown)
     */
    async getCompanies(): Promise<string[]> {
        const response = await apiClient.get<any>(API_ENDPOINTS.PHARMACEUTICAL_COMPANIES);

        if (response.success && response.data) {
            // Assuming response.data is string[] or { data: string[] }
            return Array.isArray(response.data) ? response.data : (response.data.data || []);
        }
        return [];
    },

    /**
     * Get supplier by ID
     */
    async getById(id: string): Promise<Supplier | null> {
        const response = await apiClient.get<Supplier>(API_ENDPOINTS.SUPPLIER_BY_ID(id));
        if (response.success && response.data) {
            return response.data;
        }
        return null;
    },

    /**
     * Create new supplier
     */
    async create(supplier: Partial<Supplier>): Promise<Supplier> {
        const response = await apiClient.post<Supplier>(API_ENDPOINTS.SUPPLIERS, supplier);
        if (!response.success || !response.data) {
            throw new Error(response.error || 'Failed to create supplier');
        }
        return response.data;
    },

    /**
     * Update supplier
     */
    async update(id: string, supplier: Partial<Supplier>): Promise<Supplier> {
        const response = await apiClient.put<Supplier>(API_ENDPOINTS.SUPPLIER_BY_ID(id), supplier);
        if (!response.success || !response.data) {
            throw new Error(response.error || 'Failed to update supplier');
        }
        return response.data;
    },

    /**
     * Delete supplier
     */
    async delete(id: string): Promise<void> {
        const response = await apiClient.delete(API_ENDPOINTS.SUPPLIER_BY_ID(id));
        if (!response.success) {
            throw new Error(response.error || 'Failed to delete supplier');
        }
    }
};
