import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import M from "materialize-css";
import SimpleVueValidation from "simple-vue-validator";
import {
  createExpense,
  updateExpense,
  expenseQuery
} from "@/graphql/queries/queries.js";
const Validator = SimpleVueValidation.Validator;
import moment from "moment";
import gql from "graphql-tag";
export default {
  components: {
    Breadcrumbs
  },
  data() {
    let date = moment()
      .startOf("day")
      .format("YYYY-MM-DD");
    return {
      path: [{ title: "expenses", route: "expenses.index" }],
      expense: {},
      branch: "",
      date,
      value: "",
      note: "",
      title: "create_expense",
      validationError: "",
      fregment: ""
    };
  },
  validators: {
    note(value) {
      return Validator.value(value)
        .required()
        .maxLength(250);
    },
    date(value) {
      return Validator.value(value).required();
    },
    value(value) {
      return Validator.value(value)
        .required()
        .digit()
        .maxLength(5);
    }
  },

  apollo: {
    expense() {
      return {
        query: expenseQuery,
        variables() {
          return {
            id: parseInt(this.$route.params.id)
          };
        },
        result({ data: { expense } }) {
          this.branch = expense.branch.id;
          this.note = expense.note;
          this.date = expense.date;
          this.value = expense.value;
          this.title = `edit`;
        }
      };
    },
    allBranches() {
      return {
        query: gql`
          query {
            allBranches {
              name
              id
            }
          }
        `
      };
    }
  },

  watch: {
    "validation.errors"() {
      const btn = document.querySelector(".input-field button");
      if (this.validation.errors.length > 0) {
        btn.setAttribute("disabled", "disabled");
      } else {
        if (!this.expense) {
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
      this.expense ? this.updateExpense() : this.createExpense();
    },
    loadSelects() {
      let selects = document.querySelectorAll("select");
      setTimeout(() => {
        M.FormSelect.init(selects, {});
      }, 3000);
    },
    updateExpense() {
      this.$apollo
        .mutate({
          mutation: updateExpense,
          // Parameters
          variables: {
            note: this.note,
            branch: this.branch,
            date: this.date,
            id: parseInt(this.$route.params.id),
            value: this.value
          }
        })
        .then(() => {
          M.toast({
            html: `${this.$t("updated_successfully", {
              name: this.$t("expense")
            })}`,
            classes: "success toast",
            displayLength: 2000
          });
          this.expense.note = this.note;
          this.expense.value = this.value;
          this.expense.branch.id = this.branch;
          this.$router.push({ name: "expenses.index" });
        });
    },
    createExpense() {
      this.$apollo
        .mutate({
          mutation: createExpense,
          // Parameters
          variables: {
            date: this.date,
            note: this.note,
            branch: this.branch,
            value: this.value
          }
        })
        .then(() => {
          M.toast({
            html: `${this.$t("created_successfully", {
              name: this.$t("expense")
            })}`,
            classes: "success toast",
            displayLength: 3000
          });

          this.$router.push({ name: "expenses.index" });
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
