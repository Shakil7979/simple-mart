// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import { useThemeStore } from './stores/themeStore';

const app = createApp(App) 



import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/output.css' // Tailwind compiled CSS
app.use(createPinia());
const themeStore = useThemeStore();
themeStore.initializeTheme();
createApp(App).use(router).mount('#app')
