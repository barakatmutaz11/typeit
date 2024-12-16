import React, { useState } from 'react';
import { User } from '../../../types';
import { UserActions } from './UserActions';
import { UserStatus } from './UserStatus';
import { formatDistanceToNow } from '../../../utils/date';
import { Avatar } from '../../ui/Avatar';

interface UserRowProps {
  user: User;
}

export function UserRow({ user }: UserRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr 
        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="py-3 px-4">
          <div className="flex items-center gap-3">
            <Avatar name={user.name} src={user.avatar} />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {user.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </div>
            </div>
          </div>
        </td>
        <td className="py-3 px-4">
          <span className={`
            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${user.role === 'admin' 
              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
            }
          `}>
            {user.role}
          </span>
        </td>
        <td className="py-3 px-4">
          <UserStatus status={user.status} />
        </td>
        <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
          {formatDistanceToNow(user.lastActive)}
        </td>
        <td className="py-3 px-4">
          <UserActions user={user} />
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50 dark:bg-gray-800/50">
          <td colSpan={5} className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Activity</h4>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Total API Calls: {user.stats.totalApiCalls}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Credits Used: {user.stats.creditsUsed}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Last Login: {formatDistanceToNow(user.lastActive)}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Permissions</h4>
                <div className="space-y-2">
                  {user.permissions.map((permission) => (
                    <div 
                      key={permission}
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
                      {permission}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}