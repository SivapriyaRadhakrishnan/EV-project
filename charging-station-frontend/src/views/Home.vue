<template>
  <div class="glass-page container mt-4">
    <FilterPanel @apply-filters="filterStations" />

    <h4 class="text-center mt-4 mb-3">Available Charging Stations</h4>

    <div v-if="filtered.length">
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Connector Type</th>
            <th>Power Output (kW)</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="station in filtered" :key="station._id">
            <td>{{ station.name }}</td>
            <td>{{ station.status }}</td>
            <td>{{ station.connectorType }}</td>
            <td>{{ station.powerOutput }}</td>
            <td>{{ station.location.lat }}</td>
            <td>{{ station.location.lng }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-muted text-center mt-4">
      No stations found.
    </div>
  </div>
</template>


<script>
import FilterPanel from '../components/FilterPanel.vue'
import axios from 'axios'

export default {
  name: 'HomePage',
  components: { FilterPanel },
  data() {
    return {
      stations: [],
      filtered: [],
      error: ''
    }
  },
  async created() {
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get('https://ev-project-backend-17g4.onrender.com/api/stations', {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.stations = res.data.filter(s => s && s.name)
      this.filtered = [...this.stations]
    } catch (err) {
      this.error = 'Failed to load stations'
    }
  },
  methods: {
    filterStations(filters) {
      let result = this.stations

      if (filters.status) {
        result = result.filter(s => s.status === filters.status)
      }
      if (filters.connectorType) {
        result = result.filter(s =>
          s.connectorType.toLowerCase().includes(filters.connectorType.toLowerCase())
        )
      }
      if (filters.minPower !== '' && !isNaN(filters.minPower)) {
        result = result.filter(s => s.powerOutput >= filters.minPower)
      }
      if (filters.maxPower !== '' && !isNaN(filters.maxPower)) {
        result = result.filter(s => s.powerOutput <= filters.maxPower)
      }

      this.filtered = result
    }
  }
}
</script>

<style scoped>
.glass-page {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
</style>

