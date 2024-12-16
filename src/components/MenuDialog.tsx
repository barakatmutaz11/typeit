import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';

interface MenuDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuDialog({ isOpen, onClose }: MenuDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-start">
      <div className="bg-white h-full w-80 p-6 animate-slide-right">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <Button variant="ghost" className="w-full justify-start">
            New Chat
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Clear History
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Export Chat
          </Button>
          <hr className="my-4" />
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}