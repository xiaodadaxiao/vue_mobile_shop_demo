import request from "./request";
// 封装首页home的网络请求

//1 请求首页home全部数据的方法
export function getHomeMultidata() {
  return request({
    url: "/home/multidata",
  });
}
