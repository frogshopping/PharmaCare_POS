'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CustomerStatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: string; // e.g., 'blue', 'orange', 'green'
}

const CustomerStatCard: React.FC<CustomerStatCardProps> = ({ title, value, icon: Icon, color }) => {
    const colorClasses: Record<string, string> = {
        blue: 'bg-blue-100 text-blue-600',
        orange: 'bg-orange-100 text-orange-600',
        green: 'bg-emerald-100 text-emerald-600',
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color] || colorClasses.blue}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
            </div>
        </div>
    );
};

export default CustomerStatCard;
