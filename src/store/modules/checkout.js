/* eslint-disable comma-dangle */
// import http from "../axios/index.js";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    order: {},
    loading: false

    //  item:{},
  },
  // -----------------------------------------------------------------
  getters: {
    order: state => {
      return state.order;
    },

    loading: state => {
      return state.loading;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    setOrder(state, payload) {
      state.order = payload;
    },
    setCartDetails(state, payload) {
      state.cartDetails = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    async checkout(ctx, payload) {
      ctx.commit("setLoading", true);
      console.log(payload);
      ctx.commit("setLoading", true);
    },
    async editOrder(ctx, payload) {
      ctx.commit("setLoading", true);
      console.log(payload);
      ctx.commit("setLoading", true);
    },
    async rollbackOrder(ctx, payload) {
      ctx.commit("setLoading", true);
      console.log(payload);
      ctx.commit("setLoading", true);
    },
    async delete(ctx, payload) {
      ctx.commit("setLoading", true);
      console.log(payload);
      ctx.commit("setLoading", true);
    }
  }
};
