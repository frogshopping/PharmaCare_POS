
export interface DummyMedicine {
    name: string;
    strength: string;
    manufacturer: string;
    type: string;
    genericName: string;
    productCode: string;
    tradePrice: number;
    sellingPrice: number;
    wholesalePrice: number;
    inStock: number;
}

export interface DummyRackCategory {
    id: number;
    title: string;
    medicines: DummyMedicine[];
}

const generateMedicine = (name: string, strength: string, manufacturer: string): DummyMedicine => {
    return {
        name,
        strength,
        manufacturer,
        type: "Tablet",
        genericName: "Paracetamol + Caffeine",
        productCode: `DB00${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 100000)}`,
        tradePrice: parseFloat((Math.random() * 10 + 2).toFixed(2)),
        sellingPrice: parseFloat((Math.random() * 15 + 5).toFixed(2)),
        wholesalePrice: parseFloat((Math.random() * 12 + 3).toFixed(2)),
        inStock: Math.floor(Math.random() * 500)
    };
};

export const getDummyRackData = (): DummyRackCategory[] => {
    return [
        {
            id: 1,
            title: "Pain",
            medicines: [
                generateMedicine("A-Calm", "50 mg", "The ACME Laboratories Ltd."),
                generateMedicine("Alkanon", "50 mg", "Renata Limited"),
                generateMedicine("Anaflex", "500 mg", "ACI Limited"),
                generateMedicine("Azelto", "100 mg", "Ziska Pharmaceuticals Ltd."),
                generateMedicine("Beklo", "10 mg", "Opsonin Pharma Ltd."),
                generateMedicine("Cilosta", "100 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Clofenac SR", "100 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Cox-E", "120 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Dinovo", "500 mg", "Beximco Pharmaceuticals Ltd."),
                generateMedicine("Dotrix", "1 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Duloxen", "20 mg", "Incepta Pharmaceuticals Limited"),
                generateMedicine("Etorac", "60 mg", "Incepta Pharmaceuticals Limited"),
                generateMedicine("Etorix", "90 mg", "Eskayef Bangladesh Ltd."),
                generateMedicine("Febustat", "40 mg", "Incepta Pharmaceuticals Limited"),
                generateMedicine("Feluric", "40 mg", "Healthcare Pharmaceuticals Ltd."),
                generateMedicine("Flamex", "400 mg", "ACI Limited"),
                generateMedicine("Flexi", "100 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Flexibac", "10 mg", "Beacon Pharmaceuticals Ltd."),
                generateMedicine("GABA-P", "300 mg", "Renata Limited"),
                generateMedicine("Indomet SR", "75 mg", "Opsonin Pharma Ltd."),
                generateMedicine("Loric", "50 mg", "Healthcare Pharmaceuticals Ltd."),
                generateMedicine("Myolax", "50 mg", "Incepta Pharmaceuticals Limited"),
                generateMedicine("Napro-A", "250 mg", "The ACME Laboratories Ltd."),
                generateMedicine("Naprosyn", "500 mg", "Radiant Pharmaceuticals Ltd."),
                generateMedicine("Napa", "500 mg", "Beximco Pharmaceuticals Ltd."),
                generateMedicine("Napa Extra", "500 mg+65 mg", "Beximco Pharmaceuticals Ltd."),
                generateMedicine("Napa Extend", "665 mg", "Beximco Pharmaceuticals Ltd."),
                generateMedicine("Ace", "500 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Ace Plus", "500 mg+65 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Tory", "90 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Algic", "60 mg", "Renata Limited"),
                generateMedicine("Tofen", "1 mg", "Beximco Pharmaceuticals Ltd."),
            ]
        },
        {
            id: 2,
            title: "Cardiac",
            medicines: [
                generateMedicine("Abecab", "5 mg+20 mg", "ACI Limited"),
                generateMedicine("Abetis", "40 mg", "ACI Limited"),
                generateMedicine("Acecard", "2.5 mg", "Healthcare Pharmaceuticals Ltd."),
                generateMedicine("Alphapress", "2 mg", "Renata Limited"),
                generateMedicine("Amdocal", "5 mg", "Beximco Pharmaceuticals Ltd."),
                generateMedicine("Amlotab", "5 mg", "Incepta Pharmaceuticals Limited"),
                generateMedicine("Anclog", "75 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Ancor Plus", "2.5 mg+6.25 mg", "Aristopharma Ltd."),
                generateMedicine("Angilock", "25 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Arbitel", "20 mg", "ACI Limited"),
                generateMedicine("Atova EZ", "10 mg+10 mg", "Beximco Pharmaceuticals Ltd."),
                generateMedicine("Betabis", "5 mg", "The ACME Laboratories Ltd."),
                generateMedicine("Betacap TR", "40 mg", "Sun Pharmaceutical (Bangladesh) Limited"),
                generateMedicine("Betafix", "2.5 mg", "Healthcare Pharmaceuticals Ltd."),
                generateMedicine("Betaloc", "25 mg", "Drug International Limited"),
                generateMedicine("Betanol", "50 mg", "Synovia Pharma PLC."),
                generateMedicine("Bislol", "2.5 mg", "Opsonin Pharma Ltd."),
                generateMedicine("Bisopro", "5 mg", "Incepta Pharmaceuticals Limited"),
                generateMedicine("Camlor", "5 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Cardomet", "25 mg", "Opsonin Pharma Ltd."),
                generateMedicine("Cardomet", "50 mg", "Opsonin Pharma Ltd."),
                generateMedicine("Cardomet", "100 mg", "Opsonin Pharma Ltd."),
            ]
        },
        {
            id: 3,
            title: "Antibiotic",
            medicines: [
                generateMedicine("Azithrocin", "500 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Zimax", "500 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Cef-3", "200 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Cefoot", "250 mg", "Incepta Pharmaceuticals Limited"),
                generateMedicine("Cefotil", "500 mg", "Beximco Pharmaceuticals Ltd."),
                generateMedicine("Ciprocin", "500 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Claricin", "500 mg", "The ACME Laboratories Ltd."),
                generateMedicine("Doxiva", "100 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Erythromycin", "500 mg", "Opsonin Pharma Ltd."),
                generateMedicine("Fimoxy", "200 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Fixor", "200 mg", "Eskayef Bangladesh Ltd."),
                generateMedicine("Flugal", "150 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Gentosep", "80 mg", "Incepta Pharmaceuticals Limited"),
                generateMedicine("Levoking", "500 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Moxaclav", "625 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Moxaclav", "375 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Orin", "500 mg", "Beximco Pharmaceuticals Ltd."),
                generateMedicine("Pancel", "500 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Tridoc", "200 mg", "Incepta Pharmaceuticals Limited"),
                generateMedicine("Tuff", "250 mg", "Square Pharmaceuticals Ltd."),
            ]
        },
        {
            id: 4,
            title: "Vitamin",
            medicines: [
                generateMedicine("Aristovit B", "10 ml", "Aristopharma Ltd."),
                generateMedicine("B-50 Forte", "100 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Bexram", "10 mg", "Beximco Pharmaceuticals Ltd."),
                generateMedicine("Calbo-D", "500 mg+200 IU", "Square Pharmaceuticals Ltd."),
                generateMedicine("Coral-D", "500 mg+200 IU", "Radiant Pharmaceuticals Ltd."),
                generateMedicine("E-Cap", "400 IU", "Drug International Limited"),
                generateMedicine("Filwel Silver", "Multivitamin", "Square Pharmaceuticals Ltd."),
                generateMedicine("Filwel Gold", "Multivitamin", "Square Pharmaceuticals Ltd."),
                generateMedicine("I-Pill", "100 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Neuro-B", "100 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Ostocal-D", "500 mg+200 IU", "Eskayef Bangladesh Ltd."),
                generateMedicine("Penvik-D", "500 mg+200 IU", "Square Pharmaceuticals Ltd."),
                generateMedicine("Revital", "10 ml", "Square Pharmaceuticals Ltd."),
                generateMedicine("Surbex-Z", "Multivitamin", "Beximco Pharmaceuticals Ltd."),
                generateMedicine("Vitex", "100 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Xinc", "20 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Xinc-B", "20 mg", "Square Pharmaceuticals Ltd."),
            ]
        },
        {
            id: 5,
            title: "Respiratory",
            medicines: [
                generateMedicine("Ace", "500 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Antazol", "0.1%", "Square Pharmaceuticals Ltd."),
                generateMedicine("Avil", "25 mg", "Sanofi Bangladesh Ltd."),
                generateMedicine("Axodin", "120 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Axodin", "180 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("B-50 Forte", "100 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Bexram", "10 mg", "Beximco Pharmaceuticals Ltd."),
                generateMedicine("Calbo-D", "500 mg+200 IU", "Square Pharmaceuticals Ltd."),
                generateMedicine("Coral-D", "500 mg+200 IU", "Radiant Pharmaceuticals Ltd."),
                generateMedicine("Deslor", "5 mg", "Opsonin Pharma Ltd."),
                generateMedicine("E-Cap", "400 IU", "Drug International Limited"),
                generateMedicine("Fexo", "120 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Fexo", "180 mg", "Square Pharmaceuticals Ltd."),
                generateMedicine("Filwel Silver", "Multivitamin", "Square Pharmaceuticals Ltd."),
                generateMedicine("Monas", "10 mg", "The ACME Laboratories Ltd."),
                generateMedicine("Montene", "10 mg", "Square Pharmaceuticals Ltd."),
            ]
        }
    ];
};
