<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-sm mx-auto" style="max-width: 400px;">
      <h2 class="mb-4 text-center">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <input v-model="email" type="email" class="form-control" placeholder="Email" required />
        </div>
        <div class="mb-3">
          <input v-model="password" type="password" class="form-control" placeholder="Password" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
        <p v-if="error" class="text-danger mt-2">{{ error }}</p>
        <p class="mt-3 text-center">Don't have an account? <router-link to="/register">Register</router-link></p>
      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'LoginPage',  // 
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email,
          password: this.password
        })

        localStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      } catch (err) {
        this.error = err.response.data.message || 'Login failed'
      }
    }
  }
}
</script>
