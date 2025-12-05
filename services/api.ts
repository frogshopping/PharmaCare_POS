
export interface DashboardStats {
  totalPurchase: number;
  monthlyPurchase: number;
  todaysPurchase: number;
  totalSales: number;
  todaysDiscount: number;
  todaysDiscountPercentage: number;
  monthlyDiscount: number;
  monthlyDiscountPercentage: number;
  todaysRevenue: number;
  monthlyRevenue: number;
  todaysProfitPercentage: number;
  monthlyProfitPercentage: number;
  todaysExpense: number;
  monthlyExpense: number;
  assetInStore: number;
  assetInStoreValue: number;
  assetCost: number;
  currentValue: number;
}

export interface Medicine {
  id: string;
  srlNo: number;
  name: string;
  image?: string;
  barcode: string;
  productCode: string;
  strength: string;
  manufacture: string;
  genericName: string;
  price: number;
  vat: number;
  rackNo: string;
  totalPurchase: number;
  totalSold: number;
  inStock: number;
  stockStatus: 'Low Stock' | 'Stock Alert' | 'Normal';
}

export interface Category {
  id: string;
  number: number;
  name: string;
  image?: string;
  status: 'Active' | 'Inactive';
}

export interface Subcategory {
  id: string;
  number: number;
  name: string;
  categoryName: string;
  image?: string;
  status: 'Active' | 'Inactive';
}

export interface ChildCategory {
  id: string;
  number: number;
  name: string;
  subcategory: string;
  image?: string;
  status: 'Active' | 'Inactive';
}

export interface MedicineType {
  id: string;
  number: number;
  title: string;
}

export interface BarcodeEntry {
  id: string;
  srlNo: number;
  date: string;
  ref: string;
  remarks: string;
}

export interface Package {
  id: string;
  number: number;
  packageTitle: string;
  price: number;
  status: 'Active' | 'Inactive';
}

export interface Follower {
  id: string;
  name: string;
  phone: string;
  avatar?: string; // URL or placeholder
}

export const mockDashboardStats: DashboardStats = {
  totalPurchase: 2515468.31,
  monthlyPurchase: 241539.00,
  todaysPurchase: 1240.00,
  totalSales: 2135197.89,
  todaysDiscount: 333.00,
  todaysDiscountPercentage: 7.70,
  monthlyDiscount: 13334.97,
  monthlyDiscountPercentage: 7.37,
  todaysRevenue: 993.78,
  monthlyRevenue: 35875.81,
  todaysProfitPercentage: 15.16,
  monthlyProfitPercentage: 15.02,
  todaysExpense: 0.00,
  monthlyExpense: 4151.00,
  assetInStore: 1008119.31,
  assetInStoreValue: 726325.54,
  assetCost: 118140.00,
  currentValue: 61949.32
};

export const mockFollowers: Follower[] = [
  { id: '1', name: 'Khokon Chotpoti', phone: '01887721550' },
  { id: '2', name: 'Riad Mollah Shofiuddin', phone: '01609015193' },
  { id: '3', name: 'Lucky Sriti Moriom', phone: '01782229942' },
  { id: '4', name: 'Awlad MRB Auto Dry', phone: '01716080447' },
  { id: '5', name: 'Moshi Bug Resistance', phone: '01534240090' },
  { id: '6', name: 'Hasan+Hossain', phone: '01709886054' },
  { id: '7', name: 'Shahab Uddin Van Tarail', phone: '01622819704' },
  { id: '8', name: 'Dr Lipi\'s pt', phone: '01303144130' },
  { id: '9', name: 'Nity/ Tuba+Ilham Feni', phone: '497/6' },
];

