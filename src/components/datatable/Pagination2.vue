<template>
  <ul class="pagination flex-center mt-30">
    <span class="page-state"> </span>
    <li class="flex-center">
      <a class="flex-center"><i class="material-icons">chevron_left</i></a>
    </li>

    <li class="waves-effect">
      <a>1</a>
    </li>

    <li class="flex-center">
      <a class="flex-center"><i class="material-icons">chevron_right</i></a>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      end: ""
    };
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
