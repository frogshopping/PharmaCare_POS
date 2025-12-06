'use client';

import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <TopBar />

                <div className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;

