import { useState } from 'react';
import { Login } from './components/Login';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { UsersList } from './components/UsersList';

import { Packages } from './components/Packages';
import { Profile } from './components/Profile';
import { Toaster } from './components/ui/sonner';
import SubscriptionManager from './components/SubscribedUsers';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleProfileClick = () => {
    setCurrentPage('profile');
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersList />;
      case 'subscribers':
        return <SubscriptionManager />;
      case 'packages':
        return <Packages />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className="flex-1 flex flex-col min-h-screen">
          <Header
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            onLogout={handleLogout}
            onProfileClick={handleProfileClick}
          />
          
          <main className="flex-1 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {renderPage()}
            </div>
          </main>

          <footer className="border-t bg-white py-4 px-6 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Photo Book Admin Panel. All rights reserved.</p>
          </footer>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
}
