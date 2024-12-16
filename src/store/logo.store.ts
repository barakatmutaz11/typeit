import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LogoState {
  currentLogo: string | null;
  setLogo: (logo: string) => void;
}

export const useLogoStore = create<LogoState>()(
  persist(
    (set) => ({
      currentLogo: null,
      setLogo: (logo) => set({ currentLogo: logo }),
    }),
    {
      name: 'logo-storage',
    }
  )
);