import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useToolsStore } from '../../../store/tools.store';
import { toast } from 'react-hot-toast';
import { CATEGORIES, PROVIDERS } from '../../../utils/constants';

interface AddToolDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddToolDialog({ isOpen, onClose }: AddToolDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    provider: '',
    category: '',
    costPerRequest: '1',
    color: 'bg-blue-600',
    rateLimit: {
      requests: '1000',
      period: '1h'
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const { addTool } = useToolsStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newTool = {
        id: `tool_${Date.now()}`,
        ...formData,
        costPerRequest: parseInt(formData.costPerRequest),
        icon: Plus, // Default icon, you can add icon selection if needed
        credits: {
          available: 1000,
          used: 0,
          total: 1000
        },
        isEnabled: true,
        stats: {
          totalRequests: 0,
          successRate: 100,
          avgResponseTime: 0,
        }
      };

      await addTool(newTool);
      toast.success('Tool added successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to add tool');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Tool</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tool Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter tool name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter tool description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Provider
            </label>
            <select
              value={formData.provider}
              onChange={(e) => setFormData(prev => ({ ...prev, provider: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              required
            >
              <option value="">Select provider</option>
              {Object.values(PROVIDERS).map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              required
            >
              <option value="">Select category</option>
              {Object.values(CATEGORIES).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cost per Request (credits)
            </label>
            <Input
              type="number"
              value={formData.costPerRequest}
              onChange={(e) => setFormData(prev => ({ ...prev, costPerRequest: e.target.value }))}
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rate Limit
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={formData.rateLimit.requests}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  rateLimit: { ...prev.rateLimit, requests: e.target.value }
                }))}
                placeholder="Requests"
                min="1"
                required
              />
              <select
                value={formData.rateLimit.period}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  rateLimit: { ...prev.rateLimit, period: e.target.value }
                }))}
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
              Add Tool
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}