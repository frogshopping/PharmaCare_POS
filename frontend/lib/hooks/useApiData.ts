'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for fetching and managing API data
 * Handles loading, error states, and refetching
 */
export function useApiData<T>(
    fetchFn: () => Promise<T>,
    deps: any[] = []
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchFn();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('API Error:', err);
        } finally {
            setLoading(false);
        }
    }, [fetchFn]);

    useEffect(() => {
        fetchData();
    }, [...deps, fetchData]);

    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch };
}
