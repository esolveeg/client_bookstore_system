export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    products: [],
    disablBtn: false,
    productsLoading: false,
    product: false
    //  item:{},
  },
  // -----------------------------------------------------------------
  getters: {
    products: state => {
      return state.products;
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
    product: state => {
      return state.product;
    },
    productsLoading: state => {
      return state.itemLoading;
    },
    allBranches: () => {
      let branches = localStorage.getItem("allbranches");
      return JSON.parse(branches);
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    pushProduct(state, payload) {
      //   let found = false
      //   state.products = state.products.filter(p => {
      //     if(p.isbn == payload.isbn) {
      //       let product =  p
      //       product.qty++
      //       found = true
      //       return product
      //     }
      //   })
      // //  state.total = state.total + payload.price
      //  if(!found) state.products.push(payload);

      //  found = false
      state.products.push(payload);
    },
    setProductsLoading(state, payload) {
      state.productsLoading = payload;
    },
    setDisablBtn(state, payload) {
      state.disablBtn = payload;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    async setProduct(ctx, payload) {
      ctx.commit("setProductsLoading", true);
      payload.qty = 1;
      await ctx.commit("pushProduct", payload);
      ctx.commit("setProductsLoading", true);
    }
  }
};
