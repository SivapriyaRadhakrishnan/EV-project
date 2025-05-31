<template>
  <div class="card p-3 mt-3">
    <h5>Filter Chargers</h5>
    <div class="row g-2">
      <div class="col-md-4">
        <select v-model="filters.status" class="form-select">
          <option value="">All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <div class="col-md-4">
        <input v-model="filters.connectorType" class="form-control" placeholder="Connector Type" />
      </div>
      <div class="col-md-2">
        <input v-model.number="filters.minPower" class="form-control" placeholder="Min Power" />
      </div>
      <div class="col-md-2">
        <input v-model.number="filters.maxPower" class="form-control" placeholder="Max Power" />
      </div>
    </div>
    <div class="mt-3 text-end">
      <button class="btn btn-primary me-2" @click="$emit('apply-filters', filters)">Apply</button>
      <button class="btn btn-secondary" @click="resetFilters">Clear</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterPanel',
  data() {
    return {
      filters: {
        status: '',
        connectorType: '',
        minPower: '',
        maxPower: ''
      }
    }
  },
  methods: {
    resetFilters() {
      this.filters = {
        status: '',
        connectorType: '',
        minPower: '',
        maxPower: ''
      }
      this.$emit('apply-filters', this.filters)
    }
  }
}
</script>
