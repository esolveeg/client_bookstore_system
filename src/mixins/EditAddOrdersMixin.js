import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import Resete from "@/components/Resete.vue";
import M from "materialize-css";
import moment from "moment";
import axios from "axios";
import SimpleVueValidation from "simple-vue-validator";
import {
  orderQuery,
  allBranches,
  allProducts,
  updateOrderProduct,
  allCustomers,
  meQuery,
  createOrderProduct
} from "@/graphql/queries/queries.js";
const Validator = SimpleVueValidation.Validator;
export default {
  components: {
    Breadcrumbs,
    Resete
  },
  data() {
    let now = moment().format();

    return {
      now,
      points: "",
      path: [{ title: "orders", route: "orders.index" }],
      order: {},
      note: "",
      printing: false,
      payment: "cash",
      payments: ["cash", "card"],
      discount: "",
      total: 0,
      remainHere: true,
      discountType: "",
      qtyIncreased: false,
      isValue: "",
      isPercent: "",
      isbn: "",
      customer: "",
      product: "",
      productsIds: [],
      discountValue: 0,
      qtys: [],
      productAlreadyAdded: false,
      productAdded: false,
      products: [],
      allCustomers: [],
      id: null,
      allBranches: [],
      allProducts: [],
      title: "create_order",
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
    order() {
      return {
        query: orderQuery,
        variables() {
          return {
            id: parseInt(this.$route.params.id)
          };
        },
        result({ data: { order } }) {
          this.note = order.note;
          this.discount = order.discount;
          this.total = order.total;
          this.payment = order.payment;
          this.customer = order.customer ? order.customer : "";
          this.branch = order.branch ? order.branch.id : "";
          order.products.forEach(product => {
            this.products.push(product);
            this.productsIds.push(product.id);
          });
          order.productsPivot.forEach(qty => {
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
    me: {
      query: meQuery,
      result({ data: { me } }) {
        if (me.employee.branch.id) {
          this.branch = me.employee.branch.id;
        }

        // });
      }
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
    allCustomers() {
      return {
        query: allCustomers
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
        total = total + this.products[i].price * this.products[i].qty;
      }
      this.total = total;
    },
    // qtys() {
    //   let total = 0;
    //   for (let i = 0; i < this.qtys.length; ++i) {
    //     this.products[i].qty = this.qtys[i];
    //     total = total + this.products[i].price * this.products[i].qty;
    //   }
    //   this.total = total;

    //   if(this.points){
    //     if(this.points > total){
    //       if(this.payments.length == 2){
    //         this.payments.push("points")
    //       }
    //     }else{
    //       if(this.payments.length == 3){
    //         this.payment = this.payment == 'points' ? 'cash' : this.payment
    //         this.payments.pop()

    //       }
    //     }
    //   }
    //   this.loadSelects()
    // },
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
    customer() {
      this.getPoints(this.customer.id);
    },

    discount() {
      if (this.discountType == "value") {
        this.discountValue = this.discount;
      } else if (this.discountType == "percent") {
        this.discountValue = (this.total * this.discount) / 100;
      }
    },
    product() {
      let product = this.allProducts.filter(product => {
        if (this.product !== null) {
          return product.isbn == this.product || product.name == this.product
            ? product
            : "";
        }
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
          // console.log(this.qtys[index] +1)
          this.qtys[index] = this.qtys[index] + 1;
          // let total = 0;
          let total = this.products[index].price;
          this.total = this.total + total;
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
    getPoints(id) {
      axios.get(`http://localhost:8000/points/${id}`, {}, {}).then(response => {
        this.points = response.data;

        if (this.points > this.total) {
          if (this.payments.length == 2) {
            this.payments.push("points");
          }
        } else {
          if (this.payments.length == 3) {
            this.payment = this.payment == "points" ? "cash" : this.payment;
            this.payments.pop();
          }
        }
        this.loadSelects();
      });
    },
    printData() {
      this.printing = true;
      setTimeout(() => {
        const prtHtml = document.getElementById("invoice-POS").innerHTML;

        // Get all stylesheets HTML
        let stylesHtml = "";
        for (const node of [
          ...document.querySelectorAll('link[rel="stylesheet"], style')
        ]) {
          stylesHtml += node.outerHTML;
        }

        // Open the print window
        const WinPrint = window.open(
          "",
          "",
          "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
        );

        WinPrint.document.write(`<!DOCTYPE html>
              <html>
                <head>
                  ${stylesHtml}
                  <style>
                    #invoice-POS{
                      display:block !important;
                    }
                  </style>
                </head>
                <body>
                  ${prtHtml}
                </body>
              </html>`);

        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();

        this.discount = "";
        this.total = 0;
        this.discountType = "";
        this.isValue = "";
        this.isPercent = "";
        this.isbn = "";
        this.note = "";
        this.customer = "";
        this.product = "";
        this.productsIds = [];
        this.discountValue = 0;
        this.qtys = [];
        this.productAlreadyAdded = false;
        this.productAdded = false;
        this.products = [];
      }, 1000);
    },
    removeProduct(index) {
      this.products = this.products.filter(product => {
        return product !== this.products[index] ? product : "";
      });
      this.qtys.splice(index, 1);
      this.productsIds = this.productsIds.filter(product => {
        return product !== this.productsIds[index] ? product : "";
      });
    },
    resetForm() {
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
      console.log("arr");
      console.log(arr);
      let rv = {};
      for (var i = 0; i < arr.length; ++i) {
        arr[i] !== undefined ? (rv[arr[i].name] = null) : "";
        arr[i] !== undefined ? (rv[arr[i].isbn] = null) : "";
      }
      console.log("rv");
      console.log(rv);
      return rv;
    },
    loadSelects() {
      let selects = document.querySelectorAll("select");
      let instance = M.FormSelect.getInstance(selects);
      instance ? instance.destroy() : "";
      setTimeout(() => {
        M.FormSelect.init(selects, {});
      }, 2000);
    },
    submitted() {
      this.order ? this.updateOrder() : this.createOrder();
    },
    updateOrder() {
      this.$apollo
        .mutate({
          mutation: updateOrderProduct,
          // Parameters
          variables: {
            order: parseInt(this.$route.params.id),
            qtys: this.qtys,
            payment: this.payment,
            created_by: this.userId,
            products: this.productsIds,
            note: this.note,
            discount: parseInt(this.discountValue),
            total: parseInt(this.total) - parseInt(this.discountValue),
            customer: this.customer.id,
            branch: this.branch
          }
        })
        .then(() => {
          this.printData();
          M.toast({
            html: `${this.$t("updated_successfully", {
              name: this.$t("order")
            })}`,
            classes: "success toast",
            displayLength: 2000
          });
          this.$router.push({ name: "orders.index" });
        });
    },
    createOrder() {
      this.$apollo
        .mutate({
          mutation: createOrderProduct,
          // Parameters
          variables: {
            created_by: parseInt(this.userId),
            note: this.note,
            payment: this.payment,
            discount: parseInt(this.discountValue),
            total: parseInt(this.total) - parseInt(this.discountValue),
            customer: this.customer.id,
            qtys: this.qtys,
            branch: this.branch,
            products: this.productsIds
          }
        })
        .then(() => {
          this.printData();
          M.toast({
            html: `${this.$t("created_successfully", {
              name: this.$t("order")
            })}`,
            classes: "success toast",
            displayLength: 3000
          });
          this.remainHere ? "" : this.$router.push({ name: "orders.index" });
        });
    }
  },
  mounted() {
    this.loadSelects();
  }
};
