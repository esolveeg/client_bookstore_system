<template>
  <div class="row">
    <Breadcrumbs :title="title" :path="path" :fregment="fregment" />
    <div class="col s12 mt-65">
      <div class="container">
        <!-- Current balance & total transactions cards-->
        <div class="row mt-4">
          <div class="col s12 m12 l12">
            <!-- Current Balance -->
            <h5 class="form-title">
              <i class="material-icons app-header-icon text-top"
                >perm_identity</i
              >
              {{ $t(title, { fregment }) }}
            </h5>

            <div class="card animated  fadeInLeft ">
              <div class="card-content">
                <form @submit.prevent="submitted()">
                  <div class="card-alert danger card" v-if="validationError">
                    <div class="card-content">
                      <p>
                        <i class="material-icons">error</i>{{ validationError }}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col s12 l6">
                      <div class="row">
                        <div
                          class="input-field col s12"
                          :class="{ error: validation.hasError('isbn') }"
                        >
                          <i
                            class="material-icons prefix isbn-clear active"
                            @click="isbn = ''"
                            >clear</i
                          >
                          <input
                            v-model="product"
                            id="isbn"
                            type="text"
                            class="input-isbn autocomplete"
                            autocomplete="off"
                            autofocus
                          />
                          <label
                            for="isbn"
                            class="label-isbn active"
                            :class="isbn ? 'active' : ''"
                            >{{ $t("product") }}</label
                          >
                          <div class="message">
                            <span
                              v-if="this.qtyIncreased"
                              class="success-text"
                              >{{ $t("qty_increased") }}</span
                            >
                            <span
                              v-if="this.productAlreadyAdded"
                              class="error-text"
                              >{{ $t("poduct_already_add") }}</span
                            >
                            <span
                              v-if="this.productAdded"
                              class="success-text"
                              >{{ $t("poduct_added_successfully") }}</span
                            >
                            {{ validation.firstError("isbn") }}
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div
                          class="input-field col s12"
                          :class="{ error: validation.hasError('branch') }"
                        >
                          <select id="branch" v-model="branch">
                            <option value="" disabled="none">{{
                              $t("select_branch")
                            }}</option>
                            <option
                              v-for="branch in allBranches"
                              :key="branch.id"
                              :value="branch.id"
                              >{{ branch.name }}</option
                            >
                          </select>
                          <label
                            for="branches"
                            :class="branch ? 'active' : ''"
                            >{{ $t("branches") }}</label
                          >
                          <div class="message">
                            {{ validation.firstError("branch") }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col s12 l6">
                      <div class="row">
                        <div class="input-field col s12">
                          <div class="products">
                            {{ $t("products") }}
                          </div>

                          <div class="invoice__table">
                            <table class="highlight responsive-table">
                              <thead>
                                <tr>
                                  <th data-field="no">{{ $t("no") }}</th>
                                  <th data-field="item">{{ $t("item") }}</th>
                                  <th data-field="item">{{ $t("price") }}</th>
                                  <th data-field="item">
                                    {{ $t("purchased_price") }}
                                  </th>
                                  <th data-field="price">{{ $t("qty") }}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(product, index) in products"
                                  :key="index"
                                >
                                  <td>{{ index + 1 }}.</td>
                                  <td>{{ product.name }}</td>
                                  <td>{{ product.price }}</td>
                                  <td>{{ product.purchased_price }}</td>
                                  <td>
                                    <div class="counter">
                                      <!-- <i class="material-icons" @click="increaseQty(index)">add</i>   -->
                                      <input
                                        class="border-none w2"
                                        v-model="qtys[index]"
                                      />
                                      <!-- <i class="material-icons" @click="decreaseQty(index)">delete</i> -->
                                    </div>
                                  </td>
                                  <td>
                                    <i
                                      class="material-icons"
                                      @click="removeProduct(index)"
                                      style="cursor:pointer"
                                      >delete</i
                                    >
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="input-field col s12">
                      <button
                        class="btn create cyan waves-effect waves-light left"
                        type="submit"
                        disabled="disabled"
                        name="action"
                      >
                        {{ $t("save") }}
                        <i class="material-icons right">send</i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import M from "materialize-css";
// import axios from "axios";
import SimpleVueValidation from "simple-vue-validator";
import { allBranches, allProducts } from "@/graphql/queries/queries.js";
const Validator = SimpleVueValidation.Validator;
export default {
  components: {
    Breadcrumbs
  },
  data() {
    return {
      path: [{ title: "products", route: "products.index" }],
      qtyIncreased: false,
      isbn: "",
      product: "",
      productsIds: [],
      qtys: [],
      newQtys: [],
      names: [],
      isbns: [],
      prices: [],
      purchased_prices: [],
      productAlreadyAdded: false,
      productAdded: false,
      products: [],
      id: null,
      branch: "",
      allBranches: [],
      allProducts: [],
      title: "create_product",
      validationError: "",
      fregment: ""
    };
  },
  validators: {
    products(value) {
      return Validator.value(value).required();
    }
  },

  apollo: {
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
    discount() {
      if (this.discountType == "value") {
        this.discountValue = this.discount;
      } else if (this.discountType == "percent") {
        this.discountValue = (this.total * this.discount) / 100;
      }
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
    // async getAmazon() {
    //  await axios
    //     .get(
    //       "https://www.amazon.co.uk/",
    //       {},
    //       {
    //       }
    //     )
    //     .then(response => {
    //       let data = response.data;
    //       // console.log(data);
    //     });
    // },
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
      this.isbn = "";
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
      this.createMultiProducts();
    }
  },
  mounted() {
    this.loadSelects();
    document.addEventListener("keydown", event => {
      if (event.isComposing || event.keyCode === 9 || event.keyCode === 13) {
        return this.submitted();
      }
      // do something
    });
  }
};
</script>
<style lang="scss" scoped>
.form-title {
  font-weight: 700;
  line-height: 3.6rem;
  font-size: 2.64rem;
  margin-bottom: 5rem;
  & i {
    font-size: 3.6rem;
    vertical-align: bottom;
  }
}

label {
  font-size: 1.6rem !important;
}
input,
.checkbox span:not(.lever),
textarea,
select {
  font-size: 1.6rem !important;
  height: 4.2rem !important;
}
.checkbox {
  position: relative;
}
</style>
