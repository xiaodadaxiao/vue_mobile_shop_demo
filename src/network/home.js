import request from "./request";
// 封装首页home的网络请求

//1 请求首页home轮播图、导航数据的方法
export function getHomeMultidata() {
  return request({
    url: "/home/multidata",
  });
}

//2、请求首页home的商品信息
export function getHomeGoods(type, page) {
  return request({
    url: "home/data",
    params: {
      type,
      page,
    },
  });
}
