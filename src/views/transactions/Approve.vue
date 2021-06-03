<template>
  <div class="row">
    <div id="approve-modal" class="modal">
      <div class="modal-content">
        <h4>Warning</h4>
        <p>A bunch of products found on transaction you weren't added</p>
        <ul>
          <li v-for="(product, index) in notApproved" :key="index">
            {{ index + 1 }} . {{ product }} ({{ getName(product) }})
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn-flat">Close</a>
        <a
          @click="updateTransaction()"
          class="modal-close waves-effect waves-green btn-flat"
          >Agree</a
        >
      </div>
    </div>
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
                <form @submit.prevent="approve()">
                  <div class="row">
                    <div class="col s12 l6">
                      <div class="row">
                        <div
                          class="input-field col s12"
                          :class="{ error: validation.hasError('product') }"
                        >
                          <i
                            class="material-icons prefix isbn-clear"
                            @click="product = ''"
                            >clear</i
                          >
                          <input
                            v-model="product"
                            id="isbn"
                            type="text"
                            class="input-isbn autocomplete"
                            autocomplete="off"
                          />
                          <label
                            for="isbn"
                            class="label-isbn"
                            :class="isbn ? 'active' : ''"
                            >{{ $t("product") }}</label
                          >
                          <div class="message">
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
                                  <th data-field="no">No</th>
                                  <th data-field="item">Item</th>
                                  <th data-field="price">Qty</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(product, index) in products"
                                  :key="index"
                                >
                                  <td>{{ index + 1 }}.</td>
                                  <td>{{ product.name }}</td>
                                  <td>
                                    <div class="counter">
                                      <!-- <i class="material-icons" @click="increaseQty(index)">add</i>   -->
                                      <input
                                        class="border-none w2"
                                        v-model="product.qty"
                                      />
                                      <!-- <i class="material-icons" @click="decreaseQty(index)">delete</i> -->
                                    </div>
                                  </td>
                                  <td>
                                    <i
                                      class="material-icons"
                                      @click="removeProduct(product.id)"
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
                        name="action"
                        disabled="disabled"
                      >
                        {{ $t("approve") }}
                        <i class="material-icons right">send</i>
                      </button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col s12 l12">
                      <div class="row">
                        <div class="input-field col s12">
                          <div class="products">
                            {{ $t("report") }}
                          </div>

                          <div class="invoice__table">
                            <table class="highlight responsive-table">
                              <thead>
                                <tr>
                                  <th data-field="no">No</th>
                                  <th data-field="isbn">Isbn</th>
                                  <th data-field="item">Item</th>
                                  <th data-field="qty">Qty</th>
                                  <th data-field="difference">difference</th>
                                  <th data-field="status">status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(product, index) in reportProducts"
                                  :key="index"
                                  :class="
                                    getPivotQty(product.index) ==
                                    getQty(product.isbn)
                                      ? 'success'
                                      : 'danger'
                                  "
                                >
                                  <td>{{ index + 1 }}.</td>
                                  <td>{{ product.isbn }}</td>
                                  <td>{{ product.name }}</td>
                                  <td>{{ getQty(product.isbn) }}</td>

                                  <td>
                                    {{
                                      getPivotQty(product.index) -
                                        parseInt(getQty(product.isbn))
                                    }}
                                  </td>
                                  <td>
                                    <span
                                      v-if="
                                        getPivotQty(product.index) ==
                                          getQty(product.isbn)
                                      "
                                    >
                                      {{ $t("approved") }}
                                    </span>
                                    <span
                                      v-else-if="
                                        getPivotQty(product.index) >
                                          getQty(product.isbn)
                                      "
                                    >
                                      {{ $t("plus") }}
                                    </span>
                                    <span v-else>
                                      {{ $t("minus") }}
                                    </span>
                                  </td>
                                </tr>
                                <tr
                                  v-for="(product, index) in notFoundProducts"
                                  :key="index"
                                  class="danger"
                                >
                                  <td>
                                    {{ reportProducts.length + index + 1 }}.
                                  </td>
                                  <td>{{ product.isbn }}</td>
                                  <td>{{ product.name }}</td>
                                  <td>{{ getQty(product.isbn) }}</td>

                                  <td>{{ parseInt(getQty(product.isbn)) }}</td>
                                  <td>
                                    {{ $t("notfound_in_transaction") }}
                                  </td>
                                </tr>
                                <tr
                                  v-for="(product, index) in notApproved"
                                  :key="index"
                                  class="danger"
                                >
                                  <td>
                                    {{
                                      reportProducts.length +
                                        notFoundProducts.length +
                                        index +
                                        1
                                    }}.
                                  </td>
                                  <td>{{ product }}</td>
                                  <td>{{ getName(product) }}</td>
                                  <td>{{ getQty(product) }}</td>

                                  <td>{{ parseInt(getQty(product)) }}</td>
                                  <td>
                                    {{ $t("notfound_in_check") }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
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
import M from "materialize-css";
import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import SimpleVueValidation from "simple-vue-validator";
import {
  transactionQuery,
  allProducts,
  updateTransactionProduct,
  updateTransaction
} from "@/graphql/queries/queries.js";
const Validator = SimpleVueValidation.Validator;
export default {
  name: "approve-transactions",
  data() {
    return {
      transaction: "",
      allProducts: [],
      product: "",
      path: [],
      isbn: "",
      qtyIncreased: false,
      currentProducts: [],
      reportProducts: [],
      notFoundProducts: [],
      productsIds: [],
      notApproved: [],
      checkMe: "",
      productAdded: false,
      productAlreadyAdded: false,
      fregment: "",
      validationError: "",
      qtys: [],
      title: "approve_transaction",
      products: []
    };
  },
  components: {
    Breadcrumbs
  },
  methods: {
    removeProduct(id) {
      this.products = this.products.filter(product => {
        return product.id !== id ? product : "";
      });
      this.productsIds = this.productsIds.filter(product => {
        return product.id !== id ? product : "";
      });
      this.reportProducts = this.reportProducts.filter(product => {
        return product.id !== id ? product : "";
      });
      this.notFoundProducts = this.notFoundProducts.filter(product => {
        return product.id !== id ? product : "";
      });
    },
    approve() {
      let isbns = [];
      let transactionIsbns = [];
      this.reportProducts.forEach(product => {
        isbns.push(product.isbn);
      });
      this.transaction.products.forEach(product => {
        transactionIsbns.push(product.isbn);
      });
      let intersection = transactionIsbns.filter(isbn => {
        return isbns.includes(isbn) ? "" : isbn;
      });
      if (intersection.length > 0) {
        this.notApproved = intersection;
        let elems = document.querySelectorAll(".modal");
        let elem = document.querySelector("#approve-modal");
        M.Modal.init(elems, {});
        let instance = M.Modal.getInstance(elem);
        instance.open();
      } else {
        this.updateTransaction();
      }
    },
    updateTransaction() {
      this.products.forEach(product => {
        this.qtys.push(product.qty);
      });
      this.$apollo
        .mutate({
          mutation: updateTransactionProduct,
          // Parameters
          variables: {
            transaction: parseInt(this.$route.params.id),
            qtys: this.qtys,
            branch: this.transaction.branch.id,
            products: this.productsIds
          }
        })
        .then(() => {
          this.$apollo
            .mutate({
              mutation: updateTransaction,
              // Parameters
              variables: {
                id: parseInt(this.$route.params.id),
                branch: this.transaction.branch.id,
                approved: true
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
            })
            .catch(() => {
              //console.log(e)
              this.validationError = this.$t("branch_required");
            });
        });
    },
    getQty(isbn) {
      let product = this.allProducts.filter(product => {
        return product.isbn == isbn ? product : "";
      });
      return product[0].qty;
    },
    getName(isbn) {
      let product = this.allProducts.filter(product => {
        return product.isbn == isbn ? product : "";
      });
      return product[0].name;
    },
    getPivotQty(index) {
      return this.transaction.productsPivot[index].qty;
    },
    toObject(arr) {
      let rv = {};
      for (var i = 0; i < arr.length; ++i) {
        arr[i] !== undefined ? (rv[arr[i].name] = null) : "";
        arr[i] !== undefined ? (rv[arr[i].isbn] = null) : "";
      }
      return rv;
    }
  },
  validators: {
    products(value) {
      return Validator.value(value).required();
    }
  },
  watch: {
    "validation.errors"() {
      const btn = document.querySelector(".input-field button");
      if (this.validation.errors.length > 1) {
        btn.setAttribute("disabled", "disabled");
      } else {
        if (!this.transaction) {
          this.validation.touchedRecords.length > 1
            ? btn.removeAttribute("disabled")
            : "";
        } else {
          btn.removeAttribute("disabled");
        }
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
          this.products[index].qty = this.products[index].qty + 1;
          setTimeout(() => {
            this.qtyIncreased = false;
            this.product = "";
          }, 1000);
        } else {
          this.productAdded = true;
          product[0].qty = 1;

          this.products.push(product[0]);
          this.productsIds.push(product[0].id);

          setTimeout(() => {
            this.productAdded = false;
          }, 3000);
          this.product = "";
        }

        this.checkMe = product[0].id;
        let transactionIds = [];
        this.transaction.products.forEach(pro => {
          transactionIds.push(pro["id"]);
        });
        if (transactionIds.includes(this.checkMe)) {
          let checkedProduct = {
            id: product[0].id,
            isbn: product[0].isbn,
            name: product[0].name,
            index: transactionIds.indexOf(this.checkMe)
          };
          let filter = this.reportProducts.filter(filterProduct => {
            return filterProduct.isbn == product[0].isbn ? filterProduct : "";
          });
          filter.length > 0 ? "" : this.reportProducts.push(checkedProduct);
        } else {
          let filter = this.notFoundProducts.filter(filterProduct => {
            return filterProduct.isbn == product[0].isbn ? filterProduct : "";
          });
          filter.length > 0
            ? ""
            : this.notFoundProducts.push({
                id: product[0].id,
                isbn: product[0].isbn,
                name: product[0].name
              });
        }
      }

      setTimeout(() => {
        btn.removeAttribute("disabled");
      }, 4000);
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
        }
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
  }
};
</script>
<style scoped>
@import url("../../sass/components/_invoice.scss");
.isbn-clear {
  left: auto;
  right: 0;
  cursor: pointer;
}
.input-isbn {
  margin-right: 4.5rem;
  margin-left: 0rem !important;
}
.label-isbn {
  margin-left: 0 !important;
}
.counter {
  width: 50px;
  border: 1px solid #ddd;
  padding: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.counter i {
  cursor: pointer;
}
.w2 {
  width: 30px;
}
</style>
