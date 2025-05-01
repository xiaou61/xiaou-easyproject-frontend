<template>
  <div class="home-container">
    <div class="home-wrapper">
      <div class="home-left">
        <div class="user-info">
          <el-avatar :size="32" :src="userInfo.avatar || defaultAvatar" />
          <span class="nickname">{{ userInfo.nickname || userInfo.email }}</span>
          <el-button type="danger" size="small" @click="handleLogout">退出</el-button>
        </div>
        <h1>欢迎来到 CodeVerse</h1>
        <p>代码宇宙 - 探索开源世界</p>
        <div class="features">
          <div class="feature-item">
            <el-icon><Star /></el-icon>
            <span>开源项目</span>
            <p class="feature-desc">发现优质开源项目，参与社区贡献</p>
          </div>
          <div class="feature-item">
            <el-icon><ChatDotRound /></el-icon>
            <span>技术交流</span>
            <p class="feature-desc">与开发者交流经验，分享技术见解</p>
          </div>
          <div class="feature-item">
            <el-icon><Document /></el-icon>
            <span>技术博客</span>
            <p class="feature-desc">阅读技术文章，分享开发心得</p>
          </div>
        </div>
      </div>
      <div class="home-right">
        <div class="placeholder">
          <el-empty description="页面正在开发中..." />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Star, ChatDotRound, Document } from '@element-plus/icons-vue'
import { getUserInfo, logout } from '../api/user'
import defaultAvatar from '../assets/default-avatar.svg'

const router = useRouter()
const userInfo = ref({
  email: '',
  nickname: '',
  avatar: ''
})

const getUserInfoData = async () => {
  try {
    const res = await getUserInfo()
    if (res.code === 200) {
      userInfo.value = res.data
    } else {
      ElMessage.error(res.msg || '获取用户信息失败')
    }
  } catch (error) {
    ElMessage.error('获取用户信息失败，请稍后重试')
  }
}

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const res = await logout()
    if (res.code === 200) {
      ElMessage.success('退出成功')
      router.push('/login')
    } else {
      ElMessage.error(res.msg || '退出失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('退出失败，请稍后重试')
    }
  }
}

onMounted(() => {
  getUserInfoData()
})
</script>

<style scoped>
.home-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.home-wrapper {
  width: 1200px;
  height: 700px;
  display: flex;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.home-left {
  flex: 1;
  background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 40px;
  position: relative;
}

.user-info {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 16px;
}

.nickname {
  font-size: 14px;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.home-left h1 {
  font-size: 42px;
  margin-bottom: 20px;
}

.home-left p {
  font-size: 20px;
  opacity: 0.9;
  margin-bottom: 60px;
}

.features {
  display: flex;
  gap: 40px;
  margin-top: 40px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  transition: all 0.3s;
  cursor: pointer;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
}

.feature-item .el-icon {
  font-size: 32px;
}

.feature-item span {
  font-size: 18px;
  font-weight: bold;
}

.feature-desc {
  font-size: 14px;
  opacity: 0.8;
  text-align: center;
  margin: 0;
  max-width: 150px;
}

.home-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.placeholder {
  width: 100%;
  max-width: 500px;
}
</style> 