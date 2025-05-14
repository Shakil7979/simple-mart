<!-- src/components/Navbar.vue -->
<template>
  <nav class="fixed top-0 left-0 z-[999] right-0 bg-white shadow-md p-4 flex justify-between items-center header-area">
    <h1 class="text-2xl font-bold text-gray-800"><a href="/"><img class="w-[80px]" :src="require('@/assets/images/logo-white.png')" alt="Logo"></a></h1>
    <button
      @click="$emit('open-cart')"
      class="relative text-gray-700 hover:text-blue-600 cursor-pointer"
    >
      <!-- Shopping Cart Icon -->
      <i class="fas fa-shopping-cart text-2xl"></i>

      <!-- Cart Count Badge -->
      <span
        v-if="cartCount > 0"
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
      >
        {{ cartCount }}
      </span>
    </button>
  </nav>
  <div class="mb-20"></div>
</template>

<script>
export default {
  props: {
    cartCount: {
      type: Number,
      default: 0
    }
  }
}
</script>
