import React from 'react';
import { Button } from '../ui/Button';
import { Mail, Lock } from 'lucide-react';

interface SocialLoginProps {
  onSuccess: (provider: string, data: any) => void;
  onError: (error: Error) => void;
}

export function SocialLogin({ onSuccess, onError }: SocialLoginProps) {
  const handleGoogleLogin = async () => {
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSuccess('Google', {
        email: 'user@gmail.com',
        name: 'Google User',
        avatar: 'https://ui-avatars.com/api/?name=Google+User'
      });
    } catch (error) {
      onError(new Error('Google login failed'));
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // Simulate Facebook OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSuccess('Facebook', {
        email: 'user@facebook.com',
        name: 'Facebook User',
        avatar: 'https://ui-avatars.com/api/?name=Facebook+User'
      });
    } catch (error) {
      onError(new Error('Facebook login failed'));
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Mail className="w-5 h-5 mr-2" />
          Google
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={handleFacebookLogin}
          className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Lock className="w-5 h-5 mr-2" />
          Facebook
        </Button>
      </div>
    </div>
  );
}