"use client";

import { useState } from "react";
import type React from "react";
import { AlertCircle, BarChart3, DollarSign, FileText, ShieldAlert, ShoppingCart, Users } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const summaryCards = [
  {
    label: "Total Revenue",
    value: "$127,450",
    icon: DollarSign,
    color: "from-sky-500/80 to-sky-400/40",
  },
  {
    label: "Net Profit",
    value: "$31,200",
    icon: BarChart3,
    color: "from-emerald-500/80 to-emerald-400/40",
  },
  {
    label: "Total Sales",
    value: "1,847",
    icon: ShoppingCart,
    color: "from-indigo-500/80 to-indigo-400/40",
  },
  {
    label: "Active Customers",
    value: "892",
    icon: Users,
    color: "from-fuchsia-500/80 to-fuchsia-400/40",
  },
];

const expiryItems = [
  {
    medicine: "Aspirin 500mg",
    batch: "BT-2024-111",
    qty: 450,
    expiry: "2025-12-15",
    daysLeft: 13,
    value: "$2750",
  },
  {
    medicine: "Amoxicillin",
    batch: "BT-2024-782",
    qty: 200,
    expiry: "2025-12-20",
    daysLeft: 18,
    value: "$4000",
  },
  {
    medicine: "Ibuprofen",
    batch: "BT-2024-456",
    qty: 180,
    expiry: "2026-01-10",
    daysLeft: 39,
    value: "$1800",
  },
];

const customerPrescriptionStats = [
  { label: "Total Prescriptions", value: 248 },
  { label: "Chronic Patients", value: 34 },
  { label: "Active Doctors", value: 18 },
];

const customerPrescriptionLogs = [
  {
    customer: "John Smith",
    rx: "RX-88211",
    doctor: "Dr. Anderson",
    meds: "Morphine, Aspirin",
    date: "2025-12-01",
  },
  {
    customer: "Emily Davis",
    rx: "RX-88119",
    doctor: "Dr. Wilson",
    meds: "Codeine, Ibuprofen",
    date: "2025-12-01",
  },
];

type SectionId =
  | "legal"
  | "purchase"
  | "inventory"
  | "profitability"
  | "customers"
  | "finance";

const sectionMockMetrics: Record<SectionId, { label: string; value: string }[]> = {
  purchase: [
    { label: "Active suppliers", value: "12" },
    { label: "Open purchase orders", value: "6" },
    { label: "Monthly spend", value: "$42,300" },
  ],
  inventory: [
    { label: "Overall stock health", value: "Good" },
    { label: "Low-stock SKUs", value: "18" },
    { label: "Overstocked SKUs", value: "9" },
  ],
  profitability: [
    { label: "Gross margin", value: "28.4%" },
    { label: "Top profitable category", value: "Chronic Care" },
    { label: "Loss-making SKUs", value: "5" },
  ],
  customers: [],
  finance: [
    { label: "Outstanding receivables", value: "$18,900" },
    { label: "Pending vendor payments", value: "$7,450" },
    { label: "Cash on hand", value: "$12,300" },
  ],
};

const sectionConfigs: {
  id: SectionId;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}[] = [
  { id: "purchase", title: "Purchase & Suppliers", icon: FileText, accent: "bg-sky-500" },
  { id: "profitability", title: "Profitability", icon: DollarSign, accent: "bg-emerald-500" },
  { id: "customers", title: "Customer & Prescriptions", icon: Users, accent: "bg-indigo-500" },
  { id: "finance", title: "Finance & Cash Summary", icon: DollarSign, accent: "bg-slate-500" },
];

