import React from 'react';
import { Button } from '@/components/ui/Button';
import { SearchWithSuggestions } from '@/components/inventory/SearchWithSuggestions'; // Import
import { Search, Package, List, Plus } from 'lucide-react';
import { Medicine } from '@/services/api';

interface ProductSearchProps {
    onSearch: (term: string) => void;
    onSelectHelper: (type: string) => void;
    medicines: Medicine[]; // Add prop
    onSelect: (medicine: Medicine) => void; // Add prop
}

export function ProductSearch({ onSearch, onSelectHelper, medicines, onSelect }: ProductSearchProps) {
    return (
        <div className="bg-white border-b border-slate-200 p-4 space-y-4">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
                <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white gap-2 text-xs h-9 shadow-sm"
                    onClick={() => onSelectHelper('list')}
                >
                    <List size={14} />
                    Select from Medicine List
                </Button>
                <Button
                    className="bg-purple-500 hover:bg-purple-600 text-white gap-2 text-xs h-9 shadow-sm"
                    onClick={() => onSelectHelper('search')}
                >
                    <Search size={14} />
                    Search Product
                </Button>
                <Button
                    className="bg-purple-500 hover:bg-purple-600 text-white gap-2 text-xs h-9 shadow-sm"
                    onClick={() => onSelectHelper('misc')}
                >
                    <Plus size={14} />
                    MISC. Item
                </Button>
                <Button
                    className="bg-purple-500 hover:bg-purple-600 text-white gap-2 text-xs h-9 shadow-sm"
                    onClick={() => onSelectHelper('package')}
                >
                    <Package size={14} />
                    Package Items
                </Button>
            </div>

            {/* Main Search Input */}
            <div className="relative z-50"> {/* Added z-index for dropdown */}
                <SearchWithSuggestions
                    medicines={medicines}
                    onSelect={(med) => {
                        onSelect(med);
                    }}
                    onClear={() => onSearch('')}
                    placeholder="Scan barcode or type to add (with variants)..."
                    clearOnSelect={true}
                />
            </div>
        </div>
    );
}
