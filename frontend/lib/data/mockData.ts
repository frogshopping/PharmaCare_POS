'use client';

/**
 * Consolidated Mock Data
 * All mock data for the application in one place
 */

import {
    DashboardStats,
    Medicine,
    Category,
    Subcategory,
    ChildCategory,
    MedicineType,
    BarcodeEntry,
    Package,
    Follower,
    Rack,
    GenericName,
    Supplier,
    Asset,
} from '@/lib/types';

// ============================================
// DASHBOARD STATS
// ============================================

export const mockDashboardStats: DashboardStats = {
    totalPurchase: 2515468.31,
    monthlyPurchase: 241539.0,
    todaysPurchase: 1240.0,
    totalSales: 2135197.89,
    todaysDiscount: 333.0,
    todaysDiscountPercentage: 7.7,
    monthlyDiscount: 13334.97,
    monthlyDiscountPercentage: 7.37,
    todaysRevenue: 993.78,
    monthlyRevenue: 35875.81,
    todaysProfitPercentage: 15.16,
    monthlyProfitPercentage: 15.02,
    todaysExpense: 0.0,
    monthlyExpense: 4151.0,
    assetInStore: 1008119.31,
    assetInStoreValue: 726325.54,
    assetCost: 118140.0,
    currentValue: 61949.32,
};

// ============================================
// FOLLOWERS
// ============================================

export const mockFollowers: Follower[] = [
    { id: '1', name: 'Khokon Chotpoti', phone: '01887721550' },
    { id: '2', name: 'Riad Mollah Shofiuddin', phone: '01609015193' },
    { id: '3', name: 'Lucky Sriti Moriom', phone: '01782229942' },
    { id: '4', name: 'Awlad MRB Auto Dry', phone: '01716080447' },
    { id: '5', name: 'Moshi Bug Resistance', phone: '01534240090' },
    { id: '6', name: 'Hasan+Hossain', phone: '01709886054' },
    { id: '7', name: 'Shahab Uddin Van Tarail', phone: '01622819704' },
    { id: '8', name: "Dr Lipi's pt", phone: '01303144130' },
    { id: '9', name: 'Nity/ Tuba+Ilham Feni', phone: '497/6' },
];

// ============================================
// SUPPLIERS
// ============================================

export const mockSuppliers: Supplier[] = [
    { id: '1', name: 'Hasanat Zamil', company: 'ACI Limited', phone: '01923412344', status: 'Active', purchaseInvoiceCount: 1 },
    { id: '2', name: 'Shakil', company: 'A.J International', phone: '01979852191', status: 'Active', purchaseInvoiceCount: 0 },
    { id: '3', name: 'Kabir', company: 'ACI Consumer Brands', phone: '01304445906', status: 'Active', purchaseInvoiceCount: 0 },
    {
        id: 'SUP-001',
        name: 'Anis (KINETIES)',
        company: 'Incepta Pharmaceuticals Limited',
        phone: '01847323825',
        email: 'admin@admin.com',
        address: 'Dhaka, Bangladesh',
        nid: '1234567890',
        city: 'Dhaka',
        status: 'Active',
        purchaseInvoiceCount: 32
    },
    {
        id: 'SUP-002',
        name: 'Rahim (BEXIMCO)',
        company: 'Beximco Pharmaceuticals Ltd',
        phone: '01711223344',
        email: 'rahim@beximco.com',
        address: 'Gazipur, Bangladesh',
        status: 'Active',
        purchaseInvoiceCount: 15
    },
    {
        id: 'SUP-003',
        name: 'Karim (SQUARE)',
        company: 'Square Pharmaceuticals Ltd',
        phone: '01911223344',
        email: 'karim@square.com',
        address: 'Pabna, Bangladesh',
        status: 'Active',
        purchaseInvoiceCount: 28
    },
    { id: '7', name: 'Mosharof Cardiac', company: 'Popular Pharmaceuticals Ltd.', phone: '01400542888', status: 'Active', purchaseInvoiceCount: 14 },
    { id: '8', name: 'Mamun', company: 'Popular Pharmaceuticals Ltd.', phone: '01778370877', status: 'Active', purchaseInvoiceCount: 11 },
    { id: '9', name: 'Local', company: 'Beximco Pharmaceuticals Ltd.', phone: '', status: 'Active', purchaseInvoiceCount: 2 },
    { id: '10', name: 'Mamun', company: 'Incepta Pharmaceuticals Limited', phone: '01778370877', status: 'Active', purchaseInvoiceCount: 0 },
];

