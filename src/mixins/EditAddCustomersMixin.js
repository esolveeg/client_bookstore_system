import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import M from "materialize-css";
import SimpleVueValidation from "simple-vue-validator";
import {
  createCustomer,
  updateCustomer,
  allBranches,
  customerQuery
} from "@/graphql/queries/queries.js";
const Validator = SimpleVueValidation.Validator;
export default {
  components: {
    Breadcrumbs
  },
  data() {
    return {
      path: [{ title: "customers", route: "customers.index" }],
      customer: {},
      name: "",
      email: "",
      intersts: "",
      phone: "",
      allBranches: [],
      title: "create_customer",
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
        .required()
        .email();
    },
    intersts(value) {
      return Validator.value(value).maxLength(250);
    },
    phone(value) {
      return Validator.value(value).maxLength(16);
    },
    bracnch(value) {
      return Validator.value(value).required();
    }
  },

  apollo: {
    customer() {
      return {
        query: customerQuery,
        variables() {
          return {
            id: parseInt(this.$route.params.id)
          };
        },
        result({ data: { customer } }) {
          this.name = customer.name;
          this.email = customer.email;
          this.intersts = customer.intersts;
          this.branch = customer.branch.id;
          this.phone = customer.phone;
          this.title = `edit`;
        }
      };
    },
    allBranches() {
      return {
        query: allBranches
      };
    }
  },

  watch: {
    "validation.errors"() {
      const btn = document.querySelector(".input-field button");
      if (this.validation.errors.length > 0) {
        btn.setAttribute("disabled", "disabled");
      } else {
        if (!this.customer) {
          this.validation.touchedRecords.length > 1
            ? btn.removeAttribute("disabled")
            : "";
        } else {
          btn.removeAttribute("disabled");
        }
      }
    }
  },
  store: {
    isPos: "isPos",
    branch: "branch_id"
  },
  methods: {
    loadSelects() {
      let selects = document.querySelectorAll("select");
      setTimeout(() => {
        M.FormSelect.init(selects, {});
      }, 2000);
    },
    submitted() {
      this.customer ? this.updateCustomer() : this.createCustomer();
    },
    updateCustomer() {
      this.$apollo
        .mutate({
          mutation: updateCustomer,
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
              name: this.$t(data.data.updateCustomer.name)
            })}`,
            classes: "success toast",
            displayLength: 2000
          });
          this.$router.push({ name: "customers.index" });
        })
        .catch(error => {
          console.log(error);
          //this.validationError = this.$t("name_unique");
        });
    },

    createCustomer() {
      this.$apollo
        .mutate({
          mutation: createCustomer,
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
              name: this.$t(data.data.createCustomer.name)
            })}`,
            classes: "success toast",
            displayLength: 3000
          });
          this.id = data.data.createCustomer.id;
          this.$router.push({ name: "customers.index" });
        })
        .catch(() => {
          //console.log(e)
          this.validationError = this.$t("name_unique");
        });
    }
  },
  mounted() {
    this.loadSelects();
  }
};
