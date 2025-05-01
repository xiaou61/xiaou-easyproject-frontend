<template>
  <el-menu mode="horizontal" :router="true" class="navbar">
    <div class="navbar-brand">
      <router-link to="/">CodeVerse</router-link>
    </div>
    
    <div class="navbar-end">
      <el-dropdown v-if="isLoggedIn" @command="handleCommand">
        <el-avatar :size="32" :src="userInfo.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      
      <template v-else>
        <el-button type="primary" @click="$router.push('/login')">登录</el-button>
        <el-button @click="$router.push('/register')">注册</el-button>
      </template>
    </div>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const isLoggedIn = computed(() => userStore.isLoggedIn)
const userInfo = computed(() => userStore.userInfo)

const handleCommand = async (command) => {
  if (command === 'profile') {
    router.push('/profile')
  } else if (command === 'logout') {
    try {
      await userStore.logout()
      ElMessage.success('退出登录成功')
      router.push('/login')
    } catch (error) {
      ElMessage.error('退出登录失败')
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #409EFF;
  text-decoration: none;
}

.navbar-end {
  display: flex;
  align-items: center;
  gap: 10px;
}

.el-dropdown {
  cursor: pointer;
}
</style> 