import DataTable from "@/components/datatable/Table.vue";
import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import {
  allBranches,
  allUsers,
  ordersQuery,
  meQuery,
  posData
} from "@/graphql/queries/queries.js";
import M from "materialize-css";
import moment from "moment";

export default {
  data() {
    let dateTo = moment()
      .add(1, "days")
      .startOf("day")
      .format("YYYY-MM-DD");
    let dateFrom = moment()
      .startOf("day")
      .format("YYYY-MM-DD");
    let columns = [
      // { label: "branch", name: "Branch", dbname: "branch", sub: "name" },
      { label: "branch", name: "branch", dbname: "branch_id" },
      { label: "note", name: "note", dbname: "note" },
      { label: "total", name: "Total", dbname: "total" },
      { label: "created_at", name: "created_at", dbname: "created_at" }
    ];
    let sorting = [{ field: "created_at", order: "DESC" }];
    return {
      allBranches: [],
      allUsers: [],
      columns,
      dateFrom,
      dateTo,
      sorting,
      branchId: "",
      myorders: [],
      posDataD: {},
      userIdFilter: "",
      ordersQuery: [],
      userId: "",
      title: "orders",
      canAdd: false,
      canDelete: false,
      canView: false,
      canEdit: false,
      btns: []
    };
  },
  apollo: {
    allBranches() {
      return {
        query: allBranches
      };
    },
    allUsers() {
      return {
        query: allUsers
      };
    },
    me: {
      query: meQuery,
      result({ data: { me } }) {
        let permissions = [];
        me.roles.forEach(role => {
          if (role.slug == "pos") {
            this.userId = me.id;
            this.branchId = me.employee.branch.id;
            this.posData();
          }
          role.permissions.forEach(per => {
            permissions.push(per.slug);
          });
        });
        permissions.includes("create_orders") ? (this.canAdd = true) : "";
        permissions.includes("delete_orders") ? (this.canDelete = true) : "";
        if (permissions.includes("edit_orders")) {
          this.canEdit = false;
        }
        permissions.includes("read_orders") ? (this.canView = true) : "";
      }
    },

    ordersQuery: {
      query: ordersQuery,
      // fetchPolicy: 'cache-and-network',
      variables() {
        return {
          first: this.tableData.length,
          page: this.page,
          from: this.dateFrom,
          to: this.dateTo,
          created_by: this.userIdFilter,

          orderBy: this.sorting[0].field,
          orderFunc: this.sorting[0].order,
          branch: this.branchId,
          search: this.tableData.search
        };
      },
      result({ data: { orders } }) {
        this.orders = orders;
      },
      deep: true,
      pollInterval: 1000
    }
  },
  watch: {
    branch: {
      handler(value) {
        value ? (this.branchId = value) : "";
      }
    },
    // dateFrom:{
    //   handler(){
    //     this.$apollo.queries.orders.refresh()
    //   }
    // },
    // dateTo:{
    //   handler(){
    //     this.$apollo.queries.orders.refresh()
    //   }
    // },
    // userIdFilter:{
    //   handler(){
    //     this.$apollo.queries.orders.refresh()
    //   }
    // },
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
    isPos: "isPos",
    createBtn: "createBtn",
    perPage: "perPage",
    page: "current_page",
    deletedId: "deleted_id",
    branch: "branch_id",
    deletedName: "deleted_name",
    tableData: "tableData"
  },
  methods: {
    addMargin() {
      // console.log('click')
    },
    loadSelects() {
      let selects = document.querySelectorAll("select");
      let elems = document.querySelectorAll(".datepicker");
      setTimeout(() => {
        M.Datepicker.init(elems, {});
        M.FormSelect.init(selects, {});
      }, 2000);
    },
    posData() {
      this.$apollo
        .mutate({
          mutation: posData,
          // Parameters
          variables: {
            id: this.userId
          }
        })
        .then(data => {
          this.posDataD = data.data.posData;
        });
    },
    bulkdelete() {
      this.model = "orders";
      let elem = document.querySelector("#multi-delete-modal");
      let instance = M.Modal.getInstance(elem);
      instance.open();
      // console.log("deletg");
    },
    create() {
      this.$router.push({ name: "orders.create" });
    },
    goToView(id) {
      this.$router.push({ name: "orders.view", params: { id: parseInt(id) } });
    },
    goToEdit(id) {
      this.$router.push({ name: "orders.edit", params: { id: parseInt(id) } });
    },
    setDeleteData(data) {
      this.deletedName = data.name;
      this.deletedId = data.id;
      this.model = "orders";
      let elem = document.querySelector("#delete-modal");
      let instance = M.Modal.getInstance(elem);
      instance.open();
    }
  },
  mounted() {
    this.loadSelects();
  },
  components: {
    DataTable,
    Breadcrumbs
  }
};
