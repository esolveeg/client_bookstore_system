<template>
  <header class="page-topbar" id="header">
    <div class="navbar navbar-fixed">
      <nav
        class="navbar-main navbar-color nav-collapsible sideNav-lock navbar-dark gradient-45deg-indigo-purple no-shadow"
      >
        <div class="nav-wrapper">
          <div class="header-search-wrapper hide-on-med-and-down">
            <i class="material-icons">search</i>
            <input
              class="header-search-input z-depth-2"
              type="text"
              name="Search"
              :placeholder="$t('search')"
            />
          </div>
          <ul class="navbar-list right">
            <li>
              <a
                @click.prevent="setLocale()"
                class="waves-effect waves-block waves-light translation-button"
                ><span class="flag-icon"></span
              ></a>
            </li>
            <li class="hide-on-med-and-down">
              <a class="waves-effect waves-block waves-light toggle-fullscreen"
                ><i class="material-icons">settings_overscan</i></a
              >
            </li>
            <li class="hide-on-large-only" @click="toggleSearch">
              <a class="waves-effect waves-block waves-light search-button"
                ><i class="material-icons">search</i></a
              >
            </li>
            <li>
              <a
                class="dropdown-trigger waves-effect waves-block waves-light profile-button"
                data-target="profile-dropdown"
                ><span class="avatar-status"
                  ><img
                    src="https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/avatar/avatar-7.png"
                    alt="avatar"/></span
              ></a>
              <ul class="dropdown-content" id="profile-dropdown">
                <li>
                  <a @click.prevent="logout()" class="grey-text text-darken-1"
                    ><i class="material-icons">keyboard_tab</i>
                    {{ $t("logout") }}</a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <nav class="search-sm hide">
          <div class="nav-wrapper">
            <form>
              <div class="input-field">
                <input class="search-box-sm" type="search" required="" />
                <label class="label-icon" for="search"
                  ><i class="material-icons search-sm-icon">search</i></label
                >
                <i class="material-icons search-sm-close" @click="toggleSearch"
                  >close</i
                >
              </div>
            </form>
          </div>
        </nav>
      </nav>
    </div>
  </header>
</template>
<script>
import { onLogout } from "../../vue-apollo.js";
import { meQuery } from "@/graphql/queries/queries.js";
import M from "materialize-css";
export default {
  apollo: {
    me: {
      query: meQuery,
      result({ data: { me } }) {
        let permissions = [];
        this.userId = me.id;
        me.roles.forEach(role => {
          this.roles.push(role.slug);
          role.permissions.forEach(per => {
            permissions.push(per.slug);
          });
        });
        if (this.roles.includes("pos")) {
          this.branch_id = me.employee.branch.id;
        }
        this.permissions = permissions;
        this.isPos = this.roles.includes("pos") ? true : false;
      }
    }
  },
  store: {
    isPos: "isPos",
    branch_id: "branch_id",
    userId: "userId",
    permissions: "permissions",
    roles: "roles",
    me: "me"
  },
  methods: {
    toggleSearch: () => {
      console.log(this.me);
      let searchBox = document.querySelector(".search-sm");
      searchBox.classList.toggle("hide");
    },
    logout() {
      onLogout(this.$apollo.provider.defaultClient);
      localStorage.removeItem("permissons");
      localStorage.removeItem("token");
      localStorage.removeItem("branch");
      localStorage.removeItem("allbranches");

      this.$router.push("/login");
    },
    setLocale() {
      this.$i18n.locale = this.$i18n.locale == "en" ? "ar" : "en";
      localStorage.setItem("locale", this.$i18n.locale);
      const html = document.querySelector("html");
      if (this.$i18n.locale == "ar") {
        html.classList.add("rtl");
        html.setAttribute("lang", "ar");
      } else {
        html.classList.remove("rtl");
        html.setAttribute("lang", "en");
      }
    }
  },
  mounted() {
    let dropdowns = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdowns, {
      alignment: "right",
      coverTrigger: false
    });
  }
};
</script>

<style scoped>
@import url("../../sass/layouts/_header.min.css");
</style>
