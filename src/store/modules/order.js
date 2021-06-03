import http from "../../axios/index.js";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    products: [],
    disablBtn: false,
    productsLoading: false,
    orderLoading: false,
    order: {},
    refundedOrder: "",
    product: false,
    forceMessage: null,
    checkoutLoadinng: false
    //  item:{},
  },
  // -----------------------------------------------------------------
  getters: {
    products: state => {
      return state.products;
    },
    refundedOrder: state => {
      return state.refundedOrder;
    },
    forceMessage: state => {
      return state.forceMessage;
    },
    disablBtn: state => {
      return state.disablBtn;
    },
    total: state => {
      let total = 0;
      for (let i = 0; i < state.products.length; i++) {
        total += state.products[i].price * state.products[i].qty;
      }
      return total;
    },
    outTtotal: state => {
      let total = 0;
      for (let i = 0; i < state.products.length; i++) {
        total += state.products[i].purchased_price * state.products[i].qty;
      }
      return total;
    },
    product: state => {
      return state.product;
    },
    productsLoading: state => {
      return state.itemLoading;
    },
    checkoutLoadinng: state => {
      return state.checkoutLoadinng;
    },
    orderLoading: state => {
      return state.orderLoading;
    },
    order: state => {
      return state.order;
    },
    allBranches: () => {
      let branches = localStorage.getItem("allbranches");
      return JSON.parse(branches);
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    SetRefundedOrder(state, payload) {
      state.refundedOrder = payload;
    },
    pushProduct(state, payload) {
      let found = false;
      state.products.filter(p => {
        if (p.isbn == payload.isbn) {
          p.qty++;
          found = true;
          return p;
        }
      });
      state.total = state.total + payload.price;
      if (!found) state.products.push(payload);

      found = false;

      // state.products.push(payload);
    },
    setProducts(state, payload) {
      state.products = payload;
    },
    setForceMessage(state, payload) {
      state.forceMessage = payload;
    },
    setOrder(state, payload) {
      state.order = payload;
    },
    updateQty(state, payload) {
      // console.log(payload)
      if (payload.data) {
        state.products = state.products.filter(p => {
          if (p.isbn == payload.product.isbn) {
            p.qty = parseInt(payload.data);
          }
          return p;
        });
      } else {
        state.products = state.products.filter(p => {
          if (p.isbn == payload.product.isbn) {
            p.qty = "";
          }
          return p;
        });
      }
    },
    setProductsLoading(state, payload) {
      state.productsLoading = payload;
    },
    setDisablBtn(state, payload) {
      state.disablBtn = payload;
    },
    deleteProduct(state, payload) {
      state.products.splice(payload, 1);
    },
    setCheckoutLoadinng(state, payload) {
      state.checkoutLoadinng = payload;
    },
    setOrderLoading(state, payload) {
      state.orderLoading = payload;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    async setProduct(ctx, payload) {
      ctx.commit("setProductsLoading", true);
      payload.qty = 1;
      await ctx.commit("pushProduct", payload);
      ctx.commit("setProductsLoading", true);
    },
    async checkout(ctx, payload) {
      // console.log(payload);
      return new Promise((resolve, reject) => {
        ctx.commit("setCheckoutLoadinng", true);

        http
          .post("checkoutnew", payload)
          .then(response => {
            ctx.commit("setOrder", response.data);
            ctx.commit("setForceMessage", null);

            resolve(response.data);
          })
          .catch(error => {
            ctx.commit("setForceMessage", error.response.data.message);
            reject(error);
          });

        ctx.commit("setCheckoutLoadinng", false);
      });
    },
    async getOrder(ctx, payload) {
      // console.log(payload);
      return new Promise((resolve, reject) => {
        ctx.commit("setOrderLoading", true);

        http
          .post(`order/${payload}/editnew`)
          .then(response => {
            ctx.commit("setOrder", response.data);
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });

        ctx.commit("setOrderLoading", false);
      });
    },
    async refund(ctx, payload) {
      return new Promise((resolve, reject) => {
        http
          .post(`order/${payload}/rollback`)
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async editOrder(ctx, payload) {
      // console.log(payload);
      return new Promise((resolve, reject) => {
        ctx.commit("setOrderLoading", true);

        http
          .post(`order/${payload.id}/update`, payload.form)
          .then(response => {
            ctx.commit("setOrder", response.data);
            ctx.commit("setForceMessage", null);
            resolve(response.data);
          })
          .catch(error => {
            ctx.commit("setForceMessage", error.response.data.message);

            reject(error);
          });

        ctx.commit("setOrderLoading", false);
      });
    },
    async setProducts(ctx, payload) {
      ctx.commit("setProductsLoading", true);

      await ctx.commit("setProducts", payload);
      ctx.commit("setProductsLoading", true);
    }
  }
};
