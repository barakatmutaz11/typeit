import React, { useState } from 'react';
import { X, Key, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { AITool } from '../../types';
import { useApiKeysStore } from '../../store/apiKeys.store';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tool: AITool;
}

export function ApiKeyDialog({ isOpen, onClose, tool }: ApiKeyDialogProps) {
  const { setApiKey, getApiKey } = useApiKeysStore();
  const [apiKey, setApiKeyInput] = useState(getApiKey(tool.id) || '');
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here you would typically validate the API key with the provider
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setApiKey(tool.id, apiKey);
      onClose();
    } catch (error) {
      console.error('Failed to validate API key:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${tool.color}`}>
                <tool.icon className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {tool.name} API Key
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tool.provider}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                API Key
              </label>
              <div className="relative">
                <Input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder={`Enter your ${tool.name} API key`}
                  icon={<Key size={18} />}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Your API key will be securely stored in your browser
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
              >
                Save API Key
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}