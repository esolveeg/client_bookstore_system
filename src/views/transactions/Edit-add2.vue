<template>
  <div class="row">
    <!-- <Breadcrumbs :title="title" :path="path" :fregment="fregment" /> -->
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
                <form
                  @keydown="form.errors.clear($event.target.id)"
                  autocomplete="off"
                  @submit.prevent="onSubmit()"
                >
                  <div class="row">
                    <div class="col s12 l6">
                      <auto-complete
                        class="font-sans"
                        url="products"
                        :params="autoCompleteParams"
                        fieldName="product"
                        type="text"
                        :hasErr="form.errors.has('product')"
                        :errMsg="form.errors.get('product')"
                      />
                      <!-- <select-box :validation="''" :options='discountData' field="discount"  fieldName="discount_value" :hasErr="form.errors.has('discount')" :errMsg="form.errors.get('discount')"/> -->

                      <div
                        class="row"
                        style="margin-top:20px"
                        v-if="$route.name != 'transactions.approve'"
                      >
                        <div class="input-field col s12">
                          <select id="payment" v-model="form.branch">
                            <option value="">{{ $t("none") }}</option>
                            <option
                              :value="branch.id"
                              v-for="branch in allBranches"
                              :key="`from_${branch.id}`"
                              >{{ branch.name }}</option
                            >
                          </select>
                          <label
                            style="top:0 !important"
                            for="branch"
                            class="active"
                            >{{ $t("branch") }}</label
                          >

                          <span
                            v-if="form.errors.has('branch')"
                            class="msg is-danger"
                            v-text="$t(form.errors.get('branch'))"
                          ></span>
                        </div>
                      </div>
                      <div
                        class="row"
                        style="margin-top:20px"
                        v-if="$route.name != 'transactions.approve' && !branch"
                      >
                        <div class="input-field col s12">
                          <select id="payment" v-model="form.from_branch">
                            <option value="">{{ $t("none") }}</option>
                            <option
                              :value="branch.id"
                              v-for="branch in allBranches"
                              :key="`from_${branch.id}`"
                              >{{ branch.name }}</option
                            >
                          </select>
                          <label
                            style="top:0 !important"
                            for="from_branch"
                            class="active"
                            >{{ $t("from_branch") }}</label
                          >

                          <span
                            v-if="form.errors.has('from_branch')"
                            class="msg is-danger"
                            v-text="$t(form.errors.get('from_branch'))"
                          ></span>
                        </div>
                      </div>
                      <div
                        class="row"
                        style="margin-top:20px"
                        v-if="$route.name == 'transactions.approve'"
                      >
                        <div class="input-field col s12">
                          <div class="switch">
                            <label>
                              {{ $t("confirm_approve") }}
                              <input type="checkbox" v-model="confirmApprove" />
                              <span class="lever"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <!-- <div
                        class="row"
                        v-if="$route.name == 'transactions.approve'" >
                        <div class="input-field col s12">
                          <div
                            class="switch"
                            v-for="filter in switchers"
                            :key="filter.id"
                          >
                            <label>
                              {{ $t("confirm_approve") }}
                              <input type="checkbox" v-model="confirmApprove" />
                              <span class="lever"></span>
                            </label>
                          </div>
                        </div>
                      </div> -->
                      <!-- <select-box
                        v-if="branch == ''"
                        :options="allBranches"
                        field="branch"
                        @input="selectFromBranch"
                        v-model="form.from_branch"
                        fieldName="from_branch"
                        :hasErr="form.errors.has('from_branch')"
                        :errMsg="form.errors.get('from_branch')"
                      />
                      <select-box
                        v-if="branch == ''"
                        :options="allBranches"
                        field="branch"
                        @input="selectBranch"
                        v-model="form.branch"
                        fieldName="branch"
                        :hasErr="form.errors.has('branch')"
                        :errMsg="form.errors.get('branch')"
                      /> -->
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
                                  <th data-field="uprice">
                                    {{ $t("unit_price") }}
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
                                  <td>EGP{{ product.price }}</td>
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
                                      @click="deleteProduct(index)"
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
                  <submit-btn
                    :isDisabled="form.errors.any() || disablBtn"
                    :isLoading="form.isLoading"
                    title="save"
                    v-if="form.branch && confirmApprove"
                  />
                  <submit-btn v-else :isDisabled="true" title="save" />
                </form>
                <div class="row" v-if="$route.name == 'transactions.approve'">
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
                                <th data-field="status">approve</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(product, index) in reportProducts"
                                :key="index"
                                :class="
                                  getPivotQty(product.isbn) ==
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
                                    getPivotQty(product.isbn) -
                                      parseInt(getQty(product.isbn))
                                  }}
                                </td>
                                <td>
                                  <span
                                    v-if="
                                      getPivotQty(product.isbn) ==
                                        getQty(product.isbn)
                                    "
                                  >
                                    {{ $t("approved") }}
                                  </span>
                                  <span
                                    v-else-if="
                                      getPivotQty(product.isbn) >
                                        getQty(product.isbn)
                                    "
                                  >
                                    {{ $t("plus") }}
                                  </span>
                                  <span v-else>
                                    {{ $t("minus") }}
                                  </span>
                                </td>
                                <td
                                  @click="approveProduct(product)"
                                  style="cursor: pointer;"
                                >
                                  <i class="material-icons">check</i>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Form from "@/classes/Form";

