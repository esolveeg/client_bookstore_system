/* eslint-disable comma-dangle */
import http from "../../axios/index.js";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    products: [],
    cart: {},
    loading: false

    //  item:{},
  },
  // -----------------------------------------------------------------
  getters: {
    cart: state => {
      return state.cart;
    },
    loading: state => {
      return state.loading;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    setCart(state, payload) {
      state.cart = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    async addToCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        // ctx.commit("cart/setLoading", true);

        http
          .post("cart", { product: payload.id })
          .then(response => {
            ctx.commit("setCart", response.data);
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async destroyCart(ctx) {
      return new Promise((resolve, reject) => {
        // ctx.commit("cart/setLoading", true);

        http
          .delete("cart")
          .then(response => {
            ctx.commit("setCart", {});
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async getCart(ctx) {
      return new Promise((resolve, reject) => {
        // ctx.commit("cart/setLoading", true);
        http
          .get("cart")
          .then(response => {
            ctx.commit("setCart", response.data);
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
        // ctx.commit("cart/setLoading", true);
      });
    },
    async updateCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        // ctx.commit("cart/setLoading", true);
        http
          .put(`cart`, payload)
          .then(response => {
            ctx.commit("setCart", response.data);
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
        // ctx.commit("cart/setLoading", true);
      });
    },
    async setDiscount(ctx, payload) {
      return new Promise((resolve, reject) => {
        // ctx.commit("cart/setLoading", true);
        http
          .post(`cart/discount`, payload)
          .then(response => {
            ctx.commit("setCart", response.data);
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
        // ctx.commit("cart/setLoading", true);
      });
    },
    async deleteProduct(ctx, payload) {
      return new Promise((resolve, reject) => {
        // ctx.commit("cart/setLoading", true);
        http
          .delete(`cart/${payload}`)
          .then(response => {
            ctx.commit("setCart", response.data);
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
        // ctx.commit("cart/setLoading", true);
      });
    }
  }
};
