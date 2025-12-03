import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';
import { MOCK_TRANSACTIONS, MOCK_PLANS } from '../constants';
import { SubscriptionPlan } from '../types';
import { DollarSign, CreditCard, ShoppingCart, ArrowUpRight, ArrowDownLeft, AlertCircle, Plus, Edit3, Trash, Check, Zap, Layers, Eye, EyeOff, Save } from 'lucide-react';

const FinancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'plans'>('overview');
  const [plans, setPlans] = useState<SubscriptionPlan[]>(MOCK_PLANS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Partial<SubscriptionPlan>>({});

  const handleEditPlan = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleCreatePlan = () => {
    setEditingPlan({
        name: '',
        price: 0,
        currency: 'CFA',
        duration: 'monthly',
        features: [''],
        active: true,
        highlight: false
    });
    setIsModalOpen(true);
  };

  const handleSavePlan = () => {
    if (editingPlan.id) {
        // Update existing
        setPlans(plans.map(p => p.id === editingPlan.id ? { ...p, ...editingPlan } as SubscriptionPlan : p));
    } else {
        // Create new
        const newPlan = {
            ...editingPlan,
            id: `plan_${Date.now()}`,
        } as SubscriptionPlan;
        setPlans([...plans, newPlan]);
    }
    setIsModalOpen(false);
  };

  const togglePlanVisibility = (id: string) => {
      setPlans(plans.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const updateFeature = (index: number, value: string) => {
      const features = [...(editingPlan.features || [])];
      features[index] = value;
      setEditingPlan({ ...editingPlan, features });
  };

  const addFeature = () => {
      setEditingPlan({ ...editingPlan, features: [...(editingPlan.features || []), ''] });
  };

  const removeFeature = (index: number) => {
      const features = [...(editingPlan.features || [])];
      features.splice(index, 1);
      setEditingPlan({ ...editingPlan, features });
  };

  return (
    <div className="space-y-6 animate-fade-in">
       <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Finance & Offres</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Gérez les transactions et les plans visibles sur PRIMO</p>
          </div>
          <div className="flex p-1 bg-slate-200 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'overview' ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
                Vue d'ensemble
            </button>
            <button 
                onClick={() => setActiveTab('plans')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'plans' ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
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
                    value="1.25M CFA" 
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
                        <div className="p-6 border-b border-slate-200 dark:border-white/5 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Transactions Récentes</h3>
                            <button className="text-xs text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300">Voir tout</button>
                        </div>
                        <div className="divide-y divide-slate-200 dark:divide-white/5">
                            {MOCK_TRANSACTIONS.map((tx) => (
                                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${tx.status === 'success' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                                            {tx.status === 'success' ? <ArrowDownLeft size={16} /> : <AlertCircle size={16} />} 
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">{tx.userName}</div>
                                            <div className="text-xs text-slate-500">{tx.date} • {tx.method}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-sm font-bold ${tx.status === 'success' ? 'text-slate-900 dark:text-white' : 'text-slate-400 line-through'}`}>
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
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Méthodes de Paiement</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-xs">OM</div>
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Orange Money</span>
                                </div>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">45%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-yellow-400/20 text-yellow-500 flex items-center justify-center font-bold text-xs">MTN</div>
                                    <span className="text-sm text-slate-600 dark:text-slate-300">MTN Money</span>
                                </div>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">35%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center">
                                        <CreditCard size={16} />
                                    </div>
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Visa / MC</span>
                                </div>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">20%</span>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </>
      ) : (
        /* PLANS MANAGEMENT VIEW */
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500 rounded-lg text-white">
                        <Zap size={20} />
                    </div>
                    <div>
                        <h3 className="text-indigo-900 dark:text-white font-bold">Synchronisation PRIMO Active</h3>
                        <p className="text-sm text-indigo-600 dark:text-indigo-300">Toute modification ici est répercutée instantanément sur le Front Office.</p>
                    </div>
                </div>
                <button 
                    onClick={handleCreatePlan}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                    <Plus size={16} /> Créer un Plan
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <GlassCard key={plan.id} className={`relative flex flex-col group transition-all duration-300 ${plan.active ? 'border-slate-200 dark:border-white/10' : 'border-red-200 dark:border-red-500/20 opacity-75 grayscale-[0.5]'}`}>
                        {plan.highlight && plan.active && (
                            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg uppercase">
                                Populaire
                            </div>
                        )}
                        {!plan.active && (
                            <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg rounded-tl-lg uppercase">
                                Inactif (Masqué)
                            </div>
                        )}
                        
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{plan.price.toLocaleString()}</span>
                                <span className="text-sm text-slate-500 dark:text-slate-400">{plan.currency}</span>
                                <span className="text-xs text-slate-400 dark:text-slate-500">/{plan.duration}</span>
                            </div>
                            
                            <ul className="space-y-2 mb-6">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <Check size={14} className="mt-0.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex gap-2">
                            <button 
                                onClick={() => handleEditPlan(plan)}
                                className="flex-1 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-600 dark:text-slate-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Edit3 size={14} /> Éditer
                            </button>
                            <button 
                                onClick={() => togglePlanVisibility(plan.id)}
                                className={`px-3 py-2 rounded-lg transition-colors ${plan.active ? 'text-slate-400 hover:text-amber-500 hover:bg-amber-500/10' : 'text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20'}`}
                                title={plan.active ? "Masquer du site" : "Rendre visible"}
                            >
                                {plan.active ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </GlassCard>
                ))}

                <button 
                    onClick={handleCreatePlan}
                    className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all group min-h-[300px]"
                >
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 group-hover:bg-indigo-500 flex items-center justify-center mb-4 transition-colors">
                        <Plus size={24} className="text-slate-500 dark:text-slate-400 group-hover:text-white" />
                    </div>
                    <h3 className="font-medium">Ajouter un nouveau plan</h3>
                    <p className="text-sm mt-2 text-center px-4 opacity-70">Créez une nouvelle offre pour vos étudiants</p>
                </button>
            </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPlan.id ? "Éditer le plan" : "Créer un nouveau plan"}>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nom du Plan</label>
                <input 
                    type="text" 
                    value={editingPlan.name || ''} 
                    onChange={e => setEditingPlan({...editingPlan, name: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Ex: Premium Mensuel"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Prix</label>
                    <input 
                        type="number" 
                        value={editingPlan.price || 0} 
                        onChange={e => setEditingPlan({...editingPlan, price: Number(e.target.value)})}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Durée</label>
                    <select 
                        value={editingPlan.duration || 'monthly'} 
                        onChange={e => setEditingPlan({...editingPlan, duration: e.target.value as any})}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="daily">Journalier</option>
                        <option value="weekly">Hebdomadaire</option>
                        <option value="monthly">Mensuel</option>
                        <option value="annual">Annuel</option>
                    </select>
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Fonctionnalités</label>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    {editingPlan.features?.map((feature, idx) => (
                        <div key={idx} className="flex gap-2">
                            <input 
                                type="text" 
                                value={feature}
                                onChange={(e) => updateFeature(idx, e.target.value)}
                                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-lg p-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <button onClick={() => removeFeature(idx)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                                <Trash size={16} />
                            </button>
                        </div>
                    ))}
                </div>
                <button onClick={addFeature} className="mt-2 text-sm text-indigo-500 hover:text-indigo-400 font-medium flex items-center gap-1">
                    <Plus size={14} /> Ajouter une ligne
                </button>
            </div>

            <div className="flex items-center gap-2 pt-2">
                <input 
                    type="checkbox" 
                    id="highlight"
                    checked={editingPlan.highlight || false}
                    onChange={(e) => setEditingPlan({...editingPlan, highlight: e.target.checked})}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="highlight" className="text-sm text-slate-700 dark:text-slate-300">Marquer comme "Populaire"</label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10 mt-4">
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                    Annuler
                </button>
                <button 
                    onClick={handleSavePlan}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg shadow-indigo-600/20 transition-colors flex items-center gap-2"
                >
                    <Save size={16} /> Enregistrer
                </button>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default FinancePage;