"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import {
  FileText,
  DollarSign,
  Users,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Package,
  ShieldAlert,
  BarChart3,

  ShoppingCart,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { ProfitabilityReport } from '@/components/reports/ProfitabilityReport';
import { PurchaseReport } from '@/components/reports/PurchaseReport';

type SectionId = "expiry" | "purchase" | "profitability" | "customers" | "finance" | "sales" | "inventory";

const summaryCards = [
  { label: "Total Revenue", value: "$127,450", icon: DollarSign, color: "bg-sky-50" },
  { label: "Net Profit", value: "$31,200", icon: BarChart3, color: "bg-emerald-50" },
  { label: "Total Sales", value: "1,847", icon: ShoppingCart, color: "bg-indigo-50" },
  { label: "Active Customers", value: "892", icon: Users, color: "bg-fuchsia-50" },
];

export default function ReportsPage() {
  const [openSection, setOpenSection] = useState<SectionId | null>("expiry");

  const toggleSection = (id: SectionId) => {
    setOpenSection(prev => prev === id ? null : id);
  };

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto bg-slate-50 custom-scrollbar">
        <div className="px-8 py-6 max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Advanced Reports</h1>
              <p className="text-sm text-slate-500">Comprehensive pharmacy analytics and reporting system</p>
            </div>
          </div>

          {/* Top KPI row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {summaryCards.map((card) => (
              <Card key={card.label} className="p-4 flex items-center justify-between border-slate-100 shadow-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">{card.label}</p>
                  <p className="mt-1 text-2xl font-bold text-slate-800">{card.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center text-slate-700`}>
                  <card.icon className="w-5 h-5" />
                </div>
              </Card>
            ))}
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-4">
            {/* 1. Inventory Health (Expiry) */}
            <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('expiry')}
                className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100/80 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <Package size={20} />
                  </div>
                  <span className="font-semibold text-slate-800">Inventory Health (Expiry)</span>
                </div>
                {openSection === 'expiry' ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
              </button>

              {openSection === 'expiry' && (
                <div className="p-6 border-t border-slate-100 animation-expand">
                  {/* Expiry content */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                      <p className="text-sm text-red-600 font-medium">Expired Stock Value</p>
                      <h3 className="text-2xl font-bold text-red-700 mt-1">$8,050</h3>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                      <p className="text-sm text-orange-600 font-medium">Expiring Soon (30 days)</p>
                      <h3 className="text-2xl font-bold text-orange-700 mt-1">24 Items</h3>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <p className="text-sm text-blue-600 font-medium">Items Processed</p>
                      <h3 className="text-2xl font-bold text-blue-700 mt-1">156</h3>
                    </div>
                  </div>

                  {/* Simple table for expiry */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3">Medicine</th>
                          <th className="px-4 py-3">Batch</th>
                          <th className="px-4 py-3">Expiry</th>
                          <th className="px-4 py-3 text-center">Days Left</th>
                          <th className="px-4 py-3 text-right">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {[1, 2, 3].map((i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium text-slate-800">Amoxicillin 500mg</td>
                            <td className="px-4 py-3 text-slate-500">BATCH-{100 + i}</td>
                            <td className="px-4 py-3 text-slate-500">2025-12-{10 + i}</td>
                            <td className="px-4 py-3 text-center">
                              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                                {15 + i} days
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right font-medium text-slate-800">$120.00</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>


                  <div className="mt-4 flex justify-end">
                    <Link
                      href="/reports/stock-expiry"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-purple-100 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium shadow-sm"
                    >
                      View Full Expiry Report
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Purchase & Suppliers */}
            <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('purchase')}
                className="w-full flex items-center justify-between p-4 bg-sky-50 hover:bg-sky-100/80 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-100 text-sky-600 rounded-lg">
                    <FileText size={20} />
                  </div>
                  <span className="font-semibold text-slate-800">Purchase & Suppliers</span>
                </div>
                {openSection === 'purchase' ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
              </button>
              {openSection === 'purchase' && (
                <div className="p-6 border-t border-slate-100">
                  <PurchaseReport />
                </div>
              )}
            </div>

            {/* 3. Profitability */}
            <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('profitability')}
                className="w-full flex items-center justify-between p-4 bg-emerald-50 hover:bg-emerald-100/80 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <DollarSign size={20} />
                  </div>
                  <span className="font-semibold text-slate-800">Profitability</span>
                </div>
                {openSection === 'profitability' ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
              </button>
              {openSection === 'profitability' && (
                <div className="p-6 border-t border-slate-100">
                  <ProfitabilityReport />
                </div>
              )}
            </div>

            {/* 4. Sales Deep-Dive */}
            <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('sales')}
                className="w-full flex items-center justify-between p-4 bg-cyan-50 hover:bg-cyan-100/80 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
                    <ShoppingCart size={20} />
                  </div>
                  <span className="font-semibold text-slate-800">Sales Deep-Dive</span>
                </div>
                {openSection === 'sales' ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
              </button>
              {openSection === 'sales' && (
                <div className="p-6 text-center text-slate-500 py-12">
                  <BarChart3 className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                  <p>Detailed sales analytics module coming soon...</p>
                </div>
              )}
            </div>

            {/* 7. Inventory Reports */}
            <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('inventory')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Package className="text-indigo-600" size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-slate-800">Inventory Reports</h3>
                    <p className="text-sm text-slate-500">Stock analysis and profitability tracking</p>
                  </div>
                </div>
                {openSection === 'inventory' ? <ChevronUp className="text-slate-400" size={20} /> : <ChevronDown className="text-slate-400" size={20} />}
              </button>

              {openSection === 'inventory' && (
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                      href="/reports/stock-products"
                      className="p-4 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">Stock Products Report</h4>
                          <p className="text-sm text-slate-500 mt-1">Comprehensive inventory and profit analysis</p>
                        </div>
                        <ChevronRight className="text-slate-400 group-hover:text-indigo-600 transition-colors" size={20} />
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout >
  );
}
