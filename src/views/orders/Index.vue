<template>
  <div id="main">
    <Breadcrumbs
      :title="title"
      :btns="btns"
      @bulkDelete="bulkdelete"
      @create="create"
    />
    <div class="row">
      <div class="col s12 mt-65">
        <div class="container">
          <!-- Current balance & total transactions cards-->
          <div class="row mt-4">
            <div class="col s12 m12 l12">
              <div class="card filter-card animated  fadeInUp ">
                <div class="card-content">
                  <div class="posData" v-if="posDataD.sales">
                    <p>
                      <strong>sales</strong>:<span
                        >{{ posDataD.sales }}EGP</span
                      >
                    </p>
                    <p>
                      <strong>target</strong>:<span
                        >{{ posDataD.target }}EGP</span
                      >
                    </p>
                    <p>
                      <strong>rest</strong>:<span>{{ posDataD.rest }}EGP</span>
                    </p>
                    <p>
                      <strong>over</strong>:<span>{{ posDataD.over }}EGP</span>
                    </p>
                  </div>
                  <div class="tableFilters">
                    <div class="input-field" v-if="isPos == false">
                      <select id="branches" v-model="branchId">
                        <option value="" disabled="none">{{
                          $t("branches")
                        }}</option>
                        <option value="">{{ $t("none") }}</option>
                        <option value="store">{{ $t("store") }}</option>
                        <option
                          :value="branch.id"
                          v-for="branch in allBranches"
                          :key="branch.id"
                          >{{ branch.name }}</option
                        >
                      </select>
                      <label for="branches">{{ $t("branches") }}</label>
                    </div>
                    <div class="input-field" v-if="isPos == false">
                      <select id="users" v-model="userIdFilter">
                        <option value="" disabled="none">{{
                          $t("users")
                        }}</option>
                        <option value="store">{{ $t("none") }}</option>
                        <option
                          :value="user.id"
                          v-for="user in allUsers"
                          :key="user.id"
                          >{{ user.name }}</option
                        >
                      </select>
                      <label for="users">{{ $t("users") }}</label>
                    </div>
                    <div class="input-field">
                      <label for="branches">{{ $t("from") }}</label>
                      <input type="date" v-model="dateFrom" />
                    </div>
                    <div class="input-field">
                      <label for="branches">{{ $t("to") }}</label>
                      <input type="date" v-model="dateTo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col s12 m12 l12">
              <!-- Current Balance -->
              <DataTable
                :data="ordersQuery"
                :canDelete="canDelete"
                :canView="canView"
                :canEdit="canEdit"
                :columns="columns"
                :sorting="sorting"
                @setDeleteData="setDeleteData"
                @goToEdit="goToEdit"
                @goToView="goToView"
              >
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrdersMixin from "@/mixins/BrowseOrdersMixin.js";

export default {
  name: "browseOrders",
  mixins: [OrdersMixin]
};
</script>
<style lang="scss">
.filter-card {
  z-index: 2;
}
.tableFilters {
  display: flex;

  @media screen AND (max-width: 768px) {
    display: block;
  }
  .input-field {
    margin-right: 3rem;
    @media screen AND (max-width: 768px) {
      margin-bottom: 3rem;
      margin-right: 0;
    }
  }

  & label {
    font-size: 1.4rem;
  }
}
</style>
