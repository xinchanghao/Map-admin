import Vue from "vue";
import Router from "vue-router";
const _import = require("./_import_" + process.env.NODE_ENV);

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";

export const constantRouterMap = [
  { path: "/login", component: _import("login/index"), hidden: true },
  {
    path: "/authredirect",
    component: _import("login/authredirect"),
    hidden: true
  },
  { path: "/404", component: _import("errorPage/404"), hidden: true },
  { path: "/401", component: _import("errorPage/401"), hidden: true },
  {
    path: "",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: _import("example/map/index"),
        name: "dashboard",
        meta: { title: "dashboard", icon: "dashboard", noCache: true }
      }
    ]
  },
  {
    path: "/modify",
    component: Layout,
    hidden: true,
    redirect: "/modify/index",
    children: [
      {
        path: "index",
        component: _import("admin/modify/index"),
        name: "modify",
        meta: { title: "modify", icon: "user", noCache: true }
      }
    ]
  }
];

export default new Router({
  // mode: 'history', // require service support
  // base: '/mall/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    menuId: 1,
    path: "/admin",
    component: Layout,
    name: "menu_manage",
    hidden: false,
    redirect: "noredirect", // == /admin/user
    meta: {
      title: "menu_manage",
      icon: "people"
    },
    children: [
      {
        menuId: 2,
        path: "user",
        component: _import("admin/user/index"),
        name: "menu_user",
        meta: {
          title: "menu_user",
          icon: "user"
        }
      },
      {
        menuId: 3,
        hidden: true,
        path: "role",
        component: _import("admin/role/index"),
        name: "menu_role",
        meta: { title: "menu_role", icon: "role" }
      }
    ]
  },
  {
    menuId: 4,
    path: "/example",
    component: Layout,
    name: "menu_example",
    hidden: false,
    redirect: "noredirect", // == /admin/user
    meta: {
      title: "menu_example",
      icon: "example"
    },
    children: [
      {
        menuId: 5,
        path: "map",
        component: _import("dashboard/index"),
        name: "menu_map",
        meta: {
          title: "menu_map",
          icon: "table"
        }
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
];
