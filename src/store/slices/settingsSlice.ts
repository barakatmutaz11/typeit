import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'es' | 'fr';

interface SettingsState {
  theme: Theme;
  language: Language;
  saveApiKeys: boolean;
  autoClearChat: boolean;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  toggleSaveApiKeys: () => void;
  toggleAutoClearChat: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      language: 'en',
      saveApiKeys: false,
      autoClearChat: false,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleSaveApiKeys: () => set((state) => ({ saveApiKeys: !state.saveApiKeys })),
      toggleAutoClearChat: () => set((state) => ({ autoClearChat: !state.autoClearChat })),
    }),
    {
      name: 'settings-storage',
    }
  )
);