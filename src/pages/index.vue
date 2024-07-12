<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card>
          <v-card-title>
            <span class="headline">Welcome</span>
          </v-card-title>
          <v-card-text v-if="!$auth.isAuthenticated()">Please register and login to be able to add a quotation</v-card-text>
          <v-card-text v-else>You are logged in. You can now add a quotation</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container></template>

<script lang="ts" setup>
  import { Auth } from '@/auth'

  const $auth = inject('auth') as Auth
</script>
