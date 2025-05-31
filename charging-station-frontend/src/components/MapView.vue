<template>
  <div>
    <button @click="goBack" class="btn btn-secondary mt-3 ms-3">← Back to Chargers</button>
    <div id="map" style="height: 1000px;" class="mt-3 mx-3"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import axios from 'axios'

export default {
  name: 'MapView',
  methods: {
    goBack() {
      this.$router.push('/chargers')
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get('https://ev-project-backend-17g4.onrender.com/api/stations', {
        headers: { Authorization: `Bearer ${token}` }
      })

      const stations = res.data

      const map = L.map('map').setView([20.5937, 78.9629], 5) // India

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map)

      stations.forEach(station => {
        const { lat, lng } = station.location
        const marker = L.marker([lat, lng]).addTo(map)

        marker.bindPopup(`
          <strong>${station.name}</strong><br/>
          ${station.status}<br/>
          ${station.connectorType}<br/>
          ${station.powerOutput} kW
        `)
      })
    } catch (err) {
      alert("Failed to load stations on the map.")
    }
  }
}
</script>


