<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-sm mx-auto" style="max-width: 400px;">
      <h2 class="mb-4 text-center">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <input v-model="name" type="text" class="form-control" placeholder="Name" required />
        </div>
        <div class="mb-3">
          <input v-model="email" type="email" class="form-control" placeholder="Email" required />
        </div>
        <div class="mb-3">
          <input v-model="password" type="password" class="form-control" placeholder="Password" required />
        </div>
        <button type="submit" class="btn btn-success w-100">Register</button>

        <p v-if="error" class="text-danger mt-3">{{ error }}</p>
        <p v-if="success" class="text-success mt-3">{{ success }}</p>

        <p class="mt-4 text-center">
          Already have an account? <router-link to="/login">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: '',
      success: ''
    }
  },
  methods: {
    async register() {
      this.error = ''
      this.success = ''
      try {
        // Step 1: Register the user
        await axios.post('http://localhost:5000/api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password
        })

        // Step 2: Automatically log in
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email,
          password: this.password
        })

        // Step 3: Store token and redirect
        localStorage.setItem('token', loginRes.data.token)
        this.$router.push('/chargers')

      } catch (err) {
        this.error = err.response?.data?.message || "Registration failed"
      }
    }
  }
}
</script>
