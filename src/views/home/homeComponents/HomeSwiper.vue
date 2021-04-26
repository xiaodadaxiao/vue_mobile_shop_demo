<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
//集成home轮播图

// 导入轮播图组件
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  data() {
    return {
      isLoad: false,
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    //图片加载完成
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = !this.isLoad;
      }
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>
