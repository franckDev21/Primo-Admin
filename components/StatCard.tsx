import React from 'react';
import GlassCard from './GlassCard';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend: number;
  trendLabel: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, trendLabel, icon }) => {
  const isPositive = trend >= 0;

  return (
    <GlassCard className="flex flex-col justify-between h-32 relative group transition-all hover:bg-slate-50 dark:hover:bg-slate-800/40">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium truncate">{label}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 truncate" title={String(value)}>{value}</h3>
        </div>
        {icon && <div className="p-2 bg-indigo-50 dark:bg-white/5 rounded-lg text-indigo-500 dark:text-indigo-400 shrink-0">{icon}</div>}
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        <span className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'}`}>
          {isPositive ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
          {Math.abs(trend)}%
        </span>
        <span className="text-slate-400 dark:text-slate-500 text-xs truncate">{trendLabel}</span>
      </div>
    </GlassCard>
  );
};

export default StatCard;