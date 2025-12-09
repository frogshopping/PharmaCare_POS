import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Package, List, Plus } from 'lucide-react';

interface ProductSearchProps {
    onSearch: (term: string) => void;
    onSelectHelper: (type: string) => void;
}

export function ProductSearch({ onSearch, onSelectHelper }: ProductSearchProps) {
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
            <div className="relative">
                <Input
                    placeholder="Scan barcode or type medicine name to add to cart..."
                    className="h-12 text-base pl-11 shadow-sm border-blue-200 focus:border-blue-500 focus:ring-blue-500/20"
                    icon={<div className="bg-blue-600 rounded-md p-1 -ml-1 mt-0.5"><Search size={14} className="text-white" /></div>}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
        </div>
    );
}
