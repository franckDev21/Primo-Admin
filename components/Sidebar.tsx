import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { LogOut, RefreshCw, UserCircle } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-white/5 flex flex-col z-50 transition-colors duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
          T
        </div>
        <span className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">TCF Admin</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20'
                  : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-4">
        <div className="px-4 py-3 bg-emerald-50 dark:bg-emerald-500/5 rounded-lg border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">PRIMO Connected</span>
            </div>
            <RefreshCw size={12} className="text-emerald-500" />
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-white/5 space-y-2">
        <Link to="/profile" className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-transparent">
            <UserCircle size={20} />
            Mon Profil
        </Link>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border border-transparent"
        >
          <LogOut size={20} />
          Déconnexion
        </button>
        <div className="mt-2 px-4 text-xs text-slate-400 dark:text-slate-600">
          v1.1.0 • TCF Canada
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;