import Vue from "vue";

import harmonyInput from "./plugins";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import Element from 'element-ui'

Vue.use(harmonyInput);

Vue.use(Element)

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
