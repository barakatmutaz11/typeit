import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { APIKeysList } from './APIKeysList';
import { APIKeyStats } from './APIKeyStats';
import { AddAPIKeyDialog } from './AddAPIKeyDialog';

export function APIKeyManagement() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          API Key Management
        </h2>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Generate New Key
        </Button>
      </div>

      <APIKeyStats />
      <APIKeysList />
      
      <AddAPIKeyDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
      />
    </div>
  );
}