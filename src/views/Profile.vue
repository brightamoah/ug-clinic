<script setup lang="ts">
import { ref } from "nativescript-vue";
import { useRouter } from "router-vue-native";
import { RoutePath } from "types/types";
import Header from "~/components/home/Header.vue";
import { useAuthStore } from "~/stores/AuthStore";
import {
   chevronRight,
   userIcon,
   bellIcon,
   heartIcon,
   clockIcon,
   logOut,
   medicineIcon,
   clipboardIcon,
   bookingsIcon,
   userGroupIcon,
   fileTextIcon,
   settingsIcon,
} from "~/utils/icons";

const router = useRouter();
const authStore = useAuthStore();

const pageInfo = ref({
   title: "Clinic Profile",
   icon: medicineIcon,
   actionText: "Log Out",
   actionIcon: logOut,
});

const clinicFeatures = [
   {
      title: "Appointments",
      icon: bookingsIcon,
      rightText: "5 Today",
      route: "/appointments" as RoutePath,
   },
   {
      title: "Patient Records",
      icon: clipboardIcon,
      rightText: "View All",
      route: "/patientRecords" as RoutePath,
   },
   {
      title: "Medical Staff",
      icon: userGroupIcon,
      rightText: "12 Active",
      route: "/staff" as RoutePath,
   },
   {
      title: "Prescriptions",
      icon: medicineIcon,
      route: "/prescriptions" as RoutePath,
   },
   {
      title: "Lab Results",
      icon: fileTextIcon,
      rightText: "3 Pending",
      route: "/labResults" as RoutePath,
   },
   {
      title: "Clinic Settings",
      icon: settingsIcon,
      rightText: "Manage",
      route: "/clinicSettings" as RoutePath,
   },
];

const notificationSettings = [
   { title: "Appointment Alerts", icon: bellIcon, hasToggle: true },
   { title: "Lab Results", icon: fileTextIcon, hasToggle: true },
   { title: "Staff Messages", icon: userGroupIcon, hasToggle: true },
];

const navigateTo = (route: RoutePath) => {
   router.push(route, {
      transition: {
         name: "slideLeft",
         duration: 300,
         curve: "easeOut",
      },
   });
};
</script>

<template>
   <Page
      actionBarHidden="true"
      backgroundSpanUnderStatusBar="false"
      androidStatusBarBackground="#3b82f6"
   >
      <GridLayout rows="60, *">
         <Header
            row="0"
            v-bind="pageInfo"
            @tap="authStore.handleSignOut()"
         />

         <ScrollView row="1">
            <StackLayout>
               <!-- Clinic Header Section -->
               <GridLayout
                  rows="auto"
                  columns="*,*,*,*"
                  class="p-2"
               >
                  <Label
                     :text="userIcon"
                     class="fas w-20 h-20 rounded-full bg-white text-center text-gray-500 font-bold text-4xl mt-3 border-gray-300 border-2"
                     row="0"
                     col="0"
                  />
                  <FlexboxLayout
                     row="0"
                     col="1"
                     flexDirection="column"
                     justifyContent="center"
                     alignItems="center"
                  >
                     <Label
                        text="MedCare Clinic"
                        class="text-lg font-extrabold"
                     />
                     <Button
                        text="manage clinic"
                        class="text-sm text-center capitalize h-8 text-blue_main font-bold rounded-lg bg-gray-200 mt-2"
                        @tap="navigateTo('/userSetting')"
                     />
                  </FlexboxLayout>

                  <!-- Quick Stats -->
                  <FlexboxLayout
                     row="0"
                     col="2"
                     colSpan="2"
                     flexDirection="column"
                     justifyContent="center"
                     class="ml-4"
                  >
                     <Label
                        text="Today's Schedule"
                        class="text-sm text-gray-500"
                     />
                     <Label
                        text="5/12 Appointments"
                        class="text-blue_main font-bold"
                     />
                     <Progress
                        value="42"
                        maxValue="100"
                        class="bg-gray-400 mt-2"
                     />
                  </FlexboxLayout>
               </GridLayout>

               <!-- Clinic Features Section -->
               <StackLayout class="mt-4 space-y-4">
                  <Label
                     text="CLINIC FEATURES"
                     class="text-gray-500 text-base font-medium px-4"
                  />
                  <StackLayout class="bg-white">
                     <GridLayout
                        v-for="item in clinicFeatures"
                        :key="item.title"
                        columns="auto, *, auto, auto"
                        class="px-4 py-4 mb-2 border-b border-gray-200"
                        @tap="navigateTo(item.route)"
                     >
                        <Label
                           :text="item.icon"
                           class="fas text-gray-600 text-2xl"
                           col="0"
                           verticalAlignment="middle"
                        />
                        <Label
                           :text="item.title"
                           class="text-gray-800 ml-4 text-lg"
                           col="1"
                           verticalAlignment="middle"
                        />
                        <Label
                           v-if="item.rightText"
                           :text="item.rightText"
                           class="text-blue_main bg-gray-100 px-2 py-1 rounded-full"
                           col="2"
                           verticalAlignment="middle"
                        />
                        <Label
                           :text="chevronRight"
                           class="fas text-gray-400"
                           col="3"
                           verticalAlignment="middle"
                        />
                     </GridLayout>
                  </StackLayout>
               </StackLayout>

               <!-- Notifications Section -->
               <StackLayout class="mt-4">
                  <Label
                     text="NOTIFICATIONS"
                     class="text-gray-500 text-sm font-medium px-4 mb-2"
                  />
                  <StackLayout class="bg-white">
                     <GridLayout
                        v-for="item in notificationSettings"
                        :key="item.title"
                        columns="auto, *, auto"
                        class="px-4 py-3 border-b border-gray-200"
                     >
                        <Label
                           :text="item.icon"
                           class="fas text-gray-600 text-2xl"
                           col="0"
                        />
                        <Label
                           :text="item.title"
                           class="text-gray-800 ml-4 text-lg"
                           col="1"
                        />
                        <Switch
                           :checked="true"
                           class="text-blue_main"
                           col="2"
                        />
                     </GridLayout>
                  </StackLayout>
               </StackLayout>

               <!-- Bottom Spacing -->
               <GridLayout
                  height="20"
                  class="bg-transparent"
               />
            </StackLayout>
         </ScrollView>
      </GridLayout>
   </Page>
</template>

<style scoped>
Progress {
   height: 4;
   border-radius: 2;
}

.text-blue_main {
   color: #3b82f6;
}

.bg-blue_main {
   background-color: #3b82f6;
}
</style>
