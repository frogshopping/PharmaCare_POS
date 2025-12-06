
export interface InvoiceItem {
    id: number;
    name: string;
    strength: string;
    qty: number;
    unitPrice: number;
    tradePrice: number;
    discountPercent: number;
    vat: number;
    total: number;
}

export interface Transaction {
    date: string;
    paymentMethod: string;
    account: string;
    amount: number;
    description: string;
}

export interface Invoice {
    id: string;
    purchaseDate: string;
    pharmaceuticalCompany: string;
    supplierName: string;
    supplierContact: string; // Phone
    supplierEmail?: string;
    items: InvoiceItem[];
    subtotal: number;
    vat: number;
    discount: number;
    totalAmount: number;
    paidAmount: number;
    dueAmount: number;
    status: 'Paid' | 'Due' | 'Partial' | 'Draft';
    transactions: Transaction[];
}

const generateInvoiceItems = (count: number): InvoiceItem[] => {
    const items: InvoiceItem[] = [];
    const medicines = [
        { name: "HMG Injection", strength: "75 IU/vial", price: 795 },
        { name: "Napa Extra", strength: "500mg", price: 2.5 },
        { name: "Sergel", strength: "20mg", price: 7 },
        { name: "Monas", strength: "10mg", price: 12 },
        { name: "Ace", strength: "500mg", price: 2 }
    ];

    for (let i = 0; i < count; i++) {
        const med = medicines[Math.floor(Math.random() * medicines.length)];
        const qty = Math.floor(Math.random() * 50) + 1;
        const total = qty * med.price;
        items.push({
            id: i + 1,
            name: med.name,
            strength: med.strength,
            qty: qty,
            unitPrice: med.price,
            tradePrice: med.price,
            discountPercent: 0,
            vat: 0,
            total: total
        });
    }
    return items;
};

export const getDummyPurchaseHistory = (): Invoice[] => {
    const companies = [
        "Popular Pharmaceuticals Ltd.",
        "Square Pharmaceuticals Ltd.",
        "Aristopharma Ltd.",
        "Local Purchase For Pharmacy",
        "Incepta Pharmaceuticals Limited",
        "Synovia Pharma PLC.",
        "ACI Consumer Brands"
    ];

    const generateInvoice = (index: number): Invoice => {
        const id = `INV-${20250000 + index}`; // e.g., INV-20250001
        const company = companies[index % companies.length];
        const statusOptions: ('Paid' | 'Due' | 'Partial')[] = ['Paid', 'Paid', 'Paid', 'Due', 'Partial'];
        const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];

        const items = generateInvoiceItems(Math.floor(Math.random() * 3) + 1);
        const subtotal = items.reduce((sum, item) => sum + item.total, 0);
        const vat = 0;
        const discount = 0;
        const totalAmount = subtotal + vat - discount;

        let paidAmount = 0;
        if (status === 'Paid') paidAmount = totalAmount;
        else if (status === 'Partial') paidAmount = totalAmount / 2;
        else paidAmount = 0;

        const dueAmount = totalAmount - paidAmount;

        const transactions: Transaction[] = [];
        if (paidAmount > 0) {
            transactions.push({
                date: '2025-12-06',
                paymentMethod: 'Cash',
                account: 'Cash',
                amount: paidAmount,
                description: `Payment for ${id}`
            });
        }

        return {
            id,
            purchaseDate: '2025-12-06',
            pharmaceuticalCompany: company,
            supplierName: company.split(' ')[0] + " Supplier",
            supplierContact: `01${Math.floor(Math.random() * 900000000 + 100000000)}`,
            items,
            subtotal,
            vat,
            discount,
            totalAmount,
            paidAmount,
            dueAmount,
            status,
            transactions
        };
    };

    return Array.from({ length: 15 }, (_, i) => generateInvoice(i + 1));
};
