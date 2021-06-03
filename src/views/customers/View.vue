<template>
  <div>
    <div id="main">
      <Breadcrumbs
        :title="`view`"
        :fregment="customer.name"
        :btns="btns"
        :path="path"
        @delete="deleteCustomer"
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
                          {{ $t("name") }}
                        </h3>
                        <span class="item__value">
                          {{ customer.name }}
                        </span>
                      </div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("email") }}
                        </h3>
                        <span class="item__value">
                          {{ customer.email }}
                        </span>
                      </div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("phone") }}
                        </h3>
                        <span class="item__value">
                          {{ customer.phone }}
                        </span>
                      </div>
                      <div class="item" v-if="points">
                        <h3 class="item__head">
                          {{ $t("points") }}
                        </h3>
                        <span class="item__value">
                          {{ points }}
                        </span>
                      </div>
                      <div class="item" v-if="customer.intersts">
                        <h3 class="item__head">
                          {{ $t("intersts") }}
                        </h3>
                        <span class="item__value">
                          {{ customer.intersts }}
                        </span>
                      </div>
                      <div class="item" v-if="customer.branch">
                        <h3 class="item__head">
                          {{ $t("branch") }}
                        </h3>
                        <span class="item__value">
                          {{ customer.branch.name }}
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
import { customerQuery } from "@/graphql/queries/queries.js";
import axios from "axios";

export default {
  data() {
    return {
      title: "View Role",
      customer: {},
      points: "",
      btns: [],
      path: [{ title: "customers", route: "customers.index" }]
    };
  },
  mounted() {
    this.getPoints();
  },
  methods: {
    getPoints() {
      axios
        .get(`http://localhost:8000/points/${this.$route.params.id}`, {}, {})
        .then(response => {
          this.points = response.data;
        });
    }
  },
  apollo: {
    customer: {
      query: customerQuery,
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
