'use client';

import React, { useState } from 'react';
import { DummyRackCategory, DummyMedicine } from '@/services/rackDummyData';
import { FileText, Printer, FileSpreadsheet, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import MedicineDetailsModal from './MedicineDetailsModal';

interface RackTableProps {
    data: DummyRackCategory[];
}

const RackTable: React.FC<RackTableProps> = ({ data }) => {
    const [selectedMedicine, setSelectedMedicine] = useState<DummyMedicine | null>(null);

    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                {/* Table Toolbar - Minimal */}
                {/* <div className="px-6 py-4 border-b border-slate-100 flex gap-2 justify-end opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 gap-2 text-slate-500 hover:text-slate-800">
                        <FileSpreadsheet size={14} /> CSV
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-2 text-slate-500 hover:text-slate-800">
                        <FileText size={14} /> Excel
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-2 text-slate-500 hover:text-slate-800">
                        <Printer size={14} /> Print
                    </Button>
                </div> */}

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5 font-semibold text-slate-500 uppercase tracking-wider text-xs w-20"># ID</th>
                                <th className="px-8 py-5 font-semibold text-slate-500 uppercase tracking-wider text-xs w-64">Rack Title</th>
                                <th className="px-8 py-5 font-semibold text-slate-500 uppercase tracking-wider text-xs">Medicines</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {data.map((category) => (
                                <tr key={category.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-8 py-6 align-top">
                                        <span className="font-mono text-slate-400 text-xs bg-slate-100 px-2 py-1 rounded">
                                            {category.id}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 align-top">
                                        <div className="font-bold text-slate-700 text-lg mb-1">{category.title}</div>
                                        <div className="text-xs text-slate-400 font-medium">
                                            {category.medicines.length} Items Stored
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-wrap gap-2">
                                            {category.medicines.map((medicine, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedMedicine(medicine)}
                                                    className="
                                                        group/chip flex flex-col items-start gap-0.5 
                                                        bg-white hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200
                                                        border border-slate-200 rounded-lg p-2.5 
                                                        transition-all duration-200 text-left min-w-[140px]
                                                    "
                                                >
                                                    <div className="font-semibold text-slate-700 group-hover/chip:text-blue-600 text-sm">
                                                        {medicine.name}
                                                    </div>
                                                    <div className="flex items-center gap-2 w-full">
                                                        <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                                                            {medicine.strength}
                                                        </span>
                                                        <span className="text-[10px] text-slate-400 truncate flex-1">
                                                            {medicine.manufacturer}
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {data.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="text-slate-300" size={32} />
                        </div>
                        <p className="text-slate-500 font-medium">No results found</p>
                        <p className="text-slate-400 text-sm mt-1">Try adjusting your search terms</p>
                    </div>
                )}
            </div>

            {/* Details Modal */}
            {selectedMedicine && (
                <MedicineDetailsModal
                    medicine={selectedMedicine}
                    onClose={() => setSelectedMedicine(null)}
                />
            )}
        </>
    );
};

export default RackTable;
