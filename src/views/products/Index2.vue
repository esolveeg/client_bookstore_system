<template>
  <div id="main">
    <Breadcrumbs
      :title="title"
      :btns="btns"
      :import="true"
      :multiCreate="false"
      @bulkDelete="null"
      @create="create"
    />
    <div class="row">
      <div class="col s12 mt-65">
        <div class="container">
          <!-- Current balance & total transactions cards-->
          <div class="row mt-4">
            <div class="col s12 m12 l12">
              <!-- Current Balance -->
              <DataTable2
                identifer="isbn"
                tableName="products"
                :filters="filters"
                :initialValues="initialValues"
                :execlude="execlude"
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
  name: "browseProducts",
  data() {
    return {
      title: "products",
      url: "products",
      execlude: ["id"],
      filters: [
        {
          type: "select",
          param: "branch",
          url: "allbranches",
          name: "branche"
        },
        {
          param: "bestsellers",
          value: false,
          type: "switcher",
          name: "bestseller"
        }
      ],
      initialValues: { total_sells: 0 },
      btns: [
        {
          title: "create",
          emit: "create",
          icon: "add_circle",
          type: "success"
        }
      ]
    };
  },
  methods: {
    create() {
      this.$router.push({ name: "products.create" });
    }
  },

  components: {
    DataTable2,
    Breadcrumbs
  }
};
</script>
