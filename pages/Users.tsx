import React from 'react';
import GlassCard from '../components/GlassCard';
import { MOCK_USERS } from '../constants';
import { MoreVertical, Mail, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const UsersPage: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch(status) {
        case 'active': return 'text-emerald-400 bg-emerald-500/10';
        case 'inactive': return 'text-slate-400 bg-slate-500/10';
        case 'banned': return 'text-red-400 bg-red-500/10';
        default: return 'text-slate-400';
    }
  };

  const getSubColor = (sub: string) => {
      switch(sub) {
          case 'annual': return 'text-violet-300 border-violet-500/30 bg-violet-500/10';
          case 'monthly': return 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10';
          case 'weekly': return 'text-blue-300 border-blue-500/30 bg-blue-500/10';
          default: return 'text-slate-400 border-slate-700 bg-slate-800';
      }
  };

  return (
    <div className="space-y-6 animate-fade-in">
       <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Utilisateurs</h1>
          <p className="text-slate-400 mt-1">Gestion des comptes et suivi de la progression</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-colors">
            Exporter CSV
        </button>
      </header>

      <GlassCard noPadding>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white/5 text-xs text-slate-400 uppercase tracking-wider border-b border-white/5">
                        <th className="px-6 py-4 font-medium">Nom / Email</th>
                        <th className="px-6 py-4 font-medium">Statut</th>
                        <th className="px-6 py-4 font-medium">Abonnement</th>
                        <th className="px-6 py-4 font-medium">Progression</th>
                        <th className="px-6 py-4 font-medium">Dernière connexion</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {MOCK_USERS.map((user) => (
                        <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">{user.name}</div>
                                        <div className="text-xs text-slate-500 flex items-center gap-1">
                                            <Mail size={10} /> {user.email}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(user.status)}`}>
                                    {user.status === 'active' && <CheckCircle size={10} />}
                                    {user.status === 'inactive' && <AlertCircle size={10} />}
                                    {user.status === 'banned' && <XCircle size={10} />}
                                    {user.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-block px-2 py-0.5 rounded border text-[10px] font-semibold uppercase tracking-wide ${getSubColor(user.subscription)}`}>
                                    {user.subscription}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-indigo-500 rounded-full" 
                                            style={{width: `${user.progress}%`}}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-slate-400">{user.progress}%</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-400 font-mono">
                                {user.lastLogin}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                    <MoreVertical size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default UsersPage;