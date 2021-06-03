<template>
  <div>
    <router-link
      v-if="canView"
      :to="{ name: 'users.view', params: { id: parseInt(id) } }"
      class="btn waves-effect waves-light actions-btn view"
      ><i class="material-icons hide-on-med-and-up bold">remove_red_eye</i
      ><span class="hide-on-small-onl text-white"
        >{{ $t("plain_view") }}
        <i class="material-icons">remove_red_eye</i></span
      ></router-link
    >
    <a
      v-if="canDelete"
      class="btn waves-effect waves-light actions-btn danger modal-trigger"
      data-target="delete-modal"
      @click.prevent="setData(id, name)"
      ><i class="material-icons hide-on-med-and-up bold">delete</i
      ><span class="hide-on-small-onl text-white"
        >{{ $t("delete") }} <i class="material-icons">delete</i></span
      ></a
    >
    <router-link
      v-if="canEdit"
      :to="{ name: 'users.edit', params: { id: parseInt(id) } }"
      class="btn waves-effect waves-light actions-btn edit"
      ><i class="material-icons hide-on-med-and-up bold">edit</i
      ><span class="hide-on-small-onl text-white"
        >{{ $t("plain_edit") }} <i class="material-icons">edit</i></span
      ></router-link
    >
  </div>
</template>
<script>
import { meQuery } from "@/graphql/queries/queries.js";

export default {
  props: {
    name: String,
    id: String
  },
  data() {
    return {
      canView: false,
      canDelete: false,
      canEdit: false
    };
  },
  store: ["deleted_id", "deleted_name", "deleted_model", "me"],
  methods: {
    setData(id, name) {
      this.deleted_id = id;
      this.deleted_model = "user";
      this.deleted_name = name;
    }
  },
  apollo: {
    me: {
      query: meQuery,
      result({ data: { me } }) {
        let permissions = [];
        me.roles.forEach(role => {
          role.permissions.forEach(per => {
            permissions.push(per.slug);
          });
        });
        permissions.includes("delete_users") ? (this.canDelete = true) : "";
        permissions.includes("edit_users") ? (this.canEdit = true) : "";
        permissions.includes("read_users") ? (this.canView = true) : "";
      }
    }
  }
};
</script>
<style lang="scss">
.btn:not(:last-child) {
  margin-inline-end: 1rem;
  @media screen And (max-width: 1200px) {
    margin-block-end: 1rem;
    margin-inline-end: 0;
  }
  @media screen AND (max-width: 992px) {
    margin-block-end: 0rem;
  }
}
.btn.view {
  background-color: #343a40;
}
.btn span {
  color: #fff;
}
</style>
