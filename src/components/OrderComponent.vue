<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-2">Your Order Summary</h1>

    <!-- Displaying user name if logged in -->
    <p v-if="customerName" class="text-gray-700 mb-6"> 
       Thank you <span class="font-semibold">{{ customerName }}</span> for placing your order! 🎉 We truly appreciate your trust in us. We’ll do our best to deliver your product within 3 days. Stay tuned!
    </p> 


    <!-- Show all the orders for this user -->
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
        <div class="text-end w-[46%]">
          <span class="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
          Processing
        </span>
        </div>
      </div>

      <div class="text-right mt-6">
        <p class="text-lg font-semibold">Total: ${{ totalPrice }}</p>
      </div>
    </div>

    <!-- No orders message -->
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
      orderItems: [],
      customerName: '', // To store the logged-in user's name
    };
  },
  computed: {
    totalPrice() {
      return this.orderItems
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2);
    },
  },
  mounted() {
    this.loadUserOrders();
  },
  methods: {
    loadUserOrders() {
      // Retrieve the user info from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      let allOrders = JSON.parse(localStorage.getItem('allOrders'));

      // Debugging: Check if user is found
      console.log('👤 User Data:', user);
      console.log('📦 All Orders:', allOrders);

      // If no user is logged in, skip order loading
      if (!user || !user.email) {
        console.warn('❌ No user info found or user is logged out');
        this.customerName = ''; // Clear customer name
        this.orderItems = []; // No orders to show
        return;
      }

      // If lastOrders is not an array, convert it to an array
      if (!Array.isArray(allOrders)) {
        allOrders = [allOrders]; // Wrap the object in an array if it's not already an array
        console.warn('❗ lastOrders was not an array, converting to array.');
      }

      // Filter orders for the current user
      const userOrders = allOrders.filter(order => order?.customer?.email === user.email);

      // Debugging: Log filtered user orders
      console.log('✅ Filtered User Orders:', userOrders);

      // If orders are found for the user, set the name and items
      if (userOrders.length > 0) {
        this.customerName = userOrders[0].customer.name; // Display user name

        // Flatten order items from all user orders
        this.orderItems = userOrders.flatMap(order => {
          console.log('🛒 Order Items:', order.items); // Debugging order items for each order
          return order.items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.images[0] || '', // Use first image if available
          }));
        });

        console.log('📋 Final Order Items:', this.orderItems); // Final order items to display
      } else {
        console.warn('❗ No orders found for the user!');
        this.customerName = ''; // Clear customer name if no orders are found
        this.orderItems = []; // No items to display
      }
    },
  },
};
</script>
