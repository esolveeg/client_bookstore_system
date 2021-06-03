<template>
  <div class="row" style="margin-top:20px">
    <div class="input-field col s12">
      <select
        :id="fieldName"
        :value="field"
        @change="update($event.target.value)"
      >
        <option value="">{{ $t(`none`) }}</option>
        <option
          v-for="option in options"
          :key="option.id"
          :value="option.id"
          :selected="option.id == 'cash'"
          :class="option.id == 'cash' ? 'active' : ''"
          >{{ option.name }}</option
        >
      </select>
      <label
        style="top:0 !important"
        :for="fieldName"
        :class="field ? 'active' : ''"
        >{{ $t(fieldName) }}</label
      >
      <span v-if="hasErr" class="msg is-danger" v-text="$t(errMsg)"></span>
      <span
        v-if="hasError && !hasErr"
        class="msg is-danger"
        v-text="$t(errorMsg)"
      ></span>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";

export default {
  props: [
    "validation",
    "field",
    "fieldName",
    "type",
    "lazy",
    "hasErr",
    "errMsg",
    "options",
  ],
  data() {
    return {
      hasError: false,
      errorMsg: "",
    };
  },
  methods: {
    update(val) {
      // console.log(val)
      this.$emit("input", val);
    },

    loadSelects() {
      let selects = document.querySelectorAll("select");
      selects.forEach((select) => {
        setTimeout(() => {
          M.FormSelect.init(select, {});
        }, 2000);
      });
    },
  },
  mounted() {
    this.loadSelects();
  },
};
</script>

<style></style>
