import React from 'react';
import { Activity, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useConnectionStore } from '../../../store/connections.store';

export function APIConnectionStats() {
  const { connections } = useConnectionStore();

  const stats = {
    total: connections.length,
    active: connections.filter(c => c.status === 'connected').length,
    failed: connections.filter(c => c.status === 'failed').length,
    pending: connections.filter(c => c.status === 'pending').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Connections</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total}</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
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
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Failed</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.failed}</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Pending</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.pending}</div>
          </div>
        </div>
      </div>
    </div>
  );
}