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
          <!--End Info-->
        </center>
        <!--End InvoiceTop-->

        <div id="mid">
          <div class="info">
            <h2 class="hresete">Info</h2>
            <p>Email : info@readerscorner.co<br /></p>

            <p v-if="customer && customer.name">
              customer: {{ customer.name }}<br />
            </p>
            <p v-if="customer && customer.email">
              customer email: {{ customer.email }}<br />
            </p>
            <p v-if="id">Invoice no : #{{ id }}<br /></p>
            <p>Invoice Date : #{{ now }}<br /></p>
          </div>
        </div>
        <!--End Invoice Mid-->

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
                  <p class="itemtext">{{ qtys[index] }}</p>
                </td>
                <td class="tableitem">
                  <p class="itemtext">EGP{{ product.price * qtys[index] }}</p>
                </td>
              </tr>
              <tr class="tabletitle">
                <td></td>
                <td></td>
                <td class="Rate"><h2 class="hresete">subtotal</h2></td>
                <td class="payment">
                  <h2 class="hresete">EGP{{ total }}</h2>
                </td>
              </tr>
              <tr class="tabletitle" v-if="discount">
                <td></td>
                <td></td>
                <td class="Rate"><h2 class="hresete">discount</h2></td>
                <td class="payment" v-if="this.discountType == 'percent'">
                  <h2 class="hresete">%{{ discount }}</h2>
                </td>
                <td class="payment" v-else>
                  <h2 class="hresete">{{ parseInt(discountValue) }}</h2>
                </td>
              </tr>

              <tr class="tabletitle">
                <td></td>
                <td></td>
                <td class="Rate"><h2 class="hresete">Total</h2></td>
                <td class="payment">
                  <h2 class="hresete">
                    EGP{{ parseInt(total - discountValue) }}
                  </h2>
                </td>
              </tr>
            </table>
          </div>
          <!--End Table-->
        </div>
        <!--End InvoiceBot-->
      </div>
      <!--End Invoice-->
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
                        <div class="input-field col s12">
                          <select id="type" v-model="discountType">
                            <option value="" disabled="none">{{
                              $t("discount_type")
                            }}</option>
                            <option value="value">{{ $t("value") }}</option>
                            <option value="percent">{{ $t("percent") }}</option>
                          </select>
                          <label
                            for="type"
                            :class="discountType ? 'active' : ''"
                            >{{ $t("discount_type") }}</label
                          >
                          <div class="message">
                            {{ validation.firstError("type") }}
                          </div>
                        </div>
                      </div>
                      <div class="row" v-if="this.discountType">
                        <div
                          class="input-field col s12"
                          :class="{ error: validation.hasError('discount') }"
                        >
                          <input v-model="discount" id="discount" type="text" />
                          <label
                            for="discount"
                            :class="discount ? 'active' : ''"
                            >{{ $t("discount") }}</label
                          >
                          <div class="message">
                            {{ validation.firstError("discount") }}
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div
                          class="input-field col s12"
                          :class="{ error: validation.hasError('note') }"
                        >
                          <input v-model="note" id="note" type="text" />
                          <label for="note" :class="note ? 'active' : ''">{{
                            $t("note")
                          }}</label>
                          <div class="message">
                            {{ validation.firstError("note") }}
                          </div>
                        </div>
                      </div>
                      <div class="row" v-if="!isPos">
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

                      <div class="row">
                        <div
                          class="input-field col s12"
                          :class="{ error: validation.hasError('customer') }"
                        >
                          <select id="customer" v-model="customer">
                            <option value="" disabled="none">{{
                              $t("select_customer")
                            }}</option>
                            <option
                              v-for="customer in allCustomers"
                              :key="customer.id"
                              :value="customer"
                              >{{ customer.name }}</option
                            >
                          </select>
                          <label
                            for="customers"
                            :class="customer ? 'active' : ''"
                            >{{ $t("customers") }}</label
                          >
                          <div class="message">
                            <span v-if="points">
                              {{ $t("points") }}{{ points }}
                            </span>
                            {{ validation.firstError("customer") }}
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div
                          class="input-field col s12"
                          :class="{ error: validation.hasError('payment') }"
                        >
                          <select id="payment" v-model="payment">
                            <option value="" disabled="none">{{
                              $t("payment_method")
                            }}</option>
                            <option
                              v-for="i in payments.length"
                              :key="i"
                              :value="payments[i - 1]"
                              >{{ $t(payments[i - 1]) }}</option
                            >
                          </select>
                          <label
                            for="customers"
                            :class="customer ? 'active' : ''"
                            >{{ $t("customers") }}</label
                          >
                          <div class="message">
                            {{ validation.firstError("customer") }}
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="input-field col s12">
                          <label class="checkbox">
                            <input v-model="remainHere" type="checkbox" />
                            <span>{{ $t("remain_here") }}</span>
                          </label>
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
                                        v-model="qtys[index]"
                                      />
                                      <!-- <i class="material-icons" @click="decreaseQty(index)">delete</i> -->
                                    </div>
                                  </td>
                                  <td>EGP{{ product.price * qtys[index] }}</td>
                                  <td>
                                    <i
                                      class="material-icons"
                                      @click="removeProduct(index)"
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
                                <tr class="border-none" v-if="discount">
                                  <td colspan="3"></td>
                                  <td v-if="this.discountType == 'percent'">
                                    {{
                                      $t("discountPercent", {
                                        percent: this.discount
                                      })
                                    }}
                                  </td>
                                  <td v-else>{{ $t("discount") }}</td>
                                  <td>{{ parseInt(discountValue) }}</td>
                                </tr>
                                <tr class="border-none">
                                  <td colspan="3"></td>
                                  <td class="cyan white-text pl-1">
                                    {{ $t("total") }}
                                  </td>
                                  <td class="cyan strong white-text">
                                    EGP{{ parseInt(total - discountValue) }}
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
import OrdersMixin from "@/mixins/EditAddOrdersMixin.js";

export default {
  name: "edit-add-roles",
  mixins: [OrdersMixin]
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
