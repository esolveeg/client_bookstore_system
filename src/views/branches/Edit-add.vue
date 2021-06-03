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
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('address') }"
                    >
                      <input v-model="address" id="address" type="text" />
                      <label for="address" :class="address ? 'active' : ''">{{
                        $t("address")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("address") }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('rent') }"
                    >
                      <input v-model="rent" id="rent" type="number" />
                      <label for="rent" :class="rent ? 'active' : ''">{{
                        $t("rent")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("rent") }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('bills') }"
                    >
                      <input v-model="bills" id="bills" type="number" />
                      <label for="bills" :class="bills ? 'active' : ''">{{
                        $t("bills")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("bills") }}
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
import BranchesMixin from "@/mixins/EditAddBranchesMixin.js";

export default {
  name: "edit-add-branches",
  mixins: [BranchesMixin]
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
