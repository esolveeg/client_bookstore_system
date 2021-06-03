import DataTable from "@/components/datatable/Table.vue";
import M from "materialize-css";
import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import { expensesQuery, meQuery } from "@/graphql/queries/queries.js";

export default {
  data() {
    let columns = [
      // { label: "branch", name: "Branch", dbname: "branch" , sub : "name" },
      { label: "value", name: "Value", dbname: "value" },
      { label: "note", name: "note", dbname: "note" },
      { label: "date", name: "date", dbname: "date" },
      { label: "created_at", name: "created_at", dbname: "created_at" }
    ];
    let sorting = [{ field: "created_at", order: "ASC" }];
    return {
      columns,
      sorting,
      expenses: [],
      title: "expenses",
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
        permissions.includes("create_expenses") ? (this.canAdd = true) : "";
        permissions.includes("delete_expenses") ? (this.canDelete = true) : "";
        permissions.includes("edit_expenses") ? (this.canEdit = true) : "";
        permissions.includes("read_expenses") ? (this.canView = true) : "";
      }
    },

    expenses: {
      query: expensesQuery,
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
      fetchPolicy: "no-cache",
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
    loadSelects() {
      let selects = document.querySelectorAll("select");
      setTimeout(() => {
        M.FormSelect.init(selects, {});
      }, 2000);
    },
    bulkdelete() {
      this.model = "expenses";
      let elem = document.querySelector("#multi-delete-modal");
      let instance = M.Modal.getInstance(elem);
      instance.open();
      // console.log("deletg");
    },
    create() {
      this.$router.push({ name: "expenses.create" });
    },
    goToView(id) {
      this.$router.push({
        name: "expenses.view",
        params: { id: parseInt(id) }
      });
    },
    goToEdit(id) {
      this.$router.push({
        name: "expenses.edit",
        params: { id: parseInt(id) }
      });
    },
    setDeleteData(data) {
      this.deletedName = "expense";
      this.deletedId = data.id;
      this.model = "expenses";
      let elem = document.querySelector("#delete-modal");
      let instance = M.Modal.getInstance(elem);
      instance.open();
    }
  },
  components: {
    DataTable,
    Breadcrumbs
  },
  mounted() {
    this.loadSelects();
  }
};
