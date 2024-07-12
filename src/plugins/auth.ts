// plugins/auth.js
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { App } from 'vue'
import Cookies from 'js-cookie'

export default {
  install (app: App) {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL
    const authStore = useAuthStore()
    authStore.initialize()

    axios.interceptors.request.use(config => {
      const token = authStore.token || Cookies.get('jwt')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
    axios.interceptors.response.use(
      response => response,
      async error => {
        if (error.response && error.response.status === 401) {
          if (!error.config._retry) {
            error.config._retry = true
            try {
              await authStore.refreshToken()
              return axios(error.config)
            } catch (refreshError) {
              await authStore.logout()
              router.push('/login')
            }
          }
        }
        return Promise.reject(error)
      }
    )

    // Add global auth methods
    app.provide('auth', {
      login: (credentials: any) => useAuthStore().login(credentials),
      logout: () => useAuthStore().logout(),
      getUser: () => useAuthStore().getUser,
      isAuthenticated: () => useAuthStore().isAuthenticated,
    })
  },
}
