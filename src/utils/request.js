import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8081/uapi',
  timeout: 30000,
  withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return res
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service 