// ============================================
// ASSETS
// ============================================

export const mockAssets: Asset[] = [
    {
        id: 'AST-001',
        name: 'Refrigerator',
        assetType: 'Operating Asset',
        assetCost: 9450.00,
        currentValue: 5194.50,
        salvageValue: 0.00,
        usefulLife: 24,
        depreciationType: 'Monthly',
        depreciation: '$31.50 Per Month',
        depreciationStatus: 'Yes',
        rate: 0.02,
        status: 'Active',
        createdAt: '5th January 2025'
    },
    {
        id: 'AST-002',
        name: 'Beximco Leather Tube seat',
        assetType: 'Intangible Asset',
        assetCost: 27382.00,
        currentValue: 14476.00,
        salvageValue: 0.00,
        usefulLife: 36,
        depreciationType: 'Monthly',
        depreciation: '$45.50 Per Month',
        depreciationStatus: 'Yes',
        rate: 0.015,
        status: 'Active',
        createdAt: '4th January 2025'
    },
    {
        id: 'AST-003',
        name: 'Patient Bed 2-Rows, Red 3-Trunod Chair',
        assetType: 'Operating Asset',
        assetCost: 5100.00,
        currentValue: 3104.70,
        salvageValue: 0.00,
        usefulLife: 18,
        depreciationType: 'Monthly',
        depreciation: '$28.30 Per Month',
        depreciationStatus: 'Yes',
        rate: 0.025,
        status: 'Active',
        createdAt: '13th January 2025'
    },
    {
        id: 'AST-004',
        name: 'Canon Printer lens',
        assetType: 'Operating Asset',
        assetCost: 3300.00,
        currentValue: 1462.07,
        salvageValue: 0.00,
        usefulLife: 24,
        depreciationType: 'Monthly',
        depreciation: '$76.58 Per Month',
        depreciationStatus: 'Yes',
        rate: 0.023,
        status: 'Active',
        createdAt: '10th January 2025'
    },
    {
        id: 'AST-005',
        name: 'CCTV Machine',
        assetType: 'Operating Asset',
        assetCost: 2400.00,
        currentValue: 948.00,
        salvageValue: 0.00,
        usefulLife: 24,
        depreciationType: 'Monthly',
        depreciation: '$60.50 Per Month',
        depreciationStatus: 'Yes',
        rate: 0.025,
        status: 'Active',
        createdAt: '14th January 2025'
    }
];


// ============================================
// RACKS & GENERICS
// ============================================

export const mockRacks: Rack[] = [
    { id: 1, name: 'Rack A1' },
    { id: 2, name: 'Rack A2' },
    { id: 3, name: 'Fridge 1' },
    { id: 4, name: 'Shelf B-Top' },
    { id: 5, name: 'Pain Rack 1' },
];

export const mockGenerics: GenericName[] = [
    { id: 1, name: 'Paracetamol' },
    { id: 2, name: 'Azithromycin' },
    { id: 3, name: 'Ibuprofen' },
    { id: 4, name: 'Omeprazole' },
    { id: 5, name: 'Amoxicillin' },
];

// ============================================
// CATEGORIES
// ============================================

export const mockCategories: Category[] = [
    { id: '1', number: 1, name: 'Endocrine & Metabolic System', image: 'Enduc', status: 'Inactive' },
    { id: '2', number: 2, name: 'Antimicrobial', image: 'Antimi', status: 'Inactive' },
    { id: '3', number: 3, name: 'Veterinary', image: 'Veteri', status: 'Active' },
    { id: '4', number: 4, name: 'Pet Care', image: 'Pet Care', status: 'Active' },
    { id: '5', number: 5, name: 'Food and Nutritio', image: 'Food', status: 'Active' },
    { id: '6', number: 6, name: 'Supplement', image: 'Supple', status: 'Active' },
    { id: '7', number: 7, name: 'Home Care', image: 'Home', status: 'Active' },
    { id: '8', number: 8, name: 'Herbal', image: 'Herbal', status: 'Active' },
];

