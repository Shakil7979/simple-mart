<template>
  <div>
    <div class="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl overflow-hidden">
      <!-- Cover Photo -->
      <div
        class="h-40 bg-cover bg-center"
        :style="{ backgroundImage: `url(${require('@/assets/images/cover.png')})` }"
      ></div>

      <!-- Profile Info -->
      <div class="p-6 -mt-12 flex items-end space-x-3">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User Avatar"
          class="w-24 h-24 rounded-full border-4 border-white shadow-lg"
        />
        <div>
          <h2 class="text-2xl font-semibold text-gray-800">{{ user.name }}</h2>
          <p class="text-gray-500">{{ user.email }}</p>
        </div>
      </div>

      <!-- User Details -->
      <div class="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div>
          <p class="text-sm font-medium">Phone Number</p>
          <p class="bg-gray-100 p-2 rounded-md">{{ user.phone }}</p>
        </div>
        <div>
          <p class="text-sm font-medium">Shipping Address</p>
          <p class="bg-gray-100 p-2 rounded-md">{{ user.shippingAddress }}</p>
        </div>
        <div v-if="user.billingAddress">
          <p class="text-sm font-medium">Billing Address</p>
          <p class="bg-gray-100 p-2 rounded-md">{{ user.billingAddress }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="px-6 pb-6 flex justify-between items-center">
        <button
          @click="showEditModal = true"
          class="cursor-pointer w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-300 ease-in-out"
        >
          Edit Profile
        </button>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <EditProfileModal
      v-if="showEditModal"
      :user="user"
      @close="showEditModal = false"
      @update-user="updateUser"
    />
  </div>
</template>

<script>
import EditProfileModal from '@/components/EditProfileModal.vue';

export default {
  name: "UserProfile",
  components: { EditProfileModal },
  data() {
    return {
      user: {
        name: "Guest User",
        email: "guest@example.com",
        phone: "+1234567890",
        shippingAddress: "123 Main Street, City, Country",
        billingAddress: "456 Billing Road, City, Country",
      },
      showEditModal: false,
    };
  },
  mounted() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        this.user = { ...this.user, ...parsedUser };
      } catch (error) {
        console.error("Invalid user data in localStorage", error);
      }
    }
  },
  methods: {
    updateUser(updatedUser) {
      this.user = { ...this.user, ...updatedUser };
      localStorage.setItem("user", JSON.stringify(this.user));
      this.showEditModal = false;
    }
  },
};
</script>
