import React, { useState } from 'react';
import { Menu, MessageSquare, Settings } from 'lucide-react';
import { MenuDialog } from './MenuDialog';
import { SettingsDialog } from './SettingsDialog';

export function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className="w-20 bg-primary-950 h-screen flex flex-col items-center py-8">
        <button 
          className="p-3 text-primary-200 hover:text-white transition-colors"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
        <div className="flex-1 flex flex-col gap-4 items-center mt-8">
          <button className="p-3 text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors">
            <MessageSquare size={24} />
          </button>
          <button 
            className="p-3 text-primary-200 hover:text-white transition-colors"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings size={24} />
          </button>
        </div>
      </div>

      <MenuDialog 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      
      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}