<template>
  <div id="main">
    <Breadcrumbs
      :title="title"
      :btns="btns"
      :multiCreate="false"
      @bulkDelete="null"
      @create="goToCreate()"
    />
    <div class="row">
      <div class="col s12 mt-65">
        <div class="container">
          <!-- Current balance & total transactions cards-->
          <div class="row mt-4">
            <div class="col s12 m12 l12">
              <!-- <h3 >total : 1200</h3> -->
              <!-- Current Balance -->
              <DataTable2
                identifer="id"
                tableName="branches"
                :filters="filters"
                :url="url"
              >
              </DataTable2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DataTable2 from "@/components/datatable/DataTable.vue";

import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
// import DataTable from "@/src/classes/DataTable.js"

// import M from "materialize-css";
export default {
  name: "browseOrders",
  data() {
    let filters = [
      { type: "date", param: "from", name: "from" }
      //   {param: 'bestsellers' , value : false ,type : 'switcher' , name : 'bestseller' }
    ];

    return {
      title: "branches",
      url: "branches",
      execlude: [""],
      btns: [
        {
          title: "create",
          emit: "create",
          icon: "add_circle",
          type: "success"
        }
      ],
      filters
    };
  },
  methods: {
    goToCreate() {
      this.$router.push("orders/createe");
    }
  },
  components: {
    DataTable2,
    Breadcrumbs
  }
};
</script>
