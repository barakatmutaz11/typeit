import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { useSubscription } from '../../hooks/useSubscription';

export function ManageSubscriptionButton() {
  const { isLoading, manageSubscription } = useSubscription();

  return (
    <Button
      onClick={manageSubscription}
      isLoading={isLoading}
      variant="ghost"
      className="flex items-center gap-2"
    >
      <Settings size={18} />
      Manage Subscription
    </Button>
  );
}