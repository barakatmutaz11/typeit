import { AuthError } from './types';

export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/popup-closed-by-user': 'Login cancelled',
  'auth/account-exists-with-different-credential': 'An account already exists with this email',
  'auth/invalid-credential': 'Invalid credentials',
  'auth/operation-not-allowed': 'This login method is not enabled',
  'auth/user-disabled': 'This account has been disabled',
  'auth/user-not-found': 'No account found with these credentials',
  'auth/wrong-password': 'Invalid credentials',
  'auth/invalid-verification-code': 'Invalid verification code',
  'auth/invalid-verification-id': 'Invalid verification ID',
  'auth/missing-verification-code': 'Missing verification code',
  'auth/missing-verification-id': 'Missing verification ID',
};

export function getAuthErrorMessage(error: AuthError): string {
  if (error.code in AUTH_ERROR_MESSAGES) {
    return AUTH_ERROR_MESSAGES[error.code];
  }
  return 'Authentication failed';
}