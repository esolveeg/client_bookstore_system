<template>
  <div id="main">
    <Breadcrumbs
      :title="title"
      :btns="btns"
      :import="true"
      :multiCreate="false"
      @bulkDelete="bulkdelete"
      @importExcel="importExcel"
      @multiCreate="multiCreate"
      @create="create"
    />
    <div class="row">
      <div class="col s12 mt-65">
        <div class="container">
          <!-- Current balance & total transactions cards-->
          <div class="row mt-4">
            <div class="col s12 m12 l12">
              <input accept=".xlsx" type="file" @change="fileReader" />
              <div v-for="branch in allBranches" :key="branch.id">
                <label>
                  <input v-model="branchId" :value="branch.id" type="radio" />
                  <span>{{ branch.name }}</span>
                </label>
              </div>
              <!-- Current Balance -->
              <DataTable
                :data="products"
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
import ProductsMixin from "@/mixins/BrowseProductsMixin.js";

export default {
  name: "browseExpenses",
  mixins: [ProductsMixin]
};
</script>
