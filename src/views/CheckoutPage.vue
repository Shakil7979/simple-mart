<template>
  <div class="max-w-4xl mx-auto p-6"> 

    <h1 class="text-2xl font-bold mb-6">Checkout</h1>

    <form @submit.prevent="placeOrder" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block font-medium mb-1">Full Name</label>
        <input v-model="form.name" type="text" required class="w-full border px-3 py-2 rounded" />
      </div>

      <div>
        <label class="block font-medium mb-1">Email</label>
        <input v-model="form.email" type="email" required class="w-full border px-3 py-2 rounded" />
      </div>

      <div class="md:col-span-2">
        <label class="block font-medium mb-1">Address</label>
        <textarea v-model="form.address" required class="w-full border px-3 py-2 rounded"></textarea>
      </div>

      <!-- Order Summary -->
      <div class="md:col-span-2 mt-6">
        <h2 class="text-xl font-semibold mb-2">Order Summary</h2>
        <ul>
          <li
            v-for="(item, index) in cartItems"
            :key="index"
            class="flex justify-between border-b py-2"
          >
            <span>{{ item.name }} (x{{ item.quantity }})</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </li>
        </ul>
        <p class="font-semibold text-right mt-2">Total: ${{ total }}</p>
      </div>

      <div class="md:col-span-2 mt-6">
        <button
          type="submit"
          class="cursor-pointer w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-300 ease-in-out"
        >
          Place Order
        </button>
      </div>
    </form>

    <div v-if="orderPlaced" class="mt-6 text-green-600 font-semibold">
      ✅ Your order has been placed successfully!
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore.js'; // Import the auth store

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        address: ''
      },
      orderPlaced: false,
      cartItems: [],
      userName: '', // Variable to store the user's name
    };
  },
  computed: {
    total() {
      return this.cartItems.reduce((sum, item) => {
        const quantity = item.quantity || 1;
        return sum + item.price * quantity;
      }, 0).toFixed(2);
    }
  },
  mounted() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Ensure each item has a quantity
        this.cartItems = parsed.map(item => ({
          ...item,
          quantity: item.quantity || 1
        }));
      } catch (e) {
        console.error('Failed to parse cart data:', e);
        this.cartItems = [];
      }
    }

    // Load user info from auth store if user is logged in
    const authStore = useAuthStore();
    if (authStore.isAuthenticated && authStore.user) {
      this.userName = authStore.user.name;  // Store the user's name for display
      this.form.name = authStore.user.name;  // Populate name field
      this.form.email = authStore.user.email;  // Populate email field
    }
  },
  methods: {
    placeOrder() {
      console.log('Order Info:', this.form);
      console.log('Cart Items:', this.cartItems);

      // Save order info to localStorage
      const orderData = {
        customer: this.form,
        items: this.cartItems,
        total: this.total,
        placedAt: new Date().toISOString()
      };

      // Retrieve all previous orders from localStorage
      let allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];

      // Add the new order to the list of all orders
      allOrders.push(orderData);

      // Save all orders back to localStorage
      localStorage.setItem('allOrders', JSON.stringify(allOrders));

      // Clear cart
      localStorage.removeItem('cart');
      this.cartItems = [];

      // Show success modal
      this.orderPlaced = true;
      setTimeout(() => {
        this.$router.push('/order');
      }, 2000);
    }
  }
};
</script>
