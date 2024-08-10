// 最简代码，也就是这些字段必须有
export default {
  path: "/aichat",
  meta: {
    title: "通义千问Ai"
  },
  children: [
    {
      path: "/aichat",
      name: "aichat",
      component: () => import("@/views/AichatT/index.vue"),
      meta: {
        title: "通义千问Ai"
      }
    }
  ]
};
