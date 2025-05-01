<script setup>
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user'
import Navbar from './components/Navbar.vue'

const router = useRouter()
const userStore = useUserStore()

// 检查用户登录状态
const checkLoginStatus = async () => {
  try {
    // 尝试获取用户信息，如果成功则说明已登录
    await userStore.getUserInfo()
  } catch (error) {
    // 获取用户信息失败，说明未登录
    userStore.clearToken()
    if (router.currentRoute.value.meta.requiresAuth) {
      router.push('/login')
    }
  }
}

// 监听路由变化
watch(() => router.currentRoute.value, () => {
  checkLoginStatus()
}, { immediate: true })

onMounted(() => {
  // 应用启动时检查登录状态
  checkLoginStatus()
})
</script>

<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
