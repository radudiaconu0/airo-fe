// stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'
import Cookies from 'js-cookie'

interface Credentials {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null as string | null,
    isInitialized: false,
  }),
  getters: {
    isAuthenticated: state => !!Cookies.get('jwt') && !!state.user,
    getUser: state => state.user,
  },
  actions: {
    async initialize () {
      this.token = Cookies.get('jwt') || null
      if (this.isInitialized) return

      axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
      try {
        await this.fetchUser()
      } catch (error) {
        console.error('Failed to initialize auth state:', error)
      } finally {
        this.isInitialized = true
      }
    },
    async login (credentials: Credentials) {
      try {
        const response = await axios.post('/api/auth/login', credentials)
        const token = response.data.access_token
        Cookies.set('jwt', token)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        this.token = token
        this.fetchUser()
        console.log('Token:', response.data)
        return Promise.resolve(token)
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async logout () {
      try {
        await axios.post('/api/auth/logout')
        this.user = null
        this.token = null
        Cookies.remove('jwt')
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async fetchUser () {
      try {
        const response = await axios.post('/api/auth/me')
        this.user = response.data
        return Promise.resolve(response.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async refreshToken () {
      try {
        await axios.post('/api/auth/refresh')
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
  },
})
