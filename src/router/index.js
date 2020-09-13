import Vue from "vue";
import VueRouter from "vue-router";
import Feed from "../views/Feed.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Feed",
    component: Feed,
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
];

const router = new VueRouter({
  routes,
});

export default router;
