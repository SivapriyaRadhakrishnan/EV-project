<template>
  <div :class="bodyClass">
    <AppNavbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    AppNavbar
  },
  computed: {
    showNavbar() {
      const publicPages = ['/login', '/register']
      return !publicPages.includes(this.$route.path)
    },
    bodyClass() {
      return {
        'with-bg': this.$route.path !== '/map'
      }
    }
  }
}
</script>

<style>
.with-bg {
  background-image: url('C:\Users\siva\OneDrive\Desktop\ev-project\charging-station-frontend\src\assets\logoev2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
}
</style>
