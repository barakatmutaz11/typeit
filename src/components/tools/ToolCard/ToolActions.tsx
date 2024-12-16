import React, { useState } from 'react';
import { Plus, Key } from 'lucide-react';
import { AITool } from '../../../types';
import { Button } from '../../ui/Button';
import { useToolsStore } from '../../../store/tools.store';
import { useApiKeysStore } from '../../../store/apiKeys.store';
import { ApiKeyDialog } from '../../dialogs/ApiKeyDialog';

interface ToolActionsProps {
  tool: AITool;
  isHovered: boolean;
}

export function ToolActions({ tool, isHovered }: ToolActionsProps) {
  const { activeTools, addActiveTools, removeActiveTools } = useToolsStore();
  const { hasApiKey } = useApiKeysStore();
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  
  const isActive = activeTools.some(t => t.id === tool.id);
  const hasKey = hasApiKey(tool.id);

  const handleToggle = () => {
    if (!hasKey) {
      setShowApiKeyDialog(true);
      return;
    }

    if (isActive) {
      removeActiveTools(tool.id);
    } else {
      addActiveTools(tool);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant={isActive ? 'secondary' : 'primary'}
          size="sm"
          onClick={handleToggle}
          className={`
            min-w-[32px] h-8 transition-all duration-200
            ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
          `}
          disabled={tool.credits.available <= 0}
          title={tool.credits.available <= 0 ? 'No credits available' : ''}
        >
          {!hasKey ? (
            <Key size={16} />
          ) : (
            <Plus 
              size={16} 
              className={`transition-transform duration-200 ${isActive ? 'rotate-45' : ''}`} 
            />
          )}
        </Button>
      </div>

      <ApiKeyDialog
        isOpen={showApiKeyDialog}
        onClose={() => setShowApiKeyDialog(false)}
        tool={tool}
      />
    </>
  );
}