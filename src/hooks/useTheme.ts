import { useEffect } from 'react';
import { useSettingsStore } from '../store/settings.store';

export function useTheme() {
  const { theme } = useSettingsStore();

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = () => {
      root.classList.remove('light', 'dark');
      
      switch (theme) {
        case 'dark':
          root.classList.add('dark');
          break;
        case 'light':
          root.classList.add('light');
          break;
        case 'system':
          if (mediaQuery.matches) {
            root.classList.add('dark');
          } else {
            root.classList.add('light');
          }
          break;
      }
    };

    // Apply theme immediately
    applyTheme();

    // Listen for system theme changes
    const listener = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);
}