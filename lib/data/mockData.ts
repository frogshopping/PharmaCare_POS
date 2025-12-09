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
// RACKS & GENERICS
// ============================================

export const mockRacks: Rack[] = [
    { id: 1, name: 'Rack A1' },
    { id: 2, name: 'Rack A2' },
    { id: 3, name: 'Fridge 1' },
    { id: 4, name: 'Shelf B-Top' },
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
    const manufacturers = ['Global Pharma', 'PharmaSource', 'HealthPlus Ltd', 'MedSupply Co', 'LifeCare Distributors', 'Incepta', 'Square', 'Beximco'];
    const generics = ['Cetirizine', 'Amoxicillin', 'Ibuprofen', 'Omeprazole', 'Metformin', 'Multivitamin', 'Hydrocortisone', 'Azithromycin', 'Esomeprazole'];
    const types: Medicine['type'][] = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Suspension'];
    const suppliers = ['Renata Limited', 'Square Pharma', 'Beximco', 'ACI Limited', 'Aristopharma'];
    const rackPrefixes = ['A', 'B', 'C', 'D', 'E', 'Fridge'];

    const generatedMedicines = Array.from({ length: 60 }, (_, i) => {
        const type = types[Math.floor(Math.random() * types.length)]!;
        const rackPrefix = rackPrefixes[Math.floor(Math.random() * rackPrefixes.length)];
        const rackNum = Math.floor(Math.random() * 5) + 1;
        const location = type === 'Injection' || type === 'Syrup' ? `Fridge-${Math.floor(Math.random() * 3) + 1}` : `Rack ${rackPrefix}-${rackNum}`;
        const price = Math.round((Math.random() * 50 + 5) * 100) / 100;
        const buyingPrice = Math.round(price * 0.8 * 100) / 100;
        const inStock = Math.floor(Math.random() * 200);
        const stockStatus = inStock === 0 ? 'Low Stock' : inStock < 20 ? 'Stock Alert' : 'Normal';
        const stripSize = type === 'Tablet' || type === 'Capsule' ? 10 : 1;
        const boxSize = type === 'Tablet' || type === 'Capsule' ? 10 : 20;
        const stripPrice = Math.round(price * stripSize * 100) / 100;
        const boxPrice = Math.round(stripPrice * boxSize * 100) / 100;

        const date = new Date();
        date.setDate(date.getDate() + Math.random() * 365 + 30);
        const pDate = new Date();
        pDate.setDate(pDate.getDate() - Math.random() * 200);

        return {
            id: `med-${i + 4}`,
            srlNo: i + 4,
            name: `Medicine ${generics[i % generics.length]} ${i + 4}`,
            barcode: `SKU${i + 1100}`,
            productCode: String(i + 1100).padStart(5, '0'),
            strength: `${(i % 5) * 50 + 10}mg`,
            manufacture: manufacturers[i % manufacturers.length]!,
            genericName: generics[i % generics.length]!,
            price,
            buyingPrice,
            vat: 0.0,
            rackNo: location,
            totalPurchase: 0,
            totalSold: 0,
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

    return [...baseMedicines, ...generatedMedicines];
}

export const mockMedicines: Medicine[] = generateMedicines();
