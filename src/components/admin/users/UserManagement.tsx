import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { UserList } from './UserList';
import { AddUserDialog } from './AddUserDialog';
import { EditUserDialog } from './EditUserDialog';
import { User } from '../../../types';

export function UserManagement() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowEditDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          User Management
        </h2>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Add User
        </Button>
      </div>

      <UserList onEdit={handleEdit} />

      <AddUserDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
      />

      {selectedUser && (
        <EditUserDialog
          isOpen={showEditDialog}
          onClose={() => {
            setShowEditDialog(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
        />
      )}
    </div>
  );
}