import AutoComplete from "@/components/inputs/AutoComplete.vue";
import store from "@/store/index";
import SubmitBtn from "@/components/inputs/SubmitBtn.vue";
import M from "materialize-css";

export default {
  name: "edit-add-orders",

  data() {
    return {
      title: "create_transaction",
      reportProducts: [],
      printing: false,
      confirmApprove: false,
      percent: 0,
      order: {},
      path: [{ title: "transactions", route: "transactions.index" }],
      fregment: "",
      autoCompleteParams: {
        offset: 0,
        no: 10,
        sort_by: "",
        sort_func: ""
      },
      form: new Form({
        products: [],
        from_branch: "",
        branch: "",
        approved: 0
      }),
      btns: []
    };
  },
  watch: {},
  mounted() {
    if (this.$route.params.id) {
      this.getTransaction();
    }

    if (this.$route.name != "transactions.approve") {
      this.confirmApprove = true;
    }
    this.loadSelects();
  },
  computed: {
    products() {
      return store.getters["order/products"];
    },
    disablBtn() {
      return store.getters["order/disablBtn"];
    },
    allBranches() {
      return store.getters["order/allBranches"];
    },

    branch() {
      return localStorage.getItem("branch")
        ? localStorage.getItem("branch")
        : "";
    }
  },
  components: {
    "submit-btn": SubmitBtn,
    "auto-complete": AutoComplete
  },
  methods: {
    approveProduct(product) {
      let found = false;
      this.products.forEach(prod => {
        if (prod.id == product.id) {
          found = true;
        }
      });
      !found ? this.products.push(product) : "";
    },
    getQty(isbn) {
      let product = this.products.filter(product => {
        return product.isbn == isbn ? product : "";
      });
      return product[0] ? product[0].qty : 0;
    },
    getName(isbn) {
      let product = this.products.filter(product => {
        return product.isbn == isbn ? product : "";
      });
      return product[0].name;
    },
    getPivotQty(isbn) {
      let product = this.reportProducts.filter(product => {
        return product.isbn == isbn ? product : "";
      });
      return product[0] ? product[0].qty : 0;
    },
    loadSelects() {
      let selects = document.querySelectorAll("select");
      selects.forEach(select => {
        setTimeout(() => {
          M.FormSelect.init(select, {});
        }, 2000);
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
        location.reload();
      }, 1000);
    },
    selectBranch(val) {
      this.form.branch = val;
    },
    selectFromBranch(val) {
      this.form.from_branch = val;
    },

    setProduct() {
      // console.log(val)
    },
    deleteProduct(index) {
      store.commit("order/deleteProduct", index);
    },
    async onSubmit() {
      // this.printData();
      this.form.products = await this.products;
      // this.branch ? (this.form.from_branch = this.branch) : "";
      if (this.$route.params.id) {
        if (this.$route.name == "transactions.approve") {
          this.form.approved = 1;
        }
        this.form
          .post(`transaction/${this.$route.params.id}/edit`)
          .then(resp => {
            this.transaction = resp.transaction;
            this.products = resp.products;
            M.toast({
              html: `${this.$t("edited_successfully", {
                name: "transaction"
              })}`,
              classes: "success toast",
              displayLength: 3000
            });
            store.commit("order/setProducts", []);
            this.$router.push({ name: "transactions.index" });
          });
      } else {
        this.form.post("transaction/create").then(resp => {
          this.transaction = resp.transaction;
          this.products = resp.products;
          M.toast({
            html: `${this.$t("created_successfully", {
              name: "transaction"
            })}`,
            classes: "success toast",
            displayLength: 3000
          });
          store.commit("order/setProducts", []);
          this.$router.push({ name: "transactions.index" });
        });
      }

      // console.log(this.form);
    },

    getTransaction() {
      this.$http.get(`transaction/${this.$route.params.id}`).then(response => {
        if (this.$route.name == "transactions.approve") {
          this.reportProducts = response.data.products;
          this.form.from_branch = response.data.transaction.from_branch;
          this.form.branch = response.data.transaction.branch_id;

          return;
        }
        this.form.products = response.data.products;
        this.form.from_branch = response.data.transaction.from_branch;
        this.form.branch = response.data.transaction.branch_id;
        //   this.form.from_branch = response.transaction.from_branch;
        store.dispatch("order/setProducts", response.data.products);

        //   this.transaction = response.transaction;
        // console.log(this.products);
      });
    }
    // getTransaction() {
    //   this.$http.get(`transaction/${this.$route.params.id}`).then((response) => {
    //     console.log(this.$route.name);
    //     if(this.$route.name == 'transactions.approve'){
    //       this.reportProducts = response.data.products;
    //       this.form.from_branch = response.data.transaction.from_branch;
    //       this.form.branch = response.data.transaction.branch_id;
    //      console.log('approove')
    //     }else{
    //      console.log('editss')

    //       this.form.products = response.data.products;
    //       this.form.from_branch = response.data.transaction.from_branch;
    //       this.form.branch = response.data.transaction.branch_id;
    //        this.form.from_branch = response.transaction.from_branch;
    //      store.dispatch('order/setProducts' , response.data.products )
    //     console.log(this.products);
    //        this.transaction = response.transaction;
    //     // //  console.log(this.products);

    //     }
    //   });
    // }
  },
  beforeDestroy() {
    store.commit("order/setProducts", []);
  }
};
</script>

<style lang="scss">
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

.hresete {
  font-size: 3rem !important;
  margin: 0 !important;
}
///////////////////////
#invoice-POS {
  padding: 2mm;
  margin: 0 auto;
  width: 44mm;
  background: #fff;
  display: none;

  ::selection {
    background: #f31544;
    color: #fff;
  }
  ::moz-selection {
    background: #f31544;
    color: #fff;
  }
  h1 {
    font-size: 1.5em;
    color: #222;
  }
  .hresete {
    font-size: 0.9rem !important;
  }
  h2 {
    font-size: 0.9rem !important;
  }
  h3 {
    font-size: 1.2em;
    font-weight: 300;
    line-height: 2em;
  }
  p {
    font-size: 0.7em;
    color: #666;
    line-height: 1.2em;
  }

  #top,
  #mid,
  #bot {
    /* Targets all id with 'col-' */
    border-bottom: 1px solid #eee;
  }

  #top {
    min-height: 100px;
  }
  #mid {
    min-height: 80px;
  }
  #bot {
    min-height: 50px;
  }

  .info {
    display: block;
    //float:left;
    margin-left: 0;
  }
  .title {
    float: right;
  }
  .title p {
    text-align: right;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  td {
    //padding: 5px 0 5px 15px;
    //border: 1px solid #EEE
  }
  .tabletitle {
    //padding: 5px;
    font-size: 0.5em;
  }
  .service {
    border-bottom: 1px solid #eee;
  }
  .item {
    width: 24mm;
  }
  .itemtext {
    font-size: 0.5em;
  }

  #legalcopy {
    margin-top: 5mm;
  }
}
</style>
