"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

interface Option {
    id: number | string
    name: string
}

interface CreatableSelectProps {
    options: Option[]
    value?: string | number
    onChange: (value: Option) => void
    onCreate: (name: string) => void
    placeholder?: string
    className?: string
}

export function CreatableSelect({
    options,
    value,
    onChange,
    onCreate,
    placeholder = "Select...",
    className
}: CreatableSelectProps) {
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")
    const containerRef = React.useRef<HTMLDivElement>(null)

    const safeOptions = Array.isArray(options) ? options : [];
    const selectedOption = safeOptions.find(opt => opt.name === value || opt.id === value)

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const filteredOptions = safeOptions.filter(opt =>
        opt.name.toLowerCase().includes(inputValue.toLowerCase())
    )

    const handleCreate = () => {
        if (inputValue.trim()) {
            onCreate(inputValue)
            setInputValue("")
            setOpen(false)
        }
    }

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            <div
                className="flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setOpen(!open)}
            >
                <span className={!selectedOption ? "text-slate-500" : ""}>
                    {selectedOption ? selectedOption.name : placeholder}
                </span>
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </div>

            {open && (
                <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-200 bg-white shadow-lg p-1">
                    <input
                        autoFocus
                        className="w-full px-2 py-1.5 text-sm border-b border-slate-100 mb-1 focus:outline-none"
                        placeholder="Search or create..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div className="py-1">
                        {filteredOptions.length === 0 && inputValue && (
                            <div
                                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer"
                                onClick={handleCreate}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Create "{inputValue}"
                            </div>
                        )}
                        {filteredOptions.map((option) => (
                            <div
                                key={option.id}
                                className={cn(
                                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100 cursor-pointer",
                                    (option.name === value || option.id === value) && "bg-slate-100"
                                )}
                                onClick={() => {
                                    onChange(option)
                                    setOpen(false)
                                    setInputValue("")
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        (option.name === value || option.id === value) ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option.name}
                            </div>
                        ))}
                        {filteredOptions.length === 0 && !inputValue && (
                            <div className="px-2 py-4 text-center text-sm text-slate-500">
                                No options found. Type to create.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
