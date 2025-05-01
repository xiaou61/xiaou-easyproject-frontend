<template>
  <div class="home-container">
    <Navbar />
    <div class="home-content">
      <h1>CodeVerse - 探索代码的无限宇宙</h1>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'
import Navbar from '../components/Navbar.vue'

const router = useRouter()
const userStore = useUserStore()

// 组件挂载时获取用户信息
onMounted(async () => {
  if (userStore.isLoggedIn && !userStore.userInfo.email) {
    try {
      await userStore.getUserInfo()
    } catch (error) {
      ElMessage.error('获取用户信息失败')
      userStore.clearToken()
      router.push('/login')
    }
  }
})
</script>

<style scoped>
.home-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: white;
  color: #333;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.home-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

h1 {
  font-size: 48px;
  margin: 0;
  line-height: 1.2;
  text-align: center;
  color: #333;
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 36px;
  }
}
</style> 