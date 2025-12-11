
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { Medicine } from '@/services/api';
import { Input } from '@/components/ui/Input';

interface SearchWithSuggestionsProps {
    medicines: Medicine[];
    onSelect: (medicine: Medicine) => void;
    onClear: () => void;
    placeholder?: string;
    clearOnSelect?: boolean; // New prop
}

export function SearchWithSuggestions({ medicines, onSelect, onClear, placeholder, clearOnSelect = false }: SearchWithSuggestionsProps) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<Medicine[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Filter suggestions as user types
    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const matches = medicines.filter(m =>
            m.name.toLowerCase().includes(lowerQuery) ||
            m.genericName.toLowerCase().includes(lowerQuery)
        ).slice(0, 10); // Limit to top 10 matches

        setSuggestions(matches);
        setIsOpen(true);
    }, [query, medicines]);

    // Handle outside click to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (medicine: Medicine) => {
        if (clearOnSelect) {
            setQuery('');
            onClear(); // Optionally trigger onClear prop if needed, but mainly we want local query clear
        } else {
            setQuery(`${medicine.name} (${medicine.strength})`);
        }
        setSuggestions([]);
        setIsOpen(false);
        onSelect(medicine);
    };

    const handleClear = () => {
        setQuery('');
        setSuggestions([]);
        setIsOpen(false);
        onClear();
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input
                    placeholder={placeholder || "Search medicine..."}
                    className="pl-10 h-10 w-full"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (e.target.value === '') onClear();
                    }}
                    onFocus={() => {
                        if (query.trim() && suggestions.length > 0) setIsOpen(true);
                    }}
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {isOpen && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg border border-slate-200 shadow-xl max-h-[300px] overflow-y-auto">
                    <div className="py-1">
                        {suggestions.map((medicine) => (
                            <button
                                key={medicine.id}
                                onClick={() => handleSelect(medicine)}
                                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 flex items-center justify-between group"
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-slate-700">{medicine.name}</span>
                                        <span className="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium border border-blue-100">
                                            {medicine.strength}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs text-slate-400">{medicine.genericName}</span>
                                        <span className="text-xs text-slate-300">•</span>
                                        <span className="text-xs text-slate-400">{medicine.manufacture}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-emerald-600 text-sm">
                                        ৳{medicine.price.toFixed(2)}
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                        In Stock: {medicine.inStock}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* No Results State */}
            {isOpen && query.trim() && suggestions.length === 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg border border-slate-200 shadow-xl p-4 text-center text-slate-500 text-sm">
                    No medicines found matching "{query}"
                </div>
            )}
        </div>
    );
}
