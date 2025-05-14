<template>
  <div>
    <!-- Cart Panel -->
    <div v-if="show" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-end items-start z-[99999]">
      <div class="bg-white w-96 h-full p-6 transition-all" :class="{'translate-x-0': show, '-translate-x-full': !show}">
        <!-- Close Button -->
        <button @click="closePanel" class=" absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-800">
          <i class="fas fa-times"></i>
        </button>

        <h2 class="text-2xl font-semibold mb-4">Your Cart</h2>

        <div v-if="cartItems.length === 0" class="text-center">
          <p>Your cart is empty!</p>
        </div>

        <div v-else>
          <div v-for="(item, index) in cartItems" :key="index" class="flex items-center justify-between mb-4">
            <img :src="item.images[0]" class="w-16 h-16 object-cover rounded" />
            <div class="flex-1 ml-4">
              <p class="font-semibold">{{ item.name }}</p>
              <p class="text-gray-500">${{ item.price }}</p>
            </div>
            <button @click="removeItem(index)" class="text-red-500 hover:text-red-700 ml-2">
              <i class="fas fa-times-circle"></i>
            </button>
          </div>

          <div class="mt-4 border-t pt-4">
            <p class="font-semibold">Total: ${{ totalPrice }}</p>
            <button
              @click="handleCheckout"
              class="cursor-pointer w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-300 ease-in-out"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" @logged-in="onLoginSuccess" />
  </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue'; // Import your login modal component

export default {
  props: {
    show: Boolean,
    cartItems: Array
  },
  components: {
    LoginModal
  },
  data() {
    return {
      showLoginModal: false
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    }
  },
  methods: {
    closePanel() {
      this.$emit('close');
    },
    removeItem(index) {
      this.$emit('remove-item', index);
    },
    handleCheckout() {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn && isLoggedIn === 'true') {
        this.closePanel();
        this.$router.push('/checkout'); 
        window.location.href = '/checkout';
      } else {
        this.showLoginModal = true;
      }
    },
    onLoginSuccess() {
      this.showLoginModal = false;
      this.closePanel(); 
      window.location.href = '/checkout';
      this.$router.push('/checkout');
    }
  }

};
</script>
