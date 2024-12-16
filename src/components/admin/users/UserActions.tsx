import React, { useState } from 'react';
import { MoreVertical, Edit2, Trash2, Ban, Shield, Key } from 'lucide-react';
import { User } from '../../../types';
import { Button } from '../../ui/Button';
import { useUserManagement } from '../../../hooks/useUserManagement';
import { toast } from 'react-hot-toast';

interface UserActionsProps {
  user: User;
}

export function UserActions({ user }: UserActionsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { updateUser, deleteUser, banUser, promoteUser, resetApiKey } = useUserManagement();

  const handleAction = async (action: string) => {
    try {
      switch (action) {
        case 'edit':
          // Show edit modal
          break;
        case 'delete':
          if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            const success = await deleteUser(user.id);
            if (success) {
              toast.success(`${user.name} has been deleted`);
            }
          }
          break;
        case 'ban':
          const success = await banUser(user.id);
          if (success) {
            toast.success(
              user.status === 'banned'
                ? `${user.name} has been unbanned`
                : `${user.name} has been banned`
            );
          }
          break;
        case 'promote':
          const promoted = await promoteUser(user.id);
          if (promoted) {
            toast.success(
              user.role === 'admin'
                ? `${user.name} is no longer an admin`
                : `${user.name} is now an admin`
            );
          }
          break;
        case 'reset-key':
          if (window.confirm('Are you sure you want to reset the API key?')) {
            const newApiKey = await resetApiKey(user.id);
            if (newApiKey) {
              toast.success('API key has been reset');
              // Show the new API key in a modal or copy to clipboard
              navigator.clipboard.writeText(newApiKey);
              toast.success('New API key copied to clipboard');
            }
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
            onClick={() => handleAction('edit')}
            className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <Edit2 size={14} />
            Edit User
          </button>
          <button
            onClick={() => handleAction('promote')}
            className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <Shield size={14} />
            {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
          </button>
          <button
            onClick={() => handleAction('reset-key')}
            className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <Key size={14} />
            Reset API Key
          </button>
          <button
            onClick={() => handleAction('ban')}
            className="w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
          >
            <Ban size={14} />
            {user.status === 'banned' ? 'Unban User' : 'Ban User'}
          </button>
          <button
            onClick={() => handleAction('delete')}
            className="w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
          >
            <Trash2 size={14} />
            Delete User
          </button>
        </div>
      )}
    </div>
  );
}