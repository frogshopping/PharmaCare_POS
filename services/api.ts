'use client';

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
  description?: string;
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
  category?: string;
  expiryDate?: string;
  // Rack Integration Fields
  type?: 'Tablet' | 'Syrup' | 'Capsule' | 'Injection' | 'Suspension' | 'Cream';
  rackLocation?: string;
  batchId?: string;
  supplier?: string;
  purchaseDate?: string;
  buyingPrice?: number;
  // Detail Fields
  packSize?: {
    strip: number; // units per strip
    box: number;   // strips per box
  };
  packPrice?: {
    strip: number;
    box: number;
  };
  supplierContact?: string;
}

export interface CategoryGroup {
  category: string;
  medicines: Medicine[];
  count: number;
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
  avatar?: string;
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
    buyingPrice: 30.50,
    vat: 0.00,
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
    packPrice: { strip: 357.50, box: 3575.00 }
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
    buyingPrice: 11.20,
    vat: 0.00,
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
    packPrice: { strip: 13.4, box: 670.00 }
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
    price: 5.00,
    buyingPrice: 4.20,
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
    packPrice: { strip: 50.00, box: 500.00 }
  },
  {
    id: '4',
    srlNo: 4,
    name: 'Napa Extra',
    barcode: 'SKU004',
    productCode: '00004',
    strength: '500mg+65mg',
    manufacture: 'Beximco Pharmaceuticals',
    genericName: 'Paracetamol + Caffeine',
    price: 2.50,
    buyingPrice: 2.10,
    vat: 0,
    rackNo: 'R-2',
    totalPurchase: 5000,
    totalSold: 1200,
    inStock: 3800,
    stockStatus: 'Normal',
    type: 'Tablet',
    rackLocation: 'Rack A-2',
    batchId: 'B-9912',
    supplier: 'Beximco',
    purchaseDate: '2024-03-01',
    packSize: { strip: 12, box: 20 },
    packPrice: { strip: 30.00, box: 600.00 }
  },
  {
    id: '5',
    srlNo: 5,
    name: 'Seclo 20',
    barcode: 'SKU005',
    productCode: '00005',
    strength: '20mg',
    manufacture: 'Square Pharmaceuticals',
    genericName: 'Omeprazole',
    price: 5.00,
    buyingPrice: 4.25,
    vat: 0,
    rackNo: 'R-1',
    totalPurchase: 2000,
    totalSold: 50,
    inStock: 1950,
    stockStatus: 'Normal',
    type: 'Capsule',
    rackLocation: 'Rack C-5',
    batchId: 'B-3341',
    supplier: 'Square Pharma',
    purchaseDate: '2024-01-10',
    packSize: { strip: 10, box: 10 },
    packPrice: { strip: 50.00, box: 500.00 }
  },
  {
    id: '6',
    srlNo: 6,
    name: 'Monas 10',
    barcode: 'SKU006',
    productCode: '00006',
    strength: '10mg',
    manufacture: 'The ACME Laboratories Ltd.',
    genericName: 'Montelukast',
    price: 16.00,
    buyingPrice: 13.50,
    vat: 0,
    rackNo: 'R-3',
    totalPurchase: 1000,
    totalSold: 100,
    inStock: 900,
    stockStatus: 'Normal',
    type: 'Tablet',
    rackLocation: 'Rack D-1',
    batchId: 'B-5522',
    supplier: 'ACME',
    purchaseDate: '2023-12-05',
    packSize: { strip: 10, box: 10 },
    packPrice: { strip: 160.00, box: 1600.00 }
  },
  {
    id: '7',
    srlNo: 7,
    name: 'Pantanish 20',
    barcode: 'SKU007',
    productCode: '00007',
    strength: '20mg',
    manufacture: 'Incepta Pharmaceuticals',
    genericName: 'Pantoprazole',
    price: 7.00,
    buyingPrice: 5.80,
    vat: 0,
    rackNo: 'R-3',
    totalPurchase: 3000,
    totalSold: 400,
    inStock: 2600,
    stockStatus: 'Normal',
    type: 'Tablet',
    rackLocation: 'Rack D-3',
    batchId: 'B-6611',
    supplier: 'Incepta',
    purchaseDate: '2024-02-28',
    packSize: { strip: 10, box: 10 },
    packPrice: { strip: 70.00, box: 700.00 }
  },
  {
    id: '8',
    srlNo: 8,
    name: 'Tylace',
    barcode: 'SKU008',
    productCode: '00008',
    strength: '500mg',
    manufacture: 'Square Pharmaceuticals',
    genericName: 'Paracetamol',
    price: 1.20,
    buyingPrice: 0.90,
    vat: 0,
    rackNo: 'R-2',
    totalPurchase: 10000,
    totalSold: 5000,
    inStock: 15,
    stockStatus: 'Low Stock',
    type: 'Tablet',
    rackLocation: 'Rack A-2',
    batchId: 'B-7788',
    supplier: 'Square Pharma',
    purchaseDate: '2023-10-15',
    packSize: { strip: 10, box: 20 },
    packPrice: { strip: 12.00, box: 240.00 }
  },
  {
    id: '9',
    srlNo: 9,
    name: 'Bizoran 5/20',
    barcode: 'SKU009',
    productCode: '00009',
    strength: '5mg+20mg',
    manufacture: 'Beximco Pharmaceuticals',
    genericName: 'Amlodipine + Olmesartan',
    price: 12.00,
    buyingPrice: 10.00,
    vat: 0,
    rackNo: 'R-4',
    totalPurchase: 500,
    totalSold: 500,
    inStock: 0,
    stockStatus: 'Low Stock',
    type: 'Tablet',
    rackLocation: 'Rack E-4',
    batchId: 'B-8899',
    supplier: 'Beximco',
    purchaseDate: '2023-09-01',
    packSize: { strip: 10, box: 10 },
    packPrice: { strip: 120.00, box: 1200.00 }
  },
  {
    id: '10',
    srlNo: 10,
    name: 'Ceevit',
    barcode: 'SKU010',
    productCode: '00010',
    strength: '250mg',
    manufacture: 'Square Pharmaceuticals',
    genericName: 'Vitamin C',
    price: 1.50,
    buyingPrice: 1.20,
    vat: 0,
    rackNo: 'R-5',
    totalPurchase: 2000,
    totalSold: 1500,
    inStock: 500,
    stockStatus: 'Normal',
    type: 'Tablet',
    rackLocation: 'Rack F-1',
    batchId: 'B-1122',
    supplier: 'Square Pharma',
    purchaseDate: '2024-01-20',
    packSize: { strip: 10, box: 10 },
    packPrice: { strip: 15.00, box: 150.00 }
  },

  // Diverse Generator
  ...Array.from({ length: 60 }, (_, i) => {
    const categories = ['Allergy', 'Antibiotic', 'Pain Relief', 'Antacid', 'Diabetes Care', 'Vitamins', 'Skin Care', 'Cardiac'];
    const manufacturers = ['Global Pharma', 'PharmaSource', 'HealthPlus Ltd', 'MedSupply Co', 'LifeCare Distributors', 'Incepta', 'Square', 'Beximco'];
    const generics = ['Cetirizine', 'Amoxicillin', 'Ibuprofen', 'Omeprazole', 'Metformin', 'Multivitamin', 'Hydrocortisone', 'Azithromycin', 'Esomeprazole'];
    const types: Medicine['type'][] = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Suspension'];
    const suppliers = ['Renata Limited', 'Square Pharma', 'Beximco', 'ACI Limited', 'Aristopharma'];
    const rackPrefixes = ['A', 'B', 'C', 'D', 'E', 'Fridge'];

    // Generate random future date
    const date = new Date();
    date.setDate(date.getDate() + Math.random() * 365 + 30); // At least 30 days expiry
    const pDate = new Date();
    pDate.setDate(pDate.getDate() - Math.random() * 200);

    const type = types[Math.floor(Math.random() * types.length)];
    const rackPrefix = rackPrefixes[Math.floor(Math.random() * rackPrefixes.length)];
    const rackNum = Math.floor(Math.random() * 5) + 1;

    // Smart location based on type
    const location = type === 'Injection' || type === 'Syrup' ? `Fridge-${Math.floor(Math.random() * 3) + 1}` : `Rack ${rackPrefix}-${rackNum}`;

    const price = Math.round((Math.random() * 50 + 5) * 100) / 100;
    const buyingPrice = Math.round(price * 0.8 * 100) / 100;

    const inStock = Math.floor(Math.random() * 200);
    const stockStatus = inStock === 0 ? 'Low Stock' : inStock < 20 ? 'Stock Alert' : 'Normal';

    // Pack logic
    const stripSize = type === 'Tablet' || type === 'Capsule' ? 10 : 1;
    const boxSize = type === 'Tablet' || type === 'Capsule' ? 10 : 20; // 10 strips or 20 bottles
    const stripPrice = Math.round(price * stripSize * 100) / 100;
    const boxPrice = Math.round(stripPrice * boxSize * 100) / 100;


    return {
      id: `med-${i + 11}`,
      srlNo: i + 11,
      name: `Medicine ${generics[i % generics.length]} ${i + 11}`, // More realistic name start
      barcode: `SKU${i + 1100}`,
      productCode: String(i + 1100).padStart(5, '0'),
      strength: `${(i % 5) * 50 + 10}mg`,
      manufacture: manufacturers[i % manufacturers.length],
      genericName: generics[i % generics.length],
      price: price,
      buyingPrice: buyingPrice,
      vat: 0.00,
      rackNo: location,
      totalPurchase: 0,
      totalSold: 0,
      inStock: inStock,
      stockStatus: stockStatus as any, // Cast to match literal type
      category: categories[i % categories.length],
      expiryDate: date.toISOString().split('T')[0],
      // New Fields
      type: type,
      rackLocation: location,
      batchId: `B-${Math.floor(100000 + Math.random() * 900000)}`,
      supplier: suppliers[i % suppliers.length],
      supplierContact: `01${Math.floor(Math.random() * 80000000 + 10000000)}`,
      purchaseDate: pDate.toISOString().split('T')[0],
      packSize: { strip: stripSize, box: boxSize },
      packPrice: { strip: stripPrice, box: boxPrice }
    };
  })
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

