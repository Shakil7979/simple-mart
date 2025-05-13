<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product" 
      @add-to-cart="addToCart"
    />
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  components: {
    ProductCard
  },
  methods: {
    addToCart(product) {
      this.$emit('add-to-cart', product);
    }
  }
}
</script>
