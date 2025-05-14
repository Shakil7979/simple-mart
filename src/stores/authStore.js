// src/stores/authStore.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    login(userData) {
      this.user = userData;
      this.isAuthenticated = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    },
    loadFromStorage() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const user = localStorage.getItem('user');

      if (isLoggedIn && user) {
        this.isAuthenticated = true;
        this.user = JSON.parse(user);
      }
    }
  }
});
