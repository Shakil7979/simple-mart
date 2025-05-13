<template>
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
        class="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
        @click="logout"
      >
        <span class="text-red-600 font-medium">Logout</span>
        <i class="fas fa-sign-out-alt text-red-500"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SettingComponent',
  data() {
    return {
      isDark: false
    };
  },
  methods: {
    goTo(page) {
      // You can define different pages or show a toast/modal for demo purposes
      alert(`Navigating to ${page} settings`);
    },
    toggleTheme() {
      this.isDark = !this.isDark;
      alert(`Switched to ${this.isDark ? 'Dark' : 'Light'} Mode`);
    },
    logout() {
      alert('You have been logged out.');
      // Add actual logout logic here
    }
  }
};
</script>

<style scoped>
/* Add any theme-based customization here */
</style>
