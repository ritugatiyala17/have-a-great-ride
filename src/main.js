import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import store from "./store";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/main.css";

Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  router,
  render: (h) => h(App),
  store,
  beforeCreate() {
    this.$store.commit("initialiseStore");
    this.$store.dispatch("getAllUsersListInitialise");
    this.$store.dispatch("getAllBikesListInitialise");
    this.$store.dispatch("getAllBookingsListInitialise");
  },
}).$mount("#app");
