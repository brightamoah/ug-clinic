import { alert } from "@nativescript/core";
import { ref } from "nativescript-vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import { useRouter } from "router-vue-native";
import { AppointmentData, Doctor } from "types/types";
import { auth, db } from "~/plugins/firebase";
import { usePiniaWebpackHotHMR } from "~/utils/piniaHmr";

export const useBookingStore = defineStore("BookingStore", () => {
   const router = useRouter();

   const doctors = ref<Doctor[]>([
      {
         id: 1,
         name: "Dr. David",
         specialty: "Dentist",
         hours: "07:30 - 13:30",
         image: "https://res.cloudinary.com/eves-oasis/image/upload/t_Profile/v1737538581/jeff_iqyk32.jpg",
         timeSlots: [
            "7:00 - 7:30",
            "7:30 - 8:00",
            "8:00 - 8:30",
            "8:30 - 9:00",
            "9:00 - 9:30",
            "9:30 - 10:00",
            "10:00 - 10:30",
            "10:30 - 11:00",
            "11:00 - 11:30",
            "11:30 - 12:00",
            "12:00 - 12:30",
            "12:30 - 13:00",
         ],
      },
      {
         id: 2,
         name: "Dr. Isaac",
         specialty: "Hematologist",
         hours: "13:30 - 19:00",
         image: "https://res.cloudinary.com/eves-oasis/image/upload/t_Profile/v1737538582/main_ne9srs.jpg",
         timeSlots: [
            "13:00 - 13:30",
            "13:30 - 14:00",
            "14:00 - 14:30",
            "14:30 - 15:00",
            "15:00 - 15:30",
            "15:30 - 16:00",
            "16:00 - 16:30",
            "16:30 - 17:00",
            "17:00 - 17:30",
            "17:30 - 18:00",
            "18:00 - 18:30",
            "18:30 - 19:00",
         ],
      },
      {
         id: 3,
         name: "Dr. Grace",
         specialty: "Radiologist",
         hours: "19:30 - 01:00",
         image: "https://res.cloudinary.com/eves-oasis/image/upload/t_Profile/v1737538586/grey_wkryvf.jpg",
         timeSlots: [
            "19:00 - 19:30",
            "19:30 - 20:00",
            "20:00 - 20:30",
            "20:30 - 21:00",
            "21:00 - 21:30",
            "21:30 - 22:00",
            "22:00 - 22:30",
            "22:30 - 23:00",
            "23:00 - 23:30",
            "23:30 - 00:00",
            "00:00 - 00:30",
            "00:30 - 01:00",
         ],
      },
      {
         id: 4,
         name: "Dr. David",
         specialty: "Dentist",
         hours: "07:30 - 13:30",
         image: "https://res.cloudinary.com/eves-oasis/image/upload/t_Profile/v1737538582/main_ne9srs.jpg",
         timeSlots: [
            "7:00 - 7:30",
            "7:30 - 8:00",
            "8:00 - 8:30",
            "8:30 - 9:00",
            "9:00 - 9:30",
            "9:30 - 10:00",
            "10:00 - 10:30",
            "10:30 - 11:00",
            "11:00 - 11:30",
            "11:30 - 12:00",
            "12:00 - 12:30",
            "12:30 - 13:00",
         ],
      },
      {
         id: 5,
         name: "Dr. Isaac",
         specialty: "Hematologist",
         hours: "13:30 - 19:00",
         image: "https://res.cloudinary.com/eves-oasis/image/upload/t_Profile/v1737538581/jeff_iqyk32.jpg",
         timeSlots: [
            "13:00 - 13:30",
            "13:30 - 14:00",
            "14:00 - 14:30",
            "14:30 - 15:00",
            "15:00 - 15:30",
            "15:30 - 16:00",
            "16:00 - 16:30",
            "16:30 - 17:00",
            "17:00 - 17:30",
            "17:30 - 18:00",
            "18:00 - 18:30",
            "18:30 - 19:00",
         ],
      },
      {
         id: 6,
         name: "Dr. Grace",
         specialty: "Radiologist",
         hours: "19:30 - 01:00",
         image: "https://res.cloudinary.com/eves-oasis/image/upload/t_Profile/v1737538586/grey_wkryvf.jpg",
         timeSlots: [
            "19:00 - 19:30",
            "19:30 - 20:00",
            "20:00 - 20:30",
            "20:30 - 21:00",
            "21:00 - 21:30",
            "21:30 - 22:00",
            "22:00 - 22:30",
            "22:30 - 23:00",
            "23:00 - 23:30",
            "23:30 - 00:00",
            "00:00 - 00:30",
            "00:30 - 01:00",
         ],
      },
   ]);

   const selectedDoctor = ref<Doctor | null>(null);

   const setSelectedDoctor = async(doctor: Doctor) => {
      selectedDoctor.value = doctor;
      console.log(selectedDoctor.value);
   };

   const updateDoctorTimeSlots = async (
      doctorId: number,
      newTimeSlots: string[]
   ) => {
      // Update the time slots in the local state
      const doctorIndex = doctors.value.findIndex((doc) => doc.id === doctorId);
      if (doctorIndex !== -1) {
         doctors.value[doctorIndex].timeSlots = newTimeSlots;

         // If this is the selected doctor, update that as well
         if (selectedDoctor.value?.id === doctorId) {
            selectedDoctor.value = {
               ...selectedDoctor.value,
               timeSlots: newTimeSlots,
            };
         }
      }
   };

   return {
      doctors,
      selectedDoctor,
      setSelectedDoctor,
      updateDoctorTimeSlots
   };
});

if (import.meta.webpackHot) {
   usePiniaWebpackHotHMR(import.meta.webpackHot, useBookingStore);
}
