<template>
  <div class="form-group mb-4">
    <label
      :for="fieldName"
      class="block font-normal uppercase tracking-wide text-xs mb-1"
      >{{ $t(fieldName) }}</label
    >
    <input
      :type="type"
      :id="fieldName"
      :value="field"
      @input="update($event.target.value)"
      class="border px-4 py-2 w-full rounded bg-gray-200"
    />
    <span v-if="hasErr" class="msg is-danger" v-text="$t(errMsg)"></span>
    <span
      v-if="hasError && !hasErr"
      class="msg is-danger"
      v-text="$t(errorMsg)"
    ></span>
  </div>
</template>

<script>
export default {
  props: ["validation", "field", "fieldName", "type", "hasErr", "errMsg"],
  data() {
    return {
      hasError: false,
      errorMsg: ""
    };
  },
  methods: {
    update(val) {
      this.validation.forEach(cond => {
        console.log(cond);
        let errors = [];
        for (let condition of this.validation) {
          if (!condition.regex.test(val)) {
            errors.push(condition.message);
          }
        }
        if (errors.length === 0) {
          this.hasError = false;
          this.errorMsg = "";
        } else {
          this.hasError = true;
          this.errorMsg = errors[0];
        }
      });
      this.$emit("input", val);
    }
  }
};
</script>

<style></style>
