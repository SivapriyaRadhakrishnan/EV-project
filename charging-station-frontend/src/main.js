import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'leaflet/dist/leaflet.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(Toast)
app.mount('#app')
