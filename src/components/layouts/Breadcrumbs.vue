<template>
  <div>
    <div class="content-wrapper-before gradient-45deg-indigo-purple"></div>
    <div class="breadcrumbs-dark pb-0 pt-4" id="breadcrumbs-wrapper">
      <div class="container">
        <div class="row">
          <div class="col s10 m6 l6">
            <h5 class="breadcrumbs-title mt-0 mb-0">
              {{ $t(title, { fregment }) }}
            </h5>
            <ol class="breadcrumbs mb-0">
              <li class="breadcrumbs-item">
                <router-link :to="{ name: 'dashboard' }">{{
                  $t("dashboard")
                }}</router-link>
              </li>
              <li
                class="breadcrumbs-item"
                v-for="(item, index) in path"
                :key="index"
              >
                <router-link :to="{ name: item.route }">{{
                  $t(item.title)
                }}</router-link>
              </li>

              <li class="breadcrumbs-item active">
                {{ $t(title, { fregment }) }}
              </li>
            </ol>
          </div>
          <div class="col s2 m6 l6">
            <a
              v-for="(btn, index) in btns"
              :key="index"
              class="btn waves-effect waves-light breadcrumbs-btn  modal-trigger right"
              :class="btn.type"
              @click.prevent="$emit(btn.emit)"
              ><i class="material-icons hide-on-med-and-up bold">{{
                btn.icon
              }}</i
              ><span class="hide-on-small-onl"
                >{{ $t(btn.title) }}
                <i class="material-icons">{{ btn.icon }}</i></span
              ></a
            >

            <div id="my_file_output"></div>
            <a
              v-if="this.import"
              class="btn waves-effect waves-light breadcrumbs-btn import right"
              @click.prevent="$emit('importExcel')"
              ><i class="material-icons hide-on-med-and-up bold"
                >import_export </i
              ><span class="hide-on-small-onl"
                >{{ $t("import") }}
                <i class="material-icons">import_export</i></span
              ></a
            >
            <a
              v-if="this.multiCreate"
              class="btn waves-effect waves-light breadcrumbs-btn success right"
              @click.prevent="$emit('multiCreate')"
              ><i class="material-icons hide-on-med-and-up bold"
                >import_export </i
              ><span class="hide-on-small-onl"
                >{{ $t("createMulti") }}
                <i class="material-icons">add_circle</i></span
              ></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    path: Array,
    btns: Array,
    import: {
      type: Boolean,
      default: false
    },
    multiCreate: {
      type: Boolean,
      default: false
    },
    fregment: String
  }
};
</script>
<style scoped>
@import url("../../sass/layouts/_breadcrumbs.min.css");
</style>
