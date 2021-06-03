<template>
  <div class="normal-case tracking-normal">
    <modal
      name="modal-deletess"
      @opened="opened"
      :adaptive="true"
      :height="150"
      :width="400"
    >
      <div class="my-modal" style="padding:20px">
        <div id="delete-modal">
          <div class="modal-content">
            <h4>{{ $t("delete_name", { name }) }}</h4>
            <p>{{ $t("delete_sure", { name }) }}</p>
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
  // computed: {
  //   rtl() {
  //     return this.$store.getters["ui/rtl"];
  //   },
  // },
  computed: {
    item() {
      return store.getters["ui/item"];
    },
    tableName() {
      return store.getters["ui/tableName"];
    },
    name() {
      return this.item.name ? this.item.name : this.tableName;
    }
  },
  methods: {
    async onSubmit() {
      this.$http
        .post(`deleteById`, { id: this.item.id, table: this.tableName })
        .then(() => {
          location.reload();
        });
    }
    // show() {
    //   this.$modal.show("modal-login");
    // },
    // showRegister() {
    //   this.$modal.show("modal-register");
    //   this.$modal.hide("modal-login");
    // },
    // opened() {
    //   let modal = document.querySelector(".v--modal-box.v--modal");
    //   let value = modal.style.left;
    //   if(this.rtl){
    //     modal.style.left = "auto";
    //     modal.style.right = value;
    //     modal.style.textAlign = 'right';
    //   }

    // },
    // hide() {
    //   this.$modal.hide("modal-login");
    // },
  }
};
</script>
