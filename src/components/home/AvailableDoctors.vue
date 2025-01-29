<template>
   <FlexboxLayout class="flex-col mt-2">
      <FlexboxLayout class="justify-between items-center mb-2">
         <NSLabel
            text="Available Doctors"
            class="text-lg text-main_text font-semibold"
         />
         <NSLabel
            text="See all"
            class="text-blue_text text-base font-semibold"
         />
      </FlexboxLayout>

      <FlexboxLayout
         v-for="doctor in props.doctors"
         :key="doctor.id"
         class="doctor-card p-4 m-2 items-center justify-between"
      >
         <FlexboxLayout class="items-center flex-grow">
            <NSImg
               :src="doctor.image"
               width="50"
               height="50"
               class="rounded-full bg-gray-200"
               stretch="aspectFit"
            />

            <FlexboxLayout class="flex-col ml-4 flex-grow">
               <NSLabel
                  :text="doctor.name"
                  class="text-xl font-extrabold text-main_text"
               />
               <NSLabel
                  :text="doctor.specialty"
                  class="text-sm text-gray-500"
               />
               <NSLabel
                  :text="doctor.hours"
                  class="text-base mt-2 text-gray-700"
               />
            </FlexboxLayout>
         </FlexboxLayout>

         <Button
            text="Book"
            class="w-15 h-10 bg-blue-500 text-base text-white font-bold rounded-xl text-center"
            @tap="handleBookDoctor(doctor)"
         />
      </FlexboxLayout>
   </FlexboxLayout>
</template>

<script setup lang="ts">
import { nextTick } from "nativescript-vue";
import { useRouter } from "router-vue-native";
import { Doctor } from "types/types";
import { useBookingStore } from "~/stores/BookingStore";

const router = useRouter();

const props = defineProps<{
   doctors: Doctor[];
}>();

const bookingStore = useBookingStore();

const handleBookDoctor = async(doctor: Doctor) => {
   bookingStore.setSelectedDoctor( doctor );
   await nextTick()
   router.push("/bookings", {
      clearHistory: true,
      transition: {
         name: "slideLeft",
         duration: 400,
         curve: "easeOut",
      },
   });
};
</script>

<style scoped>
.doctor-card {
   background-color: white;
   border-radius: 24;
   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
