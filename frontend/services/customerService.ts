'use client';

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/config/api';
import { Customer, Pagination } from '@/lib/types';

export const customerService = {
    /**
     * Get all customers with pagination and search
     */
    async getAll(
        page: number = 1,
        limit: number = 20,
        search: string = ''
    ): Promise<{ data: Customer[]; pagination: Pagination }> {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            search
        });

        // The endpoint from config is /customers, but if we need /api/customers explicitly 
        // and apiClient prepends /api, then we just use API_ENDPOINTS.CUSTOMERS.
        const response = await apiClient.get<{ data: Customer[]; pagination: Pagination }>(
            `${API_ENDPOINTS.CUSTOMERS}?${queryParams.toString()}`
        );

        if (response.success && response.data) {
            // The backend returns { data: [...], pagination: {...} } inside the 'data' field of response
            // OR if the structure provided in prompt was top level, apiClient wrapper usually handles { success: true, data: ... }
            // Given the prompt: Response Body: { success: true, data: [...], pagination: {...} }
            // apiClient.get returns { success: boolean, data: T, error?: string }
            // So response.data will contain { data: Customer[], pagination: Pagination }? 
            // WAIT - check the prompt example again.
            // "data": [ ... ], "pagination": { ... } are strictly top level in the JSON body.
            // apiClient usually maps the JSON body to response.data.
            // However, typically apiClient might return the whole body as 'data' or just the 'data' field.
            // Let's assume response.data IS the body (minus success flag if apiClient strips it?).
            // Actually usually apiClient.get<T> returns { success: boolean, data: T }.
            // So response.data will be { data: Customer[], pagination: Pagination } matching the structure.

            // Wait, looking at medicineService: 
            // const response = await apiClient.get<any>(...); 
            // if (response.success && response.data) { let rawData = response.data.data ... }
            // So yes, response.data holds the full JSON body.

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
     * Create a new customer
     */
    async create(customer: Partial<Customer>): Promise<Customer> {
        const response = await apiClient.post<{ message: string; data: Customer }>(
            API_ENDPOINTS.CUSTOMERS,
            customer
        );

        if (!response.success || !response.data) {
            throw new Error(response.error || 'Failed to create customer');
        }

        return response.data.data;
    },

    /**
     * Update a customer
     */
    async update(id: number | string, customer: Partial<Customer>): Promise<Customer> {
        const response = await apiClient.put<{ message: string; data: Customer }>(
            API_ENDPOINTS.CUSTOMER_BY_ID(id.toString()),
            customer
        );

        if (!response.success || !response.data) {
            throw new Error(response.error || 'Failed to update customer');
        }

        return response.data.data;
    },

    /**
     * Delete a customer
     */
    async delete(id: number | string): Promise<void> {
        const response = await apiClient.delete<{ message: string; id: number | string }>(
            API_ENDPOINTS.CUSTOMER_BY_ID(id.toString())
        );

        if (!response.success) {
            throw new Error(response.error || 'Failed to delete customer');
        }
    }
};
