<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg max-w-md w-full relative">
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
      >
        &times;
      </button>
      <h2 class="text-xl font-bold mb-4">Edit Profile</h2>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Email (readonly)</label>
          <input
            v-model="form.email"
            type="email"
            readonly
            class="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Phone</label>
          <input v-model="form.phone" type="text" class="w-full px-3 py-2 border rounded" />
        </div>

        <div>
          <label class="block mb-1 font-medium">Shipping Address</label>
          <textarea
            v-model="form.shippingAddress"
            class="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>

        <div>
          <label class="block mb-1 font-medium">Billing Address</label>
          <textarea
            v-model="form.billingAddress"
            class="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>

        <button
          type="submit"
          class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfileModal',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone || '',
        shippingAddress: this.user.shippingAddress || '',
        billingAddress: this.user.billingAddress || '',
      },
    };
  },
  methods: {
    submitForm() {
      this.$emit('update-user', { ...this.form });
    },
  },
};
</script>
