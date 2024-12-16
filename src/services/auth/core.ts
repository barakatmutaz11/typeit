import { signInWithPopup, UserCredential } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { providers } from './providers';
import { extractUserData } from './utils';
import { getAuthErrorMessage } from './errors';
import { useAuthStore } from '../../store/auth.store';
import { toast } from 'react-hot-toast';
import type { AuthProvider, AuthError } from './types';

async function handleAuthSuccess(result: UserCredential) {
  const userData = extractUserData(result);
  useAuthStore.getState().socialLogin(userData.provider, userData);
  toast.success('Successfully logged in!');
}

async function handleAuthError(error: AuthError) {
  console.error('Auth error:', error);
  const message = getAuthErrorMessage(error);
  toast.error(message);
  throw error;
}

export async function signInWithProvider(provider: AuthProvider): Promise<void> {
  const authProvider = providers[provider];
  
  try {
    const result = await signInWithPopup(auth, authProvider);
    await handleAuthSuccess(result);
  } catch (error) {
    await handleAuthError(error as AuthError);
  }
}