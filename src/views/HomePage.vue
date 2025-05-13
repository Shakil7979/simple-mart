<template>
  <div class="p-6 space-y-4">
    <!-- 🔥 Banner Slider -->
    <div class="overflow-x-auto whitespace-nowrap space-x-4 flex scroll-smooth">
      <div
        class="min-w-full sm:min-w-[80%] h-40 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-md"
      >
        70% Off on All T-Shirts!
      </div>
      <div
        class="min-w-full sm:min-w-[80%] h-40 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-md"
      >
        Buy 1 Get 1 Free - Shoes!
      </div>
    </div>

    <!-- 🛍️ Featured Products -->
    <section>
      <h2 class="text-xl font-semibold mb-1">Featured Products</h2>
      <p class="text-sm text-gray-500 mb-4">
        Explore top-rated items our customers love — handpicked just for you.
      </p>
      <ProductList :products="products" @add-to-cart="addToCart" />
    </section>

    <!-- 📢 Ad Banner -->
    <div class="rounded-xl bg-yellow-200 text-yellow-800 p-8 text-center shadow-xl">
      <h2 class="text-2xl font-extrabold mb-3">Mega Sale is Live!</h2>
      <p class="text-[16px] font-medium">
        Get exclusive discounts this week only. Don't miss out!
      </p>
      <div class="mt-4">
        <button class="bg-yellow-800 text-white py-2 px-4 rounded-full text-[16px] font-semibold hover:bg-yellow-700 transition duration-300">
          Shop Now
        </button>
      </div>
    </div>


    <!-- 🎯 Recommended Section -->
    <section>
      <h2 class="text-xl font-semibold mb-1">Recommended for You</h2>
      <p class="text-sm text-gray-500 mb-4">
        Curated picks based on what you might like.
      </p>

      <div
        v-if="recommendedProducts.length"
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      > 
        <div
          v-for="(item, index) in recommendedProducts"
          :key="index"
          class="bg-white rounded-lg shadow p-3"
        >
        
          <router-link :to="`/product/${item.id}`" class="block">
            <img
              :src="item.images?.[0]"
              class="w-full h-32 object-cover rounded mb-2"
            />
            <p class="font-semibold text-sm">{{ item.name }}</p>
            <p class="text-gray-500 text-sm">${{ item.price }}</p>
          </router-link>
        </div>
      </div>

      <p v-else class="text-sm text-gray-400 text-center">
        No recommendations available at the moment.
      </p>
    </section>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue'
import products from '@/assets/product-data.js'

export default {
  name: 'HomePage',
  components: {
    ProductList,
  },
  data() {
    return {
      products,
      recommendedProducts: [],
    }
  },
  mounted() {
    // Filter only new products for recommendations
    this.recommendedProducts = this.products.filter((p) => p.isNew)
  },
  methods: {
    addToCart(product) {
      this.$emit('add-to-cart', product)
    },
  },
}
</script>

<style scoped>
/* Smooth horizontal scroll & hide scrollbar */
::-webkit-scrollbar {
  display: none;
}
</style>
