import DataTable from "@/components/datatable/Table.vue";
import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import { discountsQuery, meQuery } from "@/graphql/queries/queries.js";
import M from "materialize-css";
export default {
  data() {
    let columns = [
      { label: "title", name: "title", dbname: "title" },
      { label: "branch", name: "branch", dbname: "branch", sub: "name" },
      { label: "type", name: "type", dbname: "type" },
      { label: "created_at", name: "created_at", dbname: "created_at" }
    ];
    let sorting = [{ field: "created_at", order: "ASC" }];
    return {
      columns,
      sorting,
      discounts: [],
      title: "discounts",
      canAdd: false,
      canDelete: false,
      canView: false,
      canEdit: false,
      btns: []
    };
  },
  apollo: {
    me: {
      query: meQuery,
      result({ data: { me } }) {
        let permissions = [];
        me.roles.forEach(role => {
          role.permissions.forEach(per => {
            permissions.push(per.slug);
          });
        });
        permissions.includes("create_discounts") ? (this.canAdd = true) : "";
        permissions.includes("delete_discounts") ? (this.canDelete = true) : "";
        permissions.includes("edit_discounts") ? (this.canEdit = true) : "";
        permissions.includes("read_discounts") ? (this.canView = true) : "";
      }
    },

    discounts: {
      query: discountsQuery,
      // fetchPolicy: 'cache-and-network',
      variables() {
        return {
          first: this.tableData.length,
          page: this.page,
          orderBy: this.sorting,
          search: this.tableData.search
        };
      },
      deep: true,
      pollInterval: 1000
    }
  },
  watch: {
    ids: {
      handler(value) {
        let index = this.btns.indexOf(this.deleteBtn);
        value.length > 0 && this.canDelete
          ? this.btns.includes(this.deleteBtn)
            ? ""
            : this.btns.push(this.deleteBtn)
          : index > -1
          ? this.btns.splice(index, 1)
          : "";
      }
    },
    canAdd: {
      handler(value) {
        value ? this.btns.push(this.createBtn) : "";
      }
    },
    canDelete: {
      handler(value) {
        value
          ? this.ids.length > 0
            ? this.btns.push(this.deleteBtn)
            : ""
          : "";
      }
    }
  },
  store: {
    model: "deleted_model",
    ids: "selected_ids",
    me: "me",
    deleteBtn: "deleteBtn",
    createBtn: "createBtn",
    perPage: "perPage",
    page: "current_page",
    deletedId: "deleted_id",
    deletedName: "deleted_name",
    tableData: "tableData"
  },
  methods: {
    bulkdelete() {
      this.model = "discounts";
      let elem = document.querySelector("#multi-delete-modal");
      let instance = M.Modal.getInstance(elem);
      instance.open();
      // console.log("deletg");
    },
    create() {
      this.$router.push({ name: "discounts.create" });
    },
    goToView(id) {
      this.$router.push({
        name: "discounts.view",
        params: { id: parseInt(id) }
      });
    },
    goToEdit(id) {
      this.$router.push({
        name: "discounts.edit",
        params: { id: parseInt(id) }
      });
    },
    setDeleteData(data) {
      this.deletedName = data.name;
      this.deletedId = data.id;
      this.model = "discounts";
      let elem = document.querySelector("#delete-modal");
      let instance = M.Modal.getInstance(elem);
      instance.open();
    }
  },
  components: {
    DataTable,
    Breadcrumbs
  }
};
