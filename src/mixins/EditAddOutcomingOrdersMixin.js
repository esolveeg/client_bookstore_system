import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import Resete from "@/components/Resete.vue";
import M from "materialize-css";
import SimpleVueValidation from "simple-vue-validator";
import {
  createOutcomingOrder,
  updateOutcomingOrder,
  outcomingOrderQuery,
  allBranches,
  allProducts,
  updateOutcomingOrderProduct,
  allSuppliers,
  createOutcomingOrderProduct
} from "@/graphql/queries/queries.js";
const Validator = SimpleVueValidation.Validator;
export default {
  components: {
    Breadcrumbs,
    Resete
  },
  data() {
    return {
      path: [{ title: "outcoming_orders", route: "outcomingorders.index" }],
      outcomingOrder: {},
      note: "",
      total: 0,
      qtyIncreased: false,
      isbn: "",
      supplier: "",
      product: "",
      productsIds: [],
      qtys: [],
      productAlreadyAdded: false,
      productAdded: false,
      products: [],
      allSuppliers: [],
      id: null,
      allBranches: [],
      allProducts: [],
      title: "create_outcoming_order",
      validationError: "",
      fregment: ""
    };
  },
  store: {
    branch: "branch_id",
    userId: "userId",
    isPos: "isPos"
  },
  validators: {
    note(value) {
      return Validator.value(value).maxLength(250);
    },
    total(value) {
      return Validator.value(value)
        .required()
        .digit()
        .maxLength(5);
    },
    products(value) {
      return Validator.value(value).required();
    }
  },

  apollo: {
    outcomingOrder() {
      return {
        query: outcomingOrderQuery,
        variables() {
          return {
            id: parseInt(this.$route.params.id)
          };
        },
        result({ data: { outcomingOrder } }) {
          this.note = outcomingOrder.note;
          this.id = outcomingOrder.id;
          this.total = outcomingOrder.total;
          this.suppler = outcomingOrder.suppler
            ? outcomingOrder.suppler.id
            : "";
          this.branch = outcomingOrder.branch ? outcomingOrder.branch.id : "";
          outcomingOrder.products.forEach(product => {
            this.products.push(product);
            this.productsIds.push(product.id);
          });
          outcomingOrder.productsPivot.forEach(qty => {
            this.qtys.push(qty.qty);
          });

          this.title = `edit`;
        }
      };
    },
    allBranches() {
      return {
        query: allBranches
      };
    },

    allProducts() {
      return {
        query: allProducts,
        result({ data: { allProducts } }) {
          let elems = document.querySelectorAll(".autocomplete");

          let data = this.toObject(allProducts);
          let options = { data };
          options.onAutocomplete = val => {
            this.product = val;
          };
          M.Autocomplete.init(elems, options);
        }
      };
    },
    allSuppliers() {
      return {
        query: allSuppliers
      };
    }
  },

  watch: {
    "validation.errors"() {
      const btn = document.querySelector(".input-field button");
      if (this.validation.errors.length > 0) {
        btn.setAttribute("disabled", "disabled");
      } else {
        if (!this.order) {
          setTimeout(() => {
            this.validation.touchedRecords.length > 1
              ? btn.removeAttribute("disabled")
              : "";
          }, 2000);
        } else {
          btn.removeAttribute("disabled");
        }
      }
    },
    qtys() {
      let total = 0;
      for (let i = 0; i < this.qtys.length; ++i) {
        this.products[i].qty = this.qtys[i];
        total = total + this.products[i].purchased_price * this.products[i].qty;
      }
      this.total = total;
    },

    products() {
      let total = 0;
      this.products.forEach(product => {
        total = total + product.purchased_price * product.qty;
      });
      this.total = total;
    },

    product() {
      let product = this.allProducts.filter(product => {
        return product.isbn == this.product || product.name == this.product
          ? product
          : "";
      });
      const btn = document.querySelector(".input-field button");
      btn.setAttribute("disabled", "disabled");
      if (product[0]) {
        let elem = document.querySelector(".autocomplete-content");
        if (elem) elem.style.opacity = 0;
        if (this.productsIds.includes(product[0].id)) {
          let index = this.productsIds.indexOf(product[0].id);
          this.productAlreadyAdded = false;
          this.qtyIncreased = true;
          this.productAdded = false;
          this.qtys[index] = this.qtys[index] + 1;
          setTimeout(() => {
            this.qtyIncreased = false;
            this.product = "";
          }, 1000);
        } else {
          this.qtys.push(1);
          this.productAdded = true;
          product[0].qty = this.qtys[this.qtys.length - 1];

          this.products.push(product[0]);
          this.productsIds.push(product[0].id);

          setTimeout(() => {
            this.productAdded = false;
          }, 3000);
          this.product = "";
        }
        setTimeout(() => {
          this.validation.touchedRecords.length > 1
            ? btn.removeAttribute("disabled")
            : "";
        }, 4000);
      }
    }
  },
  methods: {
    removeProduct(index) {
      this.products = this.products.filter(product => {
        return product !== this.products[index] ? product : "";
      });
      this.productsIds = this.productsIds.filter(product => {
        return product !== this.productsIds[index] ? product : "";
      });
      this.qtys = this.qtys.filter(product => {
        return product !== this.qtys[index] ? product : "";
      });
    },
    increaseQty(index) {
      this.qtys[index] = this.qtys[index] + 1;
      this.qtys = this.qtys;
    },
    decreaseQty(index) {
      this.qtys[index] = this.qtys[index] - 1;
    },
    toObject(arr) {
      let rv = {};
      for (var i = 0; i < arr.length; ++i) {
        arr[i] !== undefined ? (rv[arr[i].name] = null) : "";
        arr[i] !== undefined ? (rv[arr[i].isbn] = null) : "";
      }
      return rv;
    },
    loadSelects() {
      let selects = document.querySelectorAll("select");
      setTimeout(() => {
        M.FormSelect.init(selects, {});
      }, 2000);
    },
    submitted() {
      this.outcomingOrder ? this.updateOrder() : this.createOrder();
    },
    updateOrder() {
      this.$apollo.mutate({
        mutation: updateOutcomingOrderProduct,
        // Parameters
        variables: {
          outcomingOrder: parseInt(this.$route.params.id),
          qtys: this.qtys,
          branch: this.branch,
          products: this.productsIds
        }
      });

      setTimeout(() => {
        this.$apollo
          .mutate({
            mutation: updateOutcomingOrder,
            // Parameters
            variables: {
              id: parseInt(this.$route.params.id),
              updated_by: parseInt(this.userId),
              note: this.note,
              total: parseInt(this.total),
              supplier: this.suppler,
              branch: this.branch
            }
          })
          .then(() => {
            M.toast({
              html: `${this.$t("updated_successfully", {
                name: this.$t("outcoming_order")
              })}`,
              classes: "success toast",
              displayLength: 2000
            });

            this.$router.push({ name: "outcomingorders.index" });
          });
      }, 1000);
    },
    createOrder() {
      this.$apollo
        .mutate({
          mutation: createOutcomingOrder,
          // Parameters
          variables: {
            created_by: parseInt(this.userId),
            note: this.note,
            total: parseInt(this.total),
            supplier: this.supplier,
            branch: this.branch
          }
        })
        .then(data => {
          this.id = data.data.createOutcomingOrder.id;
          M.toast({
            html: `${this.$t("created_successfully", {
              name: this.$t("outcoming_order")
            })}`,
            classes: "success toast",
            displayLength: 3000
          });

          this.$router.push({ name: "outcomingorders.index" });
        })
        .catch(() => {
          //console.log(e)
          this.validationError = this.$t("name_unique");
        });

      setTimeout(() => {
        this.$apollo.mutate({
          mutation: createOutcomingOrderProduct,
          // Parameters
          variables: {
            outcomingOrder: this.id,
            qtys: this.qtys,
            created_by: this.userId,
            branch: this.branch,
            products: this.productsIds
          }
        });
      }, 2000);
    }
  },
  mounted() {
    this.loadSelects();
  }
};
