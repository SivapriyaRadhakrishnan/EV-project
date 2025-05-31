<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <span class="navbar-brand">EV Charger App</span>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/home">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/map">View Map</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/chargers">Charging Stations</router-link>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-light btn-sm ms-3" @click="logout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>
