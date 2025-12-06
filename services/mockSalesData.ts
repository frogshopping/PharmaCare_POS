export interface Sale {
    id: string; // Invoice ID
    customerName: string;
    date: string; // ISO date string
    itemsCount: number;
    totalAmount: number;
    paymentMethod: 'Cash' | 'Credit Card' | 'Debit Card' | 'Insurance' | 'Mobile Payment';
    status: 'Completed' | 'Pending' | 'Refunded' | 'Cancelled';
}

export const mockSales: Sale[] = [
    {
        id: 'INV-001',
        customerName: 'Sarah Johnson',
        date: '2025-11-27T10:30:00',
        itemsCount: 3,
        totalAmount: 156.00,
        paymentMethod: 'Credit Card',
        status: 'Completed'
    },
    {
        id: 'INV-002',
        customerName: 'Mike Smith',
        date: '2025-11-27T09:45:00',
        itemsCount: 2,
        totalAmount: 89.50,
        paymentMethod: 'Cash',
        status: 'Completed'
    },
    {
        id: 'INV-003',
        customerName: 'Emily Davis',
        date: '2025-11-27T08:15:00',
        itemsCount: 5,
        totalAmount: 234.00,
        paymentMethod: 'Insurance',
        status: 'Pending'
    },
    {
        id: 'INV-004',
        customerName: 'James Wilson',
        date: '2025-11-26T16:20:00',
        itemsCount: 1,
        totalAmount: 67.25,
        paymentMethod: 'Debit Card',
        status: 'Completed'
    },
    {
        id: 'INV-005',
        customerName: 'Lisa Brown',
        date: '2025-11-26T14:10:00',
        itemsCount: 4,
        totalAmount: 145.80,
        paymentMethod: 'Credit Card',
        status: 'Completed'
    },
    {
        id: 'INV-006',
        customerName: 'Robert Taylor',
        date: '2025-11-26T11:30:00',
        itemsCount: 2,
        totalAmount: 98.50,
        paymentMethod: 'Cash',
        status: 'Completed'
    },
    {
        id: 'INV-007',
        customerName: 'Jennifer Clark',
        date: '2025-11-25T15:45:00',
        itemsCount: 6,
        totalAmount: 312.40,
        paymentMethod: 'Insurance',
        status: 'Completed'
    },
    {
        id: 'INV-008',
        customerName: 'David Miller',
        date: '2025-11-25T09:00:00',
        itemsCount: 1,
        totalAmount: 12.99,
        paymentMethod: 'Cash',
        status: 'Refunded'
    }
];

export const getSalesHistory = async (): Promise<Sale[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockSales), 600);
    });
};
