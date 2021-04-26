<template>
  <div class="goods-list">
    <goods-item
      class="goods-item"
      v-for="(item, index) in goodsList"
      :key="index"
      :goods="item"
    />
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";
export default {
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsItem,
  },
};
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.goods-item {
  width: 48%;
}
</style>
