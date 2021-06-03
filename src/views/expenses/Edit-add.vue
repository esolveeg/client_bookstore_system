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
                      :class="{ error: validation.hasError('note') }"
                    >
                      <textarea
                        v-model="note"
                        id="note"
                        class="materialize-textarea"
                      ></textarea>
                      <label for="note" :class="note ? 'active' : ''">{{
                        $t("note")
                      }}</label>
                      <div class="message">
                        {{ validation.firstError("note") }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
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
                    <div class="input-field col s12">
                      <label for="branches">{{ $t("date") }}</label>
                      <input type="date" v-model="date" />
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
import ExpensesMixin from "@/mixins/EditAddExpensesMixin.js";

export default {
  name: "edit-add-roles",
  mixins: [ExpensesMixin]
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
