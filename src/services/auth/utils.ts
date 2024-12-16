import { UserCredential } from 'firebase/auth';
import { AuthUser } from './types';

export function extractUserData(result: UserCredential): AuthUser {
  const { user } = result;
  return {
    id: user.uid,
    email: user.email || 'unknown',
    name: user.displayName || 'Anonymous User',
    avatar: user.photoURL || undefined,
    provider: user.providerId || 'unknown'
  };
}