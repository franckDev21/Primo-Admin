import React, { useState, useRef } from 'react';
import GlassCard from '../components/GlassCard';
import Modal from '../components/Modal';
import { 
  FileAudio, 
  Image as ImageIcon, 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Download, 
  Trash2, 
  X,
  PlayCircle
} from 'lucide-react';

type MediaType = 'image' | 'audio' | 'document';

interface MediaItem {
  id: string;
  name: string;
  type: MediaType;
  url: string;
  size: string;
  date: string;
  dimensions?: string; // Only for images
  duration?: string;   // Only for audio
}

// Mock initial data
const INITIAL_MEDIA: MediaItem[] = [
  { 
    id: 'm1', 
    name: 'logo-tcf-canada.png', 
    type: 'image', 
    url: 'https://placehold.co/600x400/indigo/white?text=TCF+Logo', 
    size: '1.2 MB', 
    date: '2023-10-24',
    dimensions: '600x400'
  },
  { 
    id: 'm2', 
    name: 'exercice-co-s1.mp3', 
    type: 'audio', 
    url: '#', // In a real app, this would be a real audio URL
    size: '4.5 MB', 
    date: '2023-10-25',
    duration: '02:45'
  },
  { 
    id: 'm3', 
    name: 'guide-candidat-2024.pdf', 
    type: 'document', 
    url: '#', 
    size: '2.8 MB', 
    date: '2023-10-20'
  },
  { 
    id: 'm4', 
    name: 'tache-3-expression.jpg', 
    type: 'image', 
    url: 'https://placehold.co/800x600/1e293b/white?text=Tache+3', 
    size: '3.1 MB', 
    date: '2023-10-22',
    dimensions: '800x600'
  },
  { 
    id: 'm5', 
    name: 'intro-module-ce.mp3', 
    type: 'audio', 
    url: '#', 
    size: '1.2 MB', 
    date: '2023-10-26',
    duration: '00:45'
  },
];

