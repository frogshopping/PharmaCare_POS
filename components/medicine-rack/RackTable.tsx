'use client';

import React, { useState } from 'react';
import { DummyRackCategory, DummyMedicine } from '@/services/rackDummyData';
import { FileText, Printer, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import MedicineDetailsModal from './MedicineDetailsModal';

interface RackTableProps {
    data: DummyRackCategory[];
}

const RackTable: React.FC<RackTableProps> = ({ data }) => {
    const [selectedMedicine, setSelectedMedicine] = useState<DummyMedicine | null>(null);

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                {/* Table Toolbar */}
                <div className="p-4 border-b border-slate-200 flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2 text-slate-600">
                        <FileSpreadsheet size={16} />
                        CSV
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 text-slate-600">
                        <FileText size={16} />
                        Excel
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 text-slate-600">
                        <Printer size={16} />
                        Print
                    </Button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-600 w-16">#</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 w-48 border-r border-slate-200">Rack Title</th>
                                <th className="px-6 py-4 font-semibold text-slate-600">Medicine</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {data.map((category) => (
                                <tr key={category.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-6 align-top text-slate-500 font-medium">
                                        {category.id}
                                    </td>
                                    <td className="px-6 py-6 align-top font-medium text-slate-800 border-r border-slate-200">
                                        {category.title}
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-2">
                                            {category.medicines.map((medicine, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => setSelectedMedicine(medicine)}
                                                    className="flex items-start text-xs leading-relaxed text-slate-600 cursor-pointer hover:bg-blue-50 p-1 rounded -ml-1 transition-colors"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 mr-2 shrink-0"></div>
                                                    <span>
                                                        <span className="font-semibold text-slate-700 hover:text-blue-600 transition-colors">{medicine.name}</span>
                                                        <span className="text-slate-500 mx-1">({medicine.strength})</span>
                                                        <span className="text-slate-400">- {medicine.manufacturer}</span>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {data.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        No data available in table
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
