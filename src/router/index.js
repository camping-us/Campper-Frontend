import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/board",
    name: "board",
    component: () => import(/* webpackChunkName: "board" */ "@/views/BoardView"),
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "boardlist",
        component: () => import(/* webpackChunkName: "board" */ "@/components/board/BoardList"),
      },
    //   {
    //     path: "write",
    //     name: "boardwrite",
    //     beforeEnter: onlyAuthUser,
    //     component: () => import(/* webpackChunkName: "board" */ "@/components/board/BoardWrite"),
    //   },
    //   {
    //     path: "view/:boardno",
    //     name: "boardview",
    //     beforeEnter: onlyAuthUser,
    //     component: () => import(/* webpackChunkName: "board" */ "@/components/board/BoardView"),
    //   },
    //   {
    //     path: "modify",
    //     name: "boardmodify",
    //     // beforeEnter: onlyAuthUser,
    //     component: () => import(/* webpackChunkName: "board" */ "@/components/board/BoardModify"),
    //   },
    //   {
    //     path: "delete/:boardno",
    //     name: "boarddelete",
    //     beforeEnter: onlyAuthUser,
    //     component: () => import(/* webpackChunkName: "board" */ "@/components/board/BoardDelete"),
    //   },
    ],
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
