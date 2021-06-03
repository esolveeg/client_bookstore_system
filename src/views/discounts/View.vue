<template>
  <div>
    <div id="main">
      <Breadcrumbs
        :title="`view`"
        :fregment="discount.title"
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
                          {{ $t("title") }}
                        </h3>
                        <span class="item__value">
                          {{ discount.title }}
                        </span>
                      </div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("type") }}
                        </h3>
                        <span class="item__value">
                          {{ discount.type }}
                        </span>
                      </div>
                      <div class="item" v-if="discount.type == 'percent_off'">
                        <h3 class="item__head">
                          {{ $t("percent") }}
                        </h3>
                        <span class="item__value">
                          {{ discount.percent }}
                        </span>
                      </div>
                      <div class="item" v-if="discount.type == 'value'">
                        <h3 class="item__head">
                          {{ $t("value") }}
                        </h3>
                        <span class="item__value">
                          {{ discount.value }}
                        </span>
                      </div>
                      <div class="item" v-if="discount.branch">
                        <h3 class="item__head">
                          {{ $t("branch") }}
                        </h3>
                        <span class="item__value">
                          {{ discount.branch.name }}
                        </span>
                      </div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("products") }}
                        </h3>
                        <span class="item__value">
                          <ul>
                            <li
                              v-for="(product, index) in discount.products"
                              :key="index"
                            >
                              <router-link
                                :to="{
                                  name: 'product.view',
                                  params: { id: product.id }
                                }"
                                >{{ product.name }}</router-link
                              >
                            </li>
                          </ul>
                        </span>
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
import { discountQuery } from "@/graphql/queries/queries.js";

export default {
  data() {
    return {
      title: "View Discount",
      discount: {},
      btns: [],
      path: [{ title: "discounts", route: "discounts.index" }]
    };
  },

  apollo: {
    discount: {
      query: discountQuery,
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
