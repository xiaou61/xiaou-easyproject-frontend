// 最简代码，也就是这些字段必须有
export default {
  path: "/userinfo",
  meta: {
    title: "用户信息管理"
  },
  children: [
    {
      path: "/userinfo/class",
      name: "Class",
      component: () => import("@/views/userinfo/class/index.vue"),
      meta: {
        title: "class"
      }
    },
    {
      path: "/userinfo/college",
      name: "College",
      component: () => import("@/views/userinfo/college/index.vue"),
      meta: {
        title: "college"
      }
    },
    {
      path: "/userinfo/major",
      name: "Major",
      component: () => import("@/views/userinfo/major/index.vue"),
      meta: {
        title: "major"
      }
    },
    {
      path: "/userinfo/student",
      name: "Student",
      component: () => import("@/views/userinfo/student/index.vue"),
      meta: {
        title: "student"
      }
    }
  ]
};
