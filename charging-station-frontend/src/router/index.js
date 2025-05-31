import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import ChargerList from '../components/ChargerList.vue'
import MapView from '../components/MapView.vue'
import Home from '../views/Home.vue' // ✅ New Home page route

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home },           // ✅ Home route added
  { path: '/chargers', component: ChargerList },
  { path: '/map', component: MapView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
