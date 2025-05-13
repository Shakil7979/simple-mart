<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50 bootom-nav">
    <ul class="flex justify-around items-center  ">
      <li>
        <router-link to="/" class="nav-link py-3" exact-active-class="active">
          <i class="fas fa-home text-xl"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/order" class="nav-link py-3" active-class="active">
          <i class="fas fa-box text-xl"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/categories" class="nav-link py-3" active-class="active">
          <i class="fas fa-th-large text-xl"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/settings" class="nav-link py-3" active-class="active">
          <i class="fas fa-cog text-xl"></i>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'BottomNav'
}
</script>

<style scoped>
.nav-link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #6b7280; /* Gray color */
  transition: all 0.3s;
}

.nav-link {
  position: relative;
  display: inline-block;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #4b5563; /* default text color */
  transition: all 0.3s ease;
}

/* Hover with gradient text and border */
.nav-link:hover {
  background: linear-gradient(to right, #3b82f6, #9333ea); /* blue to purple */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-link:hover::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background: linear-gradient(to right, #3b82f6, #9333ea);
}

/* Active link */
.nav-link.active {
  background: linear-gradient(to right, #3b82f6, #9333ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-link.active::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background: linear-gradient(to right, #3b82f6, #9333ea);
}


.nav-link i {
  font-size: 1.5rem; /* Icon size */
}
</style>
