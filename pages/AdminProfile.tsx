import React from 'react';
import GlassCard from '../components/GlassCard';
import { User, Shield, Key, Bell } from 'lucide-react';

const AdminProfile: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Mon Profil</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="md:col-span-1 flex flex-col items-center text-center p-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 p-1 mb-4">
                    <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                        <User size={64} className="text-indigo-500" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Super Admin</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">admin@tcf-canada.com</p>
                <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold border border-indigo-500/20 uppercase tracking-wide">
                    <Shield size={12} /> Administrateur Principal
                </div>
            </GlassCard>

            <div className="md:col-span-2 space-y-6">
                <GlassCard>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Informations Personnelles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nom Complet</label>
                            <input type="text" value="Super Admin" readOnly className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                            <input type="email" value="admin@tcf-canada.com" readOnly className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rôle</label>
                            <input type="text" value="Administrateur" readOnly className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Dernière connexion</label>
                            <input type="text" value="Aujourd'hui, 10:45" readOnly className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white" />
                        </div>
                    </div>
                </GlassCard>

                <GlassCard>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Sécurité</h3>
                    <div className="space-y-4">
                        <button className="flex items-center justify-between w-full p-4 rounded-lg border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-indigo-500/10 group-hover:text-indigo-500 transition-colors">
                                    <Key size={20} />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-slate-900 dark:text-white">Changer de mot de passe</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">Dernière modification il y a 3 mois</div>
                                </div>
                            </div>
                            <span className="text-indigo-500 text-sm font-medium">Modifier</span>
                        </button>
                    </div>
                </GlassCard>
            </div>
        </div>
    </div>
  );
};

export default AdminProfile;