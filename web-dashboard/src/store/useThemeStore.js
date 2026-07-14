import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set, get) => ({
      isDark: true,
      toggleTheme: () => set({ isDark: !get().isDark }),
      setDark: (val) => set({ isDark: val }),
    }),
    { name: 'mezon-theme' }
  )
);
