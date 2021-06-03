import http from "../../axios/index.js";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    product: {}
  },
  // -----------------------------------------------------------------
  getters: {
    product: state => {
      return state.product;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    setProduct(state, payload) {
      state.product = payload;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    async getProduct(ctx, payload) {
      return new Promise((resolve, reject) => {
        http
          .get(`productnew/${payload}`)
          .then(response => {
            ctx.commit("setProduct", response.data);
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
