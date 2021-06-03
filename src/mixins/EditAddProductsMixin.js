import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import M from "materialize-css";
import SimpleVueValidation from "simple-vue-validator";
import {
  createProduct,
  updateProduct,
  productQuery,
  createStock,
  allProducts,
  allBranches
} from "@/graphql/queries/queries.js";
const Validator = SimpleVueValidation.Validator;
export default {
  components: {
    Breadcrumbs
  },
  data() {
    return {
      path: [{ title: "products", route: "products.index" }],
      product: {},
      name: "",
      id: "",
      branch: "",
      isFound: false,
      isbn: "",
      price: "",
      purchased_price: "",
      qty: "",
      productQty: 0,
      allProducts: [],
      title: "create_product",
      validationError: "",
      fregment: ""
    };
  },
  validators: {
    name(value) {
      return Validator.value(value)
        .required()
        .maxLength(250);
    },
    isbn(value) {
      return Validator.value(value)
        .required()
        .maxLength(13);
    },
    price(value) {
      return Validator.value(value)
        .required()
        .digit()
        .maxLength(5);
    },
    purchased_price(value) {
      return Validator.value(value)
        .required()
        .digit()
        .maxLength(5);
    },
    qty(value) {
      return Validator.value(value)
        .required()
        .digit()
        .maxLength(5);
    }
  },

  apollo: {
    product() {
      return {
        query: productQuery,
        variables() {
          return {
            id: parseInt(this.$route.params.id)
          };
        },
        result({ data: { product } }) {
          this.name = product.name;
          this.isbn = product.isbn;
          this.price = product.price;
          this.purchased_price = product.purchased_price;
          this.qty = product.qty;
          this.title = `edit`;
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
    isbn() {
      let product = this.allProducts.filter(product => {
        return product.isbn == this.isbn ? product : "";
      });
      let firstProduct;
      if (product[0]) {
        firstProduct = product[0];
        this.name = firstProduct.name;
        this.price = firstProduct.price;
        this.id = firstProduct.id;
        this.productQty = firstProduct.qty;
        this.purchased_price = firstProduct.purchased_price;
        this.isFound = true;
      } else {
        this.isFound = false;
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
      this.product
        ? this.updateProduct()
        : this.isFound
        ? this.updateStock(
            this.id,
            parseInt(this.qty) + parseInt(this.productQty),
            true
          )
        : this.createProduct();
    },
    updateProduct() {
      this.$apollo
        .mutate({
          mutation: updateProduct,
          // Parameters
          variables: {
            id: parseInt(this.$route.params.id),
            name: this.name,
            isbn: this.isbn,
            price: this.price,
            purchased_price: this.purchased_price
          }
        })
        .then(data => {
          M.toast({
            html: `${this.$t("updated_successfully", {
              name: this.$t(data.data.updateProduct.name)
            })}`,
            classes: "success toast",
            displayLength: 2000
          });
          this.$router.push({ name: "products.index" });
        });
      this.updateStock(parseInt(this.$route.params.id));
    },

    createProduct() {
      this.$apollo
        .mutate({
          mutation: createProduct,
          // Parameters
          variables: {
            name: this.name,
            isbn: this.isbn,
            price: this.price,
            purchased_price: this.purchased_price
          }
        })
        .then(data => {
          M.toast({
            html: `${this.$t("created_successfully", {
              name: this.$t(data.data.createProduct.name)
            })}`,
            classes: "success toast",
            displayLength: 3000
          });
          this.id = data.data.createProduct.id;
          this.$router.push({ name: "products.index" });
        })
        .catch(() => {
          //console.log(e)
          this.validationError = this.$t("name_unique");
        });

      setTimeout(() => {
        this.updateStock(this.id);
      }, 2000);
    },
    updateStock(id, qty, redirect) {
      qty = qty || this.qty;
      redirect = redirect || false;
      this.$apollo
        .mutate({
          mutation: createStock,
          // Parameters
          variables: {
            product: id,
            branch: parseInt(this.branch),
            qty: qty
          }
        })
        .then(() => {
          if (redirect) {
            M.toast({
              html: `${this.$t("updated_successfully", {
                name: this.$t(this.name)
              })}`,
              classes: "success toast",
              displayLength: 2000
            });
            this.$router.push({ name: "products.index" });
          }
        });
    }
  },
  mounted() {
    this.loadSelects();
  }
};
