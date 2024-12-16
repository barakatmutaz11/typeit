import React from 'react';
import { X, Trash2, Plus, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useMessagesStore } from '../../store/messages.store';
import { useToolsStore } from '../../store/tools.store';

interface MenuDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuDialog({ isOpen, onClose }: MenuDialogProps) {
  const { messages, clearMessages } = useMessagesStore();
  const { activeTools, clearActiveTools } = useToolsStore();

  const handleNewChat = () => {
    clearMessages();
    clearActiveTools();
    onClose();
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history?')) {
      clearMessages();
      onClose();
    }
  };

  const handleExportChat = () => {
    const chatData = {
      messages,
      activeTools,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-start z-50">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-white dark:bg-gray-900 h-full w-80 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Menu</h2>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
                onClick={handleNewChat}
              >
                <Plus size={18} />
                New Chat
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
                onClick={handleClearHistory}
                disabled={messages.length === 0}
              >
                <Trash2 size={18} />
                Clear History
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
                onClick={handleExportChat}
                disabled={messages.length === 0}
              >
                <Download size={18} />
                Export Chat
              </Button>
              
              <hr className="my-4 border-gray-200 dark:border-gray-700" />
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Sign Out
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}