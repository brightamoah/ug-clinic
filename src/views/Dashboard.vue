<template>
   <Page actionBarHidden="true">
      <ScrollView>
         <GridLayout
            class="p-4"
            rows="auto, auto, auto, auto, auto"
         >
            <!-- Header Section -->
            <GridLayout
               row="0"
               rows="auto"
               columns="auto, *, auto"
               class="mb-4"
            >
               <Welcome :name="name" />

               <NSImg
                  col="2"
                  src="~/assets/images/UoG.png"
                  class="w-10"
               />
            </GridLayout>

            <!-- Upcoming Appointments Section -->
            <GridLayout
               row="2"
               rows="auto, auto"
               columns="*, auto"
               class="mb-4"
            >
               <NSLabel
                  row="0"
                  col="0"
                  text="Upcoming Appointments"
                  class="text-2xl text-main_text font-semibold"
               />
               <ScrollView
                  row="1"
                  col="0"
                  orientation="horizontal"
                  class="mt-2 p-4"
                  scrollBarIndicatorVisible="false"
               >
                  <FlexboxLayout flexDirection="row">
                     <!-- Appointment Cards -->
                     <AppointmentCard
                        v-for="appointment in appointments"
                        :key="appointment.id"
                        :doctor="{
                           name: appointment.doctor,
                           specialty: appointment.specialty,
                           image: appointment.image,
                        }"
                        :appointment="{
                           date: appointment.date,
                           time: appointment.time,
                        }"
                        @menuTap="handleMenuTap(appointment.id)"
                     />
                  </FlexboxLayout>
               </ScrollView>
            </GridLayout>

            <!-- Departments Section -->
            <GridLayout
               row="3"
               rows="auto, auto"
               columns="*, auto"
               class="mb-4"
            >
               <NSLabel
                  row="0"
                  col="0"
                  text="Departments"
                  class="text-lg text-main_text font-semibold"
               />
               <NSLabel
                  row="0"
                  col="1"
                  text="See all"
                  class="text-blue_text text-base font-semibold"
               />

               <Departments
                  :departments="departments"
                  @department-select="handleDepartmentSelect"
                  row="1"
               />
            </GridLayout>

            <!-- Available Doctors Section -->
            <AvailableDoctors
               :doctors="doctors"
               row="4"
            />
         </GridLayout>
      </ScrollView>
   </Page>
</template>

<script setup lang="ts">
import { Page } from "@nativescript/core";
import { computed, onMounted, ref } from "nativescript-vue";
import { Doctor } from "types/types";
import AppointmentCard from "~/components/home/AppointmentCard.vue";
import AvailableDoctors from "~/components/home/AvailableDoctors.vue";
import Departments from "~/components/home/Departments.vue";
import Welcome from "~/components/home/Welcome.vue";
import { useAuthStore } from "~/stores/AuthStore";
import { useBookingStore } from "~/stores/BookingStore";

const authStore = useAuthStore();
const bookingStore = useBookingStore();
const name = computed(() => authStore.loggedInUser?.displayName || "");
const doctors = computed(() => bookingStore.doctors);

onMounted(() => {
   console.log(name.value);
});

const appointments = ref([
   {
      id: 1,
      doctor: "Dr. David",
      specialty: "Dentist",
      date: "1 Dec",
      time: "1:30pm",
      image: "~/assets/images/UoG.png",
   },
   {
      id: 2,
      doctor: "Dr. Pearl",
      specialty: "Pediatrician",
      date: "1 Dec",
      time: "2:30pm",
      image: "~/assets/images/UoG.png",
   },
   {
      id: 3,
      doctor: "Dr. Pearl",
      specialty: "Pediatrician",
      date: "1 Dec",
      time: "2:30pm",
      image: "~/assets/images/UoG.png",
   },
   {
      id: 4,
      doctor: "Dr. Pearl",
      specialty: "Pediatrician",
      date: "1 Dec",
      time: "2:30pm",
      image: "~/assets/images/UoG.png",
   },
   {
      id: 5,
      doctor: "Dr. Pearl",
      specialty: "Pediatrician",
      date: "1 Dec",
      time: "2:30pm",
      image: "~/assets/images/UoG.png",
   },
   {
      id: 6,
      doctor: "Dr. Pearl",
      specialty: "Pediatrician",
      date: "1 Dec",
      time: "2:30pm",
      image: "~/assets/images/UoG.png",
   },
]);

