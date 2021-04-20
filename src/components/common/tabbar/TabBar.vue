<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.tab-bar {
  display: flex;
  background-color: #f6f6f6;
  /* 定位 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* 上阴影 */
  box-shadow: 0 -5px 2px 1px rgba(100, 99, 99, 0.08);
}
</style>
