import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { UserManagement } from './users/UserManagement';
import { APIKeyManagement } from './apiKeys/APIKeyManagement';
import { APIToolManagement } from './tools/APIToolManagement';
import { LogoManagement } from './logo/LogoManagement';
import { APIConnectionManagement } from './connections/APIConnectionManagement';
import { UsageStats } from './UsageStats';
import { APIUsage } from './APIUsage';
import { CostAnalysis } from './CostAnalysis';
import { X } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Admin Dashboard
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
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="logo">Logo</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <UsageStats />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <APIUsage />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <CostAnalysis />
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <UserManagement />
            </div>
          </TabsContent>

          <TabsContent value="logo">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <LogoManagement />
            </div>
          </TabsContent>

          <TabsContent value="api-keys">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <APIKeyManagement />
            </div>
          </TabsContent>

          <TabsContent value="tools">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <APIToolManagement />
            </div>
          </TabsContent>

          <TabsContent value="connections">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <APIConnectionManagement />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}