const departments = ref([
   { id: 1, name: "X-Ray", icon: "🔬", col: 0 },
   { id: 2, name: "Dental", icon: "🦷", col: 1 },
   { id: 3, name: "Vitals", icon: "💗", col: 2 },
   { id: 4, name: "Doctor", icon: "👨‍⚕️", col: 3 },
]);

// const doctors: Doctor[] = [
//    {
//       id: 1,
//       name: "Dr. David",
//       specialty: "Dentist",
//       hours: "10:30am - 5:30pm",
//       image: "https://res.cloudinary.com/eves-oasis/image/upload/t_Profile/v1737538581/jeff_iqyk32.jpg",
//       timeSlots: [],
//    },
//    {
//       id: 2,
//       name: "Dr. Isaac",
//       specialty: "Hematologist",
//       hours: "10:30am - 5:30pm",
//       image: "https://res.cloudinary.com/eves-oasis/image/upload/t_Profile/v1737538582/main_ne9srs.jpg",
//       timeSlots: [],
//    },
//    {
//       id: 3,
//       name: "Dr. Grace",
//       specialty: "Radiologist",
//       hours: "10:30am - 5:30pm",
//       image: "https://res.cloudinary.com/eves-oasis/image/upload/t_Profile/v1737538586/grey_wkryvf.jpg",
//       timeSlots: [],
//    },
//    {
//       id: 4,
//       name: "Dr. David",
//       specialty: "Dentist",
//       hours: "10:30am - 5:30pm",
//       image: "https://res.cloudinary.com/eves-oasis/image/upload/t_Profile/v1737538582/main_ne9srs.jpg",
//       timeSlots: [
//          "7:00 - 7:30",
//          "7:30 - 8:00",
//          "8:00 - 8:30",
//          "8:30 - 9:00",
//          "9:00 - 9:30",
//          "9:30 - 10:00",
//          "10:00 - 10:30",
//          "10:30 - 11:00",
//          "11:00 - 11:30",
//          "11:30 - 12:00",
//          "12:00 - 12:30",
//          "12:30 - 13:00",
//       ],
//    },
//    {
//       id: 5,
//       name: "Dr. Isaac",
//       specialty: "Hematologist",
//       hours: "10:30am - 5:30pm",
//       image: "https://res.cloudinary.com/eves-oasis/image/upload/t_Profile/v1737538581/jeff_iqyk32.jpg",
//       timeSlots: [
//          "13:00 - 13:30",
//          "13:30 - 14:00",
//          "14:00 - 14:30",
//          "14:30 - 15:00",
//          "15:00 - 15:30",
//          "15:30 - 16:00",
//          "16:00 - 16:30",
//          "16:30 - 17:00",
//          "17:00 - 17:30",
//          "17:30 - 18:00",
//          "18:00 - 18:30",
//          "18:30 - 19:00",
//       ],
//    },
//    {
//       id: 6,
//       name: "Dr. Grace",
//       specialty: "Radiologist",
//       hours: "10:30am - 5:30pm",
//       image: "https://res.cloudinary.com/eves-oasis/image/upload/t_Profile/v1737538586/grey_wkryvf.jpg",
//       timeSlots: [
//          "19:00 - 19:30",
//          "19:30 - 20:00",
//          "20:00 - 20:30",
//          "20:30 - 21:00",
//          "21:00 - 21:30",
//          "21:30 - 22:00",
//          "22:00 - 22:30",
//          "22:30 - 23:00",
//          "23:00 - 23:30",
//          "23:30 - 00:00",
//          "00:00 - 00:30",
//          "00:30 - 01:00",
//       ],
//    },
// ];

const handleMenuTap = (appointmentId: number) => {
   console.log("Menu tapped for appointment:", appointmentId);
   // Handle menu tap action
};

const handleDepartmentSelect = (department: any) => {
   console.log("Selected department:", department.name);
   // Handle department selection
};
</script>

<style scoped>
.rounded-full {
   border-radius: 9999;
}

.rounded-lg {
   border-radius: 8;
}

.bg-blue-500 {
   background-color: #3b82f6;
}

.bg-blue-100 {
   background-color: #dbeafe;
}

.text-blue-500 {
   color: #3b82f6;
}

.text-white {
   color: #ffffff;
}

.text-gray-500 {
   color: #6b7280;
}
</style>
