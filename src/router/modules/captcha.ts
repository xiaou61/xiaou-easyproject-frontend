// 最简代码，也就是这些字段必须有
export default {
  path: "/captcha",
  meta: {
    title: "生成验证码"
  },
  children: [
    {
      path: "/captcha",
      name: "Captcha",
      component: () => import("@/views/captcha/index.vue"),
      meta: {
        title: "生成验证码"
      }
    }
  ]
};
