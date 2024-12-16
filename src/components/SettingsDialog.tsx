import React from 'react';
import { X, Moon, Sun, Globe } from 'lucide-react';
import { Button } from './ui/Button';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Appearance</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="ghost" className="flex-col py-4 px-2">
                <Sun size={20} className="mb-2" />
                <span className="text-sm">Light</span>
              </Button>
              <Button variant="ghost" className="flex-col py-4 px-2">
                <Moon size={20} className="mb-2" />
                <span className="text-sm">Dark</span>
              </Button>
              <Button variant="ghost" className="flex-col py-4 px-2">
                <Globe size={20} className="mb-2" />
                <span className="text-sm">System</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Language</h3>
            <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">API Settings</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-600">Save API keys locally</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-600">Auto-clear chat history</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}