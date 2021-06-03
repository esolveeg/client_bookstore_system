import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import M from "materialize-css";
import SimpleVueValidation from "simple-vue-validator";
import {
  createEmployee,
  updateEmployee,
  allBranches,
  employeeQuery
} from "@/graphql/queries/queries.js";
const Validator = SimpleVueValidation.Validator;
export default {
  components: {
    Breadcrumbs
  },
  data() {
    return {
      path: [{ title: "employees", route: "employees.index" }],
      employee: {},
      allBranches: [],
      branch: "",
      name: "",
      target: "",
      email: "",
      phone: "",
      title: "create_employee",
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
    target(value) {
      return Validator.value(value)
        .required()
        .digit();
    },
    email(value) {
      return Validator.value(value)
        .maxLength(200)
        .email();
    },
    phone(value) {
      return Validator.value(value).maxLength(16);
    },
    sallary(value) {
      return Validator.value(value)
        .digit()
        .maxLength(4);
    }
  },

  apollo: {
    employee() {
      return {
        query: employeeQuery,
        variables() {
          return {
            id: parseInt(this.$route.params.id)
          };
        },
        result({ data: { employee } }) {
          this.name = employee.name;
          this.email = employee.email;
          this.phone = employee.phone;
          this.target = employee.target ? employee.target : "";
          this.salary = employee.salary;
          this.branch = employee.branch ? employee.branch.id : "";
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
        if (!this.employee) {
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
    loadSelects() {
      let selects = document.querySelectorAll("select");
      setTimeout(() => {
        M.FormSelect.init(selects, {});
      }, 2000);
    },
    submitted() {
      this.employee ? this.updateEmployee() : this.createEmployee();
    },
    updateEmployee() {
      this.$apollo
        .mutate({
          mutation: updateEmployee,
          // Parameters
          variables: {
            id: parseInt(this.$route.params.id),
            name: this.name,
            email: this.email,
            target: this.target,
            phone: this.phone,
            branch: this.branch,
            salary: this.salary
          }
        })
        .then(data => {
          M.toast({
            html: `${this.$t("updated_successfully", {
              name: this.$t(data.data.updateEmployee.name)
            })}`,
            classes: "success toast",
            displayLength: 2000
          });
          this.$router.push({ name: "employees.index" });
        });
    },
    createEmployee() {
      this.$apollo
        .mutate({
          mutation: createEmployee,
          // Parameters
          variables: {
            name: this.name,
            email: this.email,
            target: this.target,
            salary: this.salary,
            branch: this.branch,
            phone: this.phone
          }
        })
        .then(data => {
          M.toast({
            html: `${this.$t("created_successfully", {
              name: this.$t(data.data.createEmployee.name)
            })}`,
            classes: "success toast",
            displayLength: 3000
          });
          this.id = data.data.createEmployee.id;
          this.$router.push({ name: "employees.index" });
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