const API_BASE_URL = 'http://localhost:5000/api';

export const getMedicines = async (): Promise<Medicine[]> => {
  // Fallback to mock data if API fails or for pure frontend demo
  // Check if we can fetch, else return mock
  try {
    // For this user task, we want the mock data to be visible immediately as he asked for "diferent dummy data".
    // So we will return the mockMedicines directly to ensure he sees the changes without needing a backend sync.
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockMedicines), 300);
    });

    /* 
    const response = await fetch(`${API_BASE_URL}/inventory/medicines`);
    if (!response.ok) {
      throw new Error('Failed to fetch medicines');
    }
    return await response.json();
    */
  } catch (e) {
    console.log("Using mock data");
    return mockMedicines;
  }
};

export const createMedicine = async (medicine: Partial<Medicine>): Promise<Medicine> => {
  const response = await fetch(`${API_BASE_URL}/inventory/medicines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(medicine),
  });
  if (!response.ok) {
    throw new Error('Failed to create medicine');
  }
  return await response.json();
};

export const updateMedicine = async (id: string, medicine: Partial<Medicine>): Promise<Medicine> => {
  const response = await fetch(`${API_BASE_URL}/inventory/medicines/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(medicine),
  });
  if (!response.ok) {
    throw new Error('Failed to update medicine');
  }
  return await response.json();
};

export const deleteMedicine = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/inventory/medicines/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete medicine');
  }
  // The API returns a success message JSON, but we just need to know it succeeded
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

export interface Rack {
  id: number;
  name: string;
  name_en?: string;
}

export interface GenericName {
  id: number;
  name: string;
}

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

export const getRacks = async (): Promise<Rack[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory/racks`);
    if (!response.ok) {
      // If endpoint not ready, fallback to mock data or empty
      console.warn('Failed to fetch racks from API, falling back to mock');
      return mockRacks;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching racks:', error);
    return mockRacks;
  }
};

export const getGenerics = async (): Promise<GenericName[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory/generics`);
    if (!response.ok) {
      console.warn('Failed to fetch generics from API, falling back to mock');
      return mockGenerics;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching generics:', error);
    return mockGenerics;
  }
};
