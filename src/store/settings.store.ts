import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

const initialState = {
  theme: 'system' as Theme,
  language: 'en' as Language,
  saveApiKeys: false,
  autoClearChat: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleSaveApiKeys: () => set((state) => ({ saveApiKeys: !state.saveApiKeys })),
      toggleAutoClearChat: () => set((state) => ({ autoClearChat: !state.autoClearChat })),
    }),
    {
      name: 'settings-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        saveApiKeys: state.saveApiKeys,
        autoClearChat: state.autoClearChat,
      }),
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migration from version 0 to 1
          return {
            ...initialState,
            ...persistedState,
          };
        }
        return persistedState as SettingsState;
      },
    }
  )
);