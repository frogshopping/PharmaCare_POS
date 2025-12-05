"use client";

import { useState } from "react";
import { DollarSign, FileText, Printer, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const revenueStockItems = [
  { label: "Opening stock", value: "89,479.49 BDT" },
  { label: "Closing stock", value: "95,779.49 BDT" },
  { label: "Total purchases", value: "65,479.49 BDT" },
  { label: "Total balance", value: "NaN BDT" },
  { label: "Total stock adjustment", value: "0.00 BDT" },
  { label: "Total expense", value: "10,975.00 BDT", accent: "text-rose-300" },
  { label: "Total purchase shipping charge", value: "0 BDT" },
  { label: "Purchase additional expense", value: "0 BDT" },
  { label: "Total sell discount", value: "11,625.77 BDT", accent: "text-rose-300" },
  { label: "Total customer reward", value: "0.00 BDT" },
  { label: "Total sell return", value: "NaN BDT" },
  { label: "Total layoff", value: "0 BDT" },
];

const returnsAdjustItems = [
  { label: "Closing stock", value: "95,479.49 BDT" },
  { label: "Closing stock", value: "95,479.49 BDT" },
  { label: "Total balance", value: "NaN BDT" },
  { label: "Total sell shipping charge", value: "0 BDT" },
  { label: "Sell additional expense", value: "0 BDT" },
  { label: "Total stock received", value: "0 BDT" },
  { label: "Total purchase return", value: "0 BDT" },
  { label: "Total purchase discount", value: "23,463.71 BDT", accent: "text-emerald-300" },
  { label: "Total sell count off", value: "0.00 BDT" },
];

const profitTabs = [
  "Profit by Product",
  "Profit by Category",
  "Profit by Pharmaceuticals",
  "Profit by Invoice",
  "Profit by Date",
  "Profit by Customer",
  "Profit by Day",
];

const profitByCategoryRows = [
  "Antibiotic",
  "Cough & Cold",
  "Analgesic",
  "Allergy",
  "Diabetes Care",
  "Skin Care",
  "Digestive",
  "Vitamins",
  "Blood Pressure",
  "Respiratory",
];

export default function ProfitLossPage() {
  const [activeTab, setActiveTab] = useState("Profit by Category");

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900">
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl xl:max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-1">
                Profit &amp; Loss Report
              </h1>
              <p className="text-sm text-slate-300">Comprehensive financial analysis for your pharmacy</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 transition-colors">
                <FileText className="w-4 h-4" />
                Export
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-sm font-medium text-white shadow-lg shadow-sky-500/30 transition-colors">
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>

          {/* Filter bar */}
          <div className="mb-6 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 flex flex-wrap items-center gap-3 text-sm text-slate-100 shadow-[0_14px_45px_rgba(15,23,42,0.5)] backdrop-blur-xl">
            <span className="font-medium text-slate-100">Filter period</span>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-slate-950/70 px-3 py-1 border border-white/10">
                <span className="text-xs text-slate-300">From</span>
                <span className="text-xs text-slate-100">2025-11-01</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-950/70 px-3 py-1 border border-white/10">
                <span className="text-xs text-slate-300">To</span>
                <span className="text-xs text-slate-100">2025-11-30</span>
              </div>
            </div>
          </div>

          {/* Revenue & Stock + Returns & Adjustments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/85 backdrop-blur-2xl shadow-[0_18px_60px_rgba(15,23,42,0.75)]">
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-wide text-slate-100">Revenue &amp; Stock</h2>
              </div>
              <div className="px-6 py-4 text-sm">
                <ul className="space-y-1.5">
                  {revenueStockItems.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center justify-between py-1 border-b border-white/5 last:border-b-0"
                    >
                      <span className="text-slate-300">{item.label}</span>
                      <span className={`text-slate-100 font-semibold ${item.accent ?? ""}`}>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/85 backdrop-blur-2xl shadow-[0_18px_60px_rgba(15,23,42,0.75)]">
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-wide text-slate-100">Returns &amp; Adjustments</h2>
              </div>
              <div className="px-6 py-4 text-sm">
                <ul className="space-y-1.5">
                  {returnsAdjustItems.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center justify-between py-1 border-b border-white/5 last:border-b-0"
                    >
                      <span className="text-slate-300">{item.label}</span>
                      <span className={`text-slate-100 font-semibold ${item.accent ?? ""}`}>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Gross Profit & Net Profit cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-sky-600 via-sky-500 to-sky-400 px-6 py-5 flex flex-col justify-between text-white shadow-[0_20px_70px_rgba(15,23,42,0.85)]">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-sky-100/90">Gross Profit</p>
                  <p className="text-[11px] text-sky-100/80">Total sell price - Total purchase price</p>
                </div>
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight">NaN BDT</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 px-6 py-5 flex flex-col justify-between text-white shadow-[0_20px_70px_rgba(15,23,42,0.85)]">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-emerald-100/90">Net Profit</p>
                  <p className="text-[11px] text-emerald-100/80">Comprehensive profit calculation</p>
                </div>
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight">NaN BDT</p>
            </div>
          </div>

          {/* Bottom tabbed profit table */}
          <section className="rounded-3xl bg-slate-950/85 border border-white/10 overflow-hidden mb-4 shadow-[0_18px_60px_rgba(15,23,42,0.75)]">
            <div className="border-b border-white/10 bg-slate-900/80 overflow-x-auto">
              <div className="flex min-w-max px-4">
                {profitTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-4 py-3 text-xs md:text-sm whitespace-nowrap font-medium transition-colors ${
                      activeTab === tab
                        ? "text-sky-300"
                        : "text-slate-300 hover:text-sky-200"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-sky-400"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 py-4 bg-slate-950/80">
              <div className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-900/90">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-900 text-slate-300 text-xs uppercase tracking-wide">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">#</th>
                      <th className="px-4 py-3 text-left font-medium">Category</th>
                      <th className="px-4 py-3 text-right font-medium">Total Sales</th>
                      <th className="px-4 py-3 text-right font-medium">Gross Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {profitByCategoryRows.map((name, index) => (
                      <tr
                        key={name}
                        className={
                          index % 2 === 0
                            ? "bg-slate-900/60 hover:bg-slate-800/80"
                            : "bg-slate-900/50 hover:bg-slate-800/80"
                        }
                      >
                        <td className="px-4 py-3 text-slate-200">{index + 1}</td>
                        <td className="px-4 py-3 text-slate-100">{name}</td>
                        <td className="px-4 py-3 text-right text-slate-300">0 units</td>
                        <td className="px-4 py-3 text-right text-emerald-300">0.00 BDT</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </DashboardLayout>
  );
}
