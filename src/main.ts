import Vue from "vue";

import harmony_input from "harmony-components-vue2";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

Vue.use(harmony_input);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
