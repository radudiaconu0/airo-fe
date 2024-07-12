<script lang="ts" setup>
  import axios from 'axios'
  interface Quotation {
    quotation_id: number
    currency_id: string
    total: number
  }

  definePage({
    alias: ['/quotation'],
    meta: {
      requiresAuth: true,
    },
  })

  const formData = ref({
    age: '',
    currency_id: '',
    start_date: '',
    end_date: '',
  })
  const errors = ref({
    age: [] as string[],
    currency_id: [] as string[],
    start_date: [] as string[],
    end_date: [] as string[],
  })

  const quotation = ref<Quotation>()
  const toIsoDate = (date: string) => {
    if (!date) return ''
    return new Date(date).toISOString().split('T')[0]
  }

  const currencies = ref([
    { title: 'USD', value: 'USD' },
    { title: 'EUR', value: 'EUR' },
    { title: 'GBP', value: 'GBP' },
  ])
  const addQuotation = async () => {
    try {
      const response = await axios.post('/api/quotation', {
        age: formData.value.age,
        currency_id: formData.value.currency_id,
        start_date: toIsoDate(formData.value.start_date),
        end_date: toIsoDate(formData.value.end_date),
      })
      quotation.value = response.data
    } catch (error: any) {
      errors.value = error.response.data.errors
      console.error(error.response.data)
    }
  }
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card>
          <v-card-title>
            <span class="headline">Quotation</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="addQuotation">
              <v-text-field
                v-model="formData.age"
                :error-messages="errors.age"
                label="Age (separated by ,)"
                required
              />
              <v-select
                v-model="formData.currency_id"
                :error-messages="errors.currency_id"
                :items="currencies"
                label="Currency"
                required
              />
              <v-text-field
                v-model="formData.start_date"
                :error-messages="errors.start_date"
                label="Start Date"
                required
                type="date"
              />
              <v-text-field
                v-model="formData.end_date"
                :error-messages="errors.end_date"
                label="End Date"
                required
                type="date"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" type="submit" @click="addQuotation">Add</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-if="quotation">
          <v-card-title>
            <span class="headline">Result</span>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Quotation ID</v-list-item-title>
                <v-list-item-subtitle>{{ quotation.quotation_id }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Currency</v-list-item-title>
                <v-list-item-subtitle>{{ quotation.currency_id }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Start Date</v-list-item-title>
                <v-list-item-subtitle>{{ quotation.total }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
