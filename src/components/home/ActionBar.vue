<!-- components/BottomNavigation.vue -->
<template>
   <GridLayout
      rows="*"
      columns="*"
      class="bottom-nav"
   >
      <StackLayout
         orientation="horizontal"
         horizontalAlignment="center"
         verticalAlignment="center"
      >
         <StackLayout
            v-for="(item, index) in navItems"
            :key="index"
            @tap="navigateTo(item)"
            :class="{ 'nav-item': true, active: isActive(item) }"
            width="25%"
         >
            <Label
               :text="item.icon"
               class="fas"
            />
            <Label
               :text="item.title"
               textWrap="true"
            />
         </StackLayout>
      </StackLayout>
   </GridLayout>
</template>

<script setup>
import { ref, computed } from "nativescript-vue";
import { useRouter, useRoute } from "router-vue-native";

const router = useRouter();
const route = useRoute();

const navItems = ref([
   { title: "Home", icon: "\uf015", route: "/home" },
   { title: "Search", icon: "\uf002", route: "/bookings" },
   { title: "Profile", icon: "\uf007", route: "/profile" },
   { title: "Settings", icon: "\uf013", route: "/chat" },
]);

const currentIndex = ref(0);
const previousIndex = ref(0);

const isActive = computed(() => (item) => route.path === item.route);

const navigateTo = async (item) => {
   try {
      previousIndex.value = currentIndex.value;
      currentIndex.value = navItems.value.findIndex(
         (navItem) => navItem.route === item.route
      );

      await router.push(item.route);
   } catch (error) {
      console.error("Navigation error:", error);
      // You can add more specific error handling here, such as showing a toast notification
   }
};

const goBack = () => {
   if (previousIndex.value !== currentIndex.value) {
      navigateTo(navItems.value[previousIndex.value]);
   }
};

// Expose goBack method to parent components
defineExpose({ goBack });
</script>

<style scoped>
.bottom-nav {
   background-color: #f8f8f8;
   height: 60;
}

.nav-item {
   text-align: center;
   padding: 10;
}

.nav-item Label {
   font-size: 12;
}

.nav-item .fas {
   font-size: 20;
   margin-bottom: 5;
}

.active {
   color: #007aff;
}
</style>
