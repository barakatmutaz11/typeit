export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: string;
}

export type AuthProvider = 'google' | 'facebook';

export interface AuthError {
  code: string;
  message: string;
}