import { useState } from 'react';
import { useUsersStore } from '../store/users.store';
import { User } from '../types';

export function useUserManagement() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const users = useUsersStore(state => state.users);

  const addUser = async (user: User) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      useUsersStore.getState().addUser(user);
      return true;
    } catch (err) {
      setError('Failed to add user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userId: string, data: Partial<User>) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      useUsersStore.getState().updateUser(userId, data);
      return true;
    } catch (err) {
      setError('Failed to update user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      useUsersStore.getState().deleteUser(userId);
      return true;
    } catch (err) {
      setError('Failed to delete user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (userId: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = users.find(u => u.id === userId);
      if (user?.status === 'banned') {
        useUsersStore.getState().unbanUser(userId);
      } else {
        useUsersStore.getState().banUser(userId);
      }
      return true;
    } catch (err) {
      setError('Failed to update user status');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handlePromoteUser = async (userId: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = users.find(u => u.id === userId);
      if (user?.role === 'admin') {
        useUsersStore.getState().demoteUser(userId);
      } else {
        useUsersStore.getState().promoteUser(userId);
      }
      return true;
    } catch (err) {
      setError('Failed to update user role');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleResetApiKey = async (userId: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newApiKey = useUsersStore.getState().resetApiKey(userId);
      return newApiKey;
    } catch (err) {
      setError('Failed to reset API key');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    isLoading,
    error,
    addUser,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
    banUser: handleBanUser,
    promoteUser: handlePromoteUser,
    resetApiKey: handleResetApiKey,
  };
}