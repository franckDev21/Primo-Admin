import React from 'react';
import GlassCard from '../components/GlassCard';
import { Activity } from 'lucide-react';

const LogsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Logs Système</h1>
        
        <GlassCard>
            <div className="flex items-center gap-3 mb-6">
                <Activity className="text-indigo-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">Journal d'activité récent</h3>
            </div>
            <div className="space-y-4">
                {[1,2,3,4,5].map((i) => (
                    <div key={i} className="flex gap-4 text-sm border-b border-slate-200 dark:border-white/5 pb-2 last:border-0">
                        <span className="text-slate-500 font-mono">2023-10-2{i} 14:30:00</span>
                        <span className="text-slate-900 dark:text-white font-medium">ADMIN_ACTION</span>
                        <span className="text-slate-500">Mise à jour configuration système</span>
                    </div>
                ))}
            </div>
        </GlassCard>
    </div>
  );
};

export default LogsPage;