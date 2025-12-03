import React from 'react';
import GlassCard from '../components/GlassCard';
import { FileAudio, Image as ImageIcon, Upload } from 'lucide-react';

const MediaLibrary: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Médiathèque</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Gérez les fichiers audio et images des exercices</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-lg flex items-center gap-2 hover:bg-indigo-500 transition-colors">
                <Upload size={16} /> Uploader
            </button>
        </div>

        <GlassCard className="h-64 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 border-dashed border-2 border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5">
            <div className="flex gap-4 mb-4">
                <FileAudio size={32} />
                <ImageIcon size={32} />
            </div>
            <p>Le gestionnaire de médias sera disponible bientôt.</p>
        </GlassCard>
    </div>
  );
};

export default MediaLibrary;