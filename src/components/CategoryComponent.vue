<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Shop by Category</h1>
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="category in categories"
        :key="category.id"
        class="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center hover:shadow-md transition cursor-pointer"
        @click="goToCategory(category.name)"
      >
        <img :src="category.icon" alt="Category Icon" class="w-16 h-16 mb-2 object-contain" />
        <span class="font-semibold text-gray-700">{{ category.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryComponent',
  data() {
    return {
      categories: [
        {
          id: 1,
          name: 'T-Shirts',
          icon: require('@/assets/images/1.jpg'),
        },
        {
          id: 2,
          name: 'Shoes',
          icon: require('@/assets/images/2.jpg'),
        },
        {
          id: 3,
          name: 'Backpacks',
          icon: require('@/assets/images/3.jpg'),
        },
        {
          id: 4,
          name: 'Watches',
          icon: require('@/assets/images/4.jpg'),
        }
      ]
    };
  },
  methods: {
    goToCategory(name) {
      // Navigate to a category route with query parameter
      this.$router.push({ path: '/products', query: { category: name } });
    }
  }
};
</script>

<style scoped>
/* Optional custom styling */
</style>
