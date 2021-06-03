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
                      :class="{ error: validation.hasError('description') }"
                    >
                      <textarea
                        v-model="description"
                        id="description"
                        class="materialize-textarea"
                      ></textarea>
                      <label
                        for="description"
                        :class="description ? 'active' : ''"
                        >{{ $t("description") }}</label
                      >
                      <div class="message">
                        {{ validation.firstError("description") }}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('users') }"
                    >
                      <select id="users" multiple v-model="users">
                        <option value="" disabled="none">{{
                          $t("select_user")
                        }}</option>
                        <option
                          v-for="user in allUsers"
                          :key="user.id"
                          :value="user.id"
                          >{{ user.name }}</option
                        >
                      </select>
                      <label for="users" :class="users ? 'active' : ''">{{
                        $t("users")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("users") }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('permissions') }"
                    >
                      <select id="permissions" multiple v-model="permissions">
                        <option value="" disabled="none">{{
                          $t("select_permission")
                        }}</option>
                        <option
                          v-for="permission in allPermissions"
                          :key="permission.id"
                          :value="permission.id"
                          >{{ permission.name }}</option
                        >
                      </select>
                      <label
                        for="permissions"
                        :class="permissions ? 'active' : ''"
                        >{{ $t("permissions") }}</label
                      >
                      <div class="message">
                        {{ validation.firstError("permissions") }}
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
import {
  createRole,
  updateRole,
  roleQuery
} from "@/graphql/queries/queries.js";
const Validator = SimpleVueValidation.Validator;
import gql from "graphql-tag";
export default {
  name: "edit-add-roles",
  components: {
    Breadcrumbs
  },
  data() {
    return {
      path: [{ title: "roles", route: "roles.index" }],
      roleById: {},
      name: "",
      slug: "",
      description: "",
      allUsers: "",
      allPermissions: [],
      users: [],
      permissions: [],
      title: "create_role",
      validationError: "",
      fregment: ""
    };
  },
  validators: {
    name(value) {
      return Validator.value(value)
        .required()
        .minLength(3);
    },
    users(value) {
      return Validator.value(value);
    },
    permissions(value) {
      return Validator.value(value).required();
    },

    description(value) {
      return Validator.value(value).minLength(3);
    }
  },

  apollo: {
    roleById() {
      return {
        query: roleQuery,
        variables() {
          return {
            id: parseInt(this.$route.params.id)
          };
        },
        result({ data: { roleById } }) {
          this.name = roleById.name;
          this.description = roleById.description;
          this.slug = roleById.slug;
          this.title = `edit`;
          let users = [];
          roleById.users.forEach(user => {
            users.push(user.id);
          });
          let permissions = [];
          roleById.permissions.forEach(permission => {
            permissions.push(permission.id);
          });
          console.log(permissions);
          this.users = users;
          this.permissions = permissions;
        }
      };
    },
    allUsers() {
      return {
        query: gql`
          query {
            allUsers {
              name
              id
            }
          }
        `
      };
    },
    allPermissions() {
      return {
        query: gql`
          query {
            allPermissions {
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
        if (!this.role) {
          this.validation.touchedRecords.length > 1
            ? btn.removeAttribute("disabled")
            : "";
        } else {
          btn.removeAttribute("disabled");
        }
      }
    },
    name() {
      let slug = this.name.replace(" ", "-");
      slug = slug.replace("&", "-");
      slug = slug.replace("?", "-");
      slug = slug.replace("/", "-");
      slug = slug.replace("\\", "-");
      this.slug = slug;
      console.log(this.slug);
    }
  },
  methods: {
    submitted() {
      this.roleById ? this.updateRole() : this.createRole();
    },
    loadSelects() {
      let selects = document.querySelectorAll("select");
      setTimeout(() => {
        M.FormSelect.init(selects, {});
      }, 3000);
    },
    updateRole() {
      this.$apollo
        .mutate({
          mutation: updateRole,
          // Parameters
          variables: {
            name: this.name,
            slug: this.slug,
            id: parseInt(this.$route.params.id),
            description: this.description,
            users: this.users,
            permissions: this.permissions
          }
        })
        .then(data => {
          M.toast({
            html: `${this.$t("updated_successfully", {
              name: data.data.updateRole.name
            })}`,
            classes: "success toast",
            displayLength: 2000
          });
          this.roleById.name = this.name;
          this.roleById.slug = this.slug;
          this.roleById.description = this.description;
          this.roleById.users = this.users;
          this.roleById.permissions = this.permissions;
          this.$router.push({ name: "roles.index" });
        })
        .catch(error => {
          console.log(error);
          this.validationError = this.$t("name_unique");
        });
    },
    createRole() {
      this.$apollo
        .mutate({
          mutation: createRole,
          // Parameters
          variables: {
            name: this.name,
            slug: this.slug,
            description: this.description,
            users: this.users,
            permissions: this.permissions
          }
        })
        .then(data => {
          console.log(data);
          M.toast({
            html: `${this.$t("created_successfully", {
              name: data.data.createRole.name
            })}`,
            classes: "success toast",
            displayLength: 3000
          });

          this.$router.push({ name: "roles.index" });
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
