<template>
  <div>详情页</div>
</template>

<script>
export default {
  data() {
    return {
      //商品id
      iid: null,
    };
  },
  created() {
    //保存商品id
    this.iid = this.$route.params.iid;
  },
};
</script>

<style></style>
