import React, { useState } from 'react';
import { Coins } from 'lucide-react';
import { Button } from '../ui/Button';
import { BuyCreditsDialog } from './BuyCreditsDialog';
import { motion } from 'framer-motion';

export function BuyCreditsButton() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setShowDialog(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
        >
          <Coins className="w-5 h-5" />
          <span>Buy Credits</span>
        </Button>
      </motion.div>

      <BuyCreditsDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </>
  );
}