import { defineStore } from "pinia";
import { store } from "@/store";

export const useUserStoreHook = defineStore(
  "pure-user",
  {
    state: () => ({
      // 用户名
      username: "",
      // 昵称
      nickname: "",
      // 角色
      roles: [],
      // 权限
      permissions: [],
      // 头像
      avatar: ""
    }),
    getters: {
      getUsername: state => state.username,
      getNickname: state => state.nickname,
      getRoles: state => state.roles,
      getPermissions: state => state.permissions,
      getAvatar: state => state.avatar
    },
    actions: {
      // 设置用户名
      SET_USERNAME(username) {
        this.username = username;
      },
      // 设置昵称
      SET_NICKNAME(nickname) {
        this.nickname = nickname;
      },
      // 设置角色
      SET_ROLES(roles) {
        this.roles = roles;
      },
      // 设置权限
      SET_PERMISSIONS(permissions) {
        this.permissions = permissions;
      },
      // 设置权限（兼容旧代码）
      SET_PERMS(permissions) {
        this.permissions = permissions;
      },
      // 设置头像
      SET_AVATAR(avatar) {
        this.avatar = avatar;
      },
      // 登出
      logOut() {
        this.username = "";
        this.nickname = "";
        this.roles = [];
        this.permissions = [];
        this.avatar = "";
      }
    }
  },
  {
    persist: true
  }
);

// 为了兼容性，同时导出 useUserStore
export const useUserStore = useUserStoreHook; 