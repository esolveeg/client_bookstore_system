import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "materialize-css";
import "materialize-css/dist/css/materialize.css";
import { createProvider } from "./vue-apollo";
import SimpleVueValidation from "simple-vue-validator";
import i18n from "./i18n";
import VueStash from "vue-stash";
import store from "./store";
import AirbnbStyleDatepicker from "vue-airbnb-style-datepicker";
import "vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css";
import VModal from "vue-js-modal";
import api from "./axios/index";
// see docs for available options
const datepickerOptions = {};
Vue.use(AirbnbStyleDatepicker, datepickerOptions);
Vue.prototype.$http = api;
Vue.use(VueStash);
Vue.use(SimpleVueValidation);
Vue.config.productionTip = false;
Vue.use(VModal);
new Vue({
  router,
  apolloProvider: createProvider(),
  i18n,
  data: { store },
  render: h => h(App)
}).$mount("#app");
