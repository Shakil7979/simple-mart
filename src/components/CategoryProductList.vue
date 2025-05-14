<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">{{ category }} Products ({{ filteredProducts.length }})</h1>

    <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 gap-4">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white rounded-lg shadow p-4 text-center"
      >

        <router-link :to="`/product/${product.id}`" class="block">
            <img :src="product.images[0]" alt="Product" class="w-full h-32 object-contain mb-2" />
            <h2 class="font-semibold">{{ product.name }}</h2>
            <p class="text-sm text-gray-500">${{ product.price }}</p>
        </router-link>
 
        <!-- Add to Cart Button -->
        <button
          @click.stop="addToCart(product)"
          class="cursor-pointer w-full mt-2 flex items-center justify-center gap-2 
                  bg-gradient-to-r from-blue-500 to-indigo-600 
                  text-white font-semibold py-2 rounded-xl 
                  shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 
                  active:scale-95 transition-all duration-300 ease-in-out"
        >
          <i class="fas fa-cart-plus text-sm"></i>
          Add
        </button>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-10">
      No products found in this category.
    </div>
  </div>
</template>

<script>
import products from '@/assets/product-data.js';

export default {
  name: 'CategoryProductList',
  data() {
    return {
      category: this.$route.query.category || ''
    };
  },
  computed: {
    filteredProducts() {
      return products.filter(p => p.category === this.category);
    }
  },
  watch: {
    '$route.query.category'(newVal) {
      this.category = newVal;
    }
  },
    methods: {
    addToCart(product) {
        const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,  // Keep the whole images array
        quantity: 1
        };
        this.$emit('add-to-cart', cartItem);
    }
    }
};
</script>
