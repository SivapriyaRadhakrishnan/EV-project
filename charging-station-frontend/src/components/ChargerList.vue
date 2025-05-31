<template>
  <div class="glass-page container mt-4">
    <h2 class="text-center mb-4">Charging Stations</h2>

    <!-- table, buttons, form, everything else remains the same -->
    <table class="table table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Connector Type</th>
          <th>Power Output</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(station, index) in filteredStations" :key="station._id">
  <template v-if="station">
    <td v-if="editIndex !== index">{{ station.name }}</td>
    <td v-if="editIndex !== index">{{ station.status }}</td>
    <td v-if="editIndex !== index">{{ station.connectorType }}</td>
    <td v-if="editIndex !== index">{{ station.powerOutput }} kW</td>
    <td v-if="editIndex !== index">
      <button class="btn btn-warning btn-sm me-2" @click="editStation(index)">Edit</button>
      <button class="btn btn-danger btn-sm" @click="deleteStation(station._id)">Delete</button>
    </td>

    <!-- Edit Mode -->
    <template v-else>
      <td><input v-model="station.name" class="form-control" /></td>
      <td>
        <select v-model="station.status" class="form-select">
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </td>
      <td><input v-model="station.connectorType" class="form-control" /></td>
      <td><input v-model.number="station.powerOutput" class="form-control" /></td>
      <td>
        <button class="btn btn-success btn-sm me-2" @click="saveEdit(index, station)">Save</button>
        <button class="btn btn-secondary btn-sm" @click="cancelEdit">Cancel</button>
      </td>
    </template>
  </template>
</tr>

      </tbody>
    </table>

    <!-- Show Form Toggle Button -->
    <div class="text-center mb-4">
      <button class="btn btn-primary" @click="showAddForm = !showAddForm">
        {{ showAddForm ? 'Hide Add Station Form' : 'Add New Station' }}
      </button>
    </div>

    <!-- Add Station Form -->
    <form v-if="showAddForm" @submit.prevent="addStation" class="row g-2 mb-4 border p-3 rounded bg-light">
      <div class="col-md-4">
        <input v-model="form.name" class="form-control" placeholder="Name" required />
      </div>
      <div class="col-md-4">
        <input v-model.number="form.lat" class="form-control" placeholder="Latitude" required />
      </div>
      <div class="col-md-4">
        <input v-model.number="form.lng" class="form-control" placeholder="Longitude" required />
      </div>
      <div class="col-md-4">
        <input v-model.number="form.powerOutput" class="form-control" placeholder="Power Output (kW)" required />
      </div>
      <div class="col-md-4">
        <input v-model="form.connectorType" class="form-control" placeholder="Connector Type" required />
      </div>
      <div class="col-md-4">
        <select v-model="form.status" class="form-select" required>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <div class="col-12 text-center">
        <button type="submit" class="btn btn-success">Add Station</button>
      </div>
    </form>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios'
import { useToast } from 'vue-toastification'

export default {
  name: 'ChargerList',
  data() {
    return {
      stations: [],
      filteredStations: [],
      editIndex: null,
      showAddForm: false,
      error: '',
      form: {
        name: '',
        lat: '',
        lng: '',
        powerOutput: '',
        connectorType: '',
        status: 'Active'
      }
    }
  },
  created() {
    this.loadStations()
  },
  watch: {
    '$route'() {
      this.loadStations()
    }
  },
  methods: {
    async loadStations() {
      const token = localStorage.getItem('token')
      try {
        const res = await axios.get('https://ev-project-backend-17g4.onrender.com/api/stations', {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.stations = res.data.filter(s => s && s.name)
        this.filteredStations = [...this.stations]
      } catch (err) {
        this.error = 'Failed to fetch stations'
      }
    },
    async addStation() {
      const toast = useToast()
      const token = localStorage.getItem('token')
      try {
        const res = await axios.post('https://ev-project-backend-17g4.onrender.com/api/stations', {
          name: this.form.name,
          location: {
            lat: this.form.lat,
            lng: this.form.lng
          },
          status: this.form.status,
          powerOutput: this.form.powerOutput,
          connectorType: this.form.connectorType
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })

        this.stations.push(res.data)
        this.filteredStations = [...this.stations]
        this.showAddForm = false

        // Reset form
        this.form = {
          name: '',
          lat: '',
          lng: '',
          powerOutput: '',
          connectorType: '',
          status: 'Active'
        }

        toast.success('Charging Station added successfully!')
      } catch (err) {
        this.error = 'Failed to add station'
      }
    },
    async deleteStation(id) {
      const token = localStorage.getItem('token')
      try {
        await axios.delete(`https://ev-project-backend-17g4.onrender.com/api/stations/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.stations = this.stations.filter(s => s && s._id !== id)
        this.filteredStations = [...this.stations]
      } catch (err) {
        this.error = 'Failed to delete station'
      }
    },
    editStation(index) {
      this.editIndex = index
    },
    cancelEdit() {
      this.editIndex = null
      this.loadStations()
    },
    async saveEdit(index, station) {
      const token = localStorage.getItem('token')
      try {
        const res = await axios.put(`https://ev-project-backend-17g4.onrender.com/api/stations/${station._id}`, {
          name: station.name,
          location: {
            lat: station.location.lat,
            lng: station.location.lng
          },
          status: station.status,
          powerOutput: station.powerOutput,
          connectorType: station.connectorType
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })

        this.stations[index] = res.data
        this.filteredStations = [...this.stations]
        this.editIndex = null
      } catch (err) {
        this.error = 'Failed to update station'
      }
    }
  }
}
</script>

<style scoped>
.container {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
button {
  margin: 5px;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0;
}
.filters input,
.filters select {
  padding: 5px;
  min-width: 150px;
}
.error {
  color: red;
  margin: 10px 0;
}
.glass-page {
  background: rgba(255, 255, 255, 0.6); /* transparent white */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
</style>

