<template>
  <ul class="pagination flex-center mt-30">
    <span class="page-state"
      >{{ pagination.firstItem }} - {{ pagination.lastItem }} {{ $t("of") }}
      {{ pagination.total }}</span
    >
    <li class="flex-center" v-if="pagination.currentPage !== 1">
      <a class="flex-center" @click="$emit('prev')"
        ><i class="material-icons">chevron_left</i></a
      >
    </li>

    <li
      v-for="n of pagination.lastPage"
      :key="n"
      :class="n == pagination.currentPage ? 'active' : ''"
      class="waves-effect"
      @click="$emit('goTo', n)"
    >
      <a>{{ n }}</a>
    </li>

    <li class="flex-center" v-if="pagination.hasMorePages">
      <a class="flex-center" @click.prevent="$emit('next')"
        ><i class="material-icons">chevron_right</i></a
      >
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      end: ""
    };
  },
  props: {
    pagination: Object
  },
  watch: {
    "pagination.currentPage"() {
      this.end =
        this.pagination.currentPage > 5 ? this.pagination.currentPage + 10 : 20;
    }
  }
};
</script>
<style lang="scss" scoped>
a {
  cursor: pointer;
  user-select: none;
}
.flex-center {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.mt-30 {
  margin-top: 30px;
}
.page-state {
  margin-inline-end: 2rem;
}
</style>
