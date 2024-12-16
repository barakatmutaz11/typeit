import React from 'react';
import { Key, Shield, AlertTriangle, Clock } from 'lucide-react';
import { useApiKeysStore } from '../../../store/apiKeys.store';

export function APIKeyStats() {
  const { apiKeys } = useApiKeysStore();

  const stats = {
    total: apiKeys.length,
    active: apiKeys.filter(k => k.status === 'active').length,
    revoked: apiKeys.filter(k => k.status === 'revoked').length,
    expiring: apiKeys.filter(k => {
      if (!k.expiresAt) return false;
      const daysUntilExpiry = (new Date(k.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
    }).length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <Key className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Keys</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total}</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Active</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.active}</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Revoked</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.revoked}</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Expiring Soon</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.expiring}</div>
          </div>
        </div>
      </div>
    </div>
  );
}