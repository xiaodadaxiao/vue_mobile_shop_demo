<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 未选中的图片 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <!-- 选中的图片 -->
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 文本 -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>
<script>
export default {
  props: {
    link: String,
    //选中的文字颜色
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {};
  },
  computed: {
    //得到当前活跃的路由，设置选中
    isActive() {
      return this.$route.path.indexOf(this.link) !== -1;
    },
    //得到文字颜色的样式
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    //点击切换路由事件
    itemClick() {
      this.$router.replace(this.link);
    },
  },
};
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin: 2px 0;
  vertical-align: middle;
}
</style>
