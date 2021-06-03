<template>
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

          <p v-if="id">Invoice no : #{{ order.id }}<br /></p>
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
              v-for="(product, index) in order.products"
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
                <h2 class="hresete">EGP{{ order.subtotal }}</h2>
              </td>
            </tr>
            <tr class="tabletitle" v-if="discount">
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
                <h2 class="hresete">
                  EGP{{ parseInt(order.total - order.discount) }}
                </h2>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order"],
  data() {
    let today = new Date();
    let now =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return {
      now
    };
  },
  methods: {
    printData() {
      this.$store.dispatch("ui/printData");
    }
  }
};
</script>

<style></style>
