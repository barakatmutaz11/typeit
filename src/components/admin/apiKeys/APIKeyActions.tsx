import React, { useState } from 'react';
import { MoreVertical, RefreshCw, Ban, Key, Trash2 } from 'lucide-react';
import { APIKey } from '../../../types';
import { Button } from '../../ui/Button';
import { useApiKeysStore } from '../../../store/apiKeys.store';
import { toast } from 'react-hot-toast';

interface APIKeyActionsProps {
  apiKey: APIKey;
}

export function APIKeyActions({ apiKey }: APIKeyActionsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { rotateKey, revokeKey, deleteKey } = useApiKeysStore();

  const handleAction = async (action: string) => {
    try {
      switch (action) {
        case 'rotate':
          if (window.confirm('Are you sure you want to rotate this API key?')) {
            const newKey = await rotateKey(apiKey.id);
            if (newKey) {
              navigator.clipboard.writeText(newKey);
              toast.success('New API key copied to clipboard');
            }
          }
          break;
        case 'revoke':
          if (window.confirm('Are you sure you want to revoke this API key?')) {
            await revokeKey(apiKey.id);
            toast.success('API key revoked');
          }
          break;
        case 'delete':
          if (window.confirm('Are you sure you want to delete this API key?')) {
            await deleteKey(apiKey.id);
            toast.success('API key deleted');
          }
          break;
      }
    } catch (error) {
      toast.error('Action failed. Please try again.');
    } finally {
      setShowMenu(false);
    }
  };

  return (
    <div className="relative flex justify-end">
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
            onClick={() => handleAction('rotate')}
            className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <RefreshCw size={14} />
            Rotate Key
          </button>
          <button
            onClick={() => handleAction('revoke')}
            className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <Ban size={14} />
            {apiKey.status === 'revoked' ? 'Reactivate Key' : 'Revoke Key'}
          </button>
          <button
            onClick={() => handleAction('delete')}
            className="w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
          >
            <Trash2 size={14} />
            Delete Key
          </button>
        </div>
      )}
    </div>
  );
}