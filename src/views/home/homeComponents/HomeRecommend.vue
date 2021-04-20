<template>
  <div class="recommend">
    <div class="item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0;
  border-bottom: 10px solid #eee;
}
.item {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.recommend img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>
