<template>
  <div class="form-group mb-4  input-field">
    <button
      :disabled="isDisabled || isLoading"
      class="btn submitbtn cyan waves-effect waves-light border-round"
    >
      <span v-if="isLoading">loading</span>
      <span v-else>{{ $t(title) }}</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["isDisabled", "isLoading", "title"]
};
</script>

<style></style>
