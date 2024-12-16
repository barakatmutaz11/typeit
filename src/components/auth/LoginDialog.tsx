import React, { useState } from 'react';
import { X, LogIn } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuthStore } from '../../store/auth.store';
import { motion, AnimatePresence } from 'framer-motion';
import { SocialLogin } from './SocialLogin';
import { toast } from 'react-hot-toast';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore(state => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Successfully logged in');
      onClose();
    } catch (error) {
      setError('Invalid email or password');
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string, data: any) => {
    setIsLoading(true);
    try {
      await login(data.email, 'social-auth');
      toast.success(`Successfully logged in with ${provider}`);
      onClose();
    } catch (error) {
      setError(`Failed to login with ${provider}`);
      toast.error('Social login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialError = (error: Error) => {
    setError('Social login failed');
    toast.error(error.message);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Login</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              <LogIn size={18} className="mr-2" />
              Login
            </Button>

            <SocialLogin 
              onSuccess={handleSocialLogin}
              onError={handleSocialError}
            />
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}