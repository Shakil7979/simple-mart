// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'

import ProductDetails from '../components/ProductDetails.vue' 
import OrderComponent from '../components/OrderComponent.vue'
import CategoryComponent from '../components/CategoryComponent.vue';
import SettingComponent from '../components/SettingComponent.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails, 
  },
  {
    path: '/order',
    name: 'Order',
    component: OrderComponent,
    props: route => ({ cartItems: route.params.cartItems })
  },
  {
    path: '/categories',
    name: 'Categories',
    component: CategoryComponent,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingComponent
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
