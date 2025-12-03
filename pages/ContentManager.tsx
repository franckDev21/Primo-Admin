
import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import Modal from '../components/Modal';
import { MOCK_MODULES, MOCK_QUESTIONS, MOCK_SERIES } from '../constants';
import { Plus, Search, Filter, Edit2, Trash2, PlayCircle, Image as ImageIcon, Layers, Lock, Unlock, ArrowRight, ArrowLeft, MoreHorizontal, CheckCircle, AlertCircle } from 'lucide-react';
import { ModuleType, Series, Question } from '../types';

const ContentManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ModuleType>('CE');
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal States
  const [isSeriesModalOpen, setIsSeriesModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [seriesFormData, setSeriesFormData] = useState<Partial<Series>>({});

  // Derived Data
  const currentModule = MOCK_MODULES.find(m => m.code === activeTab);
  const seriesList = MOCK_SERIES.filter(s => s.moduleId === activeTab);
  
  const selectedSeries = selectedSeriesId ? MOCK_SERIES.find(s => s.id === selectedSeriesId) : null;
  const questionsList = selectedSeriesId 
    ? MOCK_QUESTIONS.filter(q => q.seriesId === selectedSeriesId && q.text.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const handleCreateSeries = () => {
    setSeriesFormData({
        title: '',
        description: '',
        isPremium: false,
        isActive: false,
        moduleId: activeTab,
        questionCount: 39
    });
    setIsSeriesModalOpen(true);
  };

  const handleEditSeries = (series: Series, e: React.MouseEvent) => {
      e.stopPropagation();
      setSeriesFormData(series);
      setIsSeriesModalOpen(true);
  };

  const handleBackToSeries = () => {
      setSelectedSeriesId(null);
      setSearchTerm('');
  };

  const getDifficultyColor = (diff: number) => {
      if (diff <= 2) return 'bg-emerald-500/10 text-emerald-500';
      if (diff <= 4) return 'bg-amber-500/10 text-amber-500';
      return 'bg-red-500/10 text-red-500';
  };

  return (
    <div className="space-y-6 animate-fade-in">
       {/* Header Section */}
       <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
             {selectedSeriesId && (
                 <button onClick={handleBackToSeries} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                     <ArrowLeft size={24} />
                 </button>
             )}
             {selectedSeriesId ? selectedSeries?.title : 'Gestion du Contenu'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 ml-1">
             {selectedSeriesId 
               ? `Gestion des questions pour ${currentModule?.name}` 
               : 'Gérez les modules et les séries d\'exercices'}
          </p>
        </div>
        <div className="flex gap-3">
          {selectedSeriesId ? (
            <button 
                onClick={() => setIsQuestionModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
            >
                <Plus size={16} /> Ajouter Question
            </button>
          ) : (
            <button 
                onClick={handleCreateSeries}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
            >
                <Plus size={16} /> Nouvelle Série
            </button>
          )}
        </div>
      </header>

      {/* Module Tabs (Only visible when no series selected) */}
      {!selectedSeriesId && (
        <div className="flex gap-4 border-b border-slate-200 dark:border-white/10 pb-1 overflow-x-auto">
            {MOCK_MODULES.map(module => (
            <button
                key={module.id}
                onClick={() => setActiveTab(module.code)}
                className={`px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeTab === module.code 
                    ? 'text-indigo-600 dark:text-white' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
                {module.name}
                {activeTab === module.code && (
                <div className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-500 rounded-t-full" />
                )}
            </button>
            ))}
        </div>
      )}

      {/* View 1: SERIES LIST GRID */}
      {!selectedSeriesId && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 animate-fade-in-up">
             {seriesList.length > 0 ? seriesList.map((series) => (
                 <div 
                    key={series.id} 
                    onClick={() => setSelectedSeriesId(series.id)}
                    className="group relative cursor-pointer"
                 >
                    <GlassCard noPadding className="h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-indigo-500/30">
                        {/* Card Header with Badges */}
                        <div className="p-5 flex justify-between items-start">
                            <div className="flex gap-2">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                    series.isPremium 
                                    ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' 
                                    : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
                                }`}>
                                    {series.isPremium ? 'Premium' : 'Gratuit'}
                                </span>
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                    series.isActive
                                    ? 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                                }`}>
                                    {series.isActive ? 'Publié' : 'Brouillon'}
                                </span>
                            </div>
                            <button 
                                onClick={(e) => handleEditSeries(series, e)}
                                className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>
                        </div>

                        {/* Card Content */}
                        <div className="px-5 pb-5 flex-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors">
                                {series.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                                {series.description || 'Aucune description disponible.'}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                                <div className="flex items-center gap-1.5">
                                    <Layers size={16} className="text-slate-400" />
                                    <span>{series.questionCount} Questions</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <AlertCircle size={16} className="text-slate-400" />
                                    <span>Mise à jour: {series.lastUpdated}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Footer / Action */}
                        <div className="px-5 py-3 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/5 flex justify-between items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-colors">
                            <span>Gérer les questions</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </GlassCard>
                 </div>
             )) : (
                 <div className="col-span-3 py-20 text-center">
                     <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                         <Layers size={40} />
                     </div>
                     <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aucune série trouvée</h3>
                     <p className="text-slate-500 dark:text-slate-400">Créez une première série pour ce module.</p>
                 </div>
             )}
          </div>
      )}

      {/* View 2: QUESTION MANAGER */}
      {selectedSeriesId && (
        <div className="animate-fade-in space-y-6">
            {/* Series Info Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-lg">
                        <Layers size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold">Total Questions</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">{questionsList.length} / {selectedSeries?.questionCount}</p>
                    </div>
                </GlassCard>
                <GlassCard className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${selectedSeries?.isPremium ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {selectedSeries?.isPremium ? <Lock size={24} /> : <Unlock size={24} />}
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold">Type d'accès</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">{selectedSeries?.isPremium ? 'Premium (Payant)' : 'Gratuit'}</p>
                    </div>
                </GlassCard>
                <GlassCard className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${selectedSeries?.isActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}`}>
                        {selectedSeries?.isActive ? <CheckCircle size={24} /> : <Edit2 size={24} />}
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold">Statut</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">{selectedSeries?.isActive ? 'Publié' : 'Brouillon'}</p>
                    </div>
                </GlassCard>
            </div>

            {/* Questions Table */}
            <GlassCard noPadding>
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 dark:border-white/5 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Rechercher une question..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
                        />
                    </div>
                    <button className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 transition-colors">
                        <Filter size={16} />
                    </button>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 dark:bg-white/5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-white/5">
                    <div className="col-span-1">#</div>
                    <div className="col-span-6">Intitulé Question</div>
                    <div className="col-span-2">Type & Difficulté</div>
                    <div className="col-span-1">Pts</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-slate-200 dark:divide-white/5">
                    {questionsList.length > 0 ? (
                        questionsList.map((question, idx) => (
                            <div key={question.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                                <div className="col-span-1 text-slate-500 text-sm font-mono">{(idx + 1).toString().padStart(2, '0')}</div>
                                <div className="col-span-6">
                                    <p className="text-slate-900 dark:text-slate-200 text-sm truncate pr-4 font-medium">{question.text}</p>
                                    <div className="flex gap-2 mt-1">
                                         <span className="text-[10px] text-slate-500">{question.id}</span>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className="flex flex-col gap-1 items-start">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                            question.type === 'AUDIO' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                                            question.type === 'IMAGE' ? 'bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400' :
                                            'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                        }`}>
                                            {question.type === 'AUDIO' && <PlayCircle size={10} />}
                                            {question.type === 'IMAGE' && <ImageIcon size={10} />}
                                            {question.type}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getDifficultyColor(question.difficulty)}`}>
                                            Niveau {question.difficulty}/6
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-1 text-slate-600 dark:text-slate-400 text-sm font-bold">{question.points}</div>
                                <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-slate-500 dark:text-slate-400">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={24} />
                            </div>
                            <p className="text-lg font-medium text-slate-900 dark:text-white">Aucune question dans cette série</p>
                            <p className="text-sm">Commencez par ajouter des questions.</p>
                        </div>
                    )}
                </div>
            </GlassCard>
        </div>
      )}

      {/* MODAL: CREATE/EDIT SERIES */}
      <Modal 
         isOpen={isSeriesModalOpen} 
         onClose={() => setIsSeriesModalOpen(false)} 
         title={seriesFormData.id ? "Modifier la Série" : "Créer une Nouvelle Série"}
      >
          <div className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Titre de la série</label>
                  <input 
                    type="text" 
                    value={seriesFormData.title || ''}
                    onChange={(e) => setSeriesFormData({...seriesFormData, title: e.target.value})}
                    placeholder="Ex: Série 1 - Débutant"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
              </div>
              <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                  <textarea 
                    value={seriesFormData.description || ''}
                    onChange={(e) => setSeriesFormData({...seriesFormData, description: e.target.value})}
                    placeholder="Courte description du contenu..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
                  />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Module</label>
                    <select 
                        disabled 
                        value={seriesFormData.moduleId}
                        className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-lg p-2.5 text-slate-500 cursor-not-allowed"
                    >
                        {MOCK_MODULES.map(m => <option key={m.id} value={m.code}>{m.name}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre de questions</label>
                    <input 
                        type="number" 
                        value={seriesFormData.questionCount || 39}
                        onChange={(e) => setSeriesFormData({...seriesFormData, questionCount: Number(e.target.value)})}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                 </div>
              </div>

              <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
                      <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">Contenu Premium</div>
                          <div className="text-xs text-slate-500">Accessible uniquement aux abonnés payants</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={seriesFormData.isPremium || false}
                        onChange={(e) => setSeriesFormData({...seriesFormData, isPremium: e.target.checked})}
                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" 
                      />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
                      <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">Publier la série</div>
                          <div className="text-xs text-slate-500">Rendre visible sur le Front Office</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={seriesFormData.isActive || false}
                        onChange={(e) => setSeriesFormData({...seriesFormData, isActive: e.target.checked})}
                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" 
                      />
                  </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10 mt-4">
                <button 
                    onClick={() => setIsSeriesModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                    Annuler
                </button>
                <button 
                    onClick={() => setIsSeriesModalOpen(false)} // Mock save
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg shadow-indigo-600/20 transition-colors"
                >
                    Enregistrer
                </button>
            </div>
          </div>
      </Modal>

      {/* MODAL: CREATE QUESTION */}
      <Modal
         isOpen={isQuestionModalOpen}
         onClose={() => setIsQuestionModalOpen(false)}
         title="Ajouter une question"
      >
          <div className="space-y-4">
              <p className="text-sm text-slate-500">Formulaire complet de création de question ici...</p>
              {/* Simplified mock form */}
              <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Intitulé</label>
                  <input type="text" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-lg p-2.5 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 border rounded-lg text-center hover:bg-slate-50 dark:hover:bg-white/5">QCM Standard</button>
                  <button className="p-4 border rounded-lg text-center hover:bg-slate-50 dark:hover:bg-white/5">Audio + QCM</button>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                   <button onClick={() => setIsQuestionModalOpen(false)} className="px-4 py-2 text-sm text-slate-500">Annuler</button>
                   <button onClick={() => setIsQuestionModalOpen(false)} className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg">Créer</button>
              </div>
          </div>
      </Modal>
    </div>
  );
};

export default ContentManager;
