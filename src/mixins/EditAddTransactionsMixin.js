import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import M from "materialize-css";
import SimpleVueValidation from "simple-vue-validator";
import {
  transactionQuery,
  createTransactionProduct,
  updateTransactionProduct,
  allBranches,
  allProducts
} from "@/graphql/queries/queries.js";
const Validator = SimpleVueValidation.Validator;
export default {
  components: {
    Breadcrumbs
  },
  data() {
    return {
      path: [{ title: "transactions", route: "transactions.index" }],
      transaction: {},
      note: "",
      qtyIncreased: false,
      discount: "",
      total: 0,
      remainHere: false,
      discountType: "",
      isValue: "",
      isPercent: "",
      isbn: "",
      customer: "",
      fromBranch: "",
      product: "",
      branch: "",
      productsIds: [],
      discountValue: 0,
      qtys: [],
      productAlreadyAdded: false,
      productAdded: false,
      products: [],
      id: null,
      allBranches: [],
      allProducts: [],
      title: "create_transaction",
      validationError: "",
      fregment: ""
    };
  },
  validators: {
    note(value) {
      return Validator.value(value).maxLength(250);
    },
    discount(value) {
      return Validator.value(value)
        .digit()
        .maxLength(4);
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
    transaction() {
      return {
        query: transactionQuery,
        variables() {
          return {
            id: parseInt(this.$route.params.id)
          };
        },
        result({ data: { transaction } }) {
          this.branch = transaction.branch.id;
          if (this.$route.name == "transactions.edit") {
            transaction.products.forEach(product => {
              this.products.push({ id: product.id, name: product.name });
              this.productsIds.push(product.id);
            });
            transaction.productsPivot.forEach(product => {
              this.qtys.push(product.qty);
            });

            this.title = `edit`;
          } else if (this.$route.name == "transactions.approve") {
            this.title = `approve`;
          }
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
    }
  },

  watch: {
    "validation.errors"() {
      const btn = document.querySelector(".input-field button");
      if (this.validation.errors.length > 2) {
        btn.setAttribute("disabled", "disabled");
      } else {
        if (!this.transaction) {
          this.validation.touchedRecords.length > 1
            ? setTimeout(() => {
                btn.removeAttribute("disabled");
              }, 4000)
            : "";
        } else {
          setTimeout(() => {
            btn.removeAttribute("disabled");
          }, 4000);
        }
      }
    },
    qtys() {
      let total = 0;
      for (let i = 0; i < this.qtys.length; ++i) {
        this.products[i].qty = this.qtys[i];
        total = total + this.products[i].price * this.products[i].qty;
      }
      this.total = total;
    },
    discountType() {
      if (this.discountType == "value") {
        this.isValue = true;
        this.isPercent = false;
      } else if (this.discount == "percent") {
        this.isPercent = true;
        this.isValue = false;
      }
    },
    products() {
      let total = 0;
      this.products.forEach(product => {
        total = total + product.price * product.qty;
      });
      this.total = total;
    },
    discount() {
      if (this.discountType == "value") {
        this.discountValue = this.discount;
      } else if (this.discountType == "percent") {
        this.discountValue = (this.total * this.discount) / 100;
      }
    },
    product() {
      const btn = document.querySelector(".input-field button");
      btn.setAttribute("disabled", "disabled");
      let product = this.allProducts.filter(product => {
        return product.isbn == this.product || product.name == this.product
          ? product
          : "";
      });

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
      this.qtys = this.qtys.filter(product => {
        return product !== this.qtys[index] ? product : "";
      });
      this.productsIds = this.productsIds.filter(product => {
        return product !== this.productsIds[index] ? product : "";
      });
    },
    resetForm() {
      this.customer = "";
      this.product = "";
      this.branch = "";
      this.productsIds = [];
      this.qtys = [];
      this.productAlreadyAdded = false;
      this.productAdded = false;
      this.products = [];
      this.loadSelects();
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
      this.transaction
        ? this.$route.name == "transactions.approve"
          ? this.approveTransaction()
          : this.updateTransaction()
        : this.createTransaction();
    },
    arraysDiff(arr1, arr2) {
      arr1.sort();
      arr2.sort();
      let a = [],
        diff = [];
      for (let i = 0; i < arr1.length; i++) {
        a[arr1[i]] = true;
      }

      for (let i = 0; i < arr2.length; i++) {
        if (a[arr2[i]]) {
          delete a[arr2[i]];
        } else {
          a[arr2[i]] = true;
        }
      }

      for (let k in a) {
        diff.push(k);
      }

      return diff;
    },

    approveTransaction() {
      let transactionIds = [];
      let transactionQtys = [];
      this.transaction.products.forEach(product => {
        transactionIds.push(product.id);
      });
      this.transaction.productsPivot.forEach(product => {
        transactionQtys.push(product.qty);
      });
      if (this.arraysDiff(this.productsIds, transactionIds).length == 0) {
        if (this.arraysDiff(this.qtys, transactionQtys).length == 0) {
          M.toast({
            html: `${this.$t("approved_successfully", {
              name: "transaction"
            })}`,
            classes: "success toast",
            displayLength: 3000
          });
          this.remainHere
            ? ""
            : this.$router.push({ name: "transactions.index" });
        }
      }
    },
    updateTransaction() {
      this.$apollo
        .mutate({
          mutation: updateTransactionProduct,
          // Parameters
          variables: {
            transaction: parseInt(this.$route.params.id),
            qtys: this.qtys,
            branch: this.branch,
            products: this.productsIds
          }
        })
        .then(() => {
          M.toast({
            html: `${this.$t("updated_successfully", {
              name: "transaction"
            })}`,
            classes: "success toast",
            displayLength: 3000
          });
          this.$router.push({ name: "transactions.index" });
        });
    },
    createTransaction() {
      this.$apollo
        .mutate({
          mutation: createTransactionProduct,
          // Parameters
          variables: {
            branch: this.branch,
            from_branch: this.fromBranch,
            qtys: this.qtys,
            products: this.productsIds
          }
        })
        .then(() => {
          M.toast({
            html: `${this.$t("created_successfully", {
              name: "transaction"
            })}`,
            classes: "success toast",
            displayLength: 3000
          });
          this.resetForm();
          this.remainHere
            ? ""
            : this.$router.push({ name: "transactions.index" });
        })
        .catch(() => {
          //console.log(e)
          this.validationError = this.$t("branch_required");
        });
    }
  },
  mounted() {
    this.loadSelects();
  }
};
