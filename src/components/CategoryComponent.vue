<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Shop by Category</h1>

    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="category in categoryList"
        :key="category.name"
        class="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center hover:shadow-md transition cursor-pointer"
        @click="goToCategory(category.name)"
      >
        <img :src="category.icon" alt="Category Icon" class="w-16 h-16 mb-2 object-contain" />
        <span class="font-semibold text-gray-700">
          {{ category.name }} ({{ category.count }})
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import products from '@/assets/product-data.js';

export default {
  name: 'ProductsByCategory',
  data() {
    return {
      categoryList: []
    };
  },
  created() {
    this.generateCategoryList();
  },
  methods: {
    generateCategoryList() {
      const grouped = {};

      products.forEach((product) => {
        if (!grouped[product.category]) {
          grouped[product.category] = {
            name: product.category,
            count: 1,
            icon: this.getCategoryIcon(product.category)
          };
        } else {
          grouped[product.category].count++;
        }
      });

      this.categoryList = Object.values(grouped);
    },
    getCategoryIcon(category) {
      const product = products.find(p => p.category === category);
      return product ? product.images[0] : '';
    },
    goToCategory(name) {
    this.$router.push({
      path: '/category/product',
      query: { category: name }
    });
  }
  }
};
</script>
