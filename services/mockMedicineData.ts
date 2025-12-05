export interface Medicine {
    id: string;
    name: string;
    manufacturer: string;
    price: number;
    stock: number;
    category: string;
    expiryDate: string;
}

export type CategoryGroup = {
    category: string;
    medicines: Medicine[];
    count: number;
};

export const medicineData: Medicine[] = [
    // Allergy
    { id: '1', name: 'Loratadine 10mg', manufacturer: 'HealthPlus Ltd', price: 11.00, stock: 175, category: 'Allergy', expiryDate: '2025-06-15' },
    { id: '2', name: 'Montelukast 10mg', manufacturer: 'PharmaSource', price: 20.00, stock: 130, category: 'Allergy', expiryDate: '2024-12-10' },
    { id: '3', name: 'Fexofenadine 120mg', manufacturer: 'LifeCare Distributors', price: 18.50, stock: 120, category: 'Allergy', expiryDate: '2025-03-20' },
    { id: '4', name: 'Cetirizine 10mg', manufacturer: 'MedSupply Co', price: 7.25, stock: 210, category: 'Allergy', expiryDate: '2025-08-01' },

    // Antacid
    { id: '5', name: 'Omeprazole 20mg', manufacturer: 'HealthPlus Ltd', price: 15.00, stock: 85, category: 'Antacid', expiryDate: '2024-11-20' },
    { id: '6', name: 'Ranitidine 150mg', manufacturer: 'PharmaSource', price: 12.00, stock: 140, category: 'Antacid', expiryDate: '2025-01-15' },
    { id: '7', name: 'Pantoprazole 40mg', manufacturer: 'MedSupply Co', price: 18.00, stock: 95, category: 'Antacid', expiryDate: '2025-05-30' },

    // Antibiotic
    { id: '8', name: 'Amoxicillin 500mg', manufacturer: 'BioTech Labs', price: 14.50, stock: 60, category: 'Antibiotic', expiryDate: '2024-10-15' },
    { id: '9', name: 'Azithromycin 250mg', manufacturer: 'Global Pharma', price: 22.00, stock: 45, category: 'Antibiotic', expiryDate: '2024-12-01' },
    { id: '10', name: 'Ciprofloxacin 500mg', manufacturer: 'LifeCare', price: 16.75, stock: 80, category: 'Antibiotic', expiryDate: '2025-02-14' },
    { id: '11', name: 'Doxycycline 100mg', manufacturer: 'MedSupply Co', price: 13.00, stock: 110, category: 'Antibiotic', expiryDate: '2025-04-20' },
    { id: '12', name: 'Cephalexin 500mg', manufacturer: 'HealthPlus Ltd', price: 19.50, stock: 55, category: 'Antibiotic', expiryDate: '2024-11-30' },
    { id: '13', name: 'Metronidazole 400mg', manufacturer: 'PharmaSource', price: 9.00, stock: 90, category: 'Antibiotic', expiryDate: '2025-07-10' },
    { id: '14', name: 'Clindamycin 300mg', manufacturer: 'BioTech Labs', price: 25.00, stock: 40, category: 'Antibiotic', expiryDate: '2025-01-25' },

    // Cough & Cold
    { id: '15', name: 'Dextromethorphan', manufacturer: 'CoughAway Inc', price: 8.50, stock: 200, category: 'Cough & Cold', expiryDate: '2025-09-10' },
    { id: '16', name: 'Guaifenesin Syrup', manufacturer: 'HealthPlus Ltd', price: 10.00, stock: 150, category: 'Cough & Cold', expiryDate: '2025-06-05' },
    { id: '17', name: 'Pseudoephedrine', manufacturer: 'PharmaSource', price: 12.50, stock: 80, category: 'Cough & Cold', expiryDate: '2024-12-20' },
    { id: '18', name: 'Phenylephrine', manufacturer: 'MedSupply Co', price: 9.75, stock: 120, category: 'Cough & Cold', expiryDate: '2025-03-15' },

    // Diabetes Care
    { id: '19', name: 'Metformin 500mg', manufacturer: 'DiabCare Ltd', price: 5.50, stock: 300, category: 'Diabetes Care', expiryDate: '2026-01-01' },
    { id: '20', name: 'Glipizide 5mg', manufacturer: 'HealthPlus Ltd', price: 7.00, stock: 250, category: 'Diabetes Care', expiryDate: '2025-11-15' },
    { id: '21', name: 'Insulin Glargine', manufacturer: 'BioTech Labs', price: 45.00, stock: 30, category: 'Diabetes Care', expiryDate: '2024-10-30' },
    { id: '22', name: 'Pioglitazone 15mg', manufacturer: 'PharmaSource', price: 18.00, stock: 100, category: 'Diabetes Care', expiryDate: '2025-05-20' },
    { id: '23', name: 'Sitagliptin 100mg', manufacturer: 'Global Pharma', price: 35.00, stock: 60, category: 'Diabetes Care', expiryDate: '2025-08-10' },
    { id: '24', name: 'Empagliflozin 10mg', manufacturer: 'LifeCare', price: 42.00, stock: 40, category: 'Diabetes Care', expiryDate: '2025-04-05' },
    { id: '25', name: 'Repaglinide 1mg', manufacturer: 'MedSupply Co', price: 14.00, stock: 110, category: 'Diabetes Care', expiryDate: '2025-02-28' },
    { id: '26', name: 'Acarbose 50mg', manufacturer: 'DiabCare Ltd', price: 11.50, stock: 90, category: 'Diabetes Care', expiryDate: '2025-07-25' },

    // Digestive
    { id: '27', name: 'Lactulose Solution', manufacturer: 'DigestHealth', price: 13.00, stock: 65, category: 'Digestive', expiryDate: '2025-05-15' },
    { id: '28', name: 'Bisacodyl 5mg', manufacturer: 'HealthPlus Ltd', price: 6.50, stock: 140, category: 'Digestive', expiryDate: '2025-09-01' },
    { id: '29', name: 'Loperamide 2mg', manufacturer: 'PharmaSource', price: 5.00, stock: 180, category: 'Digestive', expiryDate: '2026-02-10' },
    { id: '30', name: 'Dicyclomine 10mg', manufacturer: 'MedSupply Co', price: 15.00, stock: 75, category: 'Digestive', expiryDate: '2024-12-05' },
    { id: '31', name: 'Simethicone 80mg', manufacturer: 'LifeCare', price: 8.00, stock: 110, category: 'Digestive', expiryDate: '2025-06-20' },

    // Pain Relief
    { id: '32', name: 'Ibuprofen 200mg', manufacturer: 'PainFree Inc', price: 8.00, stock: 250, category: 'Pain Relief', expiryDate: '2026-05-10' },
    { id: '33', name: 'Acetaminophen 500mg', manufacturer: 'HealthPlus Ltd', price: 7.50, stock: 300, category: 'Pain Relief', expiryDate: '2026-03-15' },
    { id: '34', name: 'Naproxen 220mg', manufacturer: 'PharmaSource', price: 10.00, stock: 180, category: 'Pain Relief', expiryDate: '2025-12-01' },
    { id: '35', name: 'Aspirin 81mg', manufacturer: 'HeartHealth', price: 6.00, stock: 220, category: 'Pain Relief', expiryDate: '2026-01-20' },
    { id: '36', name: 'Diclofenac Gel', manufacturer: 'MedSupply Co', price: 15.00, stock: 80, category: 'Pain Relief', expiryDate: '2025-04-10' },
    { id: '37', name: 'Tramadol 50mg', manufacturer: 'Global Pharma', price: 20.00, stock: 50, category: 'Pain Relief', expiryDate: '2024-11-25' },
    { id: '38', name: 'Codeine 30mg', manufacturer: 'LifeCare', price: 25.00, stock: 40, category: 'Pain Relief', expiryDate: '2024-10-05' },
    { id: '39', name: 'Meloxicam 15mg', manufacturer: 'BioTech Labs', price: 18.00, stock: 90, category: 'Pain Relief', expiryDate: '2025-08-15' },
    { id: '40', name: 'Celecoxib 200mg', manufacturer: 'PainFree Inc', price: 28.00, stock: 60, category: 'Pain Relief', expiryDate: '2025-02-28' },

    // Respiratory
    { id: '41', name: 'Albuterol Inhaler', manufacturer: 'BreathEasy', price: 35.00, stock: 45, category: 'Respiratory', expiryDate: '2025-10-01' },

    // Skin Care
    { id: '42', name: 'Hydrocortisone Cream', manufacturer: 'DermaCare', price: 12.00, stock: 100, category: 'Skin Care', expiryDate: '2025-06-30' },
    { id: '43', name: 'Clotrimazole Cream', manufacturer: 'HealthPlus Ltd', price: 10.50, stock: 85, category: 'Skin Care', expiryDate: '2025-03-10' },
    { id: '44', name: 'Mupirocin Ointment', manufacturer: 'PharmaSource', price: 15.00, stock: 60, category: 'Skin Care', expiryDate: '2024-12-15' },
    { id: '45', name: 'Ketoconazole Shampoo', manufacturer: 'MedSupply Co', price: 18.00, stock: 50, category: 'Skin Care', expiryDate: '2025-09-20' },
    { id: '46', name: 'Benzoyl Peroxide Gel', manufacturer: 'DermaCare', price: 14.00, stock: 75, category: 'Skin Care', expiryDate: '2025-05-05' },

    // Vitamins
    { id: '47', name: 'Vitamin C 500mg', manufacturer: 'NutraLife', price: 12.00, stock: 150, category: 'Vitamins', expiryDate: '2026-04-01' },
    { id: '48', name: 'Vitamin D3 1000IU', manufacturer: 'HealthPlus Ltd', price: 15.00, stock: 120, category: 'Vitamins', expiryDate: '2026-06-15' },
    { id: '49', name: 'Multivitamin', manufacturer: 'PharmaSource', price: 18.00, stock: 100, category: 'Vitamins', expiryDate: '2026-01-10' },
    { id: '50', name: 'Vitamin B12 1000mcg', manufacturer: 'NutraLife', price: 14.00, stock: 80, category: 'Vitamins', expiryDate: '2025-11-20' },
    { id: '51', name: 'Calcium + D3', manufacturer: 'MedSupply Co', price: 16.00, stock: 90, category: 'Vitamins', expiryDate: '2025-08-05' },
];

export const getMedicinesByCategory = (): CategoryGroup[] => {
    const grouped = medicineData.reduce((acc, medicine) => {
        if (!acc[medicine.category]) {
            acc[medicine.category] = [];
        }
        acc[medicine.category].push(medicine);
        return acc;
    }, {} as Record<string, Medicine[]>);

    return Object.keys(grouped).sort().map(category => ({
        category,
        medicines: grouped[category],
        count: grouped[category].length
    }));
};
