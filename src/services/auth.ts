import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  UserCredential 
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../config/firebase';
import { useAuthStore } from '../store/auth.store';
import { toast } from 'react-hot-toast';

export async function signInWithGoogle(): Promise<void> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential) throw new Error('No credentials returned from Google');
    
    await handleAuthSuccess(result);
  } catch (error) {
    handleAuthError(error);
  }
}

export async function signInWithFacebook(): Promise<void> {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const credential = FacebookAuthProvider.credentialFromResult(result);
    
    if (!credential) throw new Error('No credentials returned from Facebook');
    
    await handleAuthSuccess(result);
  } catch (error) {
    handleAuthError(error);
  }
}

async function handleAuthSuccess(result: UserCredential) {
  const { user } = result;
  
  // Update auth store with user info
  useAuthStore.getState().socialLogin(user.providerId || 'unknown', {
    email: user.email || 'unknown',
    name: user.displayName || 'Anonymous User',
    avatar: user.photoURL || undefined
  });
  
  toast.success('Successfully logged in!');
}

function handleAuthError(error: any) {
  console.error('Auth error:', error);
  
  let message = 'Authentication failed';
  
  if (error.code === 'auth/popup-closed-by-user') {
    message = 'Login cancelled';
  } else if (error.code === 'auth/account-exists-with-different-credential') {
    message = 'An account already exists with this email';
  }
  
  toast.error(message);
  throw error;
}