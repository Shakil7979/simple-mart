<template>
  <div class="fixed inset-0 bg-[#000000a8] bg-opacity-40 flex items-center justify-center z-[100000]">
    <div class="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden relative animate-fadeIn">
      <!-- Close Button -->
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-black text-xl">
        <i class="fas fa-times"></i>
      </button>

      <div class="p-8">
        <h2 class="text-2xl font-bold mb-1 text-center text-gray-800">
          {{ isRegister ? 'Create Account' : 'Login to Your Account' }}
        </h2>
        <p class="text-center text-sm text-gray-600 mb-6">
        To place an order, you need to <span class="font-semibold">log in</span>.
        </p>

        <!-- Form -->
        <div class="space-y-4">
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            v-if="isRegister"
            v-model="form.name"
            type="text"
            placeholder="Full Name"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Error -->
        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>

        <!-- Submit Button -->
        <button
          @click="handleAuth"
          class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
        >
          {{ isRegister ? 'Register' : 'Login' }}
        </button>

        <!-- Switch Mode -->
        <p class="text-center text-sm text-gray-600 mt-4">
          {{ isRegister ? 'Already have an account?' : "Don't have an account?" }}
          <span
            class="text-blue-600 cursor-pointer hover:underline ml-1"
            @click="toggleMode"
          >
            {{ isRegister ? 'Login' : 'Register' }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRegister: false,
      form: {
        name: '',
        email: '',
        password: ''
      },
      error: ''
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (user && isLoggedIn) {
      this.form.name = user.name;
      this.form.email = user.email;
    }
  },
  methods: {
    toggleMode() {
      this.isRegister = !this.isRegister;
      this.error = '';
    },
    handleAuth() {
      const { email, password, name } = this.form;

      if (!email || !password || (this.isRegister && !name)) {
        this.error = 'Please fill in all fields.';
        return;
      }

      if (this.isRegister) {
        const userId = Date.now();
        const newUser = { id: userId, name, email, password };
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('isLoggedIn', 'true');

        // ✅ Set name/email right away
        this.form.name = newUser.name;
        this.form.email = newUser.email;

        this.$emit('logged-in');
      } else {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email === email && user.password === password) {
          localStorage.setItem('isLoggedIn', 'true');

          // ✅ Set name/email right away
          this.form.name = user.name;
          this.form.email = user.email; 
          this.$emit('logged-in');
        } else {
          this.error = 'Invalid credentials.';
        }
      }
    }
  }
};
</script>


<style scoped>
@keyframes fadeIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.25s ease-in-out;
}
</style>
