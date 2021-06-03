<template>
  <div class="row">
    <div>
      <div id="invoice-POS">
        <center id="top">
          <div class="info">
            <h2 class="hresete">Readerscorner</h2>
            <img
              src="http://readerscorner.co/storage/settings/May2019/S3fivD7C4Y2oXfnGaEsa.png"
              style="width:120px;height:auto;"
            />
          </div>
        </center>

        <div id="mid">
          <div class="info">
            <h2 class="hresete">Info</h2>
            <p>Email : info@readerscorner.co<br /></p>

            <p v-if="order.id">Invoice no : #{{ order.id }}<br /></p>
            -->
            <p>Invoice Date : #{{ now }}<br /></p>
          </div>
        </div>

        <div id="bot">
          <div id="table">
            <table>
              <tr class="tabletitle">
                <td class="item"><h2 class="hresete">Item</h2></td>
                <td class="Hours"><h2 class="hresete">Price</h2></td>
                <td class="Hours"><h2 class="hresete">Qty</h2></td>
                <td class="Rate"><h2 class="hresete">Sub Total</h2></td>
              </tr>
              <tr
                class="service"
                v-for="(product, index) in products"
                :key="index"
              >
                <td class="tableitem">
                  <p class="itemtext">{{ product.name }}</p>
                </td>
                <td class="tableitem">
                  <p class="itemtext">EGP{{ product.price }}</p>
                </td>
                <td class="tableitem">
                  <p class="itemtext">{{ product.qty }}</p>
                </td>
                <td class="tableitem">
                  <p class="itemtext">EGP{{ product.price * product.qty }}</p>
                </td>
              </tr>
              <tr class="tabletitle">
                <td></td>
                <td></td>
                <td class="Rate"><h2 class="hresete">subtotal</h2></td>
                <td class="payment">
                  <h2 class="hresete" v-if="order.discount">
                    EGP{{ parseInt(order.total) + parseInt(order.discount) }}
                  </h2>
                  <h2 class="hresete" v-else>EGP{{ parseInt(order.total) }}</h2>
                </td>
              </tr>
              <tr class="tabletitle" v-if="order.discount">
                <td></td>
                <td></td>
                <td class="Rate"><h2 class="hresete">discount</h2></td>

                <td class="payment">
                  <h2 class="hresete">{{ order.discount }}</h2>
                </td>
              </tr>

              <tr class="tabletitle">
                <td></td>
                <td></td>
                <td class="Rate"><h2 class="hresete">Total</h2></td>
                <td class="payment">
                  <h2 class="hresete">EGP{{ parseInt(order.total) }}</h2>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

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
                        :field="product"
                        url="products"
                        :params="autoCompleteParams"
                        v-model="product"
                        fieldName="product"
                        type="text"
                        :hasErr="form.errors.has('product')"
                        :errMsg="form.errors.get('product')"
                      />
                      <div class="row" style="margin-top:20px">
                        <div class="input-field col s12">
                          <select id="payment" v-model="form.payment">
                            <option selected value="cash" class="active">{{
                              $t("cash")
                            }}</option>
                            <option value="card">{{ $t("card") }}</option>
                          </select>
                          <label
                            style="top:0 !important"
                            for="payment"
                            class="active"
                            >{{ $t("payment") }}</label
                          >

                          <span
                            v-if="form.errors.has('email')"
                            class="msg is-danger"
                            v-text="$t(form.errors.get('email'))"
                          ></span>
                        </div>
                      </div>

                      <select-box
                        :options="discountData"
                        v-model="discountType"
                        @input="selectDiscountType"
                        field="discount"
                        fieldName="discount_type"
                        :hasErr="form.errors.has('discount')"
                        :errMsg="form.errors.get('discount')"
                      />
                      <text-field
                        v-if="discountType && discountType == 'value'"
                        class="font-sans"
                        :field="form.discount"
                        :validation="discountValidation(discountType)"
                        v-model="form.discount"
                        fieldName="discount"
                        type="text"
                        :hasErr="form.errors.has('discount')"
                        :errMsg="form.errors.get('discount')"
                      />
                      <text-field
                        v-if="discountType && discountType == 'percent'"
                        class="font-sans"
                        :field="percent"
                        :validation="discountValidation(discountType)"
                        v-model="percent"
                        fieldName="discount"
                        type="text"
                        :hasErr="form.errors.has('discount')"
                        :errMsg="form.errors.get('discount')"
                      />
                      <!-- <select-box :validation="''" :options='discountData' field="discount"  fieldName="discount_value" :hasErr="form.errors.has('discount')" :errMsg="form.errors.get('discount')"/> -->
                      <div class="row" style="margin-top:20px" v-if="!branch">
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
                      <!-- <select-box
                        v-if="branch == ''"
                        :options="allBranches"
                        field="branch"
                        @input="selectBranch"
                        v-model="form.branch"
                        fieldName="branch"
                        :hasErr="form.errors.has('branch')"
                        :errMsg="form.errors.get('branch')"
                      /> -->
                      <text-field
                        class="font-sans"
                        :field="form.note"
                        :validation="noteValidation"
                        v-model="form.note"
                        fieldName="note"
                        type="text"
                        :hasErr="form.errors.has('note')"
                        :errMsg="form.errors.get('note')"
                      />
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
                                  <th data-field="price">{{ $t("total") }}</th>
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
                                        :value="product.qty"
                                        @input="qtyUpdated($event, product)"
                                      />
                                      <!-- <i class="material-icons" @click="decreaseQty(index)">delete</i> -->
                                    </div>
                                  </td>
                                  <td>EGP{{ product.price * product.qty }}</td>
                                  <td>
                                    <i
                                      class="material-icons"
                                      @click="deleteProduct(index)"
                                      style="cursor:pointer"
                                      >delete</i
                                    >
                                  </td>
                                </tr>
                                <tr class="border-none">
                                  <td colspan="3"></td>
                                  <td>{{ $t("subtotal") }}:</td>
                                  <td>EGP{{ total }}</td>
                                </tr>
                                <tr class="border-none" v-if="discountType">
                                  <td colspan="3"></td>
                                  <td v-if="discountType == 'percent'">
                                    {{
                                      $t("discountPercent", {
                                        percent: percent
                                      })
                                    }}
                                  </td>
                                  <td v-else>{{ $t("discount") }}</td>
                                  <td>{{ form.discount }}</td>
                                </tr>

                                <tr class="border-none">
                                  <td colspan="3"></td>
                                  <td class="cyan white-text pl-1">
                                    {{ $t("total") }}
                                  </td>
                                  <td class="cyan strong white-text">
                                    EGP{{ parseInt(total - form.discount) }}
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
                    :isDisabled="
                      form.errors.any() || disablBtn || products.length == 0
                    "
                    :isLoading="form.isLoading"
                    title="save"
                  />
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
import Form from "@/classes/Form";
import SelectBox from "@/components/inputs/SelectBox.vue";
import TextField from "@/components/inputs/TextField.vue";
import AutoComplete from "@/components/inputs/AutoComplete.vue";
import store from "@/store/index";
import SubmitBtn from "@/components/inputs/SubmitBtn.vue";

