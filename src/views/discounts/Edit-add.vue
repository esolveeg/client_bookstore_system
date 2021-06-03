<template>
  <div class="row">
    <Breadcrumbs :title="pageTitle" :path="path" :fregment="fregment" />
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
              {{ $t(pageTitle, { fregment }) }}
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
                      :class="{ error: validation.hasError('title') }"
                    >
                      <input v-model="title" id="title" type="text" />
                      <label for="title" :class="title ? 'active' : ''">{{
                        $t("title")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("title") }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('type') }"
                    >
                      <select id="type" v-model="type">
                        <option value="" disabled="none">{{
                          $t("select_type")
                        }}</option>
                        <option value="value">{{ $t("value") }}</option>
                        <option value="percent_off">{{ $t("percent") }}</option>
                      </select>
                      <label for="type" :class="type ? 'active' : ''">{{
                        $t("type")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("type") }}
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="isPercent">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('percent') }"
                    >
                      <input v-model="percent" id="percent" type="text" />
                      <label for="percent" :class="percent ? 'active' : ''">{{
                        $t("percent")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("percent") }}
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="isValue">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('value') }"
                    >
                      <input v-model="value" id="value" type="text" />
                      <label for="value" :class="value ? 'active' : ''">{{
                        $t("value")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("value") }}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('products') }"
                    >
                      <select id="products" multiple v-model="products">
                        <option value="" disabled="none">{{
                          $t("select_product")
                        }}</option>
                        <option
                          v-for="product in allProducts"
                          :key="product.id"
                          :value="product.id"
                          >{{ product.name }}</option
                        >
                      </select>
                      <label for="products" :class="products ? 'active' : ''">{{
                        $t("products")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("products") }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <select id="branches" v-model="branch">
                        <option value="" disabled="none">{{
                          $t("select_branch")
                        }}</option>
                        <option
                          v-for="branch in allBranches"
                          :key="branch.id"
                          :value="branch.id"
                          >{{ branch.name }}</option
                        >
                      </select>
                      <label for="branches" :class="branches ? 'active' : ''">{{
                        $t("branches")
                      }}</label>
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
import DiscountsMixin from "@/mixins/EditAddDiscountsMixin.js";

export default {
  name: "edit-add-discounts",
  mixins: [DiscountsMixin]
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
