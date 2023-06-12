import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/api/lib/vueBootstrap.js";
import "@/assets/font.css";
import common from "@/commonGlobal/global.js";

Vue.use(common);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
