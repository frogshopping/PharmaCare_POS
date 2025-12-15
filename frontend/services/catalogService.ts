'use client';

/**
 * Catalog Service
 * Handles categories, subcategories, and related catalog operations
 */

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/config/api';
import { Category, Subcategory, ChildCategory, MedicineType, Package, BarcodeEntry } from '@/lib/types';
import {
    mockCategories,
    mockSubcategories,
    mockChildCategories,
    mockMedicineTypes,
    mockPackages,
    mockBarcodeEntries,
} from '@/lib/data/mockData';

const USE_MOCK_DATA = true;

export const catalogService = {
    async getCategories(): Promise<Category[]> {
        if (USE_MOCK_DATA) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(mockCategories), 500);
            });
        }

        const response = await apiClient.get<Category[]>(API_ENDPOINTS.CATEGORIES);
        return response.success && response.data ? response.data : mockCategories;
    },

    async getSubcategories(): Promise<Subcategory[]> {
        if (USE_MOCK_DATA) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(mockSubcategories), 500);
            });
        }

        const response = await apiClient.get<Subcategory[]>(API_ENDPOINTS.SUBCATEGORIES);
        return response.success && response.data ? response.data : mockSubcategories;
    },

    async getChildCategories(): Promise<ChildCategory[]> {
        if (USE_MOCK_DATA) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(mockChildCategories), 500);
            });
        }

        const response = await apiClient.get<ChildCategory[]>(API_ENDPOINTS.CHILD_CATEGORIES);
        return response.success && response.data ? response.data : mockChildCategories;
    },

    async getMedicineTypes(): Promise<MedicineType[]> {
        if (USE_MOCK_DATA) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(mockMedicineTypes), 500);
            });
        }

        const response = await apiClient.get<MedicineType[]>('/medicine-types');
        return response.success && response.data ? response.data : mockMedicineTypes;
    },

    async getPackages(): Promise<Package[]> {
        if (USE_MOCK_DATA) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(mockPackages), 500);
            });
        }

        const response = await apiClient.get<Package[]>('/packages');
        return response.success && response.data ? response.data : mockPackages;
    },

    async getBarcodeEntries(): Promise<BarcodeEntry[]> {
        if (USE_MOCK_DATA) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(mockBarcodeEntries), 500);
            });
        }

        const response = await apiClient.get<BarcodeEntry[]>('/barcode-entries');
        return response.success && response.data ? response.data : mockBarcodeEntries;
    },
};
