import React, { useState } from 'react';
import { Menu, MessageSquarePlus, Settings, ChevronLeft, LayoutDashboard, LogOut, User } from 'lucide-react';
import { Logo } from './Logo';
import { ChatList } from '../chat/ChatList';
import { MenuDialog } from '../dialogs/MenuDialog';
import { SettingsDialog } from '../dialogs/SettingsDialog';
import { AdminPanel } from '../admin/AdminPanel';
import { UserPanel } from '../user/UserPanel';
import { LoginDialog } from '../auth/LoginDialog';
import { BuyCreditsButton } from '../credits/BuyCreditsButton';
import { useAuthStore } from '../../store/auth.store';

export function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  
  const { isAuthenticated, isAdmin, logout, user } = useAuthStore();

  return (
    <>
      <div 
        className={`
          fixed left-0 top-0 bottom-0 
          ${isCollapsed ? 'w-20' : 'w-[300px]'} 
          bg-[#0f1117] flex flex-col z-20
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          border-r border-gray-800
          backdrop-blur-lg bg-opacity-95
          shadow-xl
        `}
      >
        <div className="flex items-center justify-between p-4 animate-fade-in">
          {!isCollapsed && <Logo />}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50 
                     transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronLeft className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden hover:overflow-y-auto">
          {!isCollapsed ? (
            <>
              <button 
                className="w-full flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white transition-colors hover:bg-gray-800/50"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={20} />
                <span>Menu</span>
              </button>

              <div className="px-3 mt-2">
                <button className="w-full flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50">
                  <MessageSquarePlus size={20} />
                  <span>New Chat</span>
                </button>
              </div>

              <div className="mt-6">
                <ChatList />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 mt-4">
              <button 
                className="p-3 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
              <button className="p-3 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors">
                <MessageSquarePlus size={24} />
              </button>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-800 space-y-2">
          {isAuthenticated && (
            <button 
              className={`
                w-full flex items-center gap-2 px-4 py-3 
                text-gray-300 hover:text-white transition-colors rounded-lg 
                hover:bg-gray-800/50
              `}
              onClick={() => setShowUserPanel(true)}
            >
              <User size={20} />
              {!isCollapsed && <span>User Settings</span>}
            </button>
          )}

          {isAdmin() && (
            <button 
              className={`
                w-full flex items-center gap-2 px-4 py-3 
                text-gray-300 hover:text-white transition-colors rounded-lg 
                hover:bg-gray-800/50
                ${showAdminPanel ? 'bg-gray-800/50 text-white' : ''}
              `}
              onClick={() => setShowAdminPanel(!showAdminPanel)}
            >
              <LayoutDashboard size={20} />
              {!isCollapsed && <span>Admin Panel</span>}
            </button>
          )}

          <button 
            className={`
              w-full flex items-center gap-2 px-4 py-3 
              text-gray-300 hover:text-white transition-colors rounded-lg 
              hover:bg-gray-800/50
            `}
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings size={20} />
            {!isCollapsed && <span>Settings</span>}
          </button>
          
          <div className="px-4">
            <BuyCreditsButton />
          </div>

          {isAuthenticated ? (
            <button 
              className={`
                w-full flex items-center gap-2 px-4 py-3 
                text-red-400 hover:text-red-300 transition-colors rounded-lg 
                hover:bg-red-900/20
              `}
              onClick={logout}
            >
              <LogOut size={20} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          ) : (
            <button 
              className={`
                w-full flex items-center gap-2 px-4 py-3 
                text-primary-400 hover:text-primary-300 transition-colors rounded-lg 
                hover:bg-primary-900/20
              `}
              onClick={() => setIsLoginOpen(true)}
            >
              <LogOut size={20} className="rotate-180" />
              {!isCollapsed && <span>Login</span>}
            </button>
          )}
        </div>
      </div>

      {showAdminPanel && isAdmin() && (
        <div className="fixed inset-0 bg-black/50 z-30">
          <div className="absolute right-0 top-0 bottom-0 w-[calc(100%-300px)] bg-gray-50 dark:bg-gray-900 overflow-y-auto">
            <AdminPanel onClose={() => setShowAdminPanel(false)} />
          </div>
        </div>
      )}

      {showUserPanel && (
        <div className="fixed inset-0 bg-black/50 z-30">
          <div className="absolute right-0 top-0 bottom-0 w-[calc(100%-300px)] bg-gray-50 dark:bg-gray-900 overflow-y-auto">
            <UserPanel onClose={() => setShowUserPanel(false)} />
          </div>
        </div>
      )}

      <MenuDialog 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      
      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <LoginDialog
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}