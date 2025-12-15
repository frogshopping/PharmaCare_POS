'use client';

import React from 'react';
import {
    ShoppingCart,
    Plus,
    UserPlus,
    TrendingUp,
    AlertTriangle,
    Clock,
    Package,
    DollarSign,
    Activity,
    Bell,
    ChevronRight
} from 'lucide-react';

interface RightSidebarProps {
    onNewSale?: () => void;
    onAddProduct?: () => void;
    onNewCustomer?: () => void;
    onGenerateReport?: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
    onNewSale,
    onAddProduct,
    onNewCustomer,
    onGenerateReport
}) => {
    // Mock data for demonstration - in real app, pass these as props or fetch from context
    const quickStats = [
        { label: "Today's Sales", value: "$1,245", trend: "+12%", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
        { label: "Active Orders", value: "23", trend: "+5", icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Low Stock", value: "8", trend: "alert", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
    ];

    const recentActivity = [
        { action: "New sale", detail: "$45.50 - John Doe", time: "2m ago", icon: ShoppingCart, color: "text-green-600" },
        { action: "Product added", detail: "Paracetamol 500mg", time: "15m ago", icon: Plus, color: "text-blue-600" },
        { action: "Low stock alert", detail: "Aspirin running low", time: "1h ago", icon: AlertTriangle, color: "text-orange-600" },
        { action: "New customer", detail: "Sarah Johnson", time: "2h ago", icon: UserPlus, color: "text-purple-600" },
    ];

    const urgentAlerts = [
        { type: "expiring", message: "5 products expire in 7 days", priority: "medium" },
        { type: "stock", message: "8 products low on stock", priority: "high" },
    ];

    return (
        <div className="hidden xl:flex w-80 bg-gradient-to-b from-slate-50 to-white border-l border-slate-200 h-screen flex-col overflow-hidden shrink-0">
            {/* Quick Actions Section */}
            <div className="p-5 border-b border-slate-200 bg-white">
                <h3 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <Activity size={14} />
                    Quick Actions
                </h3>
                <div className="space-y-2">
                    <button
                        onClick={onNewSale}
                        className="w-full group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-between gap-2 shadow-md hover:shadow-lg shadow-blue-600/20 hover:scale-[1.02] transform"
                    >
                        <span className="flex items-center gap-2">
                            <ShoppingCart size={16} />
                            <span className="text-sm">New Sale</span>
                        </span>
                        <ChevronRight size={14} className="opacity-70 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={onAddProduct}
                            className="bg-white border border-slate-200 text-slate-700 py-2 px-3 rounded-lg font-medium hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] transform text-xs"
                        >
                            <Plus size={14} />
                            <span>Product</span>
                        </button>
                        <button
                            onClick={onNewCustomer}
                            className="bg-white border border-slate-200 text-slate-700 py-2 px-3 rounded-lg font-medium hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] transform text-xs"
                        >
                            <UserPlus size={14} />
                            <span>Customer</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="p-5 border-b border-slate-200 bg-white">
                <h3 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp size={14} />
                    Quick Stats
                </h3>
                <div className="space-y-2">
                    {quickStats.map((stat, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-slate-200 transition-all">
                            <div className="flex items-center gap-3">
                                <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                                    <stat.icon size={16} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                                    <p className="text-lg font-bold text-slate-800">{stat.value}</p>
                                </div>
                            </div>
                            <div className={`text-xs font-semibold ${stat.trend === 'alert' ? 'text-orange-600' : 'text-green-600'}`}>
                                {stat.trend}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Urgent Alerts */}
            <div className="p-5 border-b border-slate-200">
                <h3 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <Bell size={14} />
                    Alerts
                </h3>
                <div className="space-y-2">
                    {urgentAlerts.map((alert, idx) => (
                        <div
                            key={idx}
                            className={`p-3 rounded-xl border-l-4 ${alert.priority === 'high'
                                    ? 'bg-red-50 border-red-500'
                                    : 'bg-orange-50 border-orange-500'
                                } hover:shadow-sm transition-all cursor-pointer`}
                        >
                            <div className="flex items-start gap-2">
                                <AlertTriangle
                                    size={14}
                                    className={alert.priority === 'high' ? 'text-red-600 mt-0.5' : 'text-orange-600 mt-0.5'}
                                />
                                <p className={`text-xs font-medium ${alert.priority === 'high' ? 'text-red-900' : 'text-orange-900'
                                    }`}>
                                    {alert.message}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="p-5 border-b border-slate-200">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <Clock size={14} />
                        Recent Activity
                    </h3>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-3">
                    {recentActivity.map((activity, idx) => (
                        <div
                            key={idx}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer border border-transparent hover:border-slate-200"
                        >
                            <div className={`${activity.color} bg-slate-50 p-1.5 rounded-lg mt-0.5`}>
                                <activity.icon size={12} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-slate-800 truncate">
                                    {activity.action}
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                    {activity.detail}
                                </p>
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                                {activity.time}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer with timestamp */}
            <div className="p-4 bg-gradient-to-r from-slate-100 to-slate-50 border-t border-slate-200">
                <p className="text-[10px] text-slate-500 text-center font-medium">
                    Last updated: {new Date().toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
};

export default RightSidebar;

