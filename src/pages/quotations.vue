<script lang="ts" setup>
  import axios from 'axios'

  interface Quotation {
    id: number
    age: number
    currency_id: string
    total_price: number
    start_date: string
    end_date: string
  }

  definePage({
    alias: ['/quotations'],
    meta: {
      requiresAuth: true,
    },
  })

  const quotations = ref<Array<Quotation>>([])
  const headers = [
    { title: 'ID', value: 'id' },
    { title: 'Age', value: 'age' },
    { title: 'Currency', value: 'currency_id' },
    { title: 'Start Date', value: 'start_date' },
    { title: 'End Date', value: 'end_date' },
    { title: 'Total Price', value: 'total_price' },
    { title: 'Created At', value: 'created_at' },
    { title: 'Updated At', value: 'updated_at' },
  ]
  const getQuoations = async ({ page, itemsPerPage, sortBy }: { page: number, itemsPerPage: number, sortBy: string[] }) => {
    try {
      loading.value = true
      const response = await axios.get('/api/quotations', {
        params: {
          page,
          limit: itemsPerPage,
          sortBy,
        },
      })
      return (quotations.value = response.data.data)
    } catch (error: any) {
      alert(error.response.data.message)
    } finally {
      loading.value = false
    }
  }

  const loading = ref(false)
  const toIsoDate = (date: string) => {
    if (!date) return ''
    return new Date(date).toISOString().split('T')[0]
  }
  onMounted(() => {
    getQuoations({ page: 1, itemsPerPage: 5, sortBy: [] })
  })
</script>

<template>
  <v-container>
    <v-row>
      <v-col md="8" offset-md="3">
        <v-data-table
          class="elevation-1"
          :headers="headers"
          :items="quotations"
          :items-per-page="5"
          @update:options="getQuoations"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>Quotations</v-toolbar-title>
              <v-spacer />
              <v-btn color="primary" to="/quotation">Add Quotation</v-btn>
            </v-toolbar>
          </template>
          <template #item.start_date="{ item }">
            {{ toIsoDate(item.start_date) }}
          </template>
          <template #item.end_date="{ item }">
            {{ toIsoDate(item.end_date) }}
          </template>
          <template #item.created_at="{ item }">
            {{ toIsoDate(item.created_at) }}
          </template>
          <template #item.updated_at="{ item }">
            {{ toIsoDate(item.updated_at) }}
          </template>
        </v-data-table>

      </v-col>
    </v-row>
  </v-container>
</template>
