import { http } from "@/utils/http";

/**
 * 用户登录
 * @param {Object} data - 登录参数
 * @returns {Promise} 返回登录结果
 */
export const getLogin = data => {
  return http.request("post", "/admin/login", { data });
};

/**
 * 获取当前登录用户信息
 * @returns {Promise} 返回用户信息
 */
export const getLoginUser = () => {
  return http.request("get", "/admin/get/login");
};

/**
 * 用户登出
 * @returns {Promise} 返回登出结果
 */
export const logout = () => {
  return http.request("post", "/admin/logout");
};
