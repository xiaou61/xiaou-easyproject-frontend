// 最简代码，也就是这些字段必须有
export default {
  path: "/ai",
  meta: {
    title: "Ai文本纠错 文本识别"
  },
  children: [
    {
      path: "/ai",
      name: "Ai",
      component: () => import("@/views/Ai/index.vue"),
      meta: {
        title: "Ai文本纠错/文本识别"
      }
    }
  ]
};
