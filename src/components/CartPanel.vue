<template>
  <div v-if="show" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-end items-start z-50">
    <div class="bg-white w-96 h-full p-6 transform transition-all duration-300" :class="{'translate-x-0': show, '-translate-x-full': !show}">
      <button @click="closePanel" class="cursor-pointer text-xl text-gray-500 hover:text-gray-800 absolute top-4 right-4">
        <i class="fas fa-times"></i>
      </button>
      <h2 class="text-2xl font-semibold mb-4">Your Cart</h2>

      <div class="text-center" v-if="cartItems.length === 0">
        <p>Your cart is empty!</p>
      </div>

      <div v-else>
        <div v-for="(item, index) in cartItems" :key="index" class="flex items-center justify-between mb-4 relative">
          <img :src="item.images[0]" alt="product image" class="w-16 h-16 object-cover rounded">
          <div class="flex-1 ml-4">
            <p class="font-semibold">{{ item.name }}</p>
            <p class="text-gray-500">${{ item.price }}</p>
          </div>
          <button @click="removeItem(index)" class="cursor-pointer text-red-500 hover:text-red-700 text-lg ml-2">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>

        <div class="mt-4 border-t pt-4">
          <p class="font-semibold">Total: ${{ totalPrice }}</p>
          <button class="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded mt-4 w-full">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    cartItems: Array
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    }
  },
  data() {
    return {
      cart: [],
      showCart: false
    };
  },
methods: {
  closePanel() {
    this.$emit('close');
  },
  removeItem(index) {
    this.$emit('remove-item', index);
  }
}
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