const MediaLibrary: React.FC = () => {
  const [items, setItems] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [activeFilter, setActiveFilter] = useState<'all' | MediaType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter Logic
  const filteredItems = items.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Statistics
  const stats = {
    image: items.filter(i => i.type === 'image').length,
    audio: items.filter(i => i.type === 'audio').length,
    document: items.filter(i => i.type === 'document').length,
    storage: '12.8 MB' // Mocked total
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Simulation of upload
      const newFiles: MediaItem[] = Array.from(files).map((file: File, idx) => {
        const type: MediaType = file.type.startsWith('image/') 
          ? 'image' 
          : file.type.startsWith('audio/') 
            ? 'audio' 
            : 'document';
            
        return {
          id: `new_${Date.now()}_${idx}`,
          name: file.name,
          type: type,
          url: type === 'image' ? URL.createObjectURL(file) : '#',
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          date: new Date().toISOString().split('T')[0],
        };
      });

      setItems([...newFiles, ...items]);
      setIsUploadModalOpen(false);
    }
  };

  const deleteItem = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      setItems(items.filter(i => i.id !== id));
      if (previewItem?.id === id) setPreviewItem(null);
    }
  };

  const getIconByType = (type: MediaType, className = "w-6 h-6") => {
    switch (type) {
      case 'audio': return <FileAudio className={className} />;
      case 'image': return <ImageIcon className={className} />;
      case 'document': return <FileText className={className} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Médiathèque</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gérez les ressources audio, images et documents</p>
        </div>
        <div className="flex gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-colors flex items-center gap-2 font-medium"
          >
            <Upload size={16} /> Uploader
          </button>
        </div>
      </div>

      {/* Storage & Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Images', count: stats.image, icon: <ImageIcon size={18} />, color: 'text-pink-500 bg-pink-500/10' },
          { label: 'Audio', count: stats.audio, icon: <FileAudio size={18} />, color: 'text-amber-500 bg-amber-500/10' },
          { label: 'Documents', count: stats.document, icon: <FileText size={18} />, color: 'text-blue-500 bg-blue-500/10' },
          { label: 'Utilisé', count: stats.storage, icon: <Filter size={18} />, color: 'text-slate-500 bg-slate-500/10' },
        ].map((stat, idx) => (
          <GlassCard key={idx} noPadding className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.count}</p>
            </div>
            <div className={`p-2 rounded-lg ${stat.color}`}>
              {stat.icon}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-white/10 overflow-x-auto">
        {(['all', 'image', 'audio', 'document'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`px-6 py-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
              activeFilter === type 
                ? 'text-indigo-600 dark:text-white' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
            {activeFilter === type && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-500 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative">
              <GlassCard noPadding className="h-full flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden">
                {/* Thumbnail Area */}
                <div className="aspect-square w-full bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center overflow-hidden border-b border-slate-200 dark:border-white/5">
                  {item.type === 'image' ? (
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                      item.type === 'audio' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-500' : 'bg-blue-100 dark:bg-blue-500/10 text-blue-500'
                    }`}>
                      {getIconByType(item.type, "w-10 h-10")}
                    </div>
                  )}
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                    <button 
                      onClick={() => setPreviewItem(item)}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
                      title="Voir"
                    >
                      <Eye size={18} />
                    </button>
                    <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors" title="Télécharger">
                      <Download size={18} />
                    </button>
                    <button 
                      onClick={() => deleteItem(item.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-full backdrop-blur-md transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-3 flex-1 flex flex-col justify-between bg-white dark:bg-slate-900/40">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate mb-1" title={item.name}>{item.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                       {item.size} • {item.type === 'image' && item.dimensions} {item.type === 'audio' && item.duration}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/5 flex justify-between items-center">
                     <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded uppercase tracking-wider">{item.type}</span>
                     <span className="text-[10px] text-slate-400">{item.date}</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
            <Search size={32} />
          </div>
          <p className="text-lg font-medium">Aucun fichier trouvé</p>
          <p className="text-sm">Essayez de modifier vos filtres ou d'uploader un nouveau fichier.</p>
        </div>
      )}

      {/* Upload Modal */}
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Uploader des fichiers">
        <div 
          className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            onChange={handleFileUpload}
            accept="image/*,audio/*,.pdf,.doc,.docx" 
          />
          <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Cliquez ou glissez des fichiers ici</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
            Supporte Images (JPG, PNG), Audio (MP3, WAV) et Documents (PDF). Taille max 25MB.
          </p>
        </div>
      </Modal>

      {/* Preview Modal */}
      <Modal isOpen={!!previewItem} onClose={() => setPreviewItem(null)} title={previewItem?.name || 'Aperçu'}>
         {previewItem && (
           <div className="flex flex-col items-center">
             {previewItem.type === 'image' && (
               <div className="bg-slate-950 rounded-lg overflow-hidden shadow-2xl w-full">
                 <img src={previewItem.url} alt={previewItem.name} className="w-full h-auto max-h-[60vh] object-contain" />
               </div>
             )}
             
             {previewItem.type === 'audio' && (
               <div className="w-full py-8 px-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col items-center text-center">
                 <div className="w-24 h-24 bg-amber-100 dark:bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-amber-500/10">
                   <PlayCircle size={48} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{previewItem.name}</h3>
                 <p className="text-sm text-slate-500 mb-6">Durée: {previewItem.duration || '--:--'}</p>
                 <audio controls className="w-full max-w-md">
                   <source src={previewItem.url} type="audio/mpeg" />
                   Votre navigateur ne supporte pas l'élément audio.
                 </audio>
               </div>
             )}

             {previewItem.type === 'document' && (
                <div className="w-full py-12 flex flex-col items-center text-center">
                    <FileText size={64} className="text-slate-400 mb-4" />
                    <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
                      Ce document ne peut pas être prévisualisé directement. Veuillez le télécharger pour le consulter.
                    </p>
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                      <Download size={18} /> Télécharger le PDF
                    </button>
                </div>
             )}

             <div className="w-full mt-6 grid grid-cols-2 gap-4 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-white/10 pt-4">
                <div>
                   <span className="block text-xs uppercase font-bold text-slate-400 dark:text-slate-500 mb-1">Taille</span>
                   {previewItem.size}
                </div>
                <div>
                   <span className="block text-xs uppercase font-bold text-slate-400 dark:text-slate-500 mb-1">Date d'ajout</span>
                   {previewItem.date}
                </div>
                {previewItem.dimensions && (
                  <div>
                    <span className="block text-xs uppercase font-bold text-slate-400 dark:text-slate-500 mb-1">Dimensions</span>
                    {previewItem.dimensions}
                  </div>
                )}
             </div>
           </div>
         )}
      </Modal>
    </div>
  );
};

export default MediaLibrary;