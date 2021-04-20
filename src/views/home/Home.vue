<template>
  <div>
    <nav-bar class="nav">
      <template v-slot:center>
        <span>首页</span>
      </template>
    </nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners" />
    <!-- recommend 推荐 -->
    <home-recommend :recommends="recommends" />
  </div>
</template>

<script>
// 导入顶部导航
import NavBar from "components/common/navbar/NavBar";
// 导入轮播图组件
import HomeSwiper from "./homeComponents/HomeSwiper";
//导入recommend组件
import HomeRecommend from "./homeComponents/HomeRecommend";

//导入home的网络请求数据方法
import { getHomeMultidata } from "network/home";
export default {
  data() {
    return {
      //轮播图
      banners: [],
      //导航
      recommends: [],
    };
  },
  components: {
    "nav-bar": NavBar,
    "home-swiper": HomeSwiper,
    "home-recommend": HomeRecommend,
  },
  created() {
    //发送网络请求,得到初始数据
    getHomeMultidata().then((res) => {
      console.log(res);
      //保存数据
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style scoped>
.nav {
  background-color: var(--color-tint);
  color: #fff;
}
/* .home-swiper {
  height: 100px;
} */
</style>
