<template>
  <div class="my-modal">
    <div id="multi-delete-modal" class="modal">
      <div class="modal-content">
        <h4>{{ $t("are_you_sure") }}</h4>
        <p>
          {{ this.$t("delete") }}
          {{ $tc(`plural_${model}`, count, { n: count }) }}
        </p>
      </div>
      <div class="modal-footer">
        <a
          @click.prevent="$emit('submitted')"
          class="modal-close waves-effect waves-green btn-flat"
          >{{ $t("sure") }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  store: {
    ids: "selected_ids",
    model: "deleted_model"
  },
  computed: {
    count() {
      return this.ids.length;
    }
  }
};
</script>

<style></style>
