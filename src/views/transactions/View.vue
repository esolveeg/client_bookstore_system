<template>
  <div>
    <div id="main">
      <Breadcrumbs
        :title="`view`"
        :fregment="transaction.name"
        :btns="btns"
        :path="path"
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
                          {{ $t("branch") }}
                        </h3>
                        <span class="item__value">
                          {{ transaction.branch.name }}
                        </span>
                      </div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("approved") }}
                        </h3>
                        <span class="item__value">
                          {{ transaction.approved }}
                        </span>
                      </div>
                      <table class="highlight responsive-table">
                        <thead>
                          <tr>
                            <th data-field="no">No</th>
                            <th data-field="isbn">Isbn</th>
                            <th data-field="item">Item</th>
                            <th data-field="price">Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(product, index) in transaction.products"
                            :key="index"
                          >
                            <td>{{ index + 1 }}.</td>
                            <td>{{ product.isbn }}</td>
                            <td>{{ product.name }}</td>
                            <td>
                              {{ transaction.productsPivot[index]["qty"] }}
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
</template>
<script>
import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import { transactionQuery } from "@/graphql/queries/queries.js";

export default {
  data() {
    return {
      title: "View Transaction",
      transaction: {},
      btns: [],
      branch: "",
      productsIds: [],
      path: [{ title: "transactions", route: "transactions.index" }]
    };
  },

  apollo: {
    transaction: {
      query: transactionQuery,
      variables() {
        return {
          id: parseInt(this.$route.params.id)
        };
      }
    }
  },
  components: {
    Breadcrumbs
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
