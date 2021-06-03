/* eslint-disable comma-dangle */
import Vue from "vue";
import Vuex from "vuex";
import product from "./modules/product";
import order from "./modules/order";
import transaction from "./modules/transaction";
import cart from "./modules/cart";
import checkout from "./modules/checkout";
import ui from "./modules/ui";

Vue.use(Vuex);

const modules = {
  product,
  checkout,
  order,
  transaction,
  cart,
  ui
};
export default new Vuex.Store({
  modules
});
