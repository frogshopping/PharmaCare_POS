'use client';

import React from 'react';
import { Search, RefreshCw, Bell, User } from 'lucide-react';

const TopBar = () => {
    return (
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-96">
                    <input
                        type="text"
                        placeholder="Search invoice..."
                        className="w-full bg-slate-50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 border border-slate-200"
                    />
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Reset Data"
                >
                    <RefreshCw size={20} className="text-slate-600" />
                </button>

                <button
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative"
                    title="Notifications"
                >
                    <Bell size={20} className="text-slate-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-3 ml-2 pl-3 border-l border-slate-200">
                    <div className="text-right">
                        <p className="text-sm font-medium text-slate-700">John Doe</p>
                        <p className="text-xs text-slate-500">Pharmacist</p>
                    </div>
                    <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        JD
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;

