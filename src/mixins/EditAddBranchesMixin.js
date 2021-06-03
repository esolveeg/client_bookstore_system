import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import M from "materialize-css";
import SimpleVueValidation from "simple-vue-validator";
import {
  createBranch,
  updateBranch,
  branchQuery
} from "@/graphql/queries/queries.js";
const Validator = SimpleVueValidation.Validator;

export default {
  components: {
    Breadcrumbs
  },
  data() {
    return {
      path: [{ title: "branches", route: "branches.index" }],
      branch: {},
      id: "",
      name: "",
      email: "",
      address: "",
      phone: "",
      rent: "",
      bills: "",
      title: "create_branch",
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
        .email()
        .maxLength(200);
    },
    address(value) {
      return Validator.value(value).maxLength(200);
    },
    phone(value) {
      return Validator.value(value).maxLength(16);
    },
    rent(value) {
      return Validator.value(value)
        .required()
        .digit()
        .maxLength(5);
    },
    bills(value) {
      return Validator.value(value)
        .required()
        .digit()
        .maxLength(5);
    }
  },

  apollo: {
    branch() {
      return {
        query: branchQuery,
        variables() {
          return {
            id: parseInt(this.$route.params.id)
          };
        },
        result({ data: { branch } }) {
          this.name = branch.name;
          this.email = branch.email;
          this.address = branch.address;
          this.phone = branch.phone;
          this.rent = branch.rent;
          this.bills = branch.bills;
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
        if (!this.branch) {
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
      this.branch ? this.updateBranch() : this.createBranch();
    },
    updateBranch() {
      this.$apollo
        .mutate({
          mutation: updateBranch,
          // Parameters
          variables: {
            name: this.name,
            email: this.email,
            address: this.address,
            phone: this.phone,
            rent: this.rent,
            bills: this.bills,
            id: parseInt(this.$route.params.id)
          }
        })
        .then(data => {
          M.toast({
            html: `${this.$t("updated_successfully", {
              name: data.data.updateBranch.name
            })}`,
            classes: "success toast",
            displayLength: 2000
          });
          this.$router.push({ name: "branches.index" });
        })
        .catch(() => {
          //this.validationError = this.$t("name_unique");
        });
    },
    createBranch() {
      this.$apollo
        .mutate({
          mutation: createBranch,
          // Parameters
          variables: {
            name: this.name,
            email: this.email,
            address: this.address,
            phone: this.phone,
            rent: this.rent,
            bills: this.bills
          }
        })
        .then(data => {
          M.toast({
            html: `${this.$t("created_successfully", {
              name: data.data.createBranch.name
            })}`,
            classes: "success toast",
            displayLength: 3000
          });
          this.id = data.data.createBranch.id;
          // console.log(id);
          this.$router.push({ name: "branches.index" });
        })
        .catch(() => {
          //console.log(e)
          this.validationError = this.$t("name_unique");
        });
    }
  }
};
