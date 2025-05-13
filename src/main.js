// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/output.css' // Tailwind compiled CSS

createApp(App).use(router).mount('#app')
