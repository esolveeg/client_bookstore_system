<template>
  <div
    id="invoice-POS"
    class="printTable"
    style="padding:2mm;
    margin: 0 auto;
    width: 430px;
    background: #FFF;
    font-family:'Muli', sans-serif"
  >
    <div
      id="top"
      style="tex-align:center;min-height: 100px;border-bottom: 1px solid #EEE;"
    >
      <div class="logo" style="text-align:center;">
        <img
          src="http://readerscorner.co/storage/settings/May2019/S3fivD7C4Y2oXfnGaEsa.png"
          style="width:120px;height:auto;"
        />
      </div>
      <div class="info">
        <h2
          style="text-align:center;font-size: 2em;
        font-weight: 300;
        line-height: 2em;color:#000"
        >
          READERSCORNER
        </h2>
      </div>
      <!--End Info-->
    </div>
    <!--End InvoiceTop-->

    <div id="mid" style="min-height: 80px;border-bottom: 1px solid #EEE;">
      <div class="info" style="display: block;margin-left: 0;">
        <h2
          style="font-size: 2em;
        font-weight: 300;
        line-height: 2em;color:#000"
        >
          Contact Info
        </h2>
        <p
          style="font-size: 1.2em;
        color: #000;
        line-height: 1.2em;"
        >
          Email : info@readerscorner.co<br />
        </p>
      </div>
      <div class="info" style="display: block;margin-left: 0;">
        <p
          style="font-size: 1.2em;
        color: #000;
        line-height: 1.2em;"
        >
          Invoice no : #{{ this.id }}<br />
        </p>
      </div>
    </div>
    <!--End Invoice Mid-->

    <div id="bot" style="min-height: 50px;border-bottom: 1px solid #EEE;">
      <div id="table">
        <table
          style=" width: 100%;
            border-collapse: collapse;"
        >
          <tr
            class="tabletitle"
            style="padding: 5px;
                font-size: .9em;"
          >
            <td
              style="padding: 5px 0 5px 15px;width: 24mm;
             border: 1px solid #EEE"
              class="item"
            >
              <h2>Item</h2>
            </td>
            <td
              style="padding: 5px 0 5px 15px;
              border: 1px solid #EEE"
              class="Hours"
            >
              <h2>Qty</h2>
            </td>
            <td
              style="padding: 5px 0 5px 15px;
              border: 1px solid #EEE"
              class="Rate"
            >
              <h2>price</h2>
            </td>
            <td
              style="padding: 5px 0 5px 15px;
                     border: 1px solid #EEE"
              class="Rate"
            >
              <h2>total</h2>
            </td>
          </tr>

          <tr
            class="service"
            v-for="(product, index) in products"
            :key="index"
            style="border-bottom: 1px solid #EEE;"
          >
            <td
              style="padding: 5px 0 5px 15px;
               border: 1px solid #EEE"
              class="tableitem"
            >
              <p
                style="font-size: 1.2em;
                color: #000;
                  font-size: .9em;
                line-height: 1.2em;"
                class="itemtext"
              >
                {{ product.name }}
              </p>
            </td>
            <td
              style="padding: 5px 0 5px 15px;
                border: 1px solid #EEE"
              class="tableitem"
            >
              <p
                style="font-size: 1.2em;
                                color: #000;
                                  font-size: .9em;
                                line-height: 1.2em;"
                class="itemtext"
              >
                {{ qtys[index] }}
              </p>
            </td>
            <td
              style="padding: 5px 0 5px 15px;
                      border: 1px solid #EEE"
              class="tableitem"
            >
              <p
                style="font-size: 1.2em;
                      color: #000;
                        font-size: .9em;
                      line-height: 1.2em;"
                class="itemtext"
              >
                EGP{{ product.price }}
              </p>
            </td>
            <td
              style="padding: 5px 0 5px 15px;
                    border: 1px solid #EEE"
              class="tableitem"
            >
              <p
                style="font-size: 1.2em;
                    color: #000;
                                        font-size: .9em;
                    line-height: 1.2em;"
                class="itemtext"
              >
                EGP{{ product.price * qtys[index] }}
              </p>
            </td>
          </tr>

          <tr class="tabletitle">
            <td></td>
            <td></td>
            <td>
              <h4 style="text-align:left;border: 1px solid #EEE;">subtotal:</h4>
            </td>
            <td
              style="padding: 5px 0 5px 15px;border: 1px solid #EEE;"
              class="payment"
            >
              <h4 style="text-align:left">EGP{{ total }}</h4>
            </td>
          </tr>

          <tr class="tabletitle" v-if="discount">
            <td></td>
            <td></td>
            <td
              v-if="discountType == 'percent'"
              style="padding: 5px 0 5px 15px;border: 1px solid #EEE;"
              class="Rate"
            >
              <h4 style="text-align:left">
                {{
                  $t("discountPercent", {
                    percent: discount
                  })
                }}
              </h4>
            </td>
            <td v-else style="border: 1px solid #EEE;" class="Rate">
              <h4 style="text-align:left">{{ $t("discount") }}:</h4>
            </td>
            <td
              style="padding: 5px 0 5px 15px;border: 1px solid #EEE;"
              class="payment"
            >
              <h2>EGP{{ parseInt(discountValue) }}:</h2>
            </td>
          </tr>

          <tr class="tabletitle" v-if="discountValue">
            <td></td>
            <td></td>
            <td style="border: 1px solid #EEE;">
              <h4 style="text-align:left">Total:</h4>
            </td>
            <td
              style="padding: 5px 0 5px 15px;border: 1px solid #EEE;"
              class="payment"
            >
              <h2>EGP{{ parseInt(total - discountValue) }}</h2>
            </td>
          </tr>
          <tr class="tabletitle" v-else>
            <td></td>
            <td></td>
            <td style="border: 1px solid #EEE;">
              <h4>Total</h4>
            </td>
            <td
              style="padding: 5px 0 5px 15px;
              border: 1px solid #EEE"
              class="payment"
            >
              <h2>EGP{{ total }}</h2>
            </td>
          </tr>
        </table>
      </div>
      <!--End Table-->

      <div id="legalcopy" style="text-align:center;">
        <p
          style="font-size: 1.2em;
              color: #000;
              line-height: 1.2em;"
          class="legal"
        >
          <strong>Thank you for your purchase!</strong> <br />
          you can make more further purchases from our website<br /><strong>
            Readerscorner.co.
          </strong>
        </p>
      </div>
    </div>
    <!--End InvoiceBot-->
  </div>
  <!--End Invoice-->
</template>
<script>
export default {
  name: "resete",
  props: [
    "products",
    "qtys",
    "id",
    "tota",
    "discountValue",
    "discount",
    "discountType",
    "total"
  ]
};
</script>
<style scoped></style>
