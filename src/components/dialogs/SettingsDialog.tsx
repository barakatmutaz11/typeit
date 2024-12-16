import React from 'react';
import { X, Moon, Sun, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '../../store/settings.store';
import type { Theme, Language } from '../../store/settings.store';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  const { 
    theme, 
    language, 
    saveApiKeys, 
    autoClearChat,
    setTheme, 
    setLanguage, 
    toggleSaveApiKeys, 
    toggleAutoClearChat 
  } = useSettingsStore();

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={theme === 'light' ? 'primary' : 'ghost'} 
                    className="flex-col py-4 px-2"
                    onClick={() => handleThemeChange('light')}
                  >
                    <Sun size={20} className="mb-2" />
                    <span className="text-sm">Light</span>
                  </Button>
                  <Button 
                    variant={theme === 'dark' ? 'primary' : 'ghost'} 
                    className="flex-col py-4 px-2"
                    onClick={() => handleThemeChange('dark')}
                  >
                    <Moon size={20} className="mb-2" />
                    <span className="text-sm">Dark</span>
                  </Button>
                  <Button 
                    variant={theme === 'system' ? 'primary' : 'ghost'} 
                    className="flex-col py-4 px-2"
                    onClick={() => handleThemeChange('system')}
                  >
                    <Globe size={20} className="mb-2" />
                    <span className="text-sm">System</span>
                  </Button>
                </div>
              </div>

              {/* Rest of the dialog content */}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}