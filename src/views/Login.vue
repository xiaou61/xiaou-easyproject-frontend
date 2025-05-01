<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-left">
        <h1>欢迎登录</h1>
        <p>CodeVerse - 探索代码的无限宇宙</p>
      </div>
      <div class="login-right">
        <div class="login-box">
          <h2>登录</h2>
          <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
            <el-form-item prop="email">
              <el-input v-model="loginForm.email" placeholder="邮箱">
                <template #prefix>
                  <el-icon><Message /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" type="password" placeholder="密码">
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLogin" :loading="loading">登录</el-button>
            </el-form-item>
            <div class="register-link">
              <span>还没有账号？</span>
              <router-link to="/register">立即注册</router-link>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Message, Lock } from '@element-plus/icons-vue'
import { login } from '../api/user'

const router = useRouter()
const loginFormRef = ref(null)
const loading = ref(false)

const loginForm = reactive({
  email: '',
  password: ''
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码长度不能小于8位', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  if (!loginForm.email || !loginForm.password) {
    ElMessage.warning('请输入邮箱和密码')
    return
  }

  try {
    const res = await login(loginForm)
    console.log('登录返回数据:', res)
    if (res.code === 200) {
      ElMessage.success('登录成功')
      router.push('/')
    } else {
      ElMessage.error(res.msg || '登录失败')
    }
  } catch (error) {
    console.error('登录错误:', error)
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      ElMessage.error(`登录失败: ${error.response.data?.msg || error.response.statusText}`)
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      ElMessage.error('登录失败: 无法连接到服务器，请检查网络连接')
    } else {
      // 发送请求时出了点问题
      ElMessage.error(`登录失败: ${error.message}`)
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.login-wrapper {
  width: 1000px;
  height: 600px;
  display: flex;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.login-left {
  flex: 1;
  background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 40px;
}

.login-left h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.login-left p {
  font-size: 18px;
  opacity: 0.9;
}

.login-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.login-box {
  width: 100%;
  max-width: 400px;
}

.login-box h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.el-button {
  width: 100%;
  height: 40px;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.register-link a {
  color: #409eff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
