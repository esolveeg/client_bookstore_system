<template>
  <div>
    <div id="main">
      <Breadcrumbs
        :title="`view`"
        :fregment="order.name"
        :btns="btns"
        :path="path"
        @delete="deleteOrder"
        @edit="edit"
      />

      <!-- //////////////// -->
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
              <p>
                Email : info@readerscorner.co<br />
                Invoice no : #{{ order.id }}<br />
                Invoice Date : #{{ order.created_at }}<br />
              </p>
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
                    <p class="itemtext">EGP{{ product.purchased_price }}</p>
                  </td>
                  <td class="tableitem">
                    <p class="itemtext">{{ product.qty }}</p>
                  </td>
                  <td class="tableitem">
                    <p class="itemtext">
                      EGP{{ product.purchased_price * product.qty }}
                    </p>
                  </td>
                </tr>
                <tr class="tabletitle">
                  <td></td>
                  <td></td>
                  <td class="Rate"><h2 class="hresete">subtotal</h2></td>
                  <td class="payment">
                    <h2 class="hresete">EGP{{ order.total }}</h2>
                  </td>
                </tr>

                <tr class="tabletitle">
                  <td></td>
                  <td></td>
                  <td class="Rate"><h2 class="hresete">Total</h2></td>
                  <td class="payment">
                    <h2 class="hresete">EGP{{ order.total }}</h2>
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

      <!-- //////////////////// -->
      <div class="row">
        <div class="col s12 mt-65">
          <div class="container">
            <div class="card animated  fadeInUp ">
              <div class="card-content">
                <div class="row mt-4 " id="printable">
                  <div class="invoice">
                    <div class="invoice__header">
                      <div class="invoice__header--left">
                        <div class="invoice__logo">
                          <img
                            class="invoice__logo--img"
                            src="http://readerscorner.co/storage/settings/May2019/S3fivD7C4Y2oXfnGaEsa.png"
                            alt="company logo"
                          />
                        </div>
                        <div class="invoice__customer" v-if="order.customer">
                          <h6>Recipient</h6>
                          <p class="invoice__customer--name">
                            {{ order.customer.name }}
                          </p>
                          <p
                            class="invoice__customer--phone"
                            v-if="order.customer.phone"
                          >
                            {{ order.customer.phone }}
                          </p>
                        </div>
                      </div>
                      <div class="invoice__header--right">
                        <div class="invoice__details">
                          <div class="invoice__details--no">
                            <p>
                              <span>Invoice No.</span>
                              {{ order.id }}
                            </p>
                          </div>
                          <div class="invoice__details--no">
                            <p>
                              <span>Payment Method.</span>
                              {{ order.payment }}
                            </p>
                          </div>
                          <div class="invoice__details--date">
                            <p>
                              <span>Invoice Date</span>
                              {{ order.created_at }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="invoice__table">
                      <table class="highlight responsive-table">
                        <thead>
                          <tr>
                            <th data-field="no">No</th>
                            <th data-field="item">Isbn</th>
                            <th data-field="item">Item</th>
                            <th data-field="uprice">Unit Price</th>
                            <th data-field="price">Qty</th>
                            <th data-field="price">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(product, index) in products" :key="index">
                            <td>{{ index + 1 }}.</td>
                            <td>{{ product.isbn }}</td>
                            <td>{{ product.name }}</td>
                            <td>EGP{{ product.purchased_price }}</td>
                            <td>{{ product.qty }}</td>
                            <td>
                              EGP{{ product.purchased_price * product.qty }}
                            </td>
                          </tr>
                          <tr class="border-none">
                            <td colspan="4"></td>
                            <td>Sub Total:</td>
                            <td>EGP{{ order.total }}</td>
                          </tr>

                          <tr class="border-none">
                            <td colspan="4"></td>
                            <td class="cyan white-text pl-1">
                              {{ $t("total") }}
                            </td>
                            <td class="cyan strong white-text">
                              EGP{{ order.total }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="print">
                        <a
                          class="btn waves-effect waves-light breadcrumbs-btn import right"
                          @click.prevent="printData('printable')"
                          ><i class="material-icons hide-on-med-and-up bold"
                            >print </i
                          ><span class="hide-on-small-onl"
                            >{{ $t("print") }}
                            <i class="material-icons">print</i></span
                          ></a
                        >
                        <a
                          class="btn waves-effect waves-light breadcrumbs-btn import right"
                          @click.prevent="printData('invoice-POS')"
                          ><i class="material-icons hide-on-med-and-up bold"
                            >print </i
                          ><span class="hide-on-small-onl"
                            >{{ $t("print_receipt") }}
                            <i class="material-icons">print</i></span
                          ></a
                        >
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
import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";

export default {
  name: "viewOutOrder",
  data() {
    return {
      title: "View out coming order",
      order: {},
      products: [],
      btns: [],
      path: [{ title: "outcoming order", route: "outcomingorders.index" }]
    };
  },
  methods: {
    printData(className) {
      const prtHtml = document.getElementById(className).parentElement
        .innerHTML;

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
    },
    getOrder() {
      this.$http.get(`outorder/${this.$route.params.id}`).then(response => {
        this.order = response.data.order;
        this.products = response.data.products;
      });
    }
  },

  components: {
    Breadcrumbs
  },
  created() {
    this.getOrder();
  }
};
</script>
<style lang="scss" scoped>
.invoice {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  &__logo {
    &--img {
      margin-bottom: 2%;
      width: 50%;
    }
    &--details {
      & p {
        font-size: var(--font-size);
        color: var(--light-text-color);
        margin-bottom: 5px !important;
      }
    }
  }
  &__title {
    margin-bottom: 45%;
    & h4 {
      font-weight: 600;
      font-size: 3.7rem;
    }
  }
  &__customer {
    & h6 {
      margin: 3% 0 !important;
      font-size: 1.8rem;
      color: var(--font-color);
      font-weight: 600;
      text-transform: uppercase;
    }
    p {
      text-transform: capitalize;
      color: var(--light-text-color) !important;
      margin: 2px 0 !important;
    }
  }
  &__details {
    &--no,
    &--date {
      & p {
        color: var(--light-text-color) !important;
        margin: 2px 0 !important;
      }
      & span {
        color: var(--text-color) !important;
        text-transform: uppercase;
      }
    }
    &--date {
      & p {
      }
      & span {
      }
    }
  }
  &__table {
    margin-bottom: 6%;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    &--left {
      & p {
        line-height: 2.2rem;
        color: var(--light-text-color);
        &.strong {
          font-weight: 600;
          font-size: var(--font-size);
          text-transform: capitalize;
          &.terms {
            padding: 0 0 1.4rem 0;
          }
        }
      }
      & ul {
        padding: 0 0 2.4rem 0;
        & li {
          color: var(--light-text-color);
        }
      }
    }
    &--right {
      & p {
        text-align: center;
        line-height: 2.2rem;
        color: var(--light-text-color);
        font-size: var(--font-size);
      }
      & .header {
      }
      & img {
      }
    }
  }
}
.border-none {
  border: none !important;
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
