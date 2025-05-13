<template>
  <div class="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer">
    <router-link :to="`/product/${product.id}`" class="block">
      <!-- Show the first image from the images array -->
      <img :src="product.images[0]" class="w-full h-40 object-cover mb-4 rounded" />
      <h2 class="text-lg font-semibold">{{ product.name }}</h2>
      <p class="text-gray-500">${{ product.price }}</p>
    </router-link>

    <!-- Add to Cart button (outside router-link) -->
    <button
        @click.stop="$emit('add-to-cart', product)"
        class="cursor-pointer w-full mt-2 flex items-center justify-center gap-2 
                bg-gradient-to-r from-blue-500 to-indigo-600 
                text-white font-semibold py-2  rounded-xl 
                shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 
                active:scale-95 transition-all duration-300 ease-in-out"
        >
        <i class="fas fa-cart-plus text-sm"></i>
        Add
        </button>

  </div>
</template>

<script>
export default {
  props: {
    product: Object
  }
}
</script>
