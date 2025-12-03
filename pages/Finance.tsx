import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import { MOCK_TRANSACTIONS, MOCK_PLANS } from '../constants';
import { DollarSign, CreditCard, ShoppingCart, ArrowUpRight, ArrowDownLeft, AlertCircle, Plus, Edit3, Trash, Check, Zap, Layers } from 'lucide-react';

const FinancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'plans'>('overview');

  return (
    <div className="space-y-6 animate-fade-in">
       <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Finance & Offres</h1>
            <p className="text-slate-400 mt-1">Gérez les transactions et les plans visibles sur PRIMO</p>
          </div>
          <div className="flex p-1 bg-white/5 rounded-lg border border-white/5">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
                Vue d'ensemble
            </button>
            <button 
                onClick={() => setActiveTab('plans')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'plans' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
                <Layers size={14} />
                Plans PRIMO
            </button>
          </div>
      </header>

      {activeTab === 'overview' ? (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    label="Revenu Total (Mois)" 
                    value="1,250,000 CFA" 
                    trend={25} 
                    trendLabel="vs mois dernier"
                    icon={<DollarSign size={20} />}
                />
                <StatCard 
                    label="Transactions Réussies" 
                    value="98.5%" 
                    trend={0.5} 
                    trendLabel="stabilité"
                    icon={<ArrowUpRight size={20} />}
                />
                <StatCard 
                    label="Panier Moyen" 
                    value="8,500 CFA" 
                    trend={-2} 
                    trendLabel="léger recul"
                    icon={<ShoppingCart size={20} />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <GlassCard noPadding className="h-full">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white">Transactions Récentes</h3>
                            <button className="text-xs text-indigo-400 hover:text-indigo-300">Voir tout</button>
                        </div>
                        <div className="divide-y divide-white/5">
                            {MOCK_TRANSACTIONS.map((tx) => (
                                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${tx.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                            {tx.status === 'success' ? <ArrowDownLeft size={16} /> : <AlertCircle size={16} />} 
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">{tx.userName}</div>
                                            <div className="text-xs text-slate-500">{tx.date} • {tx.method}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-sm font-bold ${tx.status === 'success' ? 'text-white' : 'text-slate-500 line-through'}`}>
                                            {tx.amount.toLocaleString()} {tx.currency}
                                        </div>
                                        <div className="text-[10px] text-slate-500 uppercase">{tx.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>

                <div className="space-y-6">
                    <GlassCard>
                        <h3 className="text-lg font-bold text-white mb-4">Méthodes de Paiement</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-xs">OM</div>
                                    <span className="text-sm text-slate-300">Orange Money</span>
                                </div>
                                <span className="text-sm font-medium text-white">45%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-yellow-400/20 text-yellow-400 flex items-center justify-center font-bold text-xs">MTN</div>
                                    <span className="text-sm text-slate-300">MTN Money</span>
                                </div>
                                <span className="text-sm font-medium text-white">35%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                        <CreditCard size={16} />
                                    </div>
                                    <span className="text-sm text-slate-300">Visa / MC</span>
                                </div>
                                <span className="text-sm font-medium text-white">20%</span>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="bg-gradient-to-br from-indigo-900/50 to-violet-900/50 border-indigo-500/30">
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <h4 className="text-white font-bold mb-1">Passer à Pro</h4>
                                <p className="text-xs text-indigo-200">Fonctionnalités avancées de facturation</p>
                            </div>
                            <button className="mt-4 w-full py-2 bg-white text-indigo-900 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors">
                                Configuration Stripe
                            </button>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </>
      ) : (
        /* PLANS MANAGEMENT VIEW */
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500 rounded-lg text-white">
                        <Zap size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold">Synchronisation PRIMO Active</h3>
                        <p className="text-sm text-indigo-300">Toute modification ici est répercutée instantanément sur le Front Office.</p>
                    </div>
                </div>
                <button className="px-4 py-2 bg-white text-indigo-950 text-sm font-bold rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-2">
                    <Plus size={16} /> Créer un Plan
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_PLANS.map((plan) => (
                    <GlassCard key={plan.id} className={`relative flex flex-col group hover:bg-slate-800/60 transition-all duration-300 ${plan.active ? 'border-white/10' : 'border-red-500/20 opacity-75'}`}>
                        {plan.highlight && (
                            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg uppercase">
                                Populaire
                            </div>
                        )}
                        {!plan.active && (
                            <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg rounded-tl-lg uppercase">
                                Inactif
                            </div>
                        )}
                        
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-2xl font-bold text-indigo-400">{plan.price.toLocaleString()}</span>
                                <span className="text-sm text-slate-400">{plan.currency}</span>
                                <span className="text-xs text-slate-500">/{plan.duration}</span>
                            </div>
                            
                            <ul className="space-y-2 mb-6">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                        <Check size={14} className="mt-0.5 text-emerald-400 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex gap-2">
                            <button className="flex-1 py-2 text-sm font-medium bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <Edit3 size={14} /> Éditer
                            </button>
                            <button className="px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                <Trash size={16} />
                            </button>
                        </div>
                    </GlassCard>
                ))}

                {/* Add New Placeholder Card */}
                <button className="border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group min-h-[300px]">
                    <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-indigo-500 flex items-center justify-center mb-4 transition-colors">
                        <Plus size={24} className="text-slate-400 group-hover:text-white" />
                    </div>
                    <h3 className="font-medium">Ajouter un nouveau plan</h3>
                    <p className="text-sm text-slate-600 mt-2 text-center px-4">Créez une nouvelle offre pour vos étudiants</p>
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default FinancePage;