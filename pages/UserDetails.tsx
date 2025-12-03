import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_USERS } from '../constants';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import { ArrowLeft, User, Mail, Calendar, Award, Clock, BookOpen, Activity } from 'lucide-react';

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const user = MOCK_USERS.find(u => u.id === userId);

  if (!user) {
    return <div className="text-white">Utilisateur non trouvé</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <button 
        onClick={() => navigate('/users')}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm mb-4"
      >
        <ArrowLeft size={16} /> Retour aux utilisateurs
      </button>

      <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-4xl font-bold text-slate-700 dark:text-white border-4 border-slate-300 dark:border-slate-700 shadow-xl">
                  {user.name.charAt(0)}
              </div>
              <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
                  <div className="flex items-center gap-4 mt-2 text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1 text-sm">
                          <Mail size={14} /> {user.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                          <Calendar size={14} /> Inscrit le 12 Oct 2023
                      </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                      <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-500/30 uppercase">
                          {user.subscription} Plan
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${user.status === 'active' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                          {user.status}
                      </span>
                  </div>
              </div>
          </div>
          
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-colors text-sm font-medium">
              Actions Compte
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <StatCard label="Score Moyen" value="78%" trend={5} trendLabel="vs dernier test" icon={<Award size={20} />} />
          <StatCard label="Temps d'étude" value="12h 30m" trend={12} trendLabel="cette semaine" icon={<Clock size={20} />} />
          <StatCard label="Tests complétés" value="14" trend={0} trendLabel="total" icon={<BookOpen size={20} />} />
          <StatCard label="Progression" value={`${user.progress}%`} trend={2} trendLabel="globale" icon={<Activity size={20} />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Dernières Activités</h3>
              <div className="space-y-4">
                  {[1,2,3].map(i => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                          <div className="flex items-center gap-3">
                              <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
                                  <BookOpen size={16} />
                              </div>
                              <div>
                                  <div className="text-sm font-medium text-slate-900 dark:text-white">Expression Écrite - Série 4</div>
                                  <div className="text-xs text-slate-500">Il y a 2 heures</div>
                              </div>
                          </div>
                          <span className="text-sm font-bold text-emerald-500">85%</span>
                      </div>
                  ))}
              </div>
          </GlassCard>

          <GlassCard>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Détails Abonnement</h3>
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20">
                  <div className="flex justify-between items-start mb-4">
                      <div>
                          <p className="text-xs text-indigo-500 uppercase font-bold tracking-wider">Plan Actuel</p>
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white capitalize">{user.subscription}</h4>
                      </div>
                      <div className="px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded uppercase">Actif</div>
                  </div>
                  <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">Début</span>
                          <span className="text-slate-900 dark:text-white">01 Oct 2023</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">Fin / Renouvellement</span>
                          <span className="text-slate-900 dark:text-white">01 Nov 2023</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">Prix</span>
                          <span className="text-slate-900 dark:text-white">15,000 CFA</span>
                      </div>
                  </div>
                  <button className="w-full py-2 bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white text-sm font-bold rounded-lg shadow hover:opacity-90 transition-opacity">
                      Gérer l'abonnement
                  </button>
              </div>
          </GlassCard>
      </div>
    </div>
  );
};

export default UserDetails;