<template>
  <div class="login">
    <div class="login__wrapper">
      <div class="login__header">
        <h5>{{ $t("signin") }}</h5>
      </div>
      <form
        class="login__form"
        @submit.prevent="login"
        :class="[
          { error: validation.hasError('email') },
          { error: validation.hasError('password') },
        ]"
      >
        <div class="card-alert danger card" v-if="validationError">
          <div class="card-content">
            <p><i class="material-icons">error</i>{{ validationError }}</p>
          </div>
        </div>
        <div
          class="input-field col s12"
          :class="{ error: validation.hasError('email') }"
        >
          <i class="material-icons prefix">person_outline</i>
          <input type="text" v-model="email" id="email" class="validate" />
          <label class="active" for="email">{{ $t("email") }}</label>
          <div class="message">{{ validation.firstError("email") }}</div>
        </div>
        <div
          class="input-field col s12"
          :class="{ error: validation.hasError('password') }"
        >
          <i class="material-icons prefix">lock_outline</i>
          <input type="password" v-model="password" id="password" />
          <label for="password">{{ $t("password") }}</label>
          <div class="message">{{ validation.firstError("password") }}</div>
        </div>
        <div class="input-field col s12">
          <button
            class="btn cyan waves-effect waves-light border-round"
            type="submit"
          >
            {{ $t("login") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { onLogin } from "../../vue-apollo.js";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      prevRoute: null,
      validationError: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  validators: {
    email: function(value) {
      return Validator.value(value)
        .required()
        .email();
    },
    password: function(value) {
      return Validator.value(value)
        .required()
        .minLength(6);
    },
  },

  watch: {
    "validation.errors"() {
      const btn = document.querySelector(".login__form .input-field button");
      this.validation.errors.length > 0
        ? btn.setAttribute("disabled", "disabled")
        : btn.removeAttribute("disabled");
    },
  },
  methods: {
    async login() {
      await this.$apollo
        .mutate({
          mutation: require("@/graphql/mutations/Login.gql"),
          // Parameters
          variables: {
            username: this.email,
            password: this.password,
          },
        })
        .then((data) => {
          this.$http
            .post(`${process.env.VUE_APP_HTTP_BASE}/oauth/token`, {
              grant_type: "password",
              client_id: 2,
              client_secret: "3oGpd1hPg34DWj1D9ARmWXCV1h7Ml7YL0O7oO4GK",
              scope: "*",
              username: this.email,
              password: this.password,
            })
            .then((res) => {
              let token = res.data["access_token"];
              localStorage.setItem("token", token);
              this.$http
                .get("user/permissions", {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then((resp) => {
                  localStorage.setItem(
                    "permissons",
                    JSON.stringify(resp.data.permissions),
                  );
                  resp.data.branch
                    ? localStorage.setItem(
                        "branch",
                        JSON.stringify(resp.data.branch),
                      )
                    : "";
                });

              this.$http.get("allbranches").then((d) => {
                localStorage.setItem("allbranches", JSON.stringify(d.data));
              });
            });

          onLogin(
            this.$apollo.provider.defaultClient,
            data.data.login.access_token,
          );

          this.$router.go(-1);
          this.prevRoute
            ? this.$router.push(this.prevRoute.path)
            : this.$router.push("/");
        })
        .catch(() => {
          this.validationError = this.$t("login_error");
        });
    },
  },
};
</script>
<style lang="css" scoped>
@import url("../../sass/views/auth/_login.min.css");
</style>
