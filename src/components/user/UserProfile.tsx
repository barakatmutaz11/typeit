import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuthStore } from '../../store/auth.store';
import { toast } from 'react-hot-toast';
import { Avatar } from '../ui/Avatar';

export function UserProfile() {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Profile Information
        </h2>
        <Button
          variant="ghost"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <Avatar name={formData.name} src={formData.avatar} size="lg" />
            <Button variant="ghost" size="sm">
              Change Avatar
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar name={user?.name || ''} src={user?.avatar} size="lg" />
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {user?.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Account Type
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {user?.role === 'admin' ? 'Administrator' : 'Standard User'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Member Since
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {new Date(user?.lastActive || Date.now()).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}