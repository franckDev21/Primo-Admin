import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ContentManager from './pages/ContentManager';
import UsersPage from './pages/Users';
import UserDetails from './pages/UserDetails';
import FinancePage from './pages/Finance';
import LoginPage from './pages/Login';
import AdminProfile from './pages/AdminProfile';
import MediaLibrary from './pages/MediaLibrary';
import LogsPage from './pages/Logs';
import SettingsPage from './pages/Settings';

// Mock Authentication Context
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth_token') === 'demo_token';
  });

  const login = () => {
    localStorage.setItem('auth_token', 'demo_token');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

const AppLayout: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-50 font-sans transition-colors duration-300">
      <Sidebar onLogout={onLogout} />
      <main className="ml-64 flex-1 p-8 overflow-y-auto max-h-screen">
        <div className="max-w-7xl mx-auto pb-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const ProtectedRoute = ({ isAllowed, redirectPath = '/login', children }: any) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

const App: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();

  // Automatic Theme Detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Apply initially
    applyTheme(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', applyTheme);
    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginPage onLogin={login} />
        } />

        <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
          <Route path="/" element={<AppLayout onLogout={logout} />}>
            <Route index element={<Dashboard />} />
            <Route path="content" element={<ContentManager />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/:userId" element={<UserDetails />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="logs" element={<LogsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;