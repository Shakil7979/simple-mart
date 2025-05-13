<template>
  <div class="p-6 space-y-8" v-if="product">
    <!-- Product Image and Title -->
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Image Slider -->
      <div class="w-full lg:w-1/2">
        <div class="relative">
          <!-- Full-size Image Display -->
          <div class="mt-4">
            <img
              :src="selectedImage"
              class="w-full h-80 object-cover rounded-lg"
              alt="Selected Product Image"
            />
          </div>
          <div class="flex mt-3 space-x-4 overflow-x-auto scrollbar-hide">
            <img
              v-for="(image, index) in product.images"
              :key="index"
              :src="image"
              class="w-1/2 h-[80px] object-cover border border-[#ddd] rounded-lg cursor-pointer"
              alt="Product Image"
              @click="selectedImage = image"
            />
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div class="flex flex-col justify-center">
        <h1 class="text-3xl font-semibold">{{ product.name }}</h1>
        <p class="text-xl text-gray-700">${{ product.price }}</p>
        <p class="mt-4 text-gray-500">{{ product.description }}</p>

        <!-- Add to Cart Button -->
        <button
          @click="addToCart"
          class="cursor-pointer mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <!-- Product Specifications (Optional) -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold">Specifications</h2>
      <ul class="list-disc ml-6 mt-2 text-gray-600">
        <li v-for="(value, key) in product.specifications" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </li>
      </ul>
    </div>
  </div>

  <!-- If product not found, show a message -->
  <div v-else class="text-center text-red-500">
    Product not found.
  </div>
</template>

<script>
import products from '@/assets/product-data.js'; // Assuming you have product data here

export default {
  data() {
    return {
      product: null, // Start with null to handle product not found
      selectedImage: '', // Track the selected image
    };
  },
  mounted() {
    const productId = this.$route.params.id;
    this.product = products.find(p => p.id === parseInt(productId));

    // If product is found, set the default image
    if (this.product) {
      this.selectedImage = this.product.images ? this.product.images[0] : ''; // Set the first image if exists
    }
  },
  methods: {
    addToCart() {
      // Emit or handle add to cart logic
      this.$emit('add-to-cart', this.product);
    }
  }
};
</script>

<style scoped>
/* Custom styles for hiding the scrollbar */
.scrollbar-hide {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}
</style>
