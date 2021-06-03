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
              <!-- Current Balance -->
              <DataTable
                :data="branches"
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
import BranchesMixin from "@/mixins/BrowseBranchesMixin.js";

export default {
  name: "browseExpenses",
  mixins: [BranchesMixin]
};
</script>