export const mockSubcategories: Subcategory[] = [
    { id: '1', number: 1, name: 'Aquarium Fish', categoryName: '', image: '', status: 'Active' },
    { id: '2', number: 2, name: 'Herbal', categoryName: '', image: '', status: 'Active' },
    { id: '3', number: 3, name: 'Fragrance & Perfume', categoryName: '', image: '', status: 'Active' },
    { id: '4', number: 4, name: 'Food Supplement', categoryName: '', image: '', status: 'Active' },
    { id: '5', number: 5, name: 'Wellness Supplements', categoryName: '', image: '', status: 'Active' },
    { id: '6', number: 6, name: 'Personal Lubricants & Accessories', categoryName: '', image: '', status: 'Active' },
    { id: '7', number: 7, name: 'Beauty Tools & Device', categoryName: '', image: '', status: 'Active' },
    { id: '8', number: 8, name: 'Recommended Checkups for Men', categoryName: '', image: '', status: 'Active' },
];

export const mockChildCategories: ChildCategory[] = [
    { id: '1', number: 1, name: 'Antihistaminic', subcategory: 'Anti-Allergy Preparations', image: '', status: 'Active' },
    { id: '2', number: 2, name: 'Disinfectant', subcategory: 'Disinfectant & Sanitizer', image: '', status: 'Active' },
    { id: '3', number: 3, name: 'Antipyretic', subcategory: 'Antipyretic/Analgesic Preparations', image: '', status: 'Active' },
    { id: '4', number: 4, name: 'Appetizer/Digestive Stimulant', subcategory: 'Gastrointestinal Preparations', image: '', status: 'Active' },
    { id: '5', number: 5, name: 'Metabolic Stimulant/ Metabolism Enhancer', subcategory: 'Gastrointestinal Preparations', image: '', status: 'Active' },
    { id: '6', number: 6, name: 'Antacids', subcategory: 'Gastrointestinal Preparations', image: '', status: 'Active' },
    { id: '7', number: 7, name: 'Rumen Motility', subcategory: 'Gastrointestinal Preparations', image: '', status: 'Active' },
    { id: '8', number: 8, name: 'Immunoenhancer/ Immune Stimulator', subcategory: 'Probiotics & Immunomodulators Preparations', image: '', status: 'Active' },
];

export const mockMedicineTypes: MedicineType[] = [
    { id: '1', number: 1, title: 'NT' },
    { id: '2', number: 2, title: 'Petroleum Jelly' },
    { id: '3', number: 3, title: 'Rubbing Balm' },
    { id: '4', number: 4, title: 'Milk Shake' },
    { id: '5', number: 5, title: 'Nipple' },
    { id: '6', number: 6, title: 'Air Freshener' },
    { id: '7', number: 7, title: 'Pregnancy Kit' },
    { id: '8', number: 8, title: 'Cookies' },
    { id: '9', number: 9, title: 'CAKE' },
    { id: '10', number: 10, title: 'Toilet Cleaner' },
    { id: '11', number: 11, title: 'Floor Cleaner' },
    { id: '12', number: 12, title: 'WAFER' },
];

export const mockBarcodeEntries: BarcodeEntry[] = [];

export const mockPackages: Package[] = [
    { id: '1', number: 1, packageTitle: 'pack 1', price: 168.4, status: 'Active' },
    { id: '2', number: 2, packageTitle: 'pack 2', price: 5.0, status: 'Active' },
];

// ============================================
// MEDICINES
// ============================================

