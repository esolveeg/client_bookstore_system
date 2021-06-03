import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import M from "materialize-css";
import SimpleVueValidation from "simple-vue-validator";
import {
  createDiscount,
  updateDiscount,
  discountQuery,
  allProducts,
  allBranches,
  createDiscountProduct
} from "@/graphql/queries/queries.js";
const Validator = SimpleVueValidation.Validator;
export default {
  components: {
    Breadcrumbs
  },
  data() {
    return {
      path: [{ title: "discounts", route: "discounts.index" }],
      discount: {},
      type: "",
      value: "",
      title: "",
      percent: "",
      isValue: false,
      isPercent: false,
      branch: "",
      id: "",
      products: [],
      qty: "",
      pageTitle: "create_discount",
      validationError: "",
      fregment: ""
    };
  },
  validators: {
    type(value) {
      return Validator.value(value).required();
    },
    value(value) {
      return Validator.value(value)
        .digit()
        .maxLength(5);
    },
    percent(value) {
      return Validator.value(value)
        .digit()
        .maxLength(2);
    },
    products(value) {
      return Validator.value(value).required();
    },
    title(value) {
      return Validator.value(value)
        .required()
        .maxLength(250);
    }
  },

  apollo: {
    discount() {
      return {
        query: discountQuery,
        variables() {
          return {
            id: parseInt(this.$route.params.id)
          };
        },
        result({ data: { discount } }) {
          this.type = discount.type;
          setTimeout(() => {
            if (discount.type == "value") {
              this.isPercent = false;

              this.isValue = true;
            } else if (this.type == "percent_off") {
              this.isValue = false;
              this.isPercent = true;
            }
          }, 1000);

          this.value = discount.value;
          this.title = discount.title;
          this.percent = discount.percent;

          this.branch = discount.branch.id;
          discount.products.forEach(product => {
            console.log(product.id);
            this.products.push(product.id);
          });
        }
      };
    },
    allProducts() {
      return {
        query: allProducts
      };
    },
    allBranches() {
      return {
        query: allBranches
      };
    }
  },

  watch: {
    "validation.errors"() {
      const btn = document.querySelector(".input-field button");
      if (this.validation.errors.length > 0) {
        btn.setAttribute("disabled", "disabled");
      } else {
        if (!this.product) {
          this.validation.touchedRecords.length > 1
            ? btn.removeAttribute("disabled")
            : "";
        } else {
          btn.removeAttribute("disabled");
        }
      }
    },
    type() {
      if (this.type == "value") {
        this.isPercent = false;
        this.isValue = true;
      } else if (this.type == "percent_off") {
        this.isValue = false;
        this.isPercent = true;
      }
    }
  },
  methods: {
    loadSelects() {
      let selects = document.querySelectorAll("select");
      setTimeout(() => {
        M.FormSelect.init(selects, {});
      }, 2000);
    },
    submitted() {
      if (this.type == "value") {
        this.percent = "";
      } else if (this.type == "percent_off") {
        this.value = "";
      }
      this.discount ? this.updateDiscount() : this.createDiscount();
    },
    updateDiscount() {
      this.$apollo
        .mutate({
          mutation: updateDiscount,
          // Parameters
          variables: {
            id: parseInt(this.$route.params.id),
            type: this.type,
            value: this.value,
            title: this.title,
            percent: this.percent,
            isValue: this.isValue,
            isPercent: this.isPercent,
            branch: this.branch
          }
        })
        .then(data => {
          M.toast({
            html: `${this.$t("updated_successfully", {
              name: this.$t(data.data.updateDiscount.name)
            })}`,
            classes: "success toast",
            displayLength: 2000
          });
          this.$router.push({ name: "discounts.index" });
        })
        .catch(error => {
          console.log(error);
          //this.validationError = this.$t("name_unique");
        });

      this.$apollo
        .mutate({
          mutation: createDiscountProduct,
          // Parameters
          variables: {
            discount: parseInt(this.$route.params.id),
            products: this.products
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
          //this.validationError = this.$t("name_unique");
        });
    },
    createDiscount() {
      this.$apollo
        .mutate({
          mutation: createDiscount,
          // Parameters
          variables: {
            type: this.type,
            value: this.value,
            title: this.title,
            percent: this.percent,
            branch: this.branch
          }
        })
        .then(data => {
          M.toast({
            html: `${this.$t("created_successfully", {
              name: this.$t(data.data.createDiscount.name)
            })}`,
            classes: "success toast",
            displayLength: 3000
          });
          this.id = data.data.createDiscount.id;
          this.$router.push({ name: "discounts.index" });
        })
        .catch(() => {
          //console.log(e)
          this.validationError = this.$t("name_unique");
        });

      setTimeout(() => {
        this.$apollo
          .mutate({
            mutation: createDiscountProduct,
            // Parameters
            variables: {
              discount: this.id,
              products: this.products
            }
          })
          .catch(error => {
            console.log(error);
            //this.validationError = this.$t("name_unique");
          });
      }, 2000);
    }
  },
  mounted() {
    this.loadSelects();
  }
};
