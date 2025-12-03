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
    <GlassCard className="flex flex-col justify-between h-32 relative group transition-all hover:bg-slate-800/40">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        </div>
        {icon && <div className="p-2 bg-white/5 rounded-lg text-indigo-400">{icon}</div>}
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        <span className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
          {isPositive ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
          {Math.abs(trend)}%
        </span>
        <span className="text-slate-500 text-xs">{trendLabel}</span>
      </div>
    </GlassCard>
  );
};

export default StatCard;