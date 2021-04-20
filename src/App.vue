<template>
  <div id="app">
    <router-view />
    <main-tabbar></main-tabbar>
  </div>
</template>
<script>
import MainTabbar from "components/content/mainTabbar/MainTabbar";
export default {
  data() {
    return {};
  },
  components: {
    "main-tabbar": MainTabbar,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
