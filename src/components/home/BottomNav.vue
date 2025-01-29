<template>
   <GridLayout
      rows="auto"
      columns="*,*,*,*"
      class="bg-main_blue border-t border-main_blue elevation-8"
   >
      <StackLayout
         v-for="(item, index) in navItems"
         :key="item.route"
         :col="index"
         class="items-center justify-center"
         @tap="setActiveItem(item.route)"
      >
         <StackLayout class="'items-center justify-center p-2 rounded-2xl m-1'">
            <Label
               :text="item.icon"
               :class="[
                  'fas text-3xl mb-1 text-center',
                  activeRoute === item.route
                     ? 'text-white'
                     : 'text-white opacity-50',
               ]"
            />
            <Label
               :text="item.label"
               :class="[
                  'text-sm font-medium text-center',
                  activeRoute === item.route
                     ? 'text-white font-bold'
                     : 'text-white opacity-70',
               ]"
            />
         </StackLayout>
      </StackLayout>
   </GridLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "nativescript-vue";
import { useRoute, useRouter } from "router-vue-native";
import { navItem, RoutePath } from "types/types";
import { useAuthStore } from "~/stores/AuthStore";
import { homeIcon, settingsIcon, bellIcon, userIcon, bookingsIcon, chatIcon } from "~/utils/icons";

const router = useRouter();
const route = useRoute();

const authStore = useAuthStore()

const homeRoute = computed( () => ( authStore.isLoggedIn ? "/dashboard" : "/" ) )

watch(homeRoute, (newRoute) => {
   console.log("Home route changed to:", newRoute);
});

const navItems: navItem[] = [
   { icon: homeIcon, label: "Home", route: homeRoute.value },
   { icon: bookingsIcon, label: "Bookings", route: "/bookings" },
   { icon: chatIcon, label: "Chat", route: "/chat" },
   { icon: userIcon, label: "Profile", route: "/profile" },
];

const activeRoute = ref<RoutePath>(route.path);

watch(
   () => route.path,
   (newRoute) => {
      console.log("Route changed to:", newRoute);
      activeRoute.value = newRoute;
   },
   { immediate: true }
);

onMounted(() => {
   activeRoute.value = route.path as RoutePath;
   console.log(activeRoute.value);
});

const setActiveItem = async (route: RoutePath) => {
   try {
      router.push(route, { clearHistory: true });
      activeRoute.value = route;
   } catch (err) {
      console.error("Navigation error:", err);
   }
}

</script>
