<template>
  <div class="row">
    <Breadcrumbs :title="title" :path="path" :fregment="fregment" />
    <div class="col s12 mt-65">
      <div class="container">
        <!-- Current balance & total transactions cards-->
        <div class="row mt-4">
          <div class="col s12 m12 l12">
            <!-- Current Balance -->
            <h5 class="form-title">
              <i class="material-icons app-header-icon text-top"
                >perm_identity</i
              >
              {{ $t(title, { fregment }) }}
            </h5>

            <div class="card animated  fadeInLeft ">
              <div class="card-content">
                <form @submit.prevent="submitted()">
                  <div class="card-alert danger card" v-if="validationError">
                    <div class="card-content">
                      <p>
                        <i class="material-icons">error</i>{{ validationError }}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('name') }"
                    >
                      <input v-model="name" id="name" type="text" />
                      <label for="name" :class="name ? 'active' : ''">{{
                        $t("name")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("name") }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('email') }"
                    >
                      <input v-model="email" id="email" type="email" />
                      <label for="email" :class="email ? 'active' : ''">{{
                        $t("email")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("email") }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('password') }"
                    >
                      <input v-model="password" id="password" type="password" />
                      <label for="password">{{ $t("password") }}</label>
                      <div class="message" v-if="user">
                        {{ $t("password_note") }}
                      </div>
                      <div class="message">
                        {{ validation.firstError("password") }}
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="!user">
                    <div
                      class="input-field col s12"
                      :class="{
                        error: validation.hasError('passwordConfirmation')
                      }"
                    >
                      <input
                        v-model="passwordConfirmation"
                        id="password_confirmation"
                        type="password"
                      />
                      <label for="password_confirmation">{{
                        $t("password_confirmation")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("passwordConfirmation") }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('roles') }"
                    >
                      <select
                        v-if="rolesLoaded"
                        id="roles"
                        multiple
                        v-model="roles"
                      >
                        <option value="" disabled="none">{{
                          `Select role`
                        }}</option>
                        <option
                          v-for="role in allRoles"
                          :key="role.id"
                          :value="role.slug"
                          >{{ role.name }}</option
                        >
                      </select>
                      <label for="roles" :class="roles ? 'active' : ''">{{
                        $t("roles")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("roles") }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="row"
                    :class="isPos ? '' : 'hide'"
                    id="employees_select"
                  >
                    <div
                      class="input-field col s12"
                      :class="{ error: employeeErr }"
                    >
                      <select id="employee" v-model="employee">
                        <option value="" disabled="none">{{
                          `Select employee`
                        }}</option>
                        <option
                          v-for="employee in allEmployees"
                          :key="employee.id"
                          :value="employee.id"
                          >{{ employee.name }}</option
                        >
                      </select>
                      <label for="employee" :class="employee ? 'active' : ''">{{
                        $t("employee")
                      }}</label>
                      <div class="message" v-if="employeeErr">
                        {{ $t("required") }}
                      </div>
                      <div class="message">
                        {{ $t("employee_note") }}
                        <router-link :to="{ name: 'employees.create' }">{{
                          $t("add_employee")
                        }}</router-link>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <button
                        class="btn create cyan waves-effect waves-light left"
                        type="submit"
                        name="action"
                        disabled="disabled"
                      >
                        {{ $t("save") }}
                        <i class="material-icons right">send</i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import M from "materialize-css";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;
import gql from "graphql-tag";
export default {
  name: "edit-add-users",
  components: {
    Breadcrumbs
  },
  data() {
    return {
      path: [{ title: "users", route: "users.index" }],
      user: {},
      posRole: {},
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      allRoles: [],
      roles: [],
      isPos: false,
      allEmployees: [],
      employee: null,
      employeeErr: true,
      title: "create_user",
      validationError: "",
      rolesLoaded: true,
      fregment: ""
    };
  },
  validators: {
    email(value) {
      return Validator.value(value)
        .required()
        .email();
    },
    name(value) {
      return Validator.value(value)
        .required()
        .minLength(3);
    },
    roles(value) {
      return Validator.value(value).required();
    },
    password(value) {
      return Validator.value(value)
        .required()
        .minLength(6);
    },
    passwordConfirmation(value) {
      return Validator.value(value)
        .required()
        .match(this.password);
    },
    employee(value) {
      return Validator.value(value).required();
    }
  },

  apollo: {
    user() {
      return {
        query: require("@/graphql/queries/User.gql"),
        variables() {
          return {
            id: parseInt(this.$route.params.id)
          };
        }
      };
    },
    allRoles() {
      return {
        query: gql`
          query {
            allRoles {
              name
              slug
            }
          }
        `
      };
    },
    allEmployees() {
      return {
        query: gql`
          query {
            allEmployees {
              name
              id
            }
          }
        `
      };
    }
  },

  watch: {
    employee: {
      handler(value) {
        const btn = document.querySelector(".input-field button");
        if (value) {
          this.employeeErr = false;
        } else {
          btn.removeAttribute("disabled");
          this.employeeErr = true;
        }
      }
    },
    user: {
      handler(user) {
        if (user) {
          this.name = user.name;
          this.email = user.email;
          this.title = `edit`;
          this.fregment = user.name;
          let roles = [];
          user.roles.forEach(role => {
            roles.push(role.slug);
          });
          if (user.employee) {
            this.isPos = true;
            this.employee = user.employee.id;
            const btn = document.querySelector(".input-field button");
            btn.removeAttribute("disabled");
          }
          this.roles = roles;
          this.rolesLoaded = true;
        }
      }
    },
    "validation.errors"() {
      const btn = document.querySelector(".input-field button");
      if (this.validation.errors.length > 0) {
        btn.setAttribute("disabled", "disabled");
      } else {
        if (!this.user) {
          this.validation.touchedRecords.length > 4
            ? btn.removeAttribute("disabled")
            : "";
        } else {
          btn.removeAttribute("disabled");
        }
      }
    },
    roles: {
      handler(value) {
        if (value) {
          const btn = document.querySelector(".input-field button");
          if (value.indexOf("pos") != -1) {
            if (!this.employee) {
              setTimeout(() => {
                btn.setAttribute("disabled", "disabled");
              }, 1000);
            } else {
              setTimeout(() => {
                btn.removeAttribute("disabled");
              }, 1100);
            }
            this.isPos = true;
          } else {
            this.isPos = false;
            setTimeout(() => {
              btn.removeAttribute("disabled");
            }, 1100);
          }
        }
      }
    }
  },
  methods: {
    submitted() {
      this.user ? this.updateUser() : this.createUser();
    },
    loadSelects() {
      let selects = document.querySelectorAll("select");
      setTimeout(() => {
        M.FormSelect.init(selects, {});
      }, 3000);
    },
    updateUser() {
      this.$apollo
        .mutate({
          mutation: require("@/graphql/mutations/UpdateUser.gql"),
          // Parameters
          variables: {
            name: this.name,
            email: this.email,
            id: parseInt(this.$route.params.id),
            password: this.password,
            password_confirmation: this.passwordConfirmation,
            employee: parseInt(this.employee),
            roles: this.roles
          }
        })
        .then(data => {
          M.toast({
            html: `${this.$t("updated_successfully", {
              name: data.data.updateUser.name
            })}`,
            classes: "success toast",
            displayLength: 2000
          });
          this.user.name = this.name;
          this.user.email = this.email;
          this.user.employee = this.employee;
          this.$router.push({ name: "users.index" });
        })
        .catch(() => {
          this.validationError = this.$t("email_unique");
        });
    },
    createUser() {
      this.$apollo
        .mutate({
          mutation: require("@/graphql/mutations/CreateUser.gql"),
          // Parameters
          variables: {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation,
            employee: parseInt(this.employee),
            roles: this.roles
          }
        })
        .then(data => {
          M.toast({
            html: `${this.$t("created_successfully", {
              name: data.data.createUser.name
            })}`,
            classes: "success toast",
            displayLength: 3000
          });

          this.$router.push({ name: "users.index" });
        })
        .catch(() => {
          //console.log(e)
          this.validationError = this.$t("email_unique");
        });
    }
  },
  mounted() {
    this.loadSelects();
  }
};
</script>
<style lang="scss" scoped>
.form-title {
  font-weight: 700;
  line-height: 3.6rem;
  font-size: 2.64rem;
  margin-bottom: 5rem;
  & i {
    font-size: 3.6rem;
    vertical-align: bottom;
  }
}

label {
  font-size: 1.6rem !important;
}
input,
.checkbox span:not(.lever),
textarea,
select {
  font-size: 1.6rem !important;
  height: 4.2rem !important;
}
.checkbox {
  position: relative;
}
</style>
