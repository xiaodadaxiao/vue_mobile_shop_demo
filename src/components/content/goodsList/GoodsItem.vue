<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goods.show.img" @load="imageOnload" />
    <div class="goods-info">
      <p class="goods-title">{{ goods.title }}</p>
      <span class="price">{{ "￥" + goods.price }}</span>
      <span class="collect">{{ goods.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    //图片加载完成，通知事件总线
    imageOnload() {
      this.$bus.$emit("itemImageOnload");
    },
    //点击商品跳转
    itemClick() {
      this.$router.push("/detail/" + this.goods.iid);
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding: 5px;
  text-align: center;
  font-size: 12px;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.goods-info {
  padding: 2px 0;
}
.price {
  color: var(--color-high-text);
  margin-right: 20px;
  font-weight: bold;
  padding: 2px 0;
}
.collect {
  position: relative;
  z-index: -1;
  padding: 2px 0;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  top: 2px;
  left: -15px;
  width: 14px;
  height: 14px;
  background: url(~assets/img/home/collection.svg) 0 0/14px 14px;
}
</style>
