
export interface DashboardData {
    summary: {
        todaysRevenue: { value: number; trend: number; trendDirection: 'up' | 'down' };
        todaysProfit: { value: number; trend: number; trendDirection: 'up' | 'down' };
        totalProducts: { value: number; trend: number; trendDirection: 'up' | 'down' };
        outOfStock: { value: number; status: 'Good' | 'Warning' | 'Critical' };
        expiringSoon: { value: number; days: number };
        pendingPayments: { value: number; count: number };
    };
    salesTrend: {
        labels: string[];
        data: number[];
    };
    stockDistribution: {
        labels: string[];
        data: number[];
        colors: string[];
    };
    expiryTimeline: {
        ranges: string[];
        counts: number[];
    };
    notifications: {
        id: string;
        title: string;
        message: string;
        time: string;
        type: 'alert' | 'info' | 'success';
        read: boolean;
    }[];
    lowStockAlerts: {
        id: string;
        name: string;
        stock: number;
        status: 'Low' | 'Critical';
    }[];
    topSellingItems: {
        id: string;
        name: string;
        price: number;
        sold: number;
        trend: 'hot' | 'stable' | 'cold';
    }[];
    slowMovingItems: {
        id: string;
        name: string;
        stock: number;
        sold: number;
    }[];
    recentSales: {
        id: string;
        invoice: string;
        customer: string;
        date: string;
        amount: number;
        status: 'Completed' | 'Pending' | 'Cancelled';
    }[];
    purchaseOrders: {
        id: string;
        poNumber: string;
        supplier: string;
        date: string;
        amount: number;
        status: 'Pending' | 'Approved' | 'Rejected' | 'Delivered';
    }[];
}

export const getMockDashboardData = (): Promise<DashboardData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                summary: {
                    todaysRevenue: { value: 791.05, trend: 12.5, trendDirection: 'up' },
                    todaysProfit: { value: 197.76, trend: 8.3, trendDirection: 'up' },
                    totalProducts: { value: 56, trend: 2, trendDirection: 'up' },
                    outOfStock: { value: 0, status: 'Good' },
                    expiringSoon: { value: 5, days: 30 },
                    pendingPayments: { value: 0, count: -3 },
                },
                salesTrend: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    data: [12000, 15000, 14000, 18000, 22000, 20000, 16000],
                },
                stockDistribution: {
                    labels: ['Pain Rel', 'Antacid', 'Allergy', 'Diabetes', 'Skin Care', 'Digestive', 'Antibiotic', 'Cough & Cold'],
                    data: [26, 7, 10, 14, 10, 14, 12, 8],
                    colors: ['#F59E0B', '#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#6366F1', '#EF4444', '#14B8A6']
                },
                expiryTimeline: {
                    ranges: ['0-7 days', '8-15 days', '16-30 days'],
                    counts: [1, 3, 1],
                },
                notifications: [
                    {
                        id: '1',
                        title: 'Low Stock Alert',
                        message: 'Paracetamol 500mg is running low',
                        time: '2 min ago',
                        type: 'alert',
                        read: false,
                    },
                    {
                        id: '2',
                        title: 'New Order Placed',
                        message: 'Order #1234 from John Smith',
                        time: '25 min ago',
                        type: 'success',
                        read: false,
                    },
                    {
                        id: '3',
                        title: 'Payment Received',
                        message: 'Payment of $124.50 received',
                        time: '1 hour ago',
                        type: 'info',
                        read: false,
                    },
                    {
                        id: '4',
                        title: 'Stock Delivered',
                        message: 'PO #419 has been delivered',
                        time: '3 hours ago',
                        type: 'info',
                        read: true,
                    },
                ],
                lowStockAlerts: [
                    { id: '1', name: 'All items well stocked', stock: 0, status: 'Low' } // Placeholder as per image showing empty state or similar
                ],
                topSellingItems: [
                    { id: '1', name: 'Azithromycin 500mg', price: 35.75, sold: 0, trend: 'hot' },
                    { id: '2', name: 'Diphenhydramine Syrup', price: 13.4, sold: 0, trend: 'hot' },
                    { id: '3', name: 'Paracetamol 500mg', price: 5.25, sold: 0, trend: 'hot' },
                    { id: '4', name: 'Amoxicillin 250mg', price: 12.50, sold: 0, trend: 'hot' },
                    { id: '5', name: 'Ibuprofen 400mg', price: 8.75, sold: 0, trend: 'hot' }
                ],
                slowMovingItems: [
                    { id: '1', name: 'Azithromycin 500mg', stock: 85, sold: 0 },
                    { id: '2', name: 'Diphenhydramine Syrup', stock: 95, sold: 0 },
                    { id: '3', name: 'Cetirizine 10mg', stock: 78, sold: 0 },
                    { id: '4', name: 'Omeprazole 20mg', stock: 82, sold: 0 },
                    { id: '5', name: 'Metformin 500mg', stock: 90, sold: 0 }
                ],
                recentSales: [
                    { id: '1', invoice: 'INV-002', customer: 'Mike Smith', date: '2025-11-27 09:45 AM', amount: 89.50, status: 'Completed' },
                    { id: '2', invoice: 'INV-003', customer: 'Emily Davis', date: '2025-11-27 08:15 AM', amount: 234.00, status: 'Pending' },
                    { id: '3', invoice: 'INV-004', customer: 'James Wilson', date: '2025-11-26 03:30 PM', amount: 156.75, status: 'Completed' },
                    { id: '4', invoice: 'INV-005', customer: 'Sarah Johnson', date: '2025-11-26 11:20 AM', amount: 67.25, status: 'Completed' }
                ],
                purchaseOrders: [
                    { id: '1', poNumber: 'PO-8841', supplier: 'MedSupply Pharma', date: '2025-12-01 10:25', amount: 12450, status: 'Pending' },
                    { id: '2', poNumber: 'PO-8842', supplier: 'PharmaDirect Solutions', date: '2025-12-01 08:15', amount: 8270.5, status: 'Approved' },
                    { id: '3', poNumber: 'PO-8843', supplier: 'HealthCare Distributors', date: '2025-11-30 02:45 PM', amount: 15600, status: 'Pending' },
                    { id: '4', poNumber: 'PO-8844', supplier: 'MedSupply Pharma', date: '2025-11-29 04:20 PM', amount: 9450, status: 'Delivered' }
                ],
            });
        }, 500);
    });
};
