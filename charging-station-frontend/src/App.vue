<template>
  <div :class="bodyClass" :style="bgStyle">
    <AppNavbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue'
import bgImage from '@/assets/logoev2.jpg' // 

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
    },
    bgStyle() {
      return this.$route.path !== '/map'
        ? {
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            minHeight: '100vh'
          }
        : {}
    }
  }
}
</script>






