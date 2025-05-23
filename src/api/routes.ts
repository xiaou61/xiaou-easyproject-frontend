import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
};

/** 获取路由 */
export const getAsyncRoutes = () => {
  // return http.request<Result>("get", "/get-async-routes");
  return Promise.resolve({
    success: true,
    data: []
  });
};
