
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
    onSearchTermChange?: (term: string) => void; // New prop for server-side search
    fetchSuggestions?: (term: string) => Promise<Medicine[]>; // New prop for async suggestions
}

export function SearchWithSuggestions({ medicines, onSelect, onClear, placeholder, clearOnSelect = false, onSearchTermChange, fetchSuggestions }: SearchWithSuggestionsProps) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<Medicine[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Filter suggestions as user types (Async or Sync)
    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        const fetchAsync = async () => {
            if (fetchSuggestions) {
                setIsLoading(true);
                try {
                    const results = await fetchSuggestions(query);

                    // Sort results: Exact match -> Starts with -> Contains
                    const lowerQuery = query.toLowerCase();
                    const sortedResults = [...results].sort((a, b) => {
                        const aName = (a.name || '').toLowerCase();
                        const bName = (b.name || '').toLowerCase();

                        // 1. Exact match
                        if (aName === lowerQuery && bName !== lowerQuery) return -1;
                        if (bName === lowerQuery && aName !== lowerQuery) return 1;

                        // 2. Starts with
                        const aStarts = aName.startsWith(lowerQuery);
                        const bStarts = bName.startsWith(lowerQuery);
                        if (aStarts && !bStarts) return -1;
                        if (bStarts && !aStarts) return 1;

                        // 3. Alphabetical fallback
                        return aName.localeCompare(bName);
                    });

                    setSuggestions(sortedResults);
                    setIsOpen(true);
                } catch (error) {
                    console.error("Failed to fetch suggestions:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                // Fallback to client-side filtering (Legacy)
                const lowerQuery = query.toLowerCase();
                const matches = medicines.filter(m =>
                    (m.name?.toLowerCase() || '').includes(lowerQuery) ||
                    (m.genericName?.toLowerCase() || '').includes(lowerQuery)
                ).slice(0, 50); // Increased limit for compact view
                setSuggestions(matches);
                setIsOpen(true);
            }
        };

        // Debounce the effect
        const timeoutId = setTimeout(fetchAsync, 300);
        return () => clearTimeout(timeoutId);

    }, [query, medicines, fetchSuggestions]);

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
            if (onSearchTermChange) onSearchTermChange('');
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
        if (onSearchTermChange) onSearchTermChange('');
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
                        const val = e.target.value;
                        setQuery(val);
                        if (onSearchTermChange) onSearchTermChange(val); // Keep parent in sync for table
                        if (val === '') onClear();
                    }}
                    onFocus={() => {
                        if (query.trim() && suggestions.length > 0) setIsOpen(true);
                    }}
                />
                {isLoading ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="animate-spin h-3.5 w-3.5 border-2 border-slate-300 border-t-blue-600 rounded-full"></div>
                    </div>
                ) : query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Suggestions Dropdown - Compact UI */}
            {isOpen && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg border border-slate-200 shadow-xl max-h-[400px] overflow-y-auto custom-scrollbar">
                    <div className="py-1">
                        {suggestions.map((medicine) => (
                            <button
                                key={medicine.id}
                                onClick={() => handleSelect(medicine)}
                                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 flex items-center justify-between group"
                            >
                                <div className="min-w-0 flex-1 mr-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-slate-700 text-sm truncate">{medicine.name}</span>
                                        <span className="text-[10px] px-1 py-0.5 rounded bg-blue-50 text-blue-600 font-medium border border-blue-100 whitespace-nowrap">
                                            {medicine.strength}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-slate-400 truncate">{medicine.genericName}</span>
                                        <span className="text-[10px] text-slate-300">•</span>
                                        <span className="text-[10px] text-slate-400 truncate">{medicine.manufacture}</span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="font-bold text-emerald-600 text-xs">
                                        ৳{medicine.price.toFixed(2)}
                                    </div>
                                    <div className={`text-[9px] ${medicine.inStock > 0 ? 'text-slate-400' : 'text-red-400 font-medium'}`}>
                                        Stock: {medicine.inStock}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* No Results State */}
            {isOpen && query.trim() && suggestions.length === 0 && !isLoading && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg border border-slate-200 shadow-xl p-3 text-center text-slate-500 text-xs">
                    No medicines found matching "{query}"
                </div>
            )}
        </div>
    );
}
