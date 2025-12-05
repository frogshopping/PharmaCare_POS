export interface Customer {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    allergies: string[];
    loyaltyPoints: number;
    memberSince: string;
    avatar?: string;
}

export const customers: Customer[] = [
    {
        id: '1',
        name: 'John Smith',
        address: '123 Main St, Springfield',
        phone: '+1 555-0101',
        email: 'john.smith@email.com',
        allergies: ['Penicillin'],
        loyaltyPoints: 250,
        memberSince: '2024-01-15',
        avatar: 'JS'
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        address: '456 Oak Ave, Springfield',
        phone: '+1 555-0102',
        email: 'sarah.j@email.com',
        allergies: [],
        loyaltyPoints: 180,
        memberSince: '2024-02-20',
        avatar: 'SJ'
    },
    {
        id: '3',
        name: 'Michael Brown',
        address: '789 Pine Rd, Springfield',
        phone: '+1 555-0103',
        email: 'mbrown@email.com',
        allergies: ['Sulfa drugs', 'Aspirin'],
        loyaltyPoints: 420,
        memberSince: '2023-11-10',
        avatar: 'MB'
    },
    {
        id: '4',
        name: 'Emily Davis',
        address: '321 Elm St, Springfield',
        phone: '+1 555-0104',
        email: 'emily.d@email.com',
        allergies: [],
        loyaltyPoints: 95,
        memberSince: '2024-03-05',
        avatar: 'ED'
    }
];
