'use client';

/**
 * Centralized Services Export
 * Single import point for all services
 */

export { medicineService } from './medicineService';
export { dashboardService } from './dashboardService';
export { catalogService } from './catalogService';
export { customerService } from './customerService';

// Re-export types from central location
export type * from '@/lib/types';
