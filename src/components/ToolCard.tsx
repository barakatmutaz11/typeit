import React from 'react';
import { AITool } from '../types';
import { Plus, Minus, Coins } from 'lucide-react';
import { Button } from './ui/Button';
import { useStore } from '../store/useStore';
import { CreditsDisplay } from './CreditsDisplay';

interface ToolCardProps {
  tool: AITool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { activeTools, addActiveTools, removeActiveTools } = useStore();
  const Icon = tool.icon;
  
  const isActive = activeTools.some(t => t.id === tool.id);
  
  const handleToggle = () => {
    if (isActive) {
      removeActiveTools(tool.id);
    } else {
      addActiveTools(tool);
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-primary-100 hover:shadow-md transition-all hover:border-primary-200">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${tool.color}`}>
          <Icon className="text-white" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-primary-900">{tool.name}</h3>
          <p className="text-sm text-primary-600">{tool.description}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-primary-400">{tool.provider}</span>
            <span className="text-xs text-primary-400">•</span>
            <div className="flex items-center gap-1 text-xs text-primary-400">
              <Coins size={12} />
              <span>{tool.costPerRequest} credits/request</span>
            </div>
          </div>
          <CreditsDisplay credits={tool.credits} />
        </div>
        <Button
          variant={isActive ? 'secondary' : 'primary'}
          size="sm"
          onClick={handleToggle}
          className="min-w-[32px] h-8"
          disabled={tool.credits.available <= 0}
          title={tool.credits.available <= 0 ? 'No credits available' : ''}
        >
          {isActive ? <Minus size={16} /> : <Plus size={16} />}
        </Button>
      </div>
    </div>
  );
}