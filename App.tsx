import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ContentManager from './pages/ContentManager';
import UsersPage from './pages/Users';
import FinancePage from './pages/Finance';

const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-50 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 overflow-y-auto max-h-screen">
        <div className="max-w-7xl mx-auto pb-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="content" element={<ContentManager />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="finance" element={<FinancePage />} />
          {/* Fallback for unimplemented pages in this demo */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;