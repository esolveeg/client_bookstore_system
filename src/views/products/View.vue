<template>
  <div>
    <div id="main">
      <Breadcrumbs
        :title="`view`"
        :fregment="product.name"
        :btns="btns"
        :path="path"
        @delete="deleteProduct"
        @edit="edit"
      />
      <div class="row">
        <div class="col s12 mt-65">
          <div class="container">
            <!-- Current balance & total transactions cards-->
            <div class="row mt-4">
              <div class="col s12 m12 l12">
                <!-- Current Balance -->
                <div class="card animated  fadeInUp ">
                  <div class="card-content">
                    <div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("isbn") }}
                        </h3>
                        <span class="item__value">
                          {{ product.product.isbn }}
                        </span>
                      </div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("name") }}
                        </h3>
                        <span class="item__value">
                          {{ product.product.name }}
                        </span>
                      </div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("price") }}
                        </h3>
                        <span class="item__value">
                          {{ product.product.price }}
                        </span>
                      </div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("purchased_price") }}
                        </h3>
                        <span class="item__value">
                          {{ product.product.purchased_price }}
                        </span>
                      </div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("qty") }}
                        </h3>
                        <table>
                          <thead>
                            <tr>
                              <th
                                v-for="(stock, index) in product.stock"
                                :key="index"
                              >
                                <span v-if="stock.branch">{{
                                  stock.branch
                                }}</span>
                                <span v-else> {{ $t("store") }}</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                v-for="(stock, index) in product.stock"
                                :key="index"
                              >
                                <span>{{ stock.qty }}</span>
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
</template>
<script>
import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import store from "@/store/index";

export default {
  data() {
    return {
      title: "View Product",
      btns: [],
      path: [{ title: "products", route: "products.index" }]
    };
  },

  components: {
    Breadcrumbs
  },

  computed: {
    product() {
      return store.getters["product/product"];
    }
  },
  mounted() {
    store.dispatch("product/getProduct", this.$route.params.id);
  }
};
</script>
<style lang="scss" scoped>
.item {
  &__head {
    text-transform: capitalize;
    font-size: 1.8rem;
    color: #37474f;
    font-family: Open Sans, sans-serif;
  }
  &__value,
  &__value ul li a {
    font-family: Open Sans, sans-serif;
    font-size: 1.4rem;
    line-height: 1.57142857;
    transition: 0.3s ease-out;
    color: #76838f;
    & ul li a:hover {
      color: blue;
    }
  }
}
.item:not(:last-child) {
  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: #eee;
    display: block;
    margin-top: 3rem;
  }
}
</style>
