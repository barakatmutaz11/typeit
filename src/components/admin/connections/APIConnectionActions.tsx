import React, { useState } from 'react';
import { MoreVertical, RefreshCw, Settings, Trash2 } from 'lucide-react';
import { APIConnection } from '../../../types';
import { Button } from '../../ui/Button';
import { useConnectionStore } from '../../../store/connections.store';
import { toast } from 'react-hot-toast';

interface APIConnectionActionsProps {
  connection: APIConnection;
}

export function APIConnectionActions({ connection }: APIConnectionActionsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { testConnection, deleteConnection } = useConnectionStore();

  const handleAction = async (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      switch (action) {
        case 'test':
          const success = await testConnection(connection.id);
          toast.success(
            success 
              ? 'Connection test successful' 
              : 'Connection test failed'
          );
          break;
        case 'delete':
          if (window.confirm('Are you sure you want to delete this connection?')) {
            await deleteConnection(connection.id);
            toast.success('Connection deleted successfully');
          }
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
            onClick={(e) => handleAction('test', e)}
            className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <RefreshCw size={14} />
            Test Connection
          </button>
          <button
            onClick={(e) => handleAction('delete', e)}
            className="w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
          >
            <Trash2 size={14} />
            Delete Connection
          </button>
        </div>
      )}
    </div>
  );
}