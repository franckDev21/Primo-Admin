import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { LogOut, RefreshCw, Zap } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-950 border-r border-white/5 flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
          T
        </div>
        <span className="text-lg font-bold text-white tracking-tight">TCF Admin</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-4">
        <div className="px-4 py-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20 flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide">PRIMO Connected</span>
            </div>
            <RefreshCw size={12} className="text-emerald-500/50" />
        </div>
      </div>

      <div className="p-4 border-t border-white/5">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
          <LogOut size={20} />
          Déconnexion
        </button>
        <div className="mt-4 px-4 text-xs text-slate-600">
          v1.0.5 • TCF Canada
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;