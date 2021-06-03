<template>
  <div>
    <div id="main">
      <Breadcrumbs
        :title="`view`"
        :fregment="roleById.name"
        :btns="btns"
        :path="path"
        @delete="deleteUser"
        @edit="edit"
      />
      <div class="row">
        <div class="col s12 mt-65">
          <div class="container">
            <!-- Current balance & total transactions cards-->
            <div class="row mt-4">
              <div class="col s12 m12 l12">
                <!-- Current Balance -->
                <div class="card animated  fadeInUp ">
                  <div class="card-content">
                    <div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("name") }}
                        </h3>
                        <span class="item__value">
                          {{ roleById.name }}
                        </span>
                      </div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("description") }}
                        </h3>
                        <span class="item__value">
                          {{ roleById.description }}
                        </span>
                      </div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("permissions") }}
                        </h3>
                        <span class="item__value">
                          <ul>
                            <li
                              v-for="(permission,
                              index) in roleById.permissions"
                              :key="index"
                            >
                              <router-link
                                :to="{
                                  name: 'permission.view',
                                  params: { id: permission.id }
                                }"
                                >{{ permission.name }}</router-link
                              >
                            </li>
                          </ul>
                        </span>
                      </div>
                      <div class="item">
                        <h3 class="item__head">
                          {{ $t("users") }}
                        </h3>
                        <span class="item__value">
                          <ul>
                            <li
                              v-for="(user, index) in roleById.users"
                              :key="index"
                            >
                              <router-link
                                :to="{
                                  name: 'users.view',
                                  params: { id: user.id }
                                }"
                                >{{ user.name }}</router-link
                              >
                            </li>
                          </ul>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";
import { roleQuery } from "@/graphql/queries/queries.js";

export default {
  data() {
    return {
      title: "View Role",
      roleById: {},
      btns: [],
      path: [{ title: "roles", route: "roles.index" }]
    };
  },

  apollo: {
    roleById: {
      query: roleQuery,
      variables() {
        return {
          id: parseInt(this.$route.params.id)
        };
      }
    }
  },
  components: {
    Breadcrumbs
  }
};
</script>
<style>
@import url("../../sass/components/_recipt.css");
</style>
<style lang="scss" scoped>
.item {
  &__head {
    text-transform: capitalize;
    font-size: 1.8rem;
    color: #37474f;
    font-family: Open Sans, sans-serif;
  }
  &__value,
  &__value ul li a {
    font-family: Open Sans, sans-serif;
    font-size: 1.4rem;
    line-height: 1.57142857;
    transition: 0.3s ease-out;
    color: #76838f;
    & ul li a:hover {
      color: blue;
    }
  }
}
.item:not(:last-child) {
  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: #eee;
    display: block;
    margin-top: 3rem;
  }
}
</style>
