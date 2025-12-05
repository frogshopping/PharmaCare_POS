export interface Rack {
    id: number;
    name: string;
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
    return new Promise(resolve => setTimeout(() => resolve(mockRacks), 300));
};

export const getGenerics = async (): Promise<GenericName[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockGenerics), 300));
};
