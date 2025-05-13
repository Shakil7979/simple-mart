<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Your Order Summary</h1>

    <div v-if="orderItems.length" class="space-y-4">
      <div
        v-for="(item, index) in orderItems"
        :key="index"
        class="bg-white p-4 rounded-lg shadow flex items-center gap-4"
      >
        <img :src="item.image" class="w-20 h-20 object-cover rounded" />
        <div>
          <h2 class="font-semibold text-lg">{{ item.name }}</h2>
          <p class="text-gray-600">Price: ${{ item.price }}</p>
          <p class="text-gray-500 text-sm">Quantity: {{ item.quantity }}</p>
        </div>
      </div>

      <div class="text-right mt-6">
        <p class="text-lg font-semibold">Total: ${{ totalPrice }}</p>
      </div> 
    </div>

    <div v-else class="text-center text-gray-500">
      No items in your order.
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderComponent',
  data() {
    return {
      orderItems: [
        {
          name: 'T-shirt',
          price: 19.99,
          quantity: 2,
          image: require('@/assets/images/2.jpg'), 
        },
        {
          name: 'Shoes',
          price: 49.99,
          quantity: 1,
          image: require('@/assets/images/1.jpg'), 
        },
      ],
    };
  },
  computed: {
    totalPrice() {
      return this.orderItems
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2);
    },
  },
};
</script>
