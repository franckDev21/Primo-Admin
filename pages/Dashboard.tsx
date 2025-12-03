import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, BookOpen, DollarSign, Activity } from 'lucide-react';
import StatCard from '../components/StatCard';
import GlassCard from '../components/GlassCard';
import { CHART_DATA_REVENUE, CHART_DATA_ACTIVITY } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
          <p className="text-slate-400 mt-1">Aperçu de l'activité du simulateur en temps réel</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/20 transition-all">
            + Nouvel Exercice
          </button>
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Revenu (7j)" 
          value="450 000 CFA" 
          trend={12.5} 
          trendLabel="vs semaine dernière"
          icon={<DollarSign size={20} />}
        />
        <StatCard 
          label="Utilisateurs Actifs" 
          value="1,248" 
          trend={8.2} 
          trendLabel="nouveaux ce mois"
          icon={<Users size={20} />}
        />
        <StatCard 
          label="Exercices Complétés" 
          value="854" 
          trend={-2.4} 
          trendLabel="baisse légère"
          icon={<BookOpen size={20} />}
        />
        <StatCard 
          label="Taux de Réussite" 
          value="64%" 
          trend={1.8} 
          trendLabel="moyenne globale"
          icon={<Activity size={20} />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="col-span-2 h-[400px]">
          <h3 className="text-lg font-semibold text-white mb-6">Revenus Hebdomadaires</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={CHART_DATA_REVENUE}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="h-[400px]">
          <h3 className="text-lg font-semibold text-white mb-6">Utilisateurs par Module</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={CHART_DATA_ACTIVITY} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={14} tickLine={false} axisLine={false} width={30} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
              />
              <Bar dataKey="users" fill="#34d399" radius={[0, 4, 4, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="h-48">
             <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
                    <Activity size={24} />
                 </div>
                 <div>
                     <h4 className="text-white font-medium">Santé du Système</h4>
                     <p className="text-sm text-slate-400">Tous les services opérationnels</p>
                 </div>
             </div>
             <div className="space-y-3">
                 <div className="flex justify-between text-sm">
                     <span className="text-slate-400">API Response Time</span>
                     <span className="text-emerald-400">45ms</span>
                 </div>
                 <div className="flex justify-between text-sm">
                     <span className="text-slate-400">Database Load</span>
                     <span className="text-emerald-400">12%</span>
                 </div>
                 <div className="flex justify-between text-sm">
                     <span className="text-slate-400">Storage Usage</span>
                     <span className="text-yellow-400">65%</span>
                 </div>
             </div>
          </GlassCard>
          
          <GlassCard className="h-48 flex flex-col justify-center items-center text-center">
                <h4 className="text-white font-medium mb-2">Actions Rapides</h4>
                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white transition-colors border border-white/5">
                        Exporter CSV
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white transition-colors border border-white/5">
                        Logs Système
                    </button>
                </div>
          </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;