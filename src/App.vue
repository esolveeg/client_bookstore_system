<template>
  <div>
    <delete-modal2 />
    <RefundModal />
    <div
      id="app"
      v-if="
        $route.name !== 'login' &&
          $route.name !== 'notfound' &&
          $route.name !== 'notallowed' &&
          $route.name !== 'localstorage' &&
          $route.name !== 'login2'
      "
    >
      <delete-modal @submitted="submitDeleteModal" />
      <multi-delete-modal @submitted="submitMultiDeleteModal" />

      <app-header />
      <Sidebar />
      <div id="main" class="main-full">
        <div class="row">
          <router-view />
        </div>
      </div>
      <app-footer />
    </div>

    <div id="app" v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/layouts/AppHeader.vue";
import AppFooter from "@/components/layouts/AppFooter.vue";
// import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import DeleteModal2 from "@/components/modals/DeleteModal2.vue";
import RefundModal from "@/components/modals/RefundModal.vue";
import MultiDeleteModal from "@/components/modals/MultiDeleteModal.vue";
import {
  deleteRoles,
  deleteRole,
  deleteExpense,
  deleteExpenses,
  deleteBranch,
  deleteOrder,
  deleteOrders,
  deleteTransaction,
  deleteTransactions,
  deleteEmployee,
  deleteEmployees,
  deleteBranches,
  deleteProduct,
  meQuery,
  deleteProducts,
  deleteRecord,
  deleteRecords,
  deleteDiscount,
  deleteDiscounts,
  deleteCustomer,
  deleteCustomers,
  deleteSupplier,
  deleteSuppliers
} from "@/graphql/queries/queries.js";
import M from "materialize-css";
export default {
  name: "app",
  store: {
    id: "deleted_id",
    isPos: "isPos",
    model: "deleted_model",
    ids: "selected_ids"
  },
  watch: {
    $route() {
      this.ids = [];
      this.id = "";
      this.model = "";
      this.loadSelects();
    }
  },

  data() {
    return {
      error: "",
      deletedName: "",
      deltedId: ""
    };
  },
  computed: {
    count() {
      return this.ids.length;
    }
  },
  apollo: {
    query: meQuery,
    result({ data: { me } }) {
      // console.log(me)
      me.roles.includes("pos") ? this.isPos == true : false;
      // me.roles.includes('pos') ? this.branch_id == me : false
    }
  },
  methods: {
    loadSelects() {
      let selects = document.querySelectorAll("select");
      let select = document.querySelector("#show");
      setTimeout(() => {
        M.FormSelect.init(selects, {});
        M.FormSelect.init(select, {});
      }, 2000);
    },
    submitDeleteModal() {
      // //console.log(this.model)
      // if (this.model == "user") {
      //   this.deleteUser();
      // }
      // if (this.model == "transaction") {
      //   this.deleteTransaction();
      // }
      // if (this.model == "employee") {
      //   this.deleteEmployee();
      // }
      // if (this.model == "order") {
      //   this.deleteOrder();
      // }
      // if (this.model == "product") {
      //   this.deleteProduct();
      // }

      // if (this.model == "supplier") {
      //   this.deleteSupplier();
      // }

      // if (this.model == "customer") {
      //   this.deleteCustomer();
      // }
      // if (this.model == "discount") {
      //   this.deleteDiscount();
      // }
      // if (this.model == "role") {
      //   this.deleteRole();
      //   //this.deleteUser();
      // }
      // if (this.model == "expense") {
      //   this.deleteExpense();
      //   //this.deleteUser();
      // }
      // if (this.model == "branch") {
      //   this.deleteBranch();
      //   //this.deleteUser();
      // }
      this.deleteRecord();
      setTimeout(() => {
        this.id = "";
      }, 2000);
    },
    submitMultiDeleteModal() {
      // if (this.model == "user") {
      //   this.deleteUsers();
      // }
      // if (this.model == "transaction") {
      //   this.deleteTransactions();
      // }
      // if (this.model == "employee") {
      //   this.deleteEmployees();
      // }
      // if (this.model == "order") {
      //   this.deleteOrders();
      // }
      // if (this.model == "supplier") {
      //   this.deleteSuppliers();
      // }

      // if (this.model == "customer") {
      //   this.deleteCustomers();
      // }
      // if (this.model == "discount") {
      //   this.deleteDiscounts();
      // }
      // if (this.model == "product") {
      //   this.deleteProducts();
      // }
      // if (this.model == "role") {
      //   //console.log("888");
      //   this.deleteRoles();
      // }
      // if (this.model == "expense") {
      //   this.deleteExpenses();
      //   //this.deleteUser();
      // }
      // if (this.model == "branch") {
      //   this.deleteBranches();
      //   //this.deleteUser();
      // }
      this.deleteRecords();

      setTimeout(() => {
        this.ids = [];
      }, 2000);
    },
    deleteRecord() {
      this.$apollo
        .mutate({
          mutation: deleteRecord,
          // Parameters
          variables: {
            id: this.id,
            table: this.model
          }
        })
        .then(() => {
          M.toast({
            html: this.$t("deleted_successfully"),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";

          //this.$router.go(-1);
        });
    },
    deleteRecords() {
      this.$apollo
        .mutate({
          mutation: deleteRecords,
          // Parameters
          variables: {
            ids: this.ids,
            table: this.model
          }
        })
        .then(() => {
          M.toast({
            html: this.$t("deleted_successfully"),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";

          //this.$router.go(-1);
        });
    },
    deleteUsers() {
      this.$apollo
        .mutate({
          mutation: require("@/graphql/mutations/deleteUsers.gql"),
          // Parameters
          variables: {
            id: this.ids
          }
        })
        .then(() => {
          M.toast({
            html:
              this.$tc("plural_user", this.count, {
                n: this.count
              }) +
              " " +
              this.$t("users_deleted_successfully"),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";

          //this.$router.go(-1);
        });
    },
    deleteUser() {
      this.$apollo
        .mutate({
          mutation: require("@/graphql/mutations/deleteUser.gql"),
          // Parameters
          variables: {
            id: parseInt(this.id)
          }
        })
        .then(() => {
          M.toast({
            html: this.$t("deleted_successfully"),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";

          //this.$router.go(-1);
        });
    },
    deleteRole() {
      this.$apollo
        .mutate({
          mutation: deleteRole,
          // Parameters
          variables: {
            id: parseInt(this.id)
          }
        })
        .then(data => {
          M.toast({
            html: this.$t("deleted_successfully", {
              name: data.data.deleteRole.name
            }),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";

          //this.$router.go(-1);
        });
    },
    deleteRoles() {
      this.$apollo
        .mutate({
          mutation: deleteRoles,
          // Parameters
          variables: {
            id: this.ids
          }
        })
        .then(() => {
          M.toast({
            html:
              this.$tc("plural_role", this.count, {
                n: this.count
              }) +
              " " +
              this.$t("roles_deleted_successfully"),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";

          //this.$router.go(-1);
        });
    },
    deleteExpense() {
      this.$apollo
        .mutate({
          mutation: deleteExpense,
          // Parameters
          variables: {
            id: parseInt(this.id)
          }
        })
        .then(data => {
          M.toast({
            html: this.$t("deleted_successfully", {
              name: data.data.deleteexpense.name
            }),
            classes: "success toast",
            displayLength: 3000
          });

          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";
        });
    },
    deleteExpenses() {
      this.$apollo
        .mutate({
          mutation: deleteExpenses,
          // Parameters
          variables: {
            id: this.ids
          }
        })
        .then(() => {
          M.toast({
            html:
              this.$tc("plural_expense", this.count, {
                n: this.count
              }) +
              " " +
              this.$t("expenses_deleted_successfully"),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";

          //this.$router.go(-1);
        });
    },

    deleteDiscount() {
      this.$apollo
        .mutate({
          mutation: deleteDiscount,
          // Parameters
          variables: {
            id: parseInt(this.id)
          }
        })
        .then(data => {
          M.toast({
            html: this.$t("deleted_successfully", {
              name: data.data.deleteDiscount.name
            }),
            classes: "success toast",
            displayLength: 3000
          });

          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";
        });
    },
    deleteDiscounts() {
      this.$apollo
        .mutate({
          mutation: deleteDiscounts,
          // Parameters
          variables: {
            id: this.ids
          }
        })
        .then(() => {
          M.toast({
            html:
              this.$tc("plural_discount", this.count, {
                n: this.count
              }) +
              " " +
              this.$t("discounts_deleted_successfully"),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";

          //this.$router.go(-1);
        });
    },
    deleteBranch() {
      this.$apollo
        .mutate({
          mutation: deleteBranch,
          // Parameters
          variables: {
            id: parseInt(this.id)
          }
        })
        .then(data => {
          M.toast({
            html: this.$t("deleted_successfully", {
              name: data.data.deletebranch.name
            }),
            classes: "success toast",
            displayLength: 3000
          });

          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";
        });
    },
    deleteBranches() {
      this.$apollo
        .mutate({
          mutation: deleteBranches,
          // Parameters
          variables: {
            id: this.ids
          }
        })
        .then(() => {
          M.toast({
            html:
              this.$tc("plural_expense", this.count, {
                n: this.count
              }) +
              " " +
              this.$t("expenses_deleted_successfully"),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";
        });
    },
    deleteProduct() {
      this.$apollo
        .mutate({
          mutation: deleteProduct,
          // Parameters
          variables: {
            id: parseInt(this.id)
          }
        })
        .then(data => {
          M.toast({
            html: this.$t("deleted_successfully", {
              name: data.data.deleteProduct.name
            }),
            classes: "success toast",
            displayLength: 3000
          });

          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";
        });
    },
    deleteProducts() {
      this.$apollo
        .mutate({
          mutation: deleteProducts,
          // Parameters
          variables: {
            id: this.ids
          }
        })
        .then(() => {
          M.toast({
            html:
              this.$tc("plural_product", this.count, {
                n: this.count
              }) +
              " " +
              this.$t("products_deleted_successfully"),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";

          //this.$router.go(-1);
        });
    },

    deleteCustomer() {
      this.$apollo
        .mutate({
          mutation: deleteCustomer,
          // Parameters
          variables: {
            id: parseInt(this.id)
          }
        })
        .then(data => {
          M.toast({
            html: this.$t("deleted_successfully", {
              name: data.data.deleteCustomer.name
            }),
            classes: "success toast",
            displayLength: 3000
          });

          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";
        });
    },
    deleteCustomers() {
      this.$apollo
        .mutate({
          mutation: deleteCustomers,
          // Parameters
          variables: {
            id: this.ids
          }
        })
        .then(() => {
          M.toast({
            html:
              this.$tc("plural_customer", this.count, {
                n: this.count
              }) +
              " " +
              this.$t("customers_deleted_successfully"),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";

          //this.$router.go(-1);
        });
    },
    deleteSupplier() {
      this.$apollo
        .mutate({
          mutation: deleteSupplier,
          // Parameters
          variables: {
            id: parseInt(this.id)
          }
        })
        .then(data => {
          M.toast({
            html: this.$t("deleted_successfully", {
              name: data.data.deleteSupplier.name
            }),
            classes: "success toast",
            displayLength: 3000
          });

          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";
        });
    },
    deleteSuppliers() {
      this.$apollo
        .mutate({
          mutation: deleteSuppliers,
          // Parameters
          variables: {
            id: this.ids
          }
        })
        .then(() => {
          M.toast({
            html:
              this.$tc("plural_supplier", this.count, {
                n: this.count
              }) +
              " " +
              this.$t("suppliers_deleted_successfully"),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";

          //this.$router.go(-1);
        });
    },
    deleteEmployee() {
      this.$apollo
        .mutate({
          mutation: deleteEmployee,
          // Parameters
          variables: {
            id: parseInt(this.id)
          }
        })
        .then(data => {
          M.toast({
            html: this.$t("deleted_successfully", {
              name: data.data.deleteEmployee.name
            }),
            classes: "success toast",
            displayLength: 3000
          });

          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";
        });
    },
    deleteEmployees() {
      this.$apollo
        .mutate({
          mutation: deleteEmployees,
          // Parameters
          variables: {
            id: this.ids
          }
        })
        .then(() => {
          M.toast({
            html:
              this.$tc("plural_employee", this.count, {
                n: this.count
              }) +
              " " +
              this.$t("suppliers_deleted_successfully"),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";

          //this.$router.go(-1);
        });
    },
    deleteOrder() {
      this.$apollo
        .mutate({
          mutation: deleteOrder,
          // Parameters
          variables: {
            id: parseInt(this.id)
          }
        })
        .then(() => {
          M.toast({
            html: this.$t("deleted_successfully", {
              name: "order"
            }),
            classes: "success toast",
            displayLength: 3000
          });

          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";
        });
    },
    deleteOrders() {
      this.$apollo
        .mutate({
          mutation: deleteOrders,
          // Parameters
          variables: {
            id: this.ids
          }
        })
        .then(() => {
          M.toast({
            html:
              this.$tc("plural_orders", this.count, {
                n: this.count
              }) +
              " " +
              this.$t("orders_deleted_successfully"),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";

          //this.$router.go(-1);
        });
    },
    deleteTransaction() {
      this.$apollo
        .mutate({
          mutation: deleteTransaction,
          // Parameters
          variables: {
            id: parseInt(this.id)
          }
        })
        .then(() => {
          M.toast({
            html: this.$t("deleted_successfully", {
              name: "transaction"
            }),
            classes: "success toast",
            displayLength: 3000
          });

          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";
        });
    },
    deleteTransactions() {
      this.$apollo
        .mutate({
          mutation: deleteTransactions,
          // Parameters
          variables: {
            id: this.ids
          }
        })
        .then(() => {
          M.toast({
            html:
              this.$tc("plural_transaction", this.count, {
                n: this.count
              }) +
              " " +
              this.$t("transactions_deleted_successfully"),
            classes: "success toast",
            displayLength: 3000
          });
          this.id = "";
          this.model = "";
          this.ids = [];
          this.deletedName = "";

          //this.$router.go(-1);
        });
    }
  },

  components: {
    //Breadcrumbs,
    RefundModal,
    Sidebar,
    "app-header": AppHeader,
    "delete-modal": DeleteModal,
    "delete-modal2": DeleteModal2,
    "app-footer": AppFooter,
    "multi-delete-modal": MultiDeleteModal
  },

  mounted() {
    let modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);
    this.loadSelects();
    const html = document.querySelector("html");
    if (localStorage.getItem("locale")) {
      localStorage.getItem("locale") == "ar"
        ? html.classList.add("rtl")
        : html.classList.remove("rtl");
    } else {
      html.classList.add("rtl");
    }
  }
};
</script>

<style>
@import url("sass/base/_variables.min.css");
@import url("sass/base/_base.min.css");
@import url("sass/base/_animations.min.css");
@import url("sass/base/_utilites.min.css");
@import url("sass/base/_rtl.min.css");
label {
  font-size: 16px !important;
}
.is-danger {
  color: red;
}
</style>
