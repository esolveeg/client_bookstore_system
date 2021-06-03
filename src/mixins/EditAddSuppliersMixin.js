import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import M from "materialize-css";
import SimpleVueValidation from "simple-vue-validator";
import {
  createSupplier,
  updateSupplier,
  supplierQuery
} from "@/graphql/queries/queries.js";
const Validator = SimpleVueValidation.Validator;
export default {
  components: {
    Breadcrumbs
  },
  data() {
    return {
      path: [{ title: "suppliers", route: "suppliers.index" }],
      supplier: {},
      name: "",
      email: "",
      phone: "",
      title: "create_supplier",
      validationError: "",
      fregment: ""
    };
  },
  validators: {
    name(value) {
      return Validator.value(value)
        .required()
        .maxLength(100);
    },
    email(value) {
      return Validator.value(value)
        .maxLength(200)
        .email();
    },
    phone(value) {
      return Validator.value(value).maxLength(16);
    }
  },

  apollo: {
    supplier() {
      return {
        query: supplierQuery,
        variables() {
          return {
            id: parseInt(this.$route.params.id)
          };
        },
        result({ data: { supplier } }) {
          this.name = supplier.name;
          this.email = supplier.email;
          this.phone = supplier.phone;
          this.title = `edit`;
        }
      };
    }
  },

  watch: {
    "validation.errors"() {
      const btn = document.querySelector(".input-field button");
      if (this.validation.errors.length > 0) {
        btn.setAttribute("disabled", "disabled");
      } else {
        if (!this.supplier) {
          this.validation.touchedRecords.length > 1
            ? btn.removeAttribute("disabled")
            : "";
        } else {
          btn.removeAttribute("disabled");
        }
      }
    }
  },
  methods: {
    submitted() {
      this.supplier ? this.updateSupplier() : this.createSupplier();
    },
    updateSupplier() {
      this.$apollo
        .mutate({
          mutation: updateSupplier,
          // Parameters
          variables: {
            id: parseInt(this.$route.params.id),
            name: this.name,
            email: this.email,
            intersts: this.intersts,
            branch: this.branch,
            phone: this.phone
          }
        })
        .then(data => {
          M.toast({
            html: `${this.$t("updated_successfully", {
              name: this.$t(data.data.updateSupplier.name)
            })}`,
            classes: "success toast",
            displayLength: 2000
          });
          this.$router.push({ name: "suppliers.index" });
        })
        .catch(error => {
          console.log(error);
          //this.validationError = this.$t("name_unique");
        });
    },
    createSupplier() {
      this.$apollo
        .mutate({
          mutation: createSupplier,
          // Parameters
          variables: {
            name: this.name,
            email: this.email,
            intersts: this.intersts,
            branch: this.branch,
            phone: this.phone
          }
        })
        .then(data => {
          M.toast({
            html: `${this.$t("created_successfully", {
              name: this.$t(data.data.createSupplier.name)
            })}`,
            classes: "success toast",
            displayLength: 3000
          });
          this.id = data.data.createSupplier.id;
          this.$router.push({ name: "suppliers.index" });
        })
        .catch(() => {
          //console.log(e)
          this.validationError = this.$t("name_unique");
        });
    }
  }
};
