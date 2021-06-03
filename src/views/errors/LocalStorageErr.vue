<template>
  <div class="hello">
    <div class="container">
      <div class="wrapper">
        <img src="@/assets/404.png" />
        <h1>{{ $t("sorry") }}</h1>
        <h6>{{ $t("lcoal_storage_error") }}</h6>
        <router-link to="/" class="btn waves-effect waves-light">{{
          $t("back_to_home")
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "403"
};
</script>

<style scoped>
@import url("../../sass/errors/_error.min.css");
</style>
