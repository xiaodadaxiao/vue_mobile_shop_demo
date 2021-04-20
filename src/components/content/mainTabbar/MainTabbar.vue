<template>
  <div>
    <tab-bar>
      <!-- 1、首页  activeColor="blue"设置选中颜色-->
      <tab-bar-item link="/home">
        <!-- 插入图标 -->
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/home.svg" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/home_active.svg" />
        </template>
        <!-- 插入文本 -->
        <template v-slot:item-text>
          <div>首页</div>
        </template>
      </tab-bar-item>
      <!-- 2、分类 -->
      <tab-bar-item link="/category">
        <!-- 插入图标 -->
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/category.svg" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/category_active.svg" />
        </template>
        <!-- 插入文本 -->
        <template v-slot:item-text>
          <div>分类</div>
        </template>
      </tab-bar-item>
      <!-- 3、购物车 -->
      <tab-bar-item link="/cart">
        <!-- 插入图标 -->
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/cart.svg" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/cart_active.svg" />
        </template>
        <!-- 插入文本 -->
        <template v-slot:item-text>
          <div>购物车</div>
        </template>
      </tab-bar-item>
      <!-- 4、个人 -->
      <tab-bar-item link="/profile">
        <!-- 插入图标 -->
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/profile.svg" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/profile_active.svg" />
        </template>
        <!-- 插入文本 -->
        <template v-slot:item-text>
          <div>个人信息</div>
        </template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  data() {
    return {};
  },
  components: {
    "tab-bar": TabBar,
    "tab-bar-item": TabBarItem,
  },
};
</script>
<style></style>
