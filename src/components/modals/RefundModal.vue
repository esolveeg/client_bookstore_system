<template>
  <div class="normal-case tracking-normal">
    <modal
      name="modal-refund"
      @opened="opened"
      :adaptive="true"
      :height="200"
      :width="400"
    >
      <div class="my-modal" style="padding:20px">
        <div id="delete-modal">
          <div class="modal-content">
            <h4>{{ $t("refund_id", { id }) }}</h4>
            <p>{{ $t("refund_sure", { id }) }}</p>
          </div>
          <div class="modal-footer" style="margin-top:20px;">
            <a
              @click.prevent="onSubmit()"
              class="modal-close waves-effect waves-green btn-flat"
              style="padding : 0"
              >{{ $t("sure") }}</a
            >
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import store from "@/store/index";

export default {
  data() {
    return {};
  },
  computed: {
    id() {
      return store.getters["order/refundedOrder"];
    }
  },

  methods: {
    async onSubmit() {
      store.dispatch("order/refund", this.id).then(() => {
        location.reload();
      });
    }
  }
};
</script>
