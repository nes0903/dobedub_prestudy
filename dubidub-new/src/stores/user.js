import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    username: '',
    role: null,
  }),
  actions: {
    login(username, role) {
      this.isLoggedIn = true
      this.username = username
      this.role = role
    },
    logout() {
      this.isLoggedIn = false
      this.username = ''
      this.role = null
    },
  },
}) 