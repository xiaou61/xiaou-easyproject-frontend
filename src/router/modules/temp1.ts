// 最简代码，也就是这些字段必须有
export default {
  path: "/temp1",
  redirect: "/temp1/index",
  meta: {
    title: "预留字段1"
  },
  children: [
    {
      path: "/temp1/index",
      name: "Fighting",
      component: () => import("@/views/temp1/index.vue"),
      meta: {
        title: "temp1"
      }
    }
  ]
};
