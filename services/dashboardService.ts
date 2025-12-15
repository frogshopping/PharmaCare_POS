'use client';

/**
 * Dashboard Service
 * Handles all dashboard-related API calls
 */

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/config/api';
import { DashboardStats, Follower } from '@/lib/types';
import { mockDashboardStats, mockFollowers } from '@/lib/data/mockData';

const USE_MOCK_DATA = false; // Toggle for development

export const dashboardService = {
    /**
     * Get dashboard statistics
     */
    async getStats(): Promise<DashboardStats> {
        if (USE_MOCK_DATA) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(mockDashboardStats), 500);
            });
        }

        const response = await apiClient.get<DashboardStats>(API_ENDPOINTS.DASHBOARD_STATS);
        return response.success && response.data ? response.data : mockDashboardStats;
    },

    /**
     * Get followers/recent customers
     */
    async getFollowers(): Promise<Follower[]> {
        if (USE_MOCK_DATA) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(mockFollowers), 500);
            });
        }

        const response = await apiClient.get<Follower[]>('/followers');
        return response.success && response.data ? response.data : mockFollowers;
    },
};