export default function ReportsPage() {
  const [openSection, setOpenSection] = useState<SectionId | null>(null);

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900">
        <div className="px-8 py-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-white mb-1">Advanced Reports</h1>
              <p className="text-sm text-slate-300">
                Comprehensive pharmacy analytics and reporting system
              </p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-sm font-medium text-white shadow-lg shadow-sky-500/40">
              <FileText className="w-4 h-4" />
              Export All Reports
            </button>
          </div>

          {/* Top KPI row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${card.color} px-5 py-4 flex items-center justify-between shadow-lg shadow-slate-900/40`}
              >
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-100/80">
                    {card.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-950/40 flex items-center justify-center text-white/90">
                  <card.icon className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>

          {/* Expiry Reports main card */}
          <section className="mb-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.65)] overflow-hidden">
              {/* Section header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-900/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/90 flex items-center justify-center text-white shadow-lg shadow-amber-500/40">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">Expiry Reports</h2>
                    <p className="text-xs text-slate-300">
                      Track upcoming expiries, stock value at risk, and potential loss
                    </p>
                  </div>
                </div>
              </div>

              {/* Expiry summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pt-5">
                <div className="rounded-2xl border border-white/5 bg-slate-900/80 px-5 py-4 flex flex-col justify-between">
                  <p className="text-xs text-slate-300">Upcoming Expiry (30 days)</p>
                  <p className="mt-3 text-3xl font-semibold text-white">24 Items</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-slate-900/80 px-5 py-4 flex flex-col justify-between">
                  <p className="text-xs text-slate-300">Expired Stock Value</p>
                  <p className="mt-3 text-3xl font-semibold text-rose-300">$8,050</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-slate-900/80 px-5 py-4 flex flex-col justify-between">
                  <p className="text-xs text-slate-300">Expiry Loss (This Month)</p>
                  <p className="mt-3 text-3xl font-semibold text-amber-300">$1,250</p>
                </div>
              </div>

              {/* Upcoming expiry table */}
              <div className="px-6 pt-6 pb-5">
                <h3 className="text-sm font-medium text-slate-100 mb-3">Upcoming Expiry Items</h3>
                <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-950/40">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-900/80 text-slate-300 text-xs uppercase tracking-wide">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Medicine</th>
                        <th className="px-4 py-3 text-left font-medium">Batch No.</th>
                        <th className="px-4 py-3 text-right font-medium">Quantity</th>
                        <th className="px-4 py-3 text-left font-medium">Expiry Date</th>
                        <th className="px-4 py-3 text-center font-medium">Days Left</th>
                        <th className="px-4 py-3 text-right font-medium">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expiryItems.map((item, idx) => (
                        <tr key={item.batch} className={idx % 2 === 0 ? "bg-slate-900/60" : "bg-slate-900/40"}>
                          <td className="px-4 py-3 text-slate-100">{item.medicine}</td>
                          <td className="px-4 py-3 text-slate-300">{item.batch}</td>
                          <td className="px-4 py-3 text-right text-slate-100">{item.qty}</td>
                          <td className="px-4 py-3 text-slate-300">{item.expiry}</td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                item.daysLeft <= 15
                                  ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                                  : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                              }`}
                            >
                              {item.daysLeft} days
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-slate-100">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Other report sections as accordions */}
          <div className="space-y-3 pb-10">
            {sectionConfigs.map((section) => {
              const Icon = section.icon;
              const isOpen = openSection === section.id;
              return (
                <div
                  key={section.id}
                  className="rounded-3xl border border-white/10 bg-slate-900/70 overflow-hidden shadow-[0_16px_50px_rgba(15,23,42,0.65)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenSection((prev) => (prev === section.id ? null : section.id))}
                    className="w-full flex items-center justify-between px-5 py-4 text-left text-sm text-slate-100 hover:bg-slate-900/90 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl ${section.accent} flex items-center justify-center text-white shadow-lg/40`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{section.title}</span>
                    </div>
                    <span className="ml-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-200 text-xs">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 bg-slate-950/40 border-t border-white/5">
                      {section.id === "customers" ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {customerPrescriptionStats.map((stat) => (
                              <div
                                key={stat.label}
                                className="rounded-2xl border border-white/5 bg-slate-900/80 px-4 py-3"
                              >
                                <p className="text-xs text-slate-300">{stat.label}</p>
                                <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                              </div>
                            ))}
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-slate-100 mb-2">Prescription Logs</h3>
                            <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-950/40">
                              <table className="min-w-full text-sm">
                                <thead className="bg-slate-900/80 text-slate-300 text-xs uppercase tracking-wide">
                                  <tr>
                                    <th className="px-4 py-3 text-left font-medium">Customer</th>
                                    <th className="px-4 py-3 text-left font-medium">Prescription No.</th>
                                    <th className="px-4 py-3 text-left font-medium">Doctor</th>
                                    <th className="px-4 py-3 text-left font-medium">Medication</th>
                                    <th className="px-4 py-3 text-left font-medium">Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {customerPrescriptionLogs.map((row, idx) => (
                                    <tr
                                      key={`${row.rx}-${idx}`}
                                      className={idx % 2 === 0 ? "bg-slate-900/60" : "bg-slate-900/40"}
                                    >
                                      <td className="px-4 py-3 text-slate-100">{row.customer}</td>
                                      <td className="px-4 py-3 text-slate-300">{row.rx}</td>
                                      <td className="px-4 py-3 text-slate-300">{row.doctor}</td>
                                      <td className="px-4 py-3 text-slate-300">{row.meds}</td>
                                      <td className="px-4 py-3 text-slate-300">{row.date}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-white/5 bg-slate-900/80 px-4 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {sectionMockMetrics[section.id].map((metric) => (
                              <div
                                key={metric.label}
                                className="rounded-2xl border border-white/5 bg-slate-950/40 px-4 py-3"
                              >
                                <p className="text-xs text-slate-300">{metric.label}</p>
                                <p className="mt-2 text-xl font-semibold text-white">{metric.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
