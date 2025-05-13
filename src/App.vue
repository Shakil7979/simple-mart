<template>
  <div>
    <Navbar :cartCount="cart.length" @open-cart="showCart = true" />
    <router-view :cart="cart" @add-to-cart="addToCart" />
    <BottomNav />

    <!-- Cart Slide Panel --> 

    <CartPanel
      :show="showCart"
      :cartItems="cart"
      @close="showCart = false"
      @remove-item="removeCartItem"
    />
    <div class="gap_bottom mt-10"></div>
  </div>  
</template>

<script>
import Navbar from './components/NavbarComponent.vue'
import BottomNav from '@/components/BottomNav.vue'
import CartPanel from '@/components/CartPanel.vue'


export default {
  components: {
    Navbar,
    BottomNav,
    CartPanel
  },
  data() {
    return {
      cart: [],
      showCart: false
    };
  },
  methods: {
    addToCart(product) {
      this.cart.push(product);
    },
    removeCartItem(index) {
      this.cart.splice(index, 1);
    }
  },
  created() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  },
  watch: {
    cart: {
      handler(newCart) {
        localStorage.setItem('cart', JSON.stringify(newCart));
      },
      deep: true
    }
  }
};
</script> 
