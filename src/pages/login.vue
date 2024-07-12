<script setup lang="ts">
  import { Auth } from '@/auth'
  import { ref } from 'vue'

  const $auth = inject('auth') as Auth

  const formData = ref({
    email: '',
    password: '',
  })

  const errors = ref({
    email: [],
    password: [],
  })
  const loading = ref(false)
  const router = useRouter()
  const login = async () => {
    loading.value = true
    try {
      errors.value = {
        email: [],
        password: [],
      }
      await $auth.login(formData.value)
      await router.push('/')
    } catch (error: any) {
      errors.value = error.response.data.errors
      console.log(error)
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
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
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
              <v-spacer />
              <v-btn color="primary" :loading="loading" type="submit">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
