import React from 'react';
import GlassCard from '../components/GlassCard';
import { Settings } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Paramètres</h1>
        
        <GlassCard>
            <div className="flex items-center gap-3 mb-6">
                <Settings className="text-slate-900 dark:text-white" />
                <h3 className="font-bold text-slate-900 dark:text-white">Configuration Générale</h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400">Les paramètres globaux de l'application seront accessibles ici.</p>
        </GlassCard>
    </div>
  );
};

export default SettingsPage;