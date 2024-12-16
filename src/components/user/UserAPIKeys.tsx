import React from 'react';
import { useApiKeysStore } from '../../store/apiKeys.store';
import { APIKeysList } from '../admin/apiKeys/APIKeysList';
import { APIKeyStats } from '../admin/apiKeys/APIKeyStats';

export function UserAPIKeys() {
  return (
    <div className="space-y-6">
      <APIKeyStats />
      <APIKeysList />
    </div>
  );
}