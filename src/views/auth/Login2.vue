<template>
  <div class="login">
    <div class="login__wrapper">
      <div class="login__header">
        <h5>{{ $t("signin") }}</h5>
      </div>
      <form
        @keydown="form.errors.clear($event.target.id)"
        autocomplete="off"
        @submit.prevent="onSubmit()"
      >
        <text-field
          class="font-sans"
          :field="form.email"
          :validation="emailValidation"
          v-model="form.email"
          fieldName="email"
          type="email"
          :hasErr="form.errors.has('email')"
          :errMsg="form.errors.get('email')"
        />
        <text-field
          :field="form.password"
          :validation="passwordValidation"
          v-model="form.password"
          fieldName="password"
          type="password"
          :hasErr="form.errors.has('password')"
          :errMsg="form.errors.get('password')"
        />
        <submit-btn
          :isDisabled="form.errors.any()"
          :isLoading="form.isLoading"
          title="login"
        />
      </form>
    </div>
  </div>
</template>

<script>
import Form from "@/classes/Form";
import TextField from "@/components/inputs/TextField.vue";
import SubmitBtn from "@/components/inputs/SubmitBtn.vue";
export default {
  data() {
    return {
      form: new Form({
        email: "admin@readerscorner.co",
        password: "123456"
      }),
      emailValidation: [
        { message: "required", regex: /[^()]/ },

        {
          message: "invalid_email",
          regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
      ],
      passwordValidation: [
        { message: "required", regex: /[^()]/ },
        { message: "min_6", regex: /.{6,}/ }
      ]
    };
  },
  components: {
    "text-field": TextField,
    "submit-btn": SubmitBtn
  },
  computed: {
    rtl() {
      return this.$store.getters["ui/rtl"];
    }
  },
  methods: {
    async onSubmit() {
      this.form
        .post("login")
        .then(data => {
          let token = data["access_token"];
          localStorage.setItem("token", token);
          this.$router.push("/");
        })
        .catch(e => {
          console.log(e);
        });
    },
    show() {
      this.$modal.show("modal-login");
    },
    showRegister() {
      this.$modal.show("modal-register");
      this.$modal.hide("modal-login");
    },
    opened() {
      let modal = document.querySelector(".v--modal-box.v--modal");
      let value = modal.style.left;
      if (this.rtl) {
        modal.style.left = "auto";
        modal.style.right = value;
        modal.style.textAlign = "right";
      }
    },
    hide() {
      this.$modal.hide("modal-login");
    }
  }
};
</script>
