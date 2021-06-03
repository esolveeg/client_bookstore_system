import DataTable from "@/components/datatable/Table.vue";
import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import M from "materialize-css";
import {
  productsQuery,
  meQuery,
  allProducts,
  allBranches,
  createProduct,
  createStock
} from "@/graphql/queries/queries.js";
import XLSX from "xlsx";
export default {
  data() {
    let columns = [
      { label: "isbn", name: "isbn", dbname: "isbn" },
      { label: "name", name: "name", dbname: "name" },
      { label: "price", name: "price", dbname: "price" },
      { label: "created_at", name: "created_at", dbname: "created_at" }
    ];
    let sorting = [{ field: "created_at", order: "ASC" }];
    return {
      columns,
      sorting,
      file: null,
      isbns: [],
      branchId: null,
      branches: [],
      allProducts: [],
      allBranches: [],
      excelIds: [],
      products: [],
      title: "products",
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
        permissions.includes("create_products") ? (this.canAdd = true) : "";
        permissions.includes("delete_products") ? (this.canDelete = true) : "";
        permissions.includes("edit_products") ? (this.canEdit = true) : "";
        permissions.includes("read_products") ? (this.canView = true) : "";
      }
    },

    allBranches() {
      return {
        query: allBranches
      };
    },

    products: {
      query: productsQuery,
      // fetchPolicy: 'cache-and-network',
      variables() {
        return {
          first: this.tableData.length,
          page: this.page,
          orderBy: this.sorting,
          search: this.tableData.search,
          branch: 4
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
    tableData: "tableData",
    branch_id: "branch_id",
    isPos: "isPos"
  },

  methods: {
    bulkdelete() {
      this.model = "products";
      let elem = document.querySelector("#multi-delete-modal");
      let instance = M.Modal.getInstance(elem);
      instance.open();
      // console.log("deletg");
    },
    fileReader(oEvent) {
      let oFile = oEvent.target.files[0];
      //let sFilename = oFile.name;

      let reader = new FileReader();
      // let result = {};
      const self = this;
      reader.onload = function(e) {
        let data = e.target.result;
        data = new Uint8Array(data);
        //console.log(data);
        let workbook = XLSX.read(data, { type: "array" });
        let result = {};
        workbook.SheetNames.forEach(function(sheetName) {
          let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
            header: 1
          });
          if (roa.length) result[sheetName] = roa;
        });
        // see the result, caution: it works after reader event is done.
        result = result["Sheet1"];
        result.splice(0, 1);
        //result[0] = null;
        //  console.log(result)
        result.forEach(product => {
          setTimeout(() => {
            //console.log("start2 ");

            if (self.isbns.includes(product[0])) {
              let aProduct = allProducts.filter(p => {
                p.isbn = product[0] ? p : "";
              });
              self.$apollo.mutate({
                mutation: createStock,
                // Parameters
                variables: {
                  product: aProduct.id,
                  qty: product[4] + aProduct.qty
                }
              });
            } else {
              // console.log("start");
              self.$apollo
                .mutate({
                  mutation: createProduct,
                  // Parameters
                  variables: {
                    isbn: product[0] | "*******",
                    name: product[1],
                    price: product[2],
                    purchased_price: parseInt((product[3] * product[2]) / 100)
                  }
                })
                .then(data => {
                  self.$apollo
                    .mutate({
                      mutation: createStock,
                      // Parameters
                      variables: {
                        product: data.data.createProduct.id,
                        branch: self.branchId,
                        qty: product[4] | 0
                      }
                    })
                    .then(() => {
                      M.toast({
                        html: `${self.$t("imported_successfully")}`,
                        classes: "success toast",
                        displayLength: 2000
                      });
                    });
                });
            }
          }, 3000);
        });
      };
      reader.readAsArrayBuffer(oFile);
    },
    importExcel() {
      // console.log('imp')
    },
    create() {
      this.$router.push({ name: "products.create" });
    },
    multiCreate() {
      // console.log('suuu')
      this.$router.push({ name: "products.multicreate" });
    },
    goToView(id) {
      this.$router.push({
        name: "products.view",
        params: { id: parseInt(id) }
      });
    },
    goToEdit(id) {
      this.$router.push({
        name: "products.edit",
        params: { id: parseInt(id) }
      });
    },
    setDeleteData(data) {
      this.deletedName = data.name;
      this.deletedId = data.id;
      this.model = "products";
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
