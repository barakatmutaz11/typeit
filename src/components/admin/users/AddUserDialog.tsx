import React, { useState } from 'react';
import { X, User, Mail, Shield, Key } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useUserManagement } from '../../../hooks/useUserManagement';
import { toast } from 'react-hot-toast';

interface AddUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddUserDialog({ isOpen, onClose }: AddUserDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user' as 'admin' | 'user',
    permissions: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { addUser } = useUserManagement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newUser = {
        id: Date.now().toString(),
        ...formData,
        status: 'active' as const,
        lastActive: new Date(),
        stats: { totalApiCalls: 0, creditsUsed: 0 },
        apiKey: `key_${Math.random().toString(36).slice(2)}`,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}`,
      };

      await addUser(newUser);
      toast.success('User added successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to add user');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New User</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <Input
              icon={<User size={18} />}
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter user name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <Input
              type="email"
              icon={<Mail size={18} />}
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email address"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Role
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'user' | 'admin' }))}
                  className="mr-2"
                />
                User
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === 'admin'}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'user' | 'admin' }))}
                  className="mr-2"
                />
                Admin
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Permissions
            </label>
            <div className="space-y-2">
              {['view_analytics', 'manage_users', 'manage_api_keys'].map((permission) => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission)}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        permissions: e.target.checked
                          ? [...prev.permissions, permission]
                          : prev.permissions.filter(p => p !== permission)
                      }));
                    }}
                    className="mr-2"
                  />
                  {permission.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </label>
              ))}
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
              Add User
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}