// Helper function to generate medicine data
function generateMedicines(): Medicine[] {
    const baseMedicines: Medicine[] = [
        {
            id: '1',
            srlNo: 1,
            name: 'Azithromycin 500mg',
            barcode: 'SKU5',
            productCode: '00005',
            strength: '500mg',
            manufacture: 'Global Pharma',
            genericName: 'Antibiotic',
            price: 35.75,
            buyingPrice: 30.5,
            vat: 0.0,
            rackNo: '---',
            totalPurchase: 0,
            totalSold: 0,
            inStock: 85,
            stockStatus: 'Normal',
            type: 'Tablet',
            rackLocation: 'Rack A-1',
            batchId: 'B-10023',
            supplier: 'Global Pharma',
            purchaseDate: '2024-01-15',
            supplierContact: '01711223344',
            packSize: { strip: 10, box: 10 },
            packPrice: { strip: 357.5, box: 3575.0 },
        },
        {
            id: '2',
            srlNo: 2,
            name: 'Diphenhydramine Syrup',
            barcode: 'SKU13',
            productCode: '00013',
            strength: '100ml',
            manufacture: 'PharmaSource',
            genericName: 'Cough & Cold',
            price: 13.4,
            buyingPrice: 11.2,
            vat: 0.0,
            rackNo: '---',
            totalPurchase: 0,
            totalSold: 0,
            inStock: 95,
            stockStatus: 'Normal',
            type: 'Syrup',
            rackLocation: 'Rack B-2',
            batchId: 'B-10024',
            supplier: 'PharmaSource',
            purchaseDate: '2024-02-10',
            supplierContact: '01822334455',
            packSize: { strip: 1, box: 50 },
            packPrice: { strip: 13.4, box: 670.0 },
        },
        {
            id: '3',
            srlNo: 3,
            name: 'Omeprazole 20mg',
            barcode: 'SKU003',
            productCode: '00003',
            strength: '20mg',
            manufacture: 'Square Pharmaceuticals',
            genericName: 'Omeprazole',
            price: 5.0,
            buyingPrice: 4.2,
            vat: 0,
            rackNo: 'R-1',
            totalPurchase: 1000,
            totalSold: 200,
            inStock: 800,
            stockStatus: 'Normal',
            type: 'Capsule',
            rackLocation: 'Rack C-5',
            batchId: 'B-4421',
            supplier: 'Square Pharma',
            purchaseDate: '2023-11-20',
            packSize: { strip: 10, box: 10 },
            packPrice: { strip: 50.0, box: 500.0 },
        },
    ];

    // Generate additional medicines
    const categories = ['Allergy', 'Antibiotic', 'Pain Relief', 'Antacid', 'Diabetes Care', 'Vitamins', 'Skin Care', 'Cardiac'];
    const manufacturers = [
        'Square Pharmaceuticals PLC', 'Beximco Pharmaceuticals Ltd', 'Incepta Pharmaceuticals Ltd',
        'Renata Limited', 'ACI Limited', 'Eskayef Pharmaceuticals Ltd (SK+F)',
        'Aristopharma Ltd', 'Drug International Ltd', 'Healthcare Pharmaceuticals Ltd', 'Opsonin Pharma Ltd'
    ];
    // Real popular Bangladeshi medicines
    const popularMedicines = [
        { name: 'Napa', generic: 'Paracetamol', strength: '500mg', type: 'Tablet', mfr: 'Beximco Pharmaceuticals Ltd' },
        { name: 'Napa Extra', generic: 'Paracetamol + Caffeine', strength: '500mg+65mg', type: 'Tablet', mfr: 'Beximco Pharmaceuticals Ltd' },
        { name: 'Seclo', generic: 'Omeprazole', strength: '20mg', type: 'Capsule', mfr: 'Square Pharmaceuticals PLC' },
        { name: 'Maxpro', generic: 'Esomeprazole', strength: '20mg', type: 'Tablet', mfr: 'Renata Limited' },
        { name: 'Sergel', generic: 'Esomeprazole', strength: '20mg', type: 'Capsule', mfr: 'Healthcare Pharmaceuticals Ltd' },
        { name: 'Pantonix', generic: 'Pantoprazole', strength: '20mg', type: 'Tablet', mfr: 'Incepta Pharmaceuticals Ltd' },
        { name: 'Bizoran', generic: 'Amlodipine + Olmesartan', strength: '5/20mg', type: 'Tablet', mfr: 'Aristopharma Ltd' },
        { name: 'Monas', generic: 'Montelukast', strength: '10mg', type: 'Tablet', mfr: 'The ACME Laboratories Ltd' },
        { name: 'Fexo', generic: 'Fexofenadine', strength: '120mg', type: 'Tablet', mfr: 'Square Pharmaceuticals PLC' },
        { name: 'Losectil', generic: 'Omeprazole', strength: '20mg', type: 'Capsule', mfr: 'Eskayef Pharmaceuticals Ltd (SK+F)' },
        { name: 'Tofen', generic: 'Ketotifen', strength: '1mg', type: 'Tablet', mfr: 'Beximco Pharmaceuticals Ltd' },
        { name: 'Alatrol', generic: 'Cetirizine', strength: '10mg', type: 'Tablet', mfr: 'Square Pharmaceuticals PLC' },
        { name: 'Zimax', generic: 'Azithromycin', strength: '500mg', type: 'Capsule', mfr: 'Square Pharmaceuticals PLC' },
        { name: 'Cef-3', generic: 'Cefixime', strength: '200mg', type: 'Capsule', mfr: 'Square Pharmaceuticals PLC' },
        { name: 'E-Cap', generic: 'Vitamin E', strength: '400IU', type: 'Soft Gelatin Capsule', mfr: 'Drug International Ltd' },
        { name: 'Calbo-D', generic: 'Calcium + Vitamin D3', strength: '500mg+200IU', type: 'Tablet', mfr: 'Square Pharmaceuticals PLC' },
        { name: 'Filwel Gold', generic: 'Multivitamin & Multimineral', strength: '', type: 'Tablet', mfr: 'Square Pharmaceuticals PLC' },
        { name: 'Neuro-B', generic: 'Vitamin B1, B6, B12', strength: '', type: 'Tablet', mfr: 'Square Pharmaceuticals PLC' },
        { name: 'Ceevit', generic: 'Vitamin C', strength: '250mg', type: 'Chewable Tablet', mfr: 'Square Pharmaceuticals PLC' },
        { name: 'Entacyd', generic: 'Antacid', strength: '', type: 'Suspension', mfr: 'Square Pharmaceuticals PLC' }
    ];

    const generics = ['Cetirizine', 'Amoxicillin', 'Ibuprofen', 'Omeprazole', 'Metformin', 'Multivitamin', 'Hydrocortisone', 'Azithromycin', 'Esomeprazole'];
    const types: Medicine['type'][] = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Suspension'];
    const suppliers = ['Renata Depot', 'Square Depot', 'Beximco Depot', 'ACI Depot', 'Aristopharma Depot'];
    const rackPrefixes = ['A', 'B', 'C', 'D', 'E', 'Fridge'];

    const generatedMedicines = Array.from({ length: 60 }, (_, i) => {
        // Use real medicine data for the first 20 items
        let medData;
        if (i < popularMedicines.length) {
            medData = popularMedicines[i];
        }

        const type = medData ? (medData.type as Medicine['type']) : types[Math.floor(Math.random() * types.length)]!;
        const rackPrefix = rackPrefixes[Math.floor(Math.random() * rackPrefixes.length)];
        const rackNum = Math.floor(Math.random() * 5) + 1;
        const location = type === 'Injection' || type === 'Syrup' || type === 'Suspension' ? `Fridge-${Math.floor(Math.random() * 3) + 1}` : `Rack ${rackPrefix}-${rackNum}`;

        const price = Math.round((Math.random() * 50 + 5) * 100) / 100;
        const buyingPrice = Math.round(price * 0.8 * 100) / 100;
        // Random stock but higher for top selling (first few)
        const inStock = i < 10 ? Math.floor(Math.random() * 500 + 500) : Math.floor(Math.random() * 200);
        const stockStatus = inStock === 0 ? 'Low Stock' : inStock < 20 ? 'Stock Alert' : 'Normal';

        const stripSize = type === 'Tablet' || type === 'Capsule' ? 10 : 1;
        const boxSize = type === 'Tablet' || type === 'Capsule' ? 10 : 20;

        const stripPrice = Math.round(price * stripSize * 100) / 100;
        const boxPrice = Math.round(stripPrice * boxSize * 100) / 100;

        const date = new Date();
        date.setDate(date.getDate() + Math.random() * 365 + 30);
        const pDate = new Date();
        pDate.setDate(pDate.getDate() - Math.random() * 200);

        // High sales for top items
        const totalSold = i < 10 ? Math.floor(Math.random() * 1000 + 500) : Math.floor(Math.random() * 100);

        return {
            id: `med-${i + 4}`,
            srlNo: i + 4,
            name: medData ? medData.name : `Medicine ${generics[i % generics.length]} ${i + 4}`,
            barcode: `SKU${i + 1100}`,
            productCode: String(i + 1100).padStart(5, '0'),
            strength: medData ? medData.strength : `${(i % 5) * 50 + 10}mg`,
            manufacture: medData ? medData.mfr : manufacturers[i % manufacturers.length]!,
            genericName: medData ? medData.generic : generics[i % generics.length]!,
            price,
            buyingPrice,
            vat: 0.0,
            rackNo: location,
            totalPurchase: totalSold + inStock,
            totalSold: totalSold,
            inStock,
            stockStatus: stockStatus as Medicine['stockStatus'],
            category: categories[i % categories.length],
            expiryDate: date.toISOString().split('T')[0],
            type,
            rackLocation: location,
            batchId: `B-${Math.floor(100000 + Math.random() * 900000)}`,
            supplier: suppliers[i % suppliers.length],
            supplierContact: `01${Math.floor(Math.random() * 80000000 + 10000000)}`,
            purchaseDate: pDate.toISOString().split('T')[0],
            packSize: { strip: stripSize, box: boxSize },
            packPrice: { strip: stripPrice, box: boxPrice },
        };
    });

    const painMedicinesRaw = [
        { n: "A-Calm", t: "Tablet", s: "50 mg", m: "The ACME Laboratories Ltd" },
        { n: "Alkanon", t: "Tablet", s: "500 mg", m: "Renata Limited" },
        { n: "Anaflex", t: "Tablet", s: "500 mg", m: "ACI Limited" },
        { n: "A-Fenac", t: "Tablet", s: "50 mg", m: "The ACME Laboratories Ltd" },
        { n: "Azelto", t: "Capsule", s: "100 mg", m: "Ziska Pharmaceuticals Ltd." },
        { n: "Beklo", t: "Tablet", s: "10 mg", m: "Opsonin Pharma Ltd." },
        { n: "Cilosta", t: "Tablet", s: "100 mg", m: "Square Pharmaceuticals Ltd." },
        { n: "Clofenac SR", t: "Tablet", s: "100 mg", m: "Square Pharmaceuticals Ltd." },
        { n: "Cox-E", t: "Tablet", s: "120 mg", m: "Popular Pharmaceuticals Ltd." },
        { n: "Dinovo", t: "Tablet", s: "500 mg+20 mg", m: "Beximco Pharmaceuticals Ltd." },
        { n: "Dotfix", t: "Tablet", s: "1 mg", m: "Square Pharmaceuticals Ltd." },
        { n: "Duloxen", t: "Tablet", s: "20 mg", m: "Incepta Pharmaceuticals Limited" },
        { n: "Etorac", t: "Tablet", s: "10 mg", m: "Incepta Pharmaceuticals Limited" },
        { n: "Etorix", t: "Tablet", s: "90 mg", m: "Eskayef Bangladesh Ltd." },
        { n: "Febustat", t: "Tablet", s: "40 mg", m: "Incepta Pharmaceuticals Limited" },
        { n: "Feluric", t: "Tablet", s: "40 mg", m: "Healthcare Pharmacuticals Ltd." },
        { n: "Flamex", t: "Tablet", s: "400 mg", m: "ACI Limited" },
        { n: "Flexi", t: "Tablet", s: "100 mg", m: "Square Pharmaceuticals Ltd." },
        { n: "Flexibac", t: "Tablet", s: "10 mg", m: "Beacon Pharmaceuticals Ltd." },
        { n: "Gaba", t: "Tablet", s: "300 mg", m: "Renata Limited" },
        { n: "Gaba-PCR", t: "Tablet", s: "82.5 mg", m: "Renata Limited" },
        { n: "Gabarol", t: "Capsule", s: "75 mg", m: "ACI Limited" },
        { n: "HPR", t: "Tablet", s: "250 mg", m: "Pacific Pharmaceuticals Ltd." },
        { n: "Indomet SR", t: "Capsule", s: "75 mg", m: "Opsonin Pharma Ltd." },
        { n: "Lindac", t: "Tablet", s: "100 mg", m: "Popular Pharmaceuticals Ltd." },
        { n: "Lorno", t: "Tablet", s: "4 mg", m: "Square Pharmaceuticals Ltd." },
        { n: "Lyric", t: "Capsule", s: "50 mg", m: "Healthcare Pharmacuticals Ltd." },
        { n: "Mervan", t: "Tablet", s: "100 mg", m: "Aristopharma Ltd." },
        { n: "Methotrax", t: "Tablet", s: "10 mg", m: "Delta Pharma Limited" },
        { n: "Migalin", t: "Tablet", s: "2.5 mg", m: "Popular Pharmaceuticals Ltd." },
        { n: "Myolax", t: "Tablet", s: "50 mg", m: "Incepta Pharmaceuticals Limited" },
        { n: "Nabumet", t: "Tablet", s: "500 mg", m: "Eskayef Pharmaceuticals Ltd." },
        { n: "Napro-A", t: "Tablet", s: "250 mg", m: "The ACME Laboratories Ltd" },
        { n: "Naprosyn", t: "Tablet", s: "500 mg", m: "Radiant Pharmaceuticals Ltd." },
        { n: "Naprosyn Plus", t: "Tablet", s: "375 mg+20 mg", m: "Radiant Pharmaceuticals Ltd." },
        { n: "Napryn", t: "Tablet", s: "500 mg", m: "Healthcare Pharmacuticals Ltd." },
        { n: "Naspro Plus", t: "Tablet", s: "500 mg+20 mg", m: "Popular Pharmaceuticals Ltd." },
        { n: "Nervalin CR", t: "Tablet", s: "82.5 mg", m: "Beximco Pharmaceuticals Ltd." },
        { n: "Neso", t: "Tablet", s: "500 mg+20 mg", m: "Aristopharma Ltd." },
        { n: "Neural", t: "Tablet", s: "0.5 mg", m: "Healthcare Pharmacuticals Ltd." },
        { n: "Nimovo", t: "Tablet", s: "500 mg+20 mg", m: "NIPRO JMI Pharma Ltd." },
        { n: "Anadol", t: "Capsule", s: "50 mg", m: "Square Pharmaceuticals Ltd." },
        { n: "Anodyne SR", t: "Capsule", s: "100 mg", m: "Ibn Sina Pharmaceuticals Ltd." },
        { n: "Baritor", t: "Tablet", s: "2 mg", m: "Square Pharmaceuticals Ltd." },
        { n: "Camlor", t: "Tablet", s: "4 mg", m: "Popular Pharmaceuticals Ltd." },
        { n: "Clofenac", t: "Tablet", s: "50 mg", m: "Square Pharmaceuticals Ltd." },
        { n: "Colimax", t: "Tablet", s: "0.6 mg", m: "Square Pharmaceuticals Ltd." },
        { n: "Curnoid", t: "Tablet", s: "500 mg", m: "Radiant Pharmaceuticals Ltd." },
        { n: "Dinovo", t: "Tablet", s: "375 mg+20 mg", m: "Beximco Pharmaceuticals Ltd." },
        { n: "Dotiric", t: "Tablet", s: "0.5 mg", m: "Everest Pharmaceuticals Ltd." },
        { n: "Edopain ER", t: "Tablet", s: "600 mg", m: "Incepta Pharmaceuticals Limited" },
        { n: "Etorica", t: "Tablet", s: "120 mg", m: "Labaid Pharma Ltd." },
        { n: "Etorix", t: "Tablet", s: "120 mg", m: "Eskayef Bangladesh Ltd." },
        { n: "Febustat", t: "Tablet", s: "80 mg", m: "Incepta Pharmaceuticals Limited" },
        { n: "Fenaton", t: "Tablet", s: "500 mg", m: "Drug International Limited" },
        { n: "Flamfix", t: "Tablet", s: "500 mg", m: "Square Pharmaceuticals Ltd." },
        { n: "Flexi SR", t: "Tablet", s: "200 mg", m: "Square Pharmaceuticals Ltd." },
        { n: "Flexilax", t: "Tablet", s: "10 mg", m: "Square Pharmaceuticals Ltd." },
        { n: "GABA-P", t: "Capsule", s: "50 mg", m: "Renata Limited" },
        { n: "Gaba-PCR", t: "Tablet", s: "165 mg", m: "Renata Limited" },
        { n: "Gabarol", t: "Capsule", s: "25 mg", m: "ACI Limited" },
        { n: "HPR-DS", t: "Tablet", s: "500 mg", m: "Pacific Pharmaceuticals Ltd." },
        { n: "Jakloc XR", t: "Tablet", s: "11 mg", m: "Popular Pharmaceuticals Ltd." },
        { n: "Lindac", t: "Tablet", s: "200 mg", m: "Popular Pharmaceuticals Ltd." },
        { n: "Loxodol", t: "Tablet", s: "8 mg", m: "Navana Pharmaceuticals Ltd." },
        { n: "Lyrinex CR", t: "Tablet", s: "82.5 mg", m: "NIPRO JMI Pharma Ltd." },
        { n: "Mervan SR", t: "Tablet", s: "200 mg", m: "Aristopharma Ltd." },
        { n: "Mig", t: "Tablet", s: "5 mg", m: "Eskayef Bangladesh Ltd." },
        { n: "Mirotiv", t: "Tablet", s: "5 mg", m: "Renata Limited" },
        { n: "Myrica", t: "Capsule", s: "50 mg", m: "UniMed UniHealth Pharmaceuticals Ltd." },
        { n: "Nabumet", t: "Tablet", s: "750 mg", m: "Eskayef Bangladesh Ltd." },
        { n: "Napro-A Plus", t: "Tablet", s: "375 mg+20 mg", m: "The ACME Laboratories Ltd" },
        { n: "Naprosyn", t: "Tablet", s: "250 mg", m: "Radiant Pharmaceuticals Ltd." },
        { n: "Naprox", t: "Tablet", s: "500 mg", m: "Eskayef Pharmaceuticals Ltd." },
        { n: "Napryn SR", t: "Tablet", s: "500 mg", m: "Healthcare Pharmacuticals Ltd." },
        { n: "Naspro Plus", t: "Tablet", s: "375 mg+20 mg", m: "Popular Pharmaceuticals Ltd." },
        { n: "Nervex", t: "Tablet", s: "0.5 mg", m: "Orion Pharma Ltd." },
        { n: "Neugaba", t: "Capsule", s: "25 mg", m: "Sun Pharmaceutical (Bangladesh) Limited" },
        { n: "Neurolin", t: "Capsule", s: "50 mg", m: "Square Pharmaceuticals Ltd." },
        { n: "Nodia", t: "Tablet", s: "10 mg", m: "Incepta Pharmaceuticals Limited" },
        { n: "Aldorin", t: "Tablet", s: "50 mg", m: "Eskayef Pharmaceuticals Ltd." },
        { n: "Anadol Plus", t: "Tablet", s: "325 mg+37.5 mg", m: "Square Pharmaceuticals Ltd." },
        { n: "Apitac", t: "Tablet", s: "100 mg", m: "The ACME Laboratories Ltd" }
    ];

    const painMedicines = painMedicinesRaw.map((m, i) => {
        const idOffset = 200 + i;
        const price = Math.round((Math.random() * 50 + 5) * 100) / 100;
        const buyingPrice = Math.round(price * 0.8 * 100) / 100;
        const inStock = Math.floor(Math.random() * 200) + 50;
        const stockStatus = inStock < 20 ? 'Stock Alert' : 'Normal';

        return {
            id: `pain-med-${idOffset}`,
            srlNo: idOffset,
            name: m.n,
            barcode: `SKU-P${idOffset}`,
            productCode: `P${idOffset}`,
            strength: m.s,
            manufacture: m.m,
            genericName: 'Pain Relief (Generic)',
            price,
            buyingPrice,
            vat: 0.0,
            rackNo: 'Pain Rack 1',
            rackLocation: 'Pain Rack 1',
            totalPurchase: 0,
            totalSold: 0,
            inStock,
            stockStatus: stockStatus as Medicine['stockStatus'],
            type: m.t as Medicine['type'],
            category: 'Pain Relief',
            expiryDate: new Date(Date.now() + 31536000000).toISOString().split('T')[0], // 1 year from now
            batchId: `B-${Math.floor(Math.random() * 90000)}`,
            supplier: 'Local Pharma',
            purchaseDate: new Date().toISOString().split('T')[0],
            supplierContact: '',
            packSize: { strip: 10, box: 10 },
            packPrice: { strip: parseFloat((price * 10).toFixed(2)), box: parseFloat((price * 100).toFixed(2)) }
        };
    });

    const calboVariants = [
        { n: "Calbo-D", t: "Tablet", s: "500 mg", m: "Square Pharmaceuticals PLC", p: 5.00 }, // Standard
        { n: "Calbo-D", t: "Tablet", s: "100 mg", m: "Square Pharmaceuticals PLC", p: 2.50 }, // Low strength
        { n: "Calbo-D Jr", t: "Tablet", s: "50 mg", m: "Square Pharmaceuticals PLC", p: 1.50 }, // Kids
        { n: "Calbo-D Forte", t: "Tablet", s: "1000 mg", m: "Square Pharmaceuticals PLC", p: 9.00 }, // High strength
    ];

    const calboMedicines = calboVariants.map((m, i) => ({
        id: `calbo-${i}`,
        srlNo: 300 + i,
        name: m.n,
        barcode: `CALBO-${i}`,
        productCode: `C-${i}`,
        strength: m.s,
        manufacture: m.m,
        genericName: 'Calcium + Vitamin D3',
        price: m.p,
        buyingPrice: m.p * 0.8,
        vat: 0,
        rackNo: 'Rack A-1',
        totalPurchase: 50,
        totalSold: 10,
        inStock: 100,
        stockStatus: 'Normal' as const,
        type: m.t as Medicine['type'],
        expiryDate: new Date().toISOString().split('T')[0],
        supplier: 'Square Pharma',
        packSize: { strip: 10, box: 10 },
        packPrice: { strip: m.p * 10, box: m.p * 100 }
    }));

    return [...baseMedicines, ...painMedicines, ...calboMedicines, ...generatedMedicines];
}

export const mockMedicines: Medicine[] = generateMedicines();
