import React, { useState } from 'react';
import { X, Key, Clock, Shield } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useApiKeysStore } from '../../../store/apiKeys.store';
import { toast } from 'react-hot-toast';
import { aiTools } from '../../../data/aiTools';

interface AddAPIKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAPIKeyDialog({ isOpen, onClose }: AddAPIKeyDialogProps) {
  const [formData, setFormData] = useState({
    toolId: '',
    expiresIn: '30',
    rateLimit: '1000',
    rateLimitPeriod: '1h',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const tool = aiTools.find(t => t.id === formData.toolId);
      if (!tool) throw new Error('Tool not found');

      const newKey = {
        id: `key_${Date.now()}`,
        tool,
        key: `sk_${Math.random().toString(36).slice(2)}`,
        status: 'active' as const,
        createdAt: new Date(),
        lastUsed: new Date(),
        expiresAt: formData.expiresIn === 'never' ? null : new Date(Date.now() + parseInt(formData.expiresIn) * 24 * 60 * 60 * 1000),
        usage: {
          totalRequests: 0,
          dataProcessed: 0,
          cost: 0,
        },
        rateLimit: {
          requests: parseInt(formData.rateLimit),
          period: formData.rateLimitPeriod,
        },
      };

      // Copy to clipboard
      await navigator.clipboard.writeText(newKey.key);
      toast.success('API key copied to clipboard');
      
      onClose();
    } catch (error) {
      toast.error('Failed to generate API key');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Generate New API Key</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Tool
            </label>
            <select
              value={formData.toolId}
              onChange={(e) => setFormData(prev => ({ ...prev, toolId: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              required
            >
              <option value="">Select a tool</option>
              {aiTools.map(tool => (
                <option key={tool.id} value={tool.id}>
                  {tool.name} ({tool.provider})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expiration
            </label>
            <select
              value={formData.expiresIn}
              onChange={(e) => setFormData(prev => ({ ...prev, expiresIn: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="365">1 year</option>
              <option value="never">Never</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rate Limit
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={formData.rateLimit}
                onChange={(e) => setFormData(prev => ({ ...prev, rateLimit: e.target.value }))}
                placeholder="Requests"
                min="1"
                required
              />
              <select
                value={formData.rateLimitPeriod}
                onChange={(e) => setFormData(prev => ({ ...prev, rateLimitPeriod: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <option value="1m">Per Minute</option>
                <option value="1h">Per Hour</option>
                <option value="1d">Per Day</option>
              </select>
            </div>
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
              Generate Key
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}