import { googleProvider, facebookProvider } from '../../config/firebase';
import type { AuthProvider } from './types';

export const providers = {
  google: googleProvider,
  facebook: facebookProvider
} as const;