export const mockMedicines: Medicine[] = [
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
    vat: 0.00,
    rackNo: '---',
    totalPurchase: 0,
    totalSold: 0,
    inStock: 85,
    stockStatus: 'Normal'
  },
  {
    id: '2',
    srlNo: 2,
    name: 'Diphenhydramine Syrup',
    barcode: 'SKU13',
    productCode: '00013',
    strength: 'N/A',
    manufacture: 'PharmaSource',
    genericName: 'Cough & Cold',
    price: 13.4,
    vat: 0.00,
    rackNo: '---',
    totalPurchase: 0,
    totalSold: 0,
    inStock: 95,
    stockStatus: 'Normal'
  },
  {
    id: '3',
    srlNo: 3,
    name: 'Ibuprofen 400mg',
    barcode: 'SKU3',
    productCode: '00003',
    strength: '400mg',
    manufacture: 'PharmaSource',
    genericName: 'Pain Relief',
    price: 10.25,
    vat: 0.00,
    rackNo: '---',
    totalPurchase: 0,
    totalSold: 0,
    inStock: 120,
    stockStatus: 'Normal'
  },
  {
    id: '4',
    srlNo: 4,
    name: 'Omeprazole 20mg',
    barcode: 'SKU8',
    productCode: '00008',
    strength: '20mg',
    manufacture: 'PharmaSource',
    genericName: 'Antacid',
    price: 14.3,
    vat: 0.00,
    rackNo: '---',
    totalPurchase: 0,
    totalSold: 0,
    inStock: 160,
    stockStatus: 'Normal'
  },
  {
    id: '5',
    srlNo: 5,
    name: 'Ranitidine 150mg',
    barcode: 'SKU10',
    productCode: '00010',
    strength: '150mg',
    manufacture: 'Global Pharma',
    genericName: 'Antacid',
    price: 9.8,
    vat: 0.00,
    rackNo: '---',
    totalPurchase: 0,
    totalSold: 0,
    inStock: 115,
    stockStatus: 'Normal'
  },
  {
    id: '6',
    srlNo: 6,
    name: 'Loratadine 10mg',
    barcode: 'SKU12',
    productCode: '00012',
    strength: '10mg',
    manufacture: 'HealthPlus Ltd',
    genericName: 'Allergy',
    price: 11.0,
    vat: 0.00,
    rackNo: '---',
    totalPurchase: 0,
    totalSold: 0,
    inStock: 175,
    stockStatus: 'Normal'
  },
  {
    id: '7',
    srlNo: 7,
    name: 'Aspirin 500mg',
    barcode: 'SKU1',
    productCode: '00001',
    strength: '500mg',
    manufacture: 'MedSupply Co',
    genericName: 'Pain Relief',
    price: 12.99,
    vat: 0.00,
    rackNo: '---',
    totalPurchase: 0,
    totalSold: 0,
    inStock: 150,
    stockStatus: 'Normal'
  },
  {
    id: '8',
    srlNo: 8,
    name: 'Paracetamol 500mg',
    barcode: 'SKU2',
    productCode: '00002',
    strength: '500mg',
    manufacture: 'HealthPlus Ltd',
    genericName: 'Pain Relief',
    price: 8.5,
    vat: 0.00,
    rackNo: '---',
    totalPurchase: 0,
    totalSold: 0,
    inStock: 180,
    stockStatus: 'Normal'
  },
  {
    id: '9',
    srlNo: 9,
    name: 'Amoxicillin 250mg',
    barcode: 'SKU4',
    productCode: '00004',
    strength: '250mg',
    manufacture: 'LifeCare Distributors',
    genericName: 'Antibiotic',
    price: 22.0,
    vat: 0.00,
    rackNo: '---',
    totalPurchase: 0,
    totalSold: 0,
    inStock: 90,
    stockStatus: 'Normal'
  },
  {
    id: '10',
    srlNo: 10,
    name: 'Metformin 500mg',
    barcode: 'SKU6',
    productCode: '00006',
    strength: '500mg',
    manufacture: 'MedSupply Co',
    genericName: 'Diabetes Care',
    price: 15.5,
    vat: 0.00,
    rackNo: '---',
    totalPurchase: 0,
    totalSold: 0,
    inStock: 200,
    stockStatus: 'Normal'
  },
  // Add more medicines to reach 56 total
  ...Array.from({ length: 46 }, (_, i) => ({
    id: `med-${i + 11}`,
    srlNo: i + 11,
    name: `Medicine ${i + 11}`,
    barcode: `SKU${i + 11}`,
    productCode: String(i + 11).padStart(5, '0'),
    strength: `${(i % 5) * 50 + 100}mg`,
    manufacture: ['Global Pharma', 'PharmaSource', 'HealthPlus Ltd', 'MedSupply Co', 'LifeCare Distributors'][i % 5],
    genericName: ['Antibiotic', 'Pain Relief', 'Antacid', 'Allergy', 'Diabetes Care'][i % 5],
    price: Math.round((Math.random() * 30 + 5) * 100) / 100,
    vat: 0.00,
    rackNo: '---',
    totalPurchase: 0,
    totalSold: 0,
    inStock: Math.floor(Math.random() * 200),
    stockStatus: 'Normal' as const
  }))
];

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

export const getDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDashboardStats), 500);
  });
};

export const getFollowers = async (): Promise<Follower[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFollowers), 500);
  });
};

export const getMedicines = async (): Promise<Medicine[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMedicines), 500);
  });
};

export const getCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCategories), 500);
  });
};

export const getSubcategories = async (): Promise<Subcategory[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSubcategories), 500);
  });
};

export const getChildCategories = async (): Promise<ChildCategory[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockChildCategories), 500);
  });
};

export const getMedicineTypes = async (): Promise<MedicineType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMedicineTypes), 500);
  });
};

export const getBarcodeEntries = async (): Promise<BarcodeEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBarcodeEntries), 500);
  });
};

export const getPackages = async (): Promise<Package[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPackages), 500);
  });
};
