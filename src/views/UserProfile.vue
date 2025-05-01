<template>
  <div class="profile-container">
    <Navbar />
    <div class="profile-content">
      <div class="profile-card">
        <el-avatar :size="120" :src="userInfo.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
        <h2>{{ userInfo.nickname || '未设置昵称' }}</h2>
        <div class="info-list">
          <div class="info-item">
            <span class="label">邮箱：</span>
            <span class="value">{{ userInfo.email }}</span>
          </div>
          <div class="info-item">
            <span class="label">用户ID：</span>
            <span class="value">{{ userInfo.id }}</span>
          </div>
          <div class="info-item">
            <span class="label">注册时间：</span>
            <span class="value">{{ formatDate(userInfo.createdAt) }}</span>
          </div>
          <div class="info-item">
            <span class="label">最后登录：</span>
            <span class="value">{{ formatDate(userInfo.lastLoginTime) }}</span>
          </div>
        </div>
        <div class="sign-section">
          <el-button 
            type="primary" 
            :disabled="isSignedToday" 
            @click="handleSign"
            :class="{ 'signed': isSignedToday }"
          >
            {{ isSignedToday ? '今日已签到' : '每日签到' }}
          </el-button>
          <div class="sign-tip" v-if="isSignedToday">已获得 200 积分</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'
import request from '../utils/request'
import Navbar from '../components/Navbar.vue'

const userStore = useUserStore()
const isSignedToday = ref(false)

const userInfo = computed(() => userStore.userInfo)

const formatDate = (date) => {
  if (!date) return '未知'
  return new Date(date).toLocaleString()
}

const handleSign = async () => {
  try {
    const response = await request.post('/user/sign')
    if (response.code === 200) {
      ElMessage.success(response.msg)
      isSignedToday.value = true
    } else {
      ElMessage.warning(response.msg)
      isSignedToday.value = true
    }
  } catch (error) {
    ElMessage.error('签到失败，请稍后重试')
  }
}

// 组件挂载时获取用户信息
onMounted(async () => {
  try {
    const response = await request.get('/user/me')
    if (response.code === 200) {
      userStore.userInfo = response.data
    } else {
      throw new Error(response.msg || '获取用户信息失败')
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    ElMessage.error('获取用户信息失败')
  }
})
</script>

<style scoped>
.profile-container {
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

.profile-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-card h2 {
  margin: 20px 0;
  font-size: 24px;
  color: #333;
}

.info-list {
  text-align: left;
  margin-top: 20px;
}

.info-item {
  margin: 15px 0;
  display: flex;
  align-items: center;
}

.label {
  width: 100px;
  color: #666;
}

.value {
  flex: 1;
  color: #333;
}

@media screen and (max-width: 768px) {
  .profile-card {
    padding: 20px;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .label {
    width: auto;
    margin-bottom: 5px;
  }
}

.sign-section {
  margin-top: 30px;
  text-align: center;
}

.sign-section .el-button {
  width: 120px;
  height: 40px;
  font-size: 16px;
}

.sign-section .el-button.signed {
  background-color: #67c23a;
  border-color: #67c23a;
}

.sign-tip {
  margin-top: 10px;
  color: #67c23a;
  font-size: 14px;
}
</style> 