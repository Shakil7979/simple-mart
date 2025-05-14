<template>
  <div>
    <!-- Settings Content -->
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Settings</h1>

      <ul class="space-y-4">
        <li
          class="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
          @click="goTo('profile')"
        >
          <span class="text-gray-800 font-medium">Profile</span>
          <i class="fas fa-user text-gray-500"></i>
        </li>

        <li
          class="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
          @click="goTo('notifications')"
        >
          <span class="text-gray-800 font-medium">Notifications</span>
          <i class="fas fa-bell text-gray-500"></i>
        </li>

        <li
          class="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
          @click="toggleTheme"
        >
          <span class="text-gray-800 font-medium">Dark Mode</span>
          <i :class="isDark ? 'fas fa-toggle-on text-green-500' : 'fas fa-toggle-off text-gray-400'"></i>
        </li>

        <li
          v-if="isAuthenticated"
          class="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
          @click="logout"
        >
          <span class="text-red-600 font-medium">Logout</span>
          <i class="fas fa-sign-out-alt text-red-500"></i>
        </li>

        <li
          v-else
          class="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
          @click="showLoginModal = true"
        >
          <span class="text-blue-600 font-medium">Login</span>
          <i class="fas fa-sign-in-alt text-blue-500"></i>
        </li>
      </ul>
    </div>

    <!-- Login Modal -->
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" @logged-in="onLoginSuccess" />
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore.js';
import LoginModal from '@/components/LoginModal.vue';

export default {
  name: 'SettingComponent',
  components: {
    LoginModal
  },
  data() {
    return {
      isDark: false,
      showLoginModal: false
    };
  },
  computed: {
    isAuthenticated() {
      const auth = useAuthStore();
      return auth.isAuthenticated;
    }
  },
  methods: {
    goTo(page) {
      alert(`Navigating to ${page} settings`);
    },
    toggleTheme() {
      this.isDark = !this.isDark;
      alert(`Switched to ${this.isDark ? 'Dark' : 'Light'} Mode`);
    },
    logout() {
      localStorage.setItem('isLoggedIn', 'false');
      const auth = useAuthStore();
      auth.user = null;
      auth.isAuthenticated = false;
      this.$router.push('/');
    },
    onLoginSuccess() {
      this.showLoginModal = false;
      this.$router.push('/'); // Redirect to profile or dashboard after login
    }
  }
};
</script>

<style scoped>
/* Add your custom styles if needed */
</style>
