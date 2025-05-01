import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserProfile from '../views/UserProfile.vue'
import About from '../views/About.vue'
import { useUserStore } from '../stores/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const userStore = useUserStore()
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (token && !userStore.userInfo.email) {
    // 如果有token但没有用户信息，尝试获取用户信息
    try {
      await userStore.getUserInfo()
      next()
    } catch (error) {
      // 如果获取用户信息失败，清除token并跳转到登录页
      userStore.clearToken()
      next('/login')
    }
  } else {
    next()
  }
})

export default router 