import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8081/uapi',
  timeout: 10000,
  withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  config => {
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
    return res
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service 