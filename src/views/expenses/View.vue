<template>
  <div>
    <div id="main">
      <Breadcrumbs
        :title="`view`"
        :fregment="expense.name"
        :btns="btns"
        :path="path"
        @delete="deleteExpense"
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
                          {{ $t("branch") }}
                        </h3>
                        <span class="item__value" v-if="expense.branch">
                          {{ expense.branch.name }}
                        </span>
                      </div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("value") }}
                        </h3>
                        <span class="item__value">
                          {{ expense.value }}
                        </span>
                      </div>
                      <div class="item" v-if="expense.note">
                        <h3 class="item__head">
                          {{ $t("note") }}
                        </h3>
                        <span class="item__value">
                          {{ expense.note }}
                        </span>
                      </div>
                      <div class="item" v-if="expense.date">
                        <h3 class="item__head">
                          {{ $t("date") }}
                        </h3>
                        <span class="item__value">
                          {{ expense.date }}
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
import { expenseQuery } from "@/graphql/queries/queries.js";

export default {
  data() {
    return {
      title: "View Role",
      expense: {},
      btns: [],
      path: [{ title: "expenses", route: "expenses.index" }]
    };
  },

  apollo: {
    expense: {
      query: expenseQuery,
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
