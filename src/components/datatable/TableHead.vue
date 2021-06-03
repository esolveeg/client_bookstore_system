<template>
  <table class="table data-table">
    <thead>
      <tr>
        <th>
          <label class="checkbox">
            <input v-model="localStatus" id="selectAll" type="checkbox" />
            <span></span>
          </label>
        </th>
        <th
          v-for="column in columns"
          :key="column.name"
          @click="$emit('sort', column.name)"
          :class="sortKey === column.name ? sortOrder : 'sorting'"
          :style="'width:' + column.width + ';' + 'cursor:pointer;'"
        >
          {{ $t(`${column.label}`) }}
        </th>
        <th v-if="actions">
          {{ $t("actions") }}
        </th>
      </tr>
    </thead>
    <slot></slot>
  </table>
</template>

<script>
import { meQuery } from "@/graphql/queries/queries.js";
export default {
  props: ["columns", "sortKey", "sortOrder", "status"],
  data() {
    return {
      localStatus: this.status,
      actions: false
    };
  },
  store: ["me"],
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
        permissions.includes("delete_users") ||
        permissions.includes("edit_users") ||
        permissions.includes("read_users")
          ? (this.actions = true)
          : "";
      }
    }
  },
  watch: {
    localStatus(status) {
      this.$emit("update", status);
    }
  }
};
</script>

<style lang="scss" scoped>
thead {
  background-color: #f8fafc;
}
.sorting {
  background-image: url("https://img.icons8.com/offices/16/000000/sort.png");
  background-repeat: no-repeat;
  background-position: center right;
  @media screen AND (max-width: 992px) {
    background-image: none !important;
  }
}
.ASC {
  background-image: url("https://img.icons8.com/offices/16/000000/sort-down.png");
  background-repeat: no-repeat;
  background-position: center right;

  //background-size: 35px;
}
.DESC {
  background-image: url("https://img.icons8.com/offices/16/000000/sort-up.png");
  background-repeat: no-repeat;
  background-position: center right;

  //background-size: 35px;
}
</style>
