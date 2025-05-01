import { defineStore } from 'pinia'
import { getUserInfo, logout } from '../api/user'

const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    userInfo: {
      email: '',
      nickname: '',
      avatar: ''
    }
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    setToken(token) {
      this.token = token
    },

    clearToken() {
      this.token = null
    },

    async getUserInfo() {
      try {
        const res = await getUserInfo()
        if (res.code === 200) {
          Object.assign(this.userInfo, res.data)
          this.token = 'valid'
          return res.data
        } else {
          throw new Error(res.msg || '获取用户信息失败')
        }
      } catch (error) {
        this.clearToken()
        throw error
      }
    },

    async logout() {
      try {
        await logout()
        this.clearToken()
        Object.assign(this.userInfo, {
          email: '',
          nickname: '',
          avatar: ''
        })
      } catch (error) {
        // 即使后端登出失败，也清除本地状态
        this.clearToken()
        Object.assign(this.userInfo, {
          email: '',
          nickname: '',
          avatar: ''
        })
        throw error
      }
    }
  }
})

export { useUserStore } 