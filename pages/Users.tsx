import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Modal from '../components/Modal';
import { MOCK_USERS, MOCK_PLANS } from '../constants';
import { MoreVertical, Mail, CheckCircle, XCircle, AlertCircle, Search, CreditCard, Eye } from 'lucide-react';

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignClick = (userId: string) => {
      setSelectedUser(userId);
      setAssignModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
        case 'active': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10';
        case 'inactive': return 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-500/10';
        case 'banned': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/10';
        default: return 'text-slate-400';
    }
  };

  const getSubColor = (sub: string) => {
      switch(sub) {
          case 'annual': return 'text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10';
          case 'monthly': return 'text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10';
          case 'weekly': return 'text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10';
          default: return 'text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800';
      }
  };

  return (
    <div className="space-y-6 animate-fade-in">
       <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Utilisateurs</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gestion des comptes et suivi de la progression</p>
        </div>
        <div className="flex gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
             </div>
            <button className="px-4 py-2 text-sm font-medium bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-lg border border-slate-200 dark:border-white/10 transition-colors">
                Exporter CSV
            </button>
        </div>
      </header>

      <GlassCard noPadding>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 dark:bg-white/5 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-white/5">
                        <th className="px-6 py-4 font-medium">Nom / Email</th>
                        <th className="px-6 py-4 font-medium">Statut</th>
                        <th className="px-6 py-4 font-medium">Abonnement</th>
                        <th className="px-6 py-4 font-medium">Progression</th>
                        <th className="px-6 py-4 font-medium">Dernière connexion</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                    {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-white border border-slate-300 dark:border-white/10">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1">
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
                                    <div className="flex-1 w-20 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-indigo-500 rounded-full" 
                                            style={{width: `${user.progress}%`}}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{user.progress}%</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-mono">
                                {user.lastLogin}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button 
                                        onClick={() => navigate(`/users/${user.id}`)}
                                        className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
                                        title="Voir Profil"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleAssignClick(user.id)}
                                        className="p-2 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors"
                                        title="Attribuer Abonnement"
                                    >
                                        <CreditCard size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </GlassCard>

      {/* ASSIGN SUBSCRIPTION MODAL */}
      <Modal isOpen={assignModalOpen} onClose={() => setAssignModalOpen(false)} title="Attribuer un abonnement">
          <div className="space-y-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                  Sélectionnez un plan à activer pour cet utilisateur. Cela remplacera son abonnement actuel.
              </p>
              <div className="grid grid-cols-1 gap-3">
                  {MOCK_PLANS.filter(p => p.active).map(plan => (
                      <button 
                        key={plan.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-white/10 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all text-left group"
                        onClick={() => {
                            // Logic to assign plan would go here
                            setAssignModalOpen(false);
                            alert(`Plan ${plan.name} attribué !`);
                        }}
                      >
                          <div>
                              <div className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{plan.name}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{plan.price} {plan.currency} / {plan.duration}</div>
                          </div>
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-indigo-500"></div>
                      </button>
                  ))}
              </div>
          </div>
      </Modal>
    </div>
  );
};

export default UsersPage;