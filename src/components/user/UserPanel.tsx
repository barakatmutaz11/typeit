import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { UserProfile } from './UserProfile';
import { UserAPIKeys } from './UserAPIKeys';
import { UserUsage } from './UserUsage';
import { UserBilling } from './UserBilling';
import { X } from 'lucide-react';

interface UserPanelProps {
  onClose: () => void;
}

export function UserPanel({ onClose }: UserPanelProps) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            User Settings
          </h1>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>

          <TabsContent value="api-keys">
            <UserAPIKeys />
          </TabsContent>

          <TabsContent value="usage">
            <UserUsage />
          </TabsContent>

          <TabsContent value="billing">
            <UserBilling />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}