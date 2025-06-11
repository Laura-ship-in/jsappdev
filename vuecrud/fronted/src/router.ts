import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/users",
    name: "users",
    component: () => import("./components/Home.vue"),
  },
  {
    path: "/edituser/:id",
    name: "user-edit",
    component: () => import("./components/ProfilUser.vue"),
  },
  {
    path: "/userdetails/:id",
    name: "user-details",
    component: () => import("./components/UserDetails.vue"),
  },
  {
    path: "/admin",
    alias: "/admin",
    name: "admin",
    component: () => import("./components/Admin.vue"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddUser.vue"),
  },
  // { path: '*', component: () => import("./components/NotFound") }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
