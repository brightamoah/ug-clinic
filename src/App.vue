<script setup lang="ts">
import { computed, onMounted, ref } from "nativescript-vue";
import BottomNav from "./components/home/BottomNav.vue";
import { useAuthStore } from "./stores/AuthStore";

const authStore = useAuthStore();

const defaultRoute = computed(() =>
authStore.isLoggedIn ? "/dashboard" : "/"
);

onMounted( () => {
   authStore.unsubscribeAuth;
   console.log( authStore.isLoggedIn, defaultRoute.value );
})

</script>

<template>
   <RootLayout>
      <GridLayout rows="*, auto">
         <StackLayout row="0">
            <RouterView
               :defaultRoute="defaultRoute"
            />
         </StackLayout>

         <BottomNav row="1" />
      </GridLayout>
   </RootLayout>
</template>
