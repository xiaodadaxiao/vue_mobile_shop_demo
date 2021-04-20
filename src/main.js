import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import request from "./network/request";

Vue.config.productionTip = false;

//直接挂载网络请求的方法
//Vue.prototype.$http = request;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
