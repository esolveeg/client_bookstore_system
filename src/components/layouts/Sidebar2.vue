<template>
  <aside class="sidebar animated  fadeInLeft" id="sidebar">
    <div class="sidebar__logo">
      <h1 class="sidebar__logo--wrapper">
        <router-link :to="{ name: 'dashboard' }" class="sidebar__logo--link">
          <img
            src="https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/logo/materialize-logo-color.png"
            alt="ibusiness logo"
          />
          <span class="sidebar__logo--text">Materialize</span>
        </router-link>
        <a class="sidebar__toggler" @click="toggleSidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <path
              class="toggler__icon--path"
              d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 28C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12zm-6-12a6 6 0 1112 0 6 6 0 01-12 0z"
            />
          </svg>
        </a>
      </h1>
    </div>
    <ul class="sidebar__list">
      <!-- <li
        :class="link.isHead ? 'sidebar__list--head' : 'sidebar__list--item'"
        v-for="link in filtered"
        :key="link.id"
        @click="toggleDropDown"
      >
        <router-link
          :to="{ name: link.route }"
          class="sidebar__list--link  waves-effect waves-cyan"
          :class="
            link.children && link.children.includes($route.name) ? 'active' : ''
          "
          v-if="!link.isHead || !links.isParent"
        >
          <i class="material-icons">{{ link.icon }}</i>
          <span class="sidebar__list--title">{{ $t(link.title) }}</span>
        </router-link>
        <a class="sidebar__list--head-link" v-else>{{ $t(link.title) }}</a>
        <div class="sidebar__dropdown" v-if="link.isParent">
          <ul class="sidebar__dropdown--list ">
            <li
              class="sidebar__dropdown--list-item  "
              v-for="sub in sublinks(link.id)"
              :key="sub.id"
            >
              <router-link
                :to="{ name: sub.route }"
                class="sidebar__dropdown--list-link  waves-effect waves-cyan"
              >
                <i class="material-icons">radio_button_unchecked</i
                ><span>{{ $t(sub.title) }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </li> -->
      <li class="sidebar__list--item">
        <router-link
          :to="{ name: 'dashboard' }"
          class="sidebar__list--link  waves-effect waves-cyan"
          :class="['dashboard'].includes($route.name) ? 'active' : ''"
        >
          <i class="material-icons">pie_chart_outlined</i>
          <span class="sidebar__list--title">{{ $t("dashboard") }}</span>
        </router-link>
      </li>
      <li class="sidebar__list--item">
        <router-link
          :to="{ name: 'orders.index' }"
          class="sidebar__list--link  waves-effect waves-cyan"
          :class="
            [
              'orders.edit',
              'orders.create',
              'orders.view',
              'orders.index'
            ].includes($route.name)
              ? 'active'
              : ''
          "
        >
          <i class="material-icons">assessment</i>
          <span class="sidebar__list--title">{{ $t("orders") }}</span>
        </router-link>
      </li>
      <li class="sidebar__list--item">
        <router-link
          :to="{ name: 'products.index' }"
          class="sidebar__list--link  waves-effect waves-cyan"
          :class="
            [
              'products.edit',
              'products.create',
              'products.view',
              'products.index'
            ].includes($route.name)
              ? 'active'
              : ''
          "
        >
          <i class="material-icons">import_contacts</i>
          <span class="sidebar__list--title">{{ $t("products") }}</span>
        </router-link>
      </li>
      <li class="sidebar__list--item">
        <router-link
          :to="{ name: 'customers.index' }"
          class="sidebar__list--link  waves-effect waves-cyan"
          :class="
            [
              'customers.edit',
              'customers.create',
              'customers.view',
              'customers.index'
            ].includes($route.name)
              ? 'active'
              : ''
          "
        >
          <i class="material-icons">face</i>
          <span class="sidebar__list--title">{{ $t("customers") }}</span>
        </router-link>
      </li>
      <li class="sidebar__list--item">
        <router-link
          :to="{ name: 'transactions.index' }"
          class="sidebar__list--link  waves-effect waves-cyan"
          :class="
            [
              'transactions.edit',
              'transactions.create',
              'transactions.view',
              'transactions.index'
            ].includes($route.name)
              ? 'active'
              : ''
          "
        >
          <i class="material-icons">directions_bus</i>
          <span class="sidebar__list--title">{{ $t("transactions") }}</span>
        </router-link>
      </li>
    </ul>
    <div class="navigation-background"></div>
    <a
      @click="mobileToggleSidebar"
      class="sidenav-trigger btn-sidenav-toggle btn-floating btn-medium waves-effect waves-light hide-on-large-only"
      href="#"
      data-target="slide-out"
      ><i class="material-icons">menu</i></a
    >
    <div @click="mobileToggleSidebar" class="sidenav-overlay"></div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          id: 1,
          title: "dashboard",
          route: "dashboard",
          permission: "pos_dashboard",
          children: "dashboard",
          isParent: true,
          icon: "pie_chart_outlined"
        },
        {
          id: 2,
          title: "expenses",
          permission: "view_expenses",
          route: "expenses.index",
          children: [
            "expenses.edit",
            "expenses.create",
            "expenses.view",
            "expenses.index"
          ],
          icon: "money_off"
        },
        { id: 3, title: "products", isHead: true },
        {
          id: 4,
          title: "products",
          permission: "view_products",

          isParent: true,
          route: "products.index",
          children: [
            "products.edit",
            "products.create",
            "products.view",
            "products.index"
          ],

          icon: "import_contacts"
        },
        // {
        //   id: 30,
        //   title: "products2",
        //   parent: 4,
        //   route: "expenses.index",
        //   children: [
        //     "expenses.edit",
        //     "expenses.create",
        //     "expenses.view",
        //     "expenses.index"
        //   ],

        //   icon: "import_contacts"
        // },
        // {
        //   id: 31,
        //   title: "products3",
        //   parent: 4,
        //   route: "expenses.index",
        //   children: [
        //     "expenses.edit",
        //     "expenses.create",
        //     "expenses.view",
        //     "expenses.index"
        //   ],

        //   icon: "import_contacts"
        // },
        {
          id: 5,
          title: "discounts",
          permission: "view_discounts",
          route: "discounts.index",
          children: [
            "discounts.edit",
            "discounts.create",
            "discounts.view",
            "discounts.index"
          ],

          icon: "attach_money"
        },
        { id: 6, title: "users", isHead: true },
        {
          id: 7,
          title: "users",
          route: "users.index",
          permission: "view_users",

          children: ["users.edit", "users.create", "users.view", "users.index"],
          icon: "people_outline"
        },
        {
          id: 8,
          title: "customers",
          route: "customers.index",
          permission: "view_customers",

          children: [
            "customers.edit",
            "customers.create",
            "customers.view",
            "customers.index"
          ],
          icon: "face"
        },
        {
          id: 10,
          title: "suppliers",
          route: "suppliers.index",
          permission: "view_suppliers",

          children: [
            "suppliers.edit",
            "suppliers.create",
            "suppliers.view",
            "suppliers.index"
          ],

          icon: "perm_contact_calendar"
        },
        {
          id: 9,
          title: "roles",
          route: "roles.index",
          permission: "view_roles",

          children: ["roles.edit", "roles.create", "roles.view", "roles.index"],
          icon: "accessibility"
        },
        { id: 11, title: "orders", isHead: true },
        {
          id: 12,
          title: "orders",
          route: "orders.index",
          permission: "view_orders",

          children: [
            "orders.edit",
            "orders.create",
            "orders.view",
            "orders.index"
          ],
          icon: "assessment"
        },
        {
          id: 13,
          title: "outcoming_orders",
          permission: "view_outcoming_orders",

          route: "outcomingorders.index",
          children: [
            "outcomingorders.edit",
            "outcomingorders.create",
            "outcomingorders.view",
            "outcomingorders.index"
          ],

          icon: "assignment"
        },
        { id: 14, title: "branches", isHead: true },
        {
          id: 15,
          title: "branches",
          route: "branches.index",
          permission: "view_branches",

          icon: "home",
          children: [
            "branches.edit",
            "branches.create",
            "branches.view",
            "branches.index"
          ]
        },
        {
          id: 16,
          title: "transactions",
          route: "transactions.index",
          permission: "view_transactions",

          children: [
            "transactions.edit",
            "transactions.create",
            "transactions.view",
            "transactions.index",
            "transactions.approve"
          ],

          icon: "directions_bus"
        },
        { id: 17, title: "emplyees", isHead: true },
        {
          id: 18,
          title: "emplyees",
          route: "employees.index",
          permission: "view_employees",

          children: [
            "employees.edit",
            "employees.create",
            "employees.view",
            "employees.index"
          ],

          icon: "people_outline"
        },
        {
          id: 19,
          title: "emplyees_rebates",
          route: "rebates.index",
          permission: "view_rebates",

          children: [
            "rebates.edit",
            "rebates.create",
            "rebates.view",
            "rebates.index"
          ],

          icon: "mood_bad"
        }
      ]
    };
  },
  computed: {
    filtered() {
      let filtered = this.links.filter(link => {
        return !link.parent && this.permissions.includes(link.permission)
          ? link
          : "";
      });
      return filtered;
    }
  },
  store: ["isPos", "permissions"],

  watch: {
    $route() {
      const sidebar = document.querySelector("#sidebar");
      const overlay = document.querySelector(".sidenav-overlay");
      sidebar.classList.remove("mobile-collapsed");
      overlay.classList.remove("active");
    }
  },

  methods: {
    sublinks(id) {
      let filtered = this.links.filter(link => {
        return link.parent == id ? link : "";
      });
      return filtered;
    },
    toggleSidebar: () => {
      const sidebar = document.querySelector("#sidebar");
      const checked =
        "M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 28C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12zm-6-12a6 6 0 1112 0 6 6 0 01-12 0z";
      const unChecked =
        "M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 28C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z";
      let path = document.querySelector(".toggler__icon--path");
      let pathD = path.getAttribute("d");
      let root = document.documentElement;
      sidebar.classList.toggle("collapsed");
      if (pathD == checked) {
        path.setAttribute("d", unChecked);
        root.style.setProperty("--sidebar-width", "64px");
      } else {
        path.setAttribute("d", checked);
        root.style.setProperty("--sidebar-width", "260px");
      }
      //sidebar.classList.contains('collapsed')? path.setAttribute("d", checked)
      //: path.setAttribute("d", unChecked)
    },
    mobileToggleSidebar: () => {
      const sidebar = document.querySelector("#sidebar");
      const overlay = document.querySelector(".sidenav-overlay");
      sidebar.classList.toggle("mobile-collapsed");

      sidebar.classList.contains("mobile-collapsed")
        ? overlay.classList.add("active")
        : overlay.classList.remove("active");
    },
    toggleDropDown: e => {
      const el = e.target.parentElement;

      const list = document.querySelector(".open");
      //list == null ? list.classList.remove('open') : ''
      el.classList.toggle("open");
      list !== null ? list.classList.remove("open") : "";
    }
  }
};
</script>
<style scoped>
@import url("../../sass/layouts/_sidebar.min.css");
</style>
