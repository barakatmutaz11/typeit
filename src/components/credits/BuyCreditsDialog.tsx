import React, { useState } from 'react';
import { X, CreditCard, Package, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';

interface BuyCreditsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CREDIT_PACKAGES = [
  { id: 'small', credits: 1000, price: 10, popular: false },
  { id: 'medium', credits: 5000, price: 45, popular: true },
  { id: 'large', credits: 10000, price: 80, popular: false },
];

export function BuyCreditsDialog({ isOpen, onClose }: BuyCreditsDialogProps) {
  const [selectedPackage, setSelectedPackage] = useState(CREDIT_PACKAGES[1]);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();

  const handlePurchase = async () => {
    if (!stripe) {
      toast.error('Payment system not initialized');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{
          price: `price_${selectedPackage.id}`, // Replace with your actual Stripe price IDs
          quantity: 1,
        }],
        mode: 'payment',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      toast.error('Failed to initiate purchase');
      console.error('Stripe error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg shadow-xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Buy AI Credits
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {CREDIT_PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => setSelectedPackage(pkg)}
                className={`
                  w-full p-4 rounded-lg border-2 transition-all duration-200
                  ${selectedPackage.id === pkg.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                  }
                  relative overflow-hidden
                `}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                      Popular
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`
                      p-2 rounded-lg
                      ${selectedPackage.id === pkg.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }
                    `}>
                      <Package size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {pkg.credits.toLocaleString()} Credits
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ${pkg.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-primary-500">
                    ${(pkg.price / pkg.credits * 1000).toFixed(3)}/1k credits
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <Button
            onClick={handlePurchase}
            isLoading={isLoading}
            className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600"
          >
            <CreditCard size={18} className="mr-2" />
            Purchase {selectedPackage.credits.toLocaleString()} Credits
          </Button>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Credits never expire. By purchasing you agree to our terms of service.
          </p>
        </div>
      </motion.div>
    </div>
  );
}