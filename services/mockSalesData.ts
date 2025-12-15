export interface Sale {
    id: string; // Invoice ID
    customerName: string;
    storeName: string;
    date: string; // ISO date string
    itemsCount: number;
    billingAmount: number;
    paidAmount: number;
    dueAmount: number;
    returnAmount: number;
    paymentMethod: 'Cash' | 'Credit Card' | 'Debit Card' | 'Insurance' | 'Mobile Payment';
    orderType: 'Collection' | 'Delivery';
    status: 'Paid' | 'Unpaid' | 'Partial' | 'Canceled';
    postBy: string;
    phone: string;
}

export const mockSales: Sale[] = [
    {
        id: 'CIN-2500200115755',
        customerName: 'Shuvo (InComIT Soultion Intaernent)',
        phone: '01682079053',
        storeName: 'Family Health Care',
        date: '2025-11-12T10:30:00',
        itemsCount: 3,
        billingAmount: 70.00,
        paidAmount: 0.00,
        dueAmount: 70.00,
        returnAmount: 0.00,
        paymentMethod: 'Cash',
        orderType: 'Collection',
        status: 'Unpaid',
        postBy: 'IQBAL'
    },
    {
        id: 'CIN-2500200115754',
        customerName: 'Walk-in Customer',
        phone: '',
        storeName: 'Family Health Care',
        date: '2025-11-12T09:45:00',
        itemsCount: 2,
        billingAmount: 197.00,
        paidAmount: 197.00,
        dueAmount: 0.00,
        returnAmount: 0.00,
        paymentMethod: 'Cash',
        orderType: 'Collection',
        status: 'Paid',
        postBy: 'IQBAL'
    },
    {
        id: 'CIN-2500200115753',
        customerName: 'Walk-in Customer',
        phone: '',
        storeName: 'Family Health Care',
        date: '2025-11-12T08:15:00',
        itemsCount: 5,
        billingAmount: 40.00,
        paidAmount: 40.00,
        dueAmount: 0.00,
        returnAmount: 0.00,
        paymentMethod: 'Cash',
        orderType: 'Collection',
        status: 'Paid',
        postBy: 'IQBAL'
    },
    {
        id: 'CIN-2500200115752',
        customerName: 'Walk-in Customer',
        phone: '',
        storeName: 'Family Health Care',
        date: '2025-11-12T16:20:00',
        itemsCount: 1,
        billingAmount: 245.00,
        paidAmount: 245.00,
        dueAmount: 0.00,
        returnAmount: 0.00,
        paymentMethod: 'Cash',
        orderType: 'Collection',
        status: 'Paid',
        postBy: 'IQBAL'
    },
    {
        id: 'CIN-2500200115751',
        customerName: 'Walk-in Customer',
        phone: '',
        storeName: 'Family Health Care',
        date: '2025-11-12T14:10:00',
        itemsCount: 4,
        billingAmount: 60.00,
        paidAmount: 60.00,
        dueAmount: 0.00,
        returnAmount: 0.00,
        paymentMethod: 'Cash',
        orderType: 'Collection',
        status: 'Paid',
        postBy: 'IQBAL'
    },
    {
        id: 'CIN-2500200115747',
        customerName: 'Mukti Chokroboti Milon Chokroboti Popi',
        phone: '01621371745',
        storeName: 'Family Health Care',
        date: '2025-11-12T11:30:00',
        itemsCount: 2,
        billingAmount: 160.00,
        paidAmount: 55.00,
        dueAmount: 105.00,
        returnAmount: 0.00,
        paymentMethod: 'Cash',
        orderType: 'Collection',
        status: 'Unpaid',
        postBy: 'IQBAL'
    }
];

export const getSalesHistory = async (): Promise<Sale[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockSales), 600);
    });
};
