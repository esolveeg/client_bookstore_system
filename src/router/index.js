/* eslint-disable comma-dangle */
import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/auth/Login.vue";
import Login2 from "../views/auth/Login2.vue";
import Products from "../views/products/Index2.vue";
import EditAddOrders from "../views/orders/Edit-add3.vue";
import Orders from "../views/orders/Index2.vue";

//import me from "@/graphql/queries/Me.gql";
import axios from "axios";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { guest: true }
  },
  {
    path: "/login2",
    name: "login2",
    component: Login2,
    meta: { guest: true }
  },
  {
    path: "/products",
    name: "products.index",
    component: Products,
    meta: { requiresAuth: false }
  },
  {
    path: "/orders",
    name: "orders.index",
    component: Orders,
    meta: { requiresAuth: true }
  },
  {
    path: "/orders/createe",
    name: "orders.create",
    component: EditAddOrders,
    meta: { requiresAuth: true }
  },

  {
    path: "/orders/edit/:id",
    name: "orders.edit",
    component: EditAddOrders,
    meta: { requiresAuth: true }
  },
  //userss
  {
    path: "/users",
    name: "users.index",
    meta: { requiresAuth: true, permission: "view_users" },
    component: () => import("../views/users/Index.vue")
  },
  {
    path: "/user/:id",
    name: "users.view",
    meta: { requiresAuth: true, permission: "read_users" },
    component: () => import("../views/users/View.vue")
  },
  {
    path: "/user/:id/edit",
    name: "users.edit",
    meta: { requiresAuth: true, permission: "edit_users" },
    component: () => import("../views/users/Edit-add.vue")
  },
  {
    path: "/users/create",
    name: "users.create",
    meta: { requiresAuth: true, permission: "create_users" },
    component: () => import("../views/users/Edit-add.vue")
  },
  // roles
  {
    path: "/roles",
    name: "roles.index",
    meta: { requiresAuth: true, permission: "view_roles" },
    component: () => import("../views/roles/Index.vue")
  },
  {
    path: "/role/create",
    name: "roles.create",
    meta: { requiresAuth: true, permission: "create_roles" },
    component: () => import("../views/roles/Create.vue")
  },
  {
    path: "/role/:id/edit",
    name: "roles.edit",
    meta: { requiresAuth: true, permission: "edit_roles" },
    component: () => import("../views/roles/Create.vue")
  },
  {
    path: "/role/:id",
    name: "roles.view",
    meta: { requiresAuth: true, permission: "read_roles" },
    component: () => import("../views/roles/View.vue")
  },
  // orders
  // {
  //   path: "/orders",
  //   name: "orders.index",
  //   meta: { requiresAuth: true, permission: "view_orders" },
  //   component: () => import("../views/orders/Index.vue")
  // },
  {
    path: "/order/create",
    name: "orders.create",
    meta: { requiresAuth: true, permission: "create_orders" },
    component: () => import("../views/orders/Edit-add.vue")
  },
  // {
  //   path: "/order/:id/edit",
  //   name: "orders.edit",
  //   meta: { requiresAuth: true, permission: "edit_orders" },
  //   component: () => import("../views/orders/Edit-add.vue")
  // },
  {
    path: "/order/:id",
    name: "orders.view",
    meta: { requiresAuth: true, permission: "read_orders" },
    component: () => import("../views/orders/View.vue")
  },
  // products
  // {
  //   path: "/products",
  //   name: "products.index",
  //   meta: { requiresAuth: true, permission: "view_products" },
  //   component: () => import("../views/products/Index.vue")
  // },
  {
    path: "/product/create",
    name: "products.create",
    meta: { requiresAuth: true, permission: "create_products" },
    component: () => import("../views/products/Edit-add.vue")
  },
  {
    path: "/product/createmulti",
    name: "products.multicreate",
    meta: { requiresAuth: true, permission: "create_products" },
    component: () => import("../views/products/Edit-add-multi.vue")
  },

  {
    path: "/product/:id/edit",
    name: "products.edit",
    meta: { requiresAuth: true, permission: "edit_products" },
    component: () => import("../views/products/Edit-add.vue")
  },
  {
    path: "/product/:id",
    name: "products.view",
    meta: { requiresAuth: true, permission: "read_products" },
    component: () => import("../views/products/View.vue")
  },

  // customers
  {
    path: "/customers",
    name: "customers.index",
    meta: { requiresAuth: true, permission: "view_customers" },
    component: () => import("../views/customers/Index.vue")
  },
  {
    path: "/customer/create",
    name: "customers.create",
    meta: { requiresAuth: true, permission: "create_customers" },
    component: () => import("../views/customers/Edit-add.vue")
  },
  {
    path: "/customer/:id/edit",
    name: "customers.edit",
    meta: { requiresAuth: true, permission: "edit_customers" },
    component: () => import("../views/customers/Edit-add.vue")
  },
  {
    path: "/customer/:id",
    name: "customers.view",
    meta: { requiresAuth: true, permission: "read_customers" },
    component: () => import("../views/customers/View.vue")
  },

  // suppliers
  {
    path: "/suppliers",
    name: "suppliers.index",
    meta: { requiresAuth: true, permission: "view_suppliers" },
    component: () => import("../views/suppliers/Index.vue")
  },
  {
    path: "/supplier/create",
    name: "suppliers.create",
    meta: { requiresAuth: true, permission: "create_suppliers" },
    component: () => import("../views/suppliers/Edit-add.vue")
  },
  {
    path: "/supplier/:id/edit",
    name: "suppliers.edit",
    meta: { requiresAuth: true, permission: "edit_suppliers" },
    component: () => import("../views/suppliers/Edit-add.vue")
  },
  {
    path: "/supplier/:id",
    name: "suppliers.view",
    meta: { requiresAuth: true, permission: "read_suppliers" },
    component: () => import("../views/suppliers/View.vue")
  },

  // branches
  {
    path: "/branches",
    name: "branches.index",
    meta: { requiresAuth: true, permission: "view_branches" },
    component: () => import("../views/branches/Index2.vue")
  },
  {
    path: "/branch/create",
    name: "branches.create",
    meta: { requiresAuth: true, permission: "create_branches" },
    component: () => import("../views/branches/Edit-add.vue")
  },
  {
    path: "/branch/:id/edit",
    name: "branches.edit",
    meta: { requiresAuth: true, permission: "edit_branches" },
    component: () => import("../views/branches/Edit-add.vue")
  },
  {
    path: "/branch/:id",
    name: "branches.view",
    meta: { requiresAuth: true, permission: "read_branches" },
    component: () => import("../views/branches/View.vue")
  },

  // transactions
  {
    path: "/transactions",
    name: "transactions.index",
    meta: { requiresAuth: true, permission: "view_transactions" },
    component: () => import("../views/transactions/Index2.vue")
  },
  {
    path: "/transaction/create",
    name: "transactions.create",
    meta: { requiresAuth: true, permission: "create_transactions" },
    component: () => import("../views/transactions/Edit-add2.vue")
  },
  {
    path: "/transaction/:id/edit",
    name: "transactions.edit",
    meta: { requiresAuth: true, permission: "edit_transactions" },
    component: () => import("../views/transactions/Edit-add2.vue")
  },
  {
    path: "/transaction/:id/approve",
    name: "transactions.approve",
    meta: { requiresAuth: true, permission: "approve_transactions" },
    component: () => import("../views/transactions/Edit-add2.vue")
  },
  {
    path: "/transaction/:id",
    name: "transactions.view",
    meta: { requiresAuth: true, permission: "read_transactions" },
    component: () => import("../views/transactions/View.vue")
  },

  // employees
  {
    path: "/employees",
    name: "employees.index",
    meta: { requiresAuth: true, permission: "view_employees" },
    component: () => import("../views/employees/Index.vue")
  },
  {
    path: "/employee/create",
    name: "employees.create",
    meta: { requiresAuth: true, permission: "create_employees" },
    component: () => import("../views/employees/Edit-add.vue")
  },
  {
    path: "/employee/:id/edit",
    name: "employees.edit",
    meta: { requiresAuth: true, permission: "edit_employees" },
    component: () => import("../views/employees/Edit-add.vue")
  },
  {
    path: "/employee/:id",
    name: "employees.view",
    meta: { requiresAuth: true, permission: "read_employees" },
    component: () => import("../views/employees/View.vue")
  },

  // rebates
  {
    path: "/rebates",
    name: "rebates.index",
    meta: { requiresAuth: true, permission: "view_rebates" },
    component: () => import("../views/rebates/Index.vue")
  },
  {
    path: "/rebate/create",
    name: "rebates.create",
    meta: { requiresAuth: true, permission: "create_rebates" },
    component: () => import("../views/rebates/Edit-add.vue")
  },
  {
    path: "/rebate/:id/edit",
    name: "rebates.edit",
    meta: { requiresAuth: true, permission: "edit_rebates" },
    component: () => import("../views/rebates/Edit-add.vue")
  },
  {
    path: "/rebate/:id",
    name: "rebates.view",
    meta: { requiresAuth: true, permission: "read_rebates" },
    component: () => import("../views/rebates/View.vue")
  },

  // rebates
  {
    path: "/discounts",
    name: "discounts.index",
    meta: { requiresAuth: true, permission: "view_discounts" },
    component: () => import("../views/discounts/Index.vue")
  },
  {
    path: "/discount/create",
    name: "discounts.create",
    meta: { requiresAuth: true, permission: "create_discounts" },
    component: () => import("../views/discounts/Edit-add.vue")
  },
  {
    path: "/discount/:id/edit",
    name: "discounts.edit",
    meta: { requiresAuth: true, permission: "edit_discounts" },
    component: () => import("../views/discounts/Edit-add.vue")
  },
  {
    path: "/discount/:id",
    name: "discounts.view",
    meta: { requiresAuth: true, permission: "read_discounts" },
    component: () => import("../views/discounts/View.vue")
  },
  // outcoming orders
  {
    path: "/outcoming_orders",
    name: "outcomingorders.index",
    meta: { requiresAuth: true, permission: "view_outcoming_orders" },
    component: () => import("../views/outcomingOrders/Index.vue")
  },
  {
    path: "/outcoming_order/create",
    name: "outcomingorders.create",
    meta: { requiresAuth: true, permission: "create_outcoming_orders" },
    component: () => import("../views/outcomingOrders/Edit-add2.vue")
  },
  {
    path: "/outcoming_order/:id/edit",
    name: "outcomingorders.edit",
    meta: { requiresAuth: true, permission: "edit_outcoming_orders" },
    component: () => import("../views/outcomingOrders/Edit-add.vue")
  },
  {
    path: "/outcoming_order/:id",
    name: "outcomingorders.view",
    meta: { requiresAuth: true, permission: "read_outcoming_orders" },
    component: () => import("../views/outcomingOrders/View.vue")
  },

  // expenses
  {
    path: "/expenses",
    name: "expenses.index",
    meta: { requiresAuth: true, permission: "view_expenses" },
    component: () => import("../views/expenses/Index.vue")
  },
  {
    path: "/expense/create",
    name: "expenses.create",
    meta: { requiresAuth: true, permission: "create_expenses" },
    component: () => import("../views/expenses/Edit-add.vue")
  },
  {
    path: "/expense/:id/edit",
    name: "expenses.edit",
    meta: { requiresAuth: true, permission: "edit_expenses" },
    component: () => import("../views/expenses/Edit-add.vue")
  },
  {
    path: "/expense/:id",
    name: "expenses.view",
    meta: { requiresAuth: true, permission: "read_expenses" },
    component: () => import("../views/expenses/View.vue")
  },

  {
    path: "*",
    name: "notfound",
    component: () => import("../views/errors/404.vue")
  },
  {
    path: "/403",
    name: "notallowed",
    component: () => import("../views/errors/403.vue")
  },
  {
    path: "/localstorage",
    name: "localstorage",
    component: () => import("../views/errors/LocalStorageErr.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,

  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const authUser = window.localStorage.getItem("apollo-token");
  if (to.meta.requiresAuth) {
    let config = {
      headers: { Authorization: "Bearer " + authUser }
    };
    let params = {
      query: `query {
        me {
          name
          email
          roles {
            permissions {
              slug
            }
          }
        }
      }
      `
    };

    if (authUser) {
      axios
        .post(process.env.VUE_APP_GRAPHQL_HTTP, params, config)
        .then(response => {
          let permissions = [];
          let roles = response.data.data.me.roles;
          roles.forEach(role => {
            role.permissions.forEach(per => {
              permissions.push(per);
            });
          });
          let filtered = permissions.filter(per => {
            return per.slug == to.meta.permission ? per : "";
          });
          if (to.meta.permission) {
            if (filtered.length > 0) {
              next();
            } else {
              next({ name: "notallowed" });
            }
          } else {
            next();
          }
        })
        .catch(() => {
          // localStorage.removeItem("apollo-token");
          // next({ name: "login" });
        });
    } else {
      next({ name: "login" });
    }
  }
  if (to.meta.guest) {
    if (authUser) {
      next({ name: "dashboard" });
    }
  }
  next();
});
export default router;
