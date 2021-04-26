<template>
  <div id="home">
    <!-- 顶部标题栏 -->
    <nav-bar class="nav">
      <template v-slot:center>
        <span>购物街</span>
      </template>
    </nav-bar>
    <!-- tab-control 1号，在滑动时悬浮出现 -->
    <tab-control
      v-show="isTabControlFixed"
      @clickTab="clickTab"
      :titles="['流行', '新款', '精选']"
      ref="tabControl1"
      class=".tab-control"
    />
    <!-- 滚动组件 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @loadMore="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!-- recommend 推荐 -->
      <home-recommend :recommends="recommends" />
      <!-- 本周流行 -->
      <home-feature />
      <!-- tab-control2 -->
      <tab-control
        @clickTab="clickTab"
        :titles="['流行', '新款', '精选']"
        ref="tabControl2"
      />
      <goods-list :goodsList="goods[currentTab].list" />
    </scroll>
    <!-- 返回顶部组件 -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
/* 公共函数 */
//防抖包装函数
import { debounce } from "common/utils.js";
/* 公共组件 */
//Scroll滚动组件
import Scroll from "components/common/scroll/Scroll";
// 返回顶部组件
import BackTop from "components/content/backTop/BackTop";
// 导入顶部导航
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

//商品列表组件
import GoodsList from "components/content/goodsList/GoodsList";

/* 子组件 */
// 导入轮播图组件
import HomeSwiper from "./homeComponents/HomeSwiper";
//导入recommend组件
import HomeRecommend from "./homeComponents/HomeRecommend";
// 导入本周流行 feature组件(图片)
import HomeFeature from "./homeComponents/HomeFeature";

//导入home的网络请求数据方法
import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  data() {
    return {
      //轮播图
      banners: [],
      //导航
      recommends: [],
      //tabControl据顶部距离
      tabControlOffsetTop: 0,
      //是否悬浮tabControl（顶部那个）
      isTabControlFixed: false,
      //商品数据
      goods: {
        //流行
        pop: {
          page: 0,
          list: [],
        },
        //最新
        new: {
          page: 0,
          list: [],
        },
        //  精选
        sell: {
          page: 0,
          list: [],
        },
      },
      //选中的tab(
      currentTab: "pop",
      //是否显示返回按钮
      isShowBackTop: true,
      //离开时保存的y值
      saveY: 0,
    };
  },
  components: {
    scroll: Scroll,
    "nav-bar": NavBar,
    "tab-control": TabControl,
    "home-swiper": HomeSwiper,
    "home-recommend": HomeRecommend,
    "home-feature": HomeFeature,
    "goods-list": GoodsList,
    BackTop,
  },
  created() {
    //1、网络请求轮播图 导航数据
    this.getHomeMultidata();
    //2、网络请求 商品数据
    this.getHomeGoods("new");
    this.getHomeGoods("pop");
    this.getHomeGoods("sell");
  },
  methods: {
    /*

    事件监听

    */
    //轮播图加载完成
    swiperImageLoad() {
      //获得tabControl2的offsetTop
      this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // tabControl切换,更改数据源
    clickTab(index) {
      //根据index得到key,切换
      this.currentTab = Object.keys(this.goods)[index];
      //同步选中状态
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //点返回顶部
    backTopClick() {
      //得到组件,触发内部创建的Better-Scroll对象，调用函数
      this.$refs.scroll.scrollTo(0, 0, 600);
    },
    //监听滚动事件，设置是否显示返回按钮
    contentScroll(position) {
      //1、监听是否显示backTop
      this.isShowBackTop = -position.y > 800;
      //2、监听是否悬浮tabControl（顶部那个）
      this.isTabControlFixed = -position.y > this.tabControlOffsetTop;
    },

    //下拉加载更多事件
    loadMore() {
      //根据选中的类型请求加载更多数据
      this.getHomeGoods(this.currentTab);
    },

    /*

    网络请求

    */
    //1\网络请求轮播图 导航数据
    getHomeMultidata() {
      //发送网络请求,得到初始数据
      getHomeMultidata().then((res) => {
        //保存数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //2\请求 商品数据
    getHomeGoods(type) {
      //得到页码+1(请求下一页)
      let page = this.goods[type].page + 1;
      //调用网络请求方法
      getHomeGoods(type, page).then((res) => {
        //将请求到的这一页数据添加到数组
        this.goods[type].list.push(...res.data.list);
        //重置下拉刷新次数
        this.$refs.scroll.finishPullUp();
      });
      //页码+1
      this.goods[type].page++;
    },
  },
  mounted() {
    //监听GoodsItem组件图片加载完成，调用方法刷新scroll的高度
    //1、直接监听，然后刷新（每个图片加载完都会刷新高度）
    // this.$bus.$on("itemImageOnload", () => {
    //   this.$refs.scroll.refresh();
    // });
    //2、包装成防抖函数，减少频繁刷新
    const refresh = debounce(this.$refs.scroll.refresh);
    this.$bus.$on("itemImageOnload", () => {
      refresh();
    });
  },
  activated() {
    // 刷新
    this.$refs.scroll.refresh();
    //活跃时直接跳到离开时保存的y值
    this.$refs.scroll.scrollTo(0, this.saveY, 0.1);
  },
  deactivated() {
    //离开时保存y值
    this.saveY = this.$refs.scroll.getY();
    // console.log(this.saveY);
  },
};
</script>

<style scoped>
#home {
  /* 设置空白避免被上下导航栏遮挡 */
  /* padding: 44px 0 49px; */
  height: 100vh;
  position: relative;
}
.nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 固定到顶部 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* 中间滚动组件 */
.content {
  overflow: scroll;
  position: absolute;
  /* 顶部标题栏高度 */
  top: 44px;
  /* 底部tabbar高度 */
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: sticky;
  top: 44px;

  background-color: #fff;
  z-index: 9;
}
</style>
