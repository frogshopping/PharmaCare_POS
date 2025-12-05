'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CategoryHeader from '@/components/catalog/CategoryHeader';
import CategoryTable from '@/components/catalog/CategoryTable';
import { Category, getCategories } from '@/services/api';

export default function ProductCategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data);
            setLoading(false);
        });
    }, []);

    return (
        <DashboardLayout>
            <div className="min-h-screen">
                <CategoryHeader />

                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <CategoryTable categories={categories} />
                )}
            </div>
        </DashboardLayout>
    );
}
