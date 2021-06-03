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
                      :class="{ error: validation.hasError('isbn') }"
                    >
                      <input
                        autocomplete="off"
                        autofocus
                        v-model="isbn"
                        id="isbn"
                        type="text"
                      />
                      <label for="isbn" :class="isbn ? 'active' : ''">{{
                        $t("isbn")
                      }}</label>

                      <div class="message">
                        <span class="success-text" v-if="isFound">{{
                          $t("product_found", { name })
                        }}</span>
                        {{ validation.firstError("isbn") }}
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="!isFound">
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

                  <div class="row" v-if="!isFound">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('purchased_price') }"
                    >
                      <input
                        v-model="purchased_price"
                        id="purchased_price"
                        type="number"
                      />
                      <label
                        for="purchased_price"
                        :class="purchased_price ? 'active' : ''"
                        >{{ $t("purchased_price") }}</label
                      >
                      <div class="message">
                        {{ validation.firstError("purchased_price") }}
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="!isFound">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('price') }"
                    >
                      <input v-model="price" id="price" type="number" />
                      <label for="price" :class="price ? 'active' : ''">{{
                        $t("price")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("price") }}
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="!isPos">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('branch') }"
                    >
                      <select id="branch" v-model="branch">
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
                      <label for="branches" :class="branch ? 'active' : ''">{{
                        $t("branches")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("branch") }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="input-field col s12"
                      :class="{ error: validation.hasError('qty') }"
                    >
                      <input v-model="qty" id="qty" type="number" />
                      <label for="qty" :class="qty ? 'active' : ''">{{
                        $t("qty")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("qty") }}
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
import ProductsMixin from "@/mixins/EditAddProductsMixin.js";

export default {
  name: "edit-add-Products",
  mixins: [ProductsMixin]
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
