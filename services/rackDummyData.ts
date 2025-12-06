
export interface DummyMedicine {
    name: string;
    strength: string;
    manufacturer: string;
    type: 'Tablet' | 'Syrup' | 'Capsule' | 'Injection' | 'Suspension' | 'Cream';
    genericName: string;
    productCode: string;
    tradePrice: number;
    sellingPrice: number;
    wholesalePrice: number;
    inStock: number;
    purchaseDate: string;
    expiryDate: string;
    batchId: string;
    supplier: string;
}

export interface DummyRackCategory {
    id: number;
    title: string;
    medicines: DummyMedicine[];
}

const getRandomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString('en-GB');
}

const generateMedicine = (name: string, strength: string, manufacturer: string, type: DummyMedicine['type'] = 'Tablet'): DummyMedicine => {
    const isTablet = type === 'Tablet' || type === 'Capsule';
    return {
        name,
        strength,
        manufacturer,
        type,
        genericName: "Paracetamol + Caffeine", // Simplified for dummy
        productCode: `DB00${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 100000)}`,
        tradePrice: parseFloat((Math.random() * 10 + 2).toFixed(2)),
        sellingPrice: parseFloat((Math.random() * 15 + 5).toFixed(2)),
        wholesalePrice: parseFloat((Math.random() * 12 + 3).toFixed(2)),
        inStock: Math.floor(Math.random() * 500),
        purchaseDate: getRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)),
        expiryDate: getRandomDate(new Date(2025, 0, 1), new Date(2027, 11, 31)),
        batchId: `B-${Math.floor(100000 + Math.random() * 900000)}`,
        supplier: ['Renata Limited', 'Square Pharma', 'Beximco', 'ACI Limited'][Math.floor(Math.random() * 4)]
    };
};

export const getDummyRackData = (): DummyRackCategory[] => {
    return [
        {
            id: 1,
            title: "Pain Management",
            medicines: [
                generateMedicine("A-Calm", "50 mg", "The ACME Laboratories Ltd.", 'Tablet'),
                generateMedicine("Alkanon", "50 mg", "Renata Limited", 'Tablet'),
                generateMedicine("Anaflex", "500 mg", "ACI Limited", 'Capsule'),
                generateMedicine("Clofenac SR", "100 mg", "Square Pharmaceuticals Ltd.", 'Tablet'),
                generateMedicine("Napa Syrup", "120mg/5ml", "Beximco Pharmaceuticals Ltd.", 'Syrup'),
                generateMedicine("Ace Plus", "500 mg+65 mg", "Square Pharmaceuticals Ltd.", 'Tablet'),
                generateMedicine("Tory", "90 mg", "Square Pharmaceuticals Ltd.", 'Tablet'),
                generateMedicine("GABA-P", "300 mg", "Renata Limited", 'Capsule'),
                generateMedicine("Indomet SR", "75 mg", "Opsonin Pharma Ltd.", 'Capsule'),
                generateMedicine("Diclofenac", "75 mg/3ml", "Opsonin Pharma Ltd.", 'Injection'),
            ]
        },
        {
            id: 2,
            title: "Cardiac",
            medicines: [
                generateMedicine("Abetis", "40 mg", "ACI Limited", 'Tablet'),
                generateMedicine("Acecard", "2.5 mg", "Healthcare Pharmaceuticals Ltd.", 'Tablet'),
                generateMedicine("Betacap TR", "40 mg", "Sun Pharmaceutical Ltd", 'Capsule'),
                generateMedicine("Losectil", "20 mg", "Eskayef", 'Capsule'), // Typically Gastro but putting here for variety if needed, or stick to Cardiac
                generateMedicine("Cardomet", "50 mg", "Opsonin Pharma Ltd.", 'Tablet'),
            ]
        },
        {
            id: 3,
            title: "Antibiotic",
            medicines: [
                generateMedicine("Azithrocin", "500 mg", "Square Pharmaceuticals Ltd.", 'Tablet'),
                generateMedicine("Zimax", "500 mg", "Square Pharmaceuticals Ltd.", 'Capsule'),
                generateMedicine("Cef-3", "200 mg", "Square Pharmaceuticals Ltd.", 'Capsule'),
                generateMedicine("Cefotil", "500 mg", "Beximco Pharmaceuticals Ltd.", 'Tablet'),
                generateMedicine("Moxaclav", "625 mg", "Square Pharmaceuticals Ltd.", 'Tablet'),
                generateMedicine("Moxaclav Susp", "100ml", "Square Pharmaceuticals Ltd.", 'Suspension'),
                generateMedicine("Gentosep", "80 mg", "Incepta Pharmaceuticals Limited", 'Injection'),
            ]
        },
        {
            id: 4,
            title: "Vitamin",
            medicines: [
                generateMedicine("Aristovit B", "200 ml", "Aristopharma Ltd.", 'Syrup'),
                generateMedicine("B-50 Forte", "100 mg", "Square Pharmaceuticals Ltd.", 'Tablet'),
                generateMedicine("Calbo-D", "500 mg+200 IU", "Square Pharmaceuticals Ltd.", 'Tablet'),
                generateMedicine("E-Cap", "400 IU", "Drug International Limited", 'Capsule'),
                generateMedicine("Filwel Gold", "Multivitamin", "Square Pharmaceuticals Ltd.", 'Tablet'),
                generateMedicine("Neuro-B", "100 mg", "Square Pharmaceuticals Ltd.", 'Tablet'),
                generateMedicine("Revital", "450 ml", "Square Pharmaceuticals Ltd.", 'Syrup'),
            ]
        },
        {
            id: 5,
            title: "Respiratory",
            medicines: [
                generateMedicine("Antazol", "0.1%", "Square Pharmaceuticals Ltd.", 'Suspension'), // Nasal drops usually but mapped to Susp for dummy
                generateMedicine("Avil", "25 mg", "Sanofi Bangladesh Ltd.", 'Tablet'),
                generateMedicine("Fexo", "120 mg", "Square Pharmaceuticals Ltd.", 'Tablet'),
                generateMedicine("Monas", "10 mg", "The ACME Laboratories Ltd.", 'Tablet'),
                generateMedicine("Montene", "10 mg", "Square Pharmaceuticals Ltd.", 'Tablet'),
                generateMedicine("Tofen", "100 ml", "Beximco Pharmaceuticals Ltd.", 'Syrup'),
            ]
        }
    ];
};
