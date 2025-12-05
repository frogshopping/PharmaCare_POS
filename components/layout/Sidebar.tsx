'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    Database,
    ShoppingCart,
    Users,
    BarChart3,
    TrendingUp,
    Layers,
    DollarSign,
    HelpCircle,
    LogOut
} from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
        { icon: Package, label: 'Inventory', href: '/inventory' },
        { icon: Database, label: 'Medicine Rack', href: '/medicine-rack' },
        { icon: ShoppingCart, label: 'Sales', href: '/sales' },
        { icon: Users, label: 'Customers', href: '/customers' },
        { icon: BarChart3, label: 'Reports', href: '/reports' },
        { icon: DollarSign, label: 'Profit & Loss', href: '/profit-loss' },
        { icon: TrendingUp, label: 'Trending Products', href: '/trending' },
        { icon: Layers, label: 'Asset Type', href: '/assets' },
    ];

    return (
        <div className="w-64 bg-[#1e293b] text-slate-300 h-screen flex flex-col shrink-0 font-sans border-r border-slate-700/50">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                    <PillIcon />
                </div>
                <div>
                    <h1 className="font-bold text-white text-lg leading-tight">PharmaCare</h1>
                    <p className="text-xs text-slate-400">Management System</p>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
                <nav className="space-y-2">
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'hover:bg-slate-800 hover:text-white text-slate-400'
                                    }`}
                            >
                                <item.icon size={20} className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-700/50 space-y-2">
                <button className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors w-full rounded-lg hover:bg-slate-800">
                    <HelpCircle size={18} />
                    <span>Quick Guide</span>
                </button>

                <div className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-3 mt-4 border border-slate-700/50">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        JD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">John Doe</p>
                        <p className="text-xs text-slate-400 truncate">Pharmacist</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PillIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
    </svg>
);

export default Sidebar;

