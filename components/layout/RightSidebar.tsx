'use client';

import React from 'react';
import { ShoppingCart, Plus, UserPlus, FileText, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'alert' | 'info' | 'success';
    read: boolean;
}

interface RightSidebarProps {
    notifications?: Notification[];
    onNewSale?: () => void;
    onAddProduct?: () => void;
    onNewCustomer?: () => void;
    onGenerateReport?: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
    notifications = [],
    onNewSale,
    onAddProduct,
    onNewCustomer,
    onGenerateReport
}) => {
    const unreadCount = notifications.filter(n => !n.read).length;

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'alert':
                return <AlertCircle size={16} className="text-orange-400" />;
            case 'success':
                return <CheckCircle size={16} className="text-green-400" />;
            case 'info':
                return <Info size={16} className="text-blue-400" />;
            default:
                return <Info size={16} className="text-slate-400" />;
        }
    };

    return (
        <div className="w-80 bg-white border-l border-slate-200 h-screen flex flex-col overflow-hidden shrink-0">
            {/* Quick Actions Section */}
            <div className="p-6 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">Quick Actions</h3>
                <div className="space-y-3">
                    <button
                        onClick={onNewSale}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                    >
                        <ShoppingCart size={18} />
                        New Sale
                    </button>
                    <button
                        onClick={onAddProduct}
                        className="w-full bg-slate-100 text-slate-700 py-3 px-4 rounded-xl font-medium hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus size={18} />
                        Add Product
                    </button>
                    <button
                        onClick={onNewCustomer}
                        className="w-full bg-slate-100 text-slate-700 py-3 px-4 rounded-xl font-medium hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                        <UserPlus size={18} />
                        New Customer
                    </button>
                    <button
                        onClick={onGenerateReport}
                        className="w-full bg-slate-100 text-slate-700 py-3 px-4 rounded-xl font-medium hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                        <FileText size={18} />
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Notifications</h3>
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    <div className="space-y-3">
                        {notifications.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Info size={24} className="text-slate-400" />
                                </div>
                                <p className="text-sm text-slate-500">No notifications</p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 rounded-xl border transition-all hover:shadow-md ${!notification.read
                                            ? 'bg-blue-50 border-blue-200'
                                            : 'bg-slate-50 border-slate-200'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5">
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-800">{notification.title}</p>
                                            <p className="text-xs text-slate-600 mt-1 line-clamp-2">{notification.message}</p>
                                            <p className="text-xs text-slate-400 mt-2">{notification.time}</p>
                                        </div>
                                        {!notification.read && (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;

