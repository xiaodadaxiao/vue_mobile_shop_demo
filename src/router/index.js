import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//导入视图组件 (懒加载方式)
const Home = () => import("views/home/Home");
const Category = () => import("views/category/Category");
const Cart = () => import("views/cart/Cart");
const Profile = () => import("views/profile/Profile");
const Detail = () => import("views/detail/Detail");
//直接导入组件方式:
//import Home from "views/home/Home";
//import Category from "views/category/Category";
//import Cart from "views/cart/Cart";
//import Profile from "views/profile/Profile";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/detail/:iid",
    component: Detail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
