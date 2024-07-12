<script setup lang="ts">
  import { Auth } from '@/auth'
  import axios from 'axios'

  const formData = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const errors = ref({
    name: [],
    email: [],
    password: [],
    password_confirmation: [],
  })

  const loading = ref(false)
  const $auth = inject('auth') as Auth

  const register = async () => {
    loading.value = true
    try {
      errors.value = {
        name: [],
        email: [],
        password: [],
        password_confirmation: [],
      }
      await axios.post('/api/auth/register', formData.value)
      const credentials = {
        email: formData.value.email,
        password: formData.value.password,
      }
      await $auth.login(credentials)
    } catch (error: any) {
      errors.value = error.response.data.errors
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card>
          <v-card-title>
            <span class="headline">Register</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                v-model="formData.name"
                :error-messages="errors.name"
                label="Name"
                required
              />
              <v-text-field
                v-model="formData.email"
                :error-messages="errors.email"
                label="Email"
                required
              />
              <v-text-field
                v-model="formData.password"
                :error-messages="errors.password"
                label="Password"
                required
                type="password"
              />
              <v-text-field
                v-model="formData.password_confirmation"
                label="Confirm Password"
                required
                type="password"
              />
              <v-spacer />
              <v-btn color="primary" :loading="loading" type="submit">Register</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
