"use client"

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import RightSidebar from '@/components/layout/RightSidebar'
import DashboardStatCard from '@/components/dashboard/DashboardStatCard'
import SalesTrendChart from '@/components/dashboard/SalesTrendChart'
import StockDistributionChart from '@/components/dashboard/StockDistributionChart'
import ExpiryTimelineChart from '@/components/dashboard/ExpiryTimelineChart'
import LowStockAlertCard from '@/components/dashboard/LowStockAlertCard'
import TopSellingItemsCard from '@/components/dashboard/TopSellingItemsCard'
import SlowMovingItemsCard from '@/components/dashboard/SlowMovingItemsCard'
import RecentSalesTable from '@/components/dashboard/RecentSalesTable'
import PurchaseOrdersTable from '@/components/dashboard/PurchaseOrdersTable'
import { getMockDashboardData, DashboardData } from '@/services/mockDashboardData'

export default function Home() {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Replace with actual API call when backend is ready
        // Example:
        // const fetchDashboardData = async () => {
        //     try {
        //         const response = await fetch('/api/dashboard');
        //         const data = await response.json();
        //         setDashboardData(data);
        //     } catch (error) {
        //         console.error('Failed to fetch dashboard data:', error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        // fetchDashboardData();

        // Currently using mock data
        getMockDashboardData().then((data) => {
            setDashboardData(data);
            setLoading(false);
        });
    }, []);

    if (loading || !dashboardData) {
        return (
            <DashboardLayout showRightSidebar={true}>
                <div className="p-6 flex items-center justify-center h-full bg-slate-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-slate-600 text-sm">Loading dashboard...</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    // Transform data for charts
    const salesTrendData = dashboardData.salesTrend.labels.map((label, index) => ({
        day: label,
        value: dashboardData.salesTrend.data[index]
    }));

    const stockDistributionData = dashboardData.stockDistribution.labels.map((label, index) => ({
        category: label,
        percentage: dashboardData.stockDistribution.data[index],
        color: dashboardData.stockDistribution.colors[index]
    }));

    const expiryTimelineData = dashboardData.expiryTimeline.ranges.map((range, index) => ({
        period: range,
        count: dashboardData.expiryTimeline.counts[index]
    }));

    const lowStockData = dashboardData.lowStockAlerts.length > 0
        ? dashboardData.lowStockAlerts.map(item => ({
            name: item.name,
            stock: item.stock,
            status: item.status
        }))
        : [{ name: 'All items well stocked', stock: 0, status: 'Good' }];

    const topSellingData = dashboardData.topSellingItems.map(item => ({
        name: item.name,
        price: item.price,
        sold: item.sold,
        trend: item.trend
    }));

    const slowMovingData = dashboardData.slowMovingItems.map(item => ({
        name: item.name,
        stock: item.stock,
        sold: item.sold
    }));

    return (
        <DashboardLayout showRightSidebar={true}>
            <div className="flex h-full">
                <main className="flex-1 overflow-y-auto bg-slate-50 custom-scrollbar">
                    <div className="p-6">
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard Overview</h1>
                            <p className="text-sm text-slate-500">Real-time pharmacy analytics and insights</p>
                        </div>

                        {/* Top Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
                            <DashboardStatCard
                                title="Today's Revenue"
                                value={dashboardData.summary.todaysRevenue.value}
                                trend={dashboardData.summary.todaysRevenue.trend}
                                trendDirection={dashboardData.summary.todaysRevenue.trendDirection}
                                iconType="revenue"
                            />
                            <DashboardStatCard
                                title="Today's Profit"
                                value={dashboardData.summary.todaysProfit.value}
                                trend={dashboardData.summary.todaysProfit.trend}
                                trendDirection={dashboardData.summary.todaysProfit.trendDirection}
                                iconType="profit"
                            />
                            <DashboardStatCard
                                title="Total Products"
                                value={dashboardData.summary.totalProducts.value}
                                trend={dashboardData.summary.totalProducts.trend}
                                trendDirection={dashboardData.summary.totalProducts.trendDirection}
                                iconType="products"
                            />
                            <DashboardStatCard
                                title="Out-of-Stock"
                                value={dashboardData.summary.outOfStock.value}
                                subtitle={dashboardData.summary.outOfStock.status}
                                iconType="stock"
                            />
                            <DashboardStatCard
                                title="Expiring Soon"
                                value={dashboardData.summary.expiringSoon.value}
                                subtitle={`${dashboardData.summary.expiringSoon.days} days`}
                                iconType="expiring"
                            />
                            <DashboardStatCard
                                title="Pending Payments"
                                value={dashboardData.summary.pendingPayments.value}
                                subtitle={`${Math.abs(dashboardData.summary.pendingPayments.count)} payments`}
                                trend={Math.abs(dashboardData.summary.pendingPayments.count)}
                                trendDirection={dashboardData.summary.pendingPayments.count < 0 ? 'down' : 'up'}
                                iconType="payments"
                            />
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <div className="lg:col-span-2">
                                <SalesTrendChart data={salesTrendData} />
                            </div>
                            <div>
                                <StockDistributionChart data={stockDistributionData} />
                            </div>
                        </div>

                        {/* Expiry Timeline */}
                        <div className="mb-6">
                            <ExpiryTimelineChart data={expiryTimelineData} />
                        </div>

                        {/* Bottom Cards Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <LowStockAlertCard items={lowStockData} />
                            <TopSellingItemsCard items={topSellingData} />
                            <SlowMovingItemsCard items={slowMovingData} />
                        </div>

                        {/* Tables Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <RecentSalesTable sales={dashboardData.recentSales} />
                            <PurchaseOrdersTable orders={dashboardData.purchaseOrders} />
                        </div>
                    </div>
                </main>

                {/* Right Sidebar */}
                <RightSidebar
                    notifications={dashboardData.notifications}
                    onNewSale={() => console.log('New Sale clicked')}
                    onAddProduct={() => console.log('Add Product clicked')}
                    onNewCustomer={() => console.log('New Customer clicked')}
                    onGenerateReport={() => console.log('Generate Report clicked')}
                />
            </div>
        </DashboardLayout>
    );
}

