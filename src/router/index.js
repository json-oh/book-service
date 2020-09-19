import Vue from "vue";
import VueRouter from "vue-router";
import All from "../views/All.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "All",
    component: All,
  },
  {
    path: "/feed",
    name: "Feed",
    component: () => import("../views/Feed.vue"),
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("../views/Create.vue"),
  },
  {
    path: "/upload",
    name: "Upload",
    component: () => import("../views/Upload.vue"),
  },
  {
    path: "/recommendation",
    name: "Recommendation",
    component: () => import("../views/Recommendation.vue"),
  },
  {
    path: "/myinfo",
    name: "Myinfo",
    component: () => import("../views/Myinfo.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/Users.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
