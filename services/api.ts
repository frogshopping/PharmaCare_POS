'use client';

/**
 * DEPRECATED: This file is maintained for backward compatibility only.
 * 
 * Please use the new service modules instead:
 * - import { medicineService } from '@/services/medicineService'
 * - import { dashboardService } from '@/services/dashboardService'
 * - import { catalogService } from '@/services/catalogService'
 * 
 * Or use the centralized import:
 * - import { medicineService, dashboardService, catalogService } from '@/services'
 */

// Re-export types from centralized location
export type * from '@/lib/types';

// Re-export services for backward compatibility
export { medicineService } from './medicineService';
export { dashboardService } from './dashboardService';
export { catalogService } from './catalogService';

// Legacy named exports for backward compatibility
import { medicineService } from './medicineService';
import { dashboardService } from './dashboardService';
import { catalogService } from './catalogService';

export const getMedicines = medicineService.getAll;
export const createMedicine = medicineService.create;
export const updateMedicine = medicineService.update;
export const deleteMedicine = medicineService.delete;
export const getRacks = medicineService.getRacks;
export const getGenerics = medicineService.getGenerics;

export const getDashboardStats = dashboardService.getStats;
export const getFollowers = dashboardService.getFollowers;

export const getCategories = catalogService.getCategories;
export const getSubcategories = catalogService.getSubcategories;
export const getChildCategories = catalogService.getChildCategories;
export const getMedicineTypes = catalogService.getMedicineTypes;
export const getPackages = catalogService.getPackages;
export const getBarcodeEntries = catalogService.getBarcodeEntries;

// Re-export mock data for components that still use it
export { mockMedicines, mockDashboardStats, mockFollowers, mockRacks, mockGenerics } from '@/lib/data/mockData';
