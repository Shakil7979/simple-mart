// stores/themeStore.js
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: localStorage.getItem('theme') === 'dark'
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', this.isDark);
    },
    initializeTheme() {
      const saved = localStorage.getItem('theme');
      this.isDark = saved === 'dark';
      document.documentElement.classList.toggle('dark', this.isDark);
    }
  }
});
