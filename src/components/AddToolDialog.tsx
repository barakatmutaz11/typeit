import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useStore } from '../store/useStore';

interface AddToolDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddToolDialog({ isOpen, onClose }: AddToolDialogProps) {
  const [name, setName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const { addTool } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addTool({
        id: Date.now().toString(),
        name,
        description: 'Custom AI Tool',
        provider: 'Custom',
        icon: X, // Default icon
        color: 'bg-gray-500',
        apiKey,
      });
      
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New AI Tool</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tool Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter tool name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key"
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="ghost"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
            >
              Add Tool
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}