export default {
  name: "edit-add-orders",

  data() {
    let today = new Date();
    let now =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let product = "";
    let form = new Form({
      note: "",
      payment: "cash",
      now,
      order: [],
      products: [],
      discount: "",
      branch: "",
      total: 0
    });
    return {
      title: "create_order",
      printing: false,
      percent: 0,
      order: {},
      now,
      discountData: [
        { id: "percent", name: "percent" },
        { id: "value", name: "value" }
      ],
      product,
      path: [{ title: "orders", route: "orders.index" }],
      fregment: "",
      autoCompleteParams: {
        offset: 0,
        no: 10,
        sort_by: "",
        sort_func: ""
      },
      discountType: "",
      form,
      discountPercentValidation: [
        {
          message: "percent",
          regex: /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/
        }
      ],
      discountValueValidation: [
        {
          message: "number",
          regex: /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/
        }
      ],

      noteValidation: [{ message: "max_250", regex: /^.{0,250}$/ }],

      btns: []
    };
  },
  watch: {
    percent() {
      this.form.discount = (this.total * this.percent) / 100;
    },
    total() {
      this.form.discount = (this.total * this.percent) / 100;
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getOrder();
    }
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
    },

    total() {
      return store.getters["order/total"];
    }
  },
  components: {
    "select-box": SelectBox,
    "text-field": TextField,
    "submit-btn": SubmitBtn,
    "auto-complete": AutoComplete
  },
  methods: {
    qtyUpdated(val, product) {
      store.commit("order/updateQty", { product, data: val.target.value });
    },
    printData($redirect) {
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

        $redirect
          ? this.$router.push({ name: "orders.index" })
          : location.reload();
      }, 1000);
    },
    selectBranch(val) {
      this.form.branch = val;
    },
    percentUpdated(val) {
      this.percent = val;
      this.form.discount = val * this.form.total;
      this.form.total = this.form.total - this.form.discount;
    },
    selectDiscountType(val) {
      this.discountType = val;
    },
    selectPaymentData(val) {
      this.form.payment = val;
    },
    discountValidation(type) {
      return type == "percent"
        ? this.discountPercentValidation
        : this.discountValueValidation;
    },
    setProduct() {
      // console.log(val)
    },
    deleteProduct(index) {
      store.commit("order/deleteProduct", index);
    },
    async onSubmit() {
      // this.printData();
      this.form.total = this.total;
      this.form.products = await this.products;
      this.branch ? (this.form.branch = this.branch) : "";
      // console.log(this.form);
      if (this.$route.params.id) {
        this.form.post(`order/${this.$route.params.id}/edit`).then(resp => {
          this.order = resp.order;
          this.products = resp.products;
          this.printData(true);
        });
      } else {
        this.form.post("checkout").then(resp => {
          this.order = resp.order;
          this.products = resp.products;
          this.printData(false);
        });
      }
    },
    getOrder() {
      this.$http.get(`order/${this.$route.params.id}`).then(response => {
        this.form.note = response.data.order.note;
        this.form.payment = response.data.order.payment;
        this.form.payment = response.data.order.payment;
        this.form.discount = response.data.order.discount;
        this.form.branch = response.data.order.branch_id;
        this.form.total = response.data.order.total;
        this.order = response.data.order;
        store.dispatch("order/setProducts", response.data.products);
        this.form.products = response.data.products;
      });
    }
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
