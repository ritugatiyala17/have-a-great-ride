import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import firebase from "firebase";
import store from "@/store";

import HomePage from "@/components/HomePage";
import BikesList from "@/components/lists/BikesList";
import UsersList from "@/components/lists/UsersList";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import UserProfile from "@/components/UserProfile";
import BookingsList from "@/components/lists/BookingsList";

const routes = [
  {
    path: "/",
    name: "homePage",
    component: HomePage,
  },
  {
    path: "/bikes",
    name: "Bikes",
    meta: {
      layout: "filters",
      additionalFilters: true,
    },
    component: BikesList,
  },
  {
    path: "/users",
    name: "Users",
    component: UsersList,
    meta: {
      layout: "filters",
      authRequired: true,
    },
  },
  {
    path: "/bookings",
    name: "Bookings",
    component: BookingsList,
    meta: {
      layout: "filters",
      authRequired: true,
    },
  },
  {
    path: "/bikes/:id/bookings",
    name: "Bookings",
    component: BookingsList,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/users/:id/bookings",
    name: "Bookings",
    component: BookingsList,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/profile",
    name: "UserProfile",
    meta: {
      authRequired: true,
    },
    component: UserProfile,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit("initialiseStore");
  if (to.matched.some((record) => record.meta.authRequired)) {
    console.log("router.beforeEach this.$store", store, store.state.user);
    if (firebase.auth().currentUser || store.state.user) {
      next();
    } else {
      next({
        path: "/login",
      });
    }
  } else {
    next();
  }
});

export default router;
