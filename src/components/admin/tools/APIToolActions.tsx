import React, { useState } from 'react';
import { MoreVertical, Edit2, Trash2, Power, Settings } from 'lucide-react';
import { AITool } from '../../../types';
import { Button } from '../../ui/Button';
import { useToolsStore } from '../../../store/tools.store';
import { toast } from 'react-hot-toast';

interface APIToolActionsProps {
  tool: AITool;
  onEdit: (tool: AITool) => void;
}

export function APIToolActions({ tool, onEdit }: APIToolActionsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { deleteTool, toggleToolStatus } = useToolsStore();

  const handleAction = async (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      switch (action) {
        case 'edit':
          onEdit(tool);
          break;
        case 'delete':
          if (window.confirm('Are you sure you want to delete this tool?')) {
            await deleteTool(tool.id);
            toast.success('Tool deleted successfully');
          }
          break;
        case 'toggle':
          await toggleToolStatus(tool.id);
          toast.success(`Tool ${tool.isEnabled ? 'disabled' : 'enabled'} successfully`);
          break;
      }
    } catch (error) {
      toast.error('Action failed. Please try again.');
    } finally {
      setShowMenu(false);
    }
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="relative flex justify-end" onClick={stopPropagation}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowMenu(!showMenu)}
        className="p-1"
      >
        <MoreVertical size={16} />
      </Button>

      {showMenu && (
        <div className="absolute right-0 top-8 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          <button
            onClick={(e) => handleAction('edit', e)}
            className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <Edit2 size={14} />
            Edit Tool
          </button>
          <button
            onClick={(e) => handleAction('toggle', e)}
            className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <Power size={14} />
            {tool.isEnabled ? 'Disable Tool' : 'Enable Tool'}
          </button>
          <button
            onClick={(e) => handleAction('delete', e)}
            className="w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
          >
            <Trash2 size={14} />
            Delete Tool
          </button>
        </div>
      )}
    </div>
  );
}