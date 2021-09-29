import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import UserLayout from "../layouts/UserLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user/:user_id",
    name: "User",
    component: () => import("../views/User.vue"),
    children: [{ path: "", component: Home }],
  },
  {
    path: "/user/:user_id/post/:post_id",
    name: "Post",
    component: () => import("../views/Post.vue"),
  },
  {
    path: "*/*",
    name: "PageNotFound",
    component: () => import("../views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
