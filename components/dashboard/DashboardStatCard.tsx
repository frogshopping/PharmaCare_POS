'use client';

import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Leaf, Package, Clock, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface DashboardStatCardProps {
    title: string;
    value: string | number;
    trend?: number;
    trendDirection?: 'up' | 'down';
    subtitle?: string;
    iconType?: 'revenue' | 'profit' | 'products' | 'stock' | 'expiring' | 'payments';
}

const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
    title,
    value,
    trend,
    trendDirection = 'up',
    subtitle,
    iconType
}) => {
    const formatValue = (val: string | number): string => {
        if (typeof val === 'number') {
            return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        return val;
    };

    const getIcon = () => {
        switch (iconType) {
            case 'revenue':
                return <DollarSign size={20} className="text-blue-500" />;
            case 'profit':
                return <Leaf size={20} className="text-green-500" />;
            case 'products':
                return <Package size={20} className="text-purple-500" />;
            case 'stock':
                return <Clock size={20} className="text-red-500" />;
            case 'expiring':
                return <Calendar size={20} className="text-orange-500" />;
            case 'payments':
                return <Clock size={20} className="text-blue-400" />;
            default:
                return null;
        }
    };

    const getValueDisplay = () => {
        if (typeof value === 'number') {
            if (title.includes('Revenue') || title.includes('Profit')) {
                return `$${formatValue(value)}`;
            }
            return formatValue(value);
        }
        return value;
    };

    return (
        <Card className="p-6">
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-600">{title}</h3>
                {getIcon()}
            </div>
            <div className="flex items-baseline gap-2 mb-1">
                <p className="text-2xl font-semibold text-gray-800">
                    {getValueDisplay()}
                </p>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${trendDirection === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {trendDirection === 'up' ? (
                            <TrendingUp size={14} />
                        ) : (
                            <TrendingDown size={14} />
                        )}
                        <span>{trendDirection === 'up' ? '+' : '-'}{Math.abs(trend)}{title.includes('Payments') && trendDirection === 'down' ? '' : '%'}</span>
                    </div>
                )}
            </div>
            {subtitle && (
                <p className={`text-xs mt-1 ${subtitle === 'Good' ? 'text-orange-500' : 'text-gray-500'}`}>
                    {subtitle}
                </p>
            )}
        </Card>
    );
};

export default DashboardStatCard;

