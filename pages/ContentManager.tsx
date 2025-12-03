import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { MOCK_MODULES, MOCK_QUESTIONS } from '../constants';
import { Plus, Search, Filter, Edit2, Trash2, PlayCircle, Image as ImageIcon } from 'lucide-react';
import { ModuleType } from '../types';

const ContentManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ModuleType>('CE');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = MOCK_QUESTIONS.filter(q => 
    q.moduleId === activeTab && 
    q.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
       <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestion du Contenu</h1>
          <p className="text-slate-400 mt-1">Gérez les modules, séries et questions du test</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2">
            <Plus size={16} /> Nouvelle Question
          </button>
        </div>
      </header>

      {/* Modules Tabs */}
      <div className="flex gap-4 border-b border-white/10 pb-1">
        {MOCK_MODULES.map(module => (
          <button
            key={module.id}
            onClick={() => setActiveTab(module.code)}
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${
              activeTab === module.code ? 'text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {module.name} ({module.code})
            {activeTab === module.code && (
              <div className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-indigo-500 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Info for Active Module */}
        <div className="lg:col-span-1 space-y-4">
             {MOCK_MODULES.filter(m => m.code === activeTab).map(module => (
                 <GlassCard key={module.id} className="bg-indigo-900/10 border-indigo-500/20">
                    <h3 className="text-lg font-bold text-white mb-2">{module.name}</h3>
                    <p className="text-sm text-slate-400 mb-4">{module.description}</p>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-slate-500">Durée</span>
                            <span className="text-white">{module.durationMinutes} min</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-slate-500">Questions</span>
                            <span className="text-white">{module.questionCount}</span>
                        </div>
                        <div className="pt-2">
                             <button className="w-full py-2 text-xs font-medium bg-white/5 hover:bg-white/10 rounded text-slate-300">
                                Configurer Module
                             </button>
                        </div>
                    </div>
                 </GlassCard>
             ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
            <GlassCard noPadding>
                {/* Toolbar */}
                <div className="p-4 border-b border-white/5 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input 
                            type="text" 
                            placeholder="Rechercher une question..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-950/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                        />
                    </div>
                    <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-white/5 text-slate-300">
                        <Filter size={16} />
                    </button>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-white/5 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    <div className="col-span-1">#</div>
                    <div className="col-span-6">Question</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-1">Pts</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-white/5">
                    {filteredQuestions.length > 0 ? (
                        filteredQuestions.map((question, idx) => (
                            <div key={question.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors group">
                                <div className="col-span-1 text-slate-500 text-sm font-mono">{(idx + 1).toString().padStart(2, '0')}</div>
                                <div className="col-span-6">
                                    <p className="text-slate-200 text-sm truncate pr-4">{question.text}</p>
                                    <div className="flex gap-2 mt-1">
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Difficile: {question.difficulty}</span>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${
                                        question.type === 'AUDIO' ? 'bg-amber-500/10 text-amber-400' :
                                        question.type === 'IMAGE' ? 'bg-pink-500/10 text-pink-400' :
                                        'bg-blue-500/10 text-blue-400'
                                    }`}>
                                        {question.type === 'AUDIO' && <PlayCircle size={12} />}
                                        {question.type === 'IMAGE' && <ImageIcon size={12} />}
                                        {question.type}
                                    </span>
                                </div>
                                <div className="col-span-1 text-slate-400 text-sm">{question.points}</div>
                                <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-md transition-colors">
                                        <Edit2 size={14} />
                                    </button>
                                    <button className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-slate-500 text-sm">
                            Aucune question trouvée pour ce module.
                        </div>
                    )}
                </div>
            </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ContentManager;