import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { APIToolList } from './APIToolList';
import { AddToolDialog } from './AddToolDialog';
import { EditToolDialog } from './EditToolDialog';
import { AITool } from '../../../types';

export function APIToolManagement() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);

  const handleEdit = (tool: AITool) => {
    setSelectedTool(tool);
    setShowEditDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          API Tool Management
        </h2>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Add Tool
        </Button>
      </div>

      <APIToolList onEdit={handleEdit} />

      <AddToolDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
      />

      {selectedTool && (
        <EditToolDialog
          isOpen={showEditDialog}
          onClose={() => {
            setShowEditDialog(false);
            setSelectedTool(null);
          }}
          tool={selectedTool}
        />
      )}
    </div>
  );
}