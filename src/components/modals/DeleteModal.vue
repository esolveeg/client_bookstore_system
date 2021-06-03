<template>
  <div class="my-modal">
    <div id="delete-modal" class="modal">
      <div class="modal-content">
        <h4>{{ $t("delete_name", { name }) }}</h4>
        <p>{{ $t("delete_sure", { name }) }}</p>
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
    id: "deleted_id",
    name: "deleted_name"
  }
};
</script>

<style></style>
