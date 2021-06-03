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
                      :class="{ error: validation.hasError('phone') }"
                    >
                      <input v-model="phone" id="phone" type="text" />
                      <label for="phone" :class="phone ? 'active' : ''">{{
                        $t("phone")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("phone") }}
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
import SuppliersMixin from "@/mixins/EditAddSuppliersMixin.js";

export default {
  name: "edit-add-Suppliers",
  mixins: [SuppliersMixin]
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
