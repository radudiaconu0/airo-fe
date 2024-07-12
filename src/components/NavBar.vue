<script lang="ts" setup>
  import { Auth } from '@/auth'
  import router from '@/router'

  const $auth = inject('auth') as Auth
  const logout = async () => {
    await $auth.logout()
    await router.push('/login')
  }

</script>

<template>
  <v-app-bar app>
    <v-toolbar-title>My App</v-toolbar-title>
    <v-spacer />
    <v-btn text to="/">Home</v-btn>

    <v-btn v-if="$auth.getUser() != null" text to="/quotation">Add Quotation</v-btn>
    <v-btn v-if="$auth.getUser() != null" text to="/quotations">Quotations</v-btn>
    <v-btn v-if="$auth.getUser() != null" @click="logout">Logout</v-btn>
    <v-btn v-else text to="/login">Login</v-btn>
  </v-app-bar>
</template>
