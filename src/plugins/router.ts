import { createRouter } from "router-vue-native";
import { route } from "types/types";
import Details from "~/components/Details.vue";
import Bookings from "~/views/Bookings.vue";
import Chat from "~/views/Chat.vue";
import Dashboard from "~/views/Dashboard.vue";
import Home from "~/views/Home.vue";
import Login from "~/views/Login.vue";
import Profile from "~/views/Profile.vue";
import Signup from "~/views/Signup.vue";

const routes: route[] = [
   {
      path: "/",
      name: "home",
      component: Home,
   },
   {
      path: "/bookings",
      name: "bookings",
      component: Bookings,
   },
   {
      path: "/chat",
      name: "chat",
      component: Chat,
   },
   {
      path: "/profile",
      name: "profile",
      component: Profile,
   },
   {
      path: "/login",
      name: "login",
      component: Login,
   },
   {
      path: "/signup",
      name: "signup",
      component: Signup,
   },
   {
      path: "/details",
      name: "details",
      component: Details,
   },
   {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
   },
];

export const router = createRouter({
   routes,
});
