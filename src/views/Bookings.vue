<script lang="ts" setup>
import { SVGView } from "@nativescript-community/ui-svg";
import { alert } from "@nativescript/core";
import { TNSFancyAlert } from "@nstudio/nativescript-fancyalert";
import { ref } from "nativescript-vue";
import AuthButton from "~/components/auth/AuthButton.vue";
import Comments from "~/components/bookings/Comments.vue";
import DatePickerStyled from "~/components/bookings/DatePickerStyled.vue";
import DocInfo from "~/components/bookings/DocInfo.vue";
import TimeSlot from "~/components/bookings/TimeSlot.vue";
import { auth, db } from "~/plugins/firebase";
import { useBookingStore } from "~/stores/BookingStore";
import { handleFirebaseError } from "~/utils/firebaseError";
import { useFormatDate } from "~/utils/formatDate";
import { clockIcon } from "~/utils/icons";

const bookingStore = useBookingStore();
const doctor = bookingStore.selectedDoctor;
const comment = ref("");
const datePicker = ref();
const selectedTimeSlot = ref<string | null>(null);
const isLoading = ref(false);
const errorMessage = ref("");

const selectedDate = ref("");

const resetState = () => {
   comment.value = "";
   selectedTimeSlot.value = null;
   selectedDate.value = "";

   if (datePicker.value?.reset) {
      try {
         datePicker.value.reset();
      } catch (error) {
         console.error("Error resetting date picker:", error);
      }
   }
};

const saveAppointment = async () => {
   errorMessage.value = "";
   try {
      const user = auth.currentUser;
      if (!user) {
         alert("Please login to book an appointment");
         return;
      }

      const bookingData = {
         doctor: {
            id: doctor?.id,
            name: doctor?.name,
            specialty: doctor?.specialty,
            image: doctor?.image,
         },
         date: datePicker.value?.selectedDate, // Store as Date object
         formattedDate: selectedDate.value, // Formatted string for display
         timeSlot: selectedTimeSlot.value,
         comment: comment.value.trim(),
         userId: user.uid,
         email: user.email,
         createdAt: new Date(),
         status: "pending", // You can add more statuses as needed
      };

      const docId = useFormatDate(bookingData.date);

      const docRef = db.collection("appointments").doc(docId);

      const docSnapshot = await docRef.get();

      if (!docSnapshot.exists) {
         await docRef.set({
            appointments: {
               [bookingData.userId]: bookingData,
            },
         });
      } else {
         // If the date document exists, update it with the new appointment
         await docRef.update({
            [`appointments.${bookingData.userId}`]: bookingData,
         });
      }

      // Update the available time slots in the BookingStore
      if (doctor) {
         const updatedTimeSlots = doctor.timeSlots.filter(
            (slot: string) => slot !== selectedTimeSlot.value
         );
         await bookingStore.updateDoctorTimeSlots(doctor.id, updatedTimeSlots);
      }

      // alert(`Appointment booked successfully! ${docRef.id}`);
      TNSFancyAlert.showSuccess(
         "Success!",
         `Appointment booked successfully! ${docRef.id}`,
         "OK"
      ).then(() => {
         // bookingStore.selectedDoctor = null;
         resetState();
      });
   } catch (error: any) {
      console.error("Error saving appointment:", error);
      handleFirebaseError(error, errorMessage);
      throw error;
   }
};

const confirmSelection = async () => {
   isLoading.value = true;
   const date = datePicker.value?.selectedDate;
   const timeSlot = selectedTimeSlot.value;
   const trimmedComment = comment.value.trim();

   const missingFields = [];
   if (!date) missingFields.push("date");
   if (!timeSlot) missingFields.push("time slot");
   if (!trimmedComment) missingFields.push("reason for appointment");

   if (missingFields.length > 0) {
      alert(`Please provide: ${missingFields.map((f) => `${f}`).join("\n")}`);
      isLoading.value = false;
      return;
   }

   selectedDate.value = date.toLocaleDateString("en-GH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
   });

   try {
      await saveAppointment();
   } catch (error: any) {
      console.error("Error saving appointment:", error);
   } finally {
      isLoading.value = false;
   }
};

// const davidTimeSlots = ref([
//    "7:00 - 7:30",
//    "7:30 - 8:00",
//    "8:00 - 8:30",
//    "8:30 - 9:00",
//    "9:00 - 9:30",
//    "9:30 - 10:00",
//    "10:00 - 10:30",
//    "10:30 - 11:00",
//    "11:00 - 11:30",
//    "11:30 - 12:00",
//    "12:00 - 12:30",
//    "12:30 - 13:00",
// ]);

// const isaacTimeSlots = ref([
//    "13:00 - 13:30",
//    "13:30 - 14:00",
//    "14:00 - 14:30",
//    "14:30 - 15:00",
//    "15:00 - 15:30",
//    "15:30 - 16:00",
//    "16:00 - 16:30",
//    "16:30 - 17:00",
//    "17:00 - 17:30",
//    "17:30 - 18:00",
//    "18:00 - 18:30",
//    "18:30 - 19:00",
// ]);

// const graceTimeSlots = ref([
//    "19:00 - 19:30",
//    "19:30 - 20:00",
//    "20:00 - 20:30",
//    "20:30 - 21:00",
//    "21:00 - 21:30",
//    "21:30 - 22:00",
//    "22:00 - 22:30",
//    "22:30 - 23:00",
//    "23:00 - 23:30",
//    "23:30 - 00:00",
//    "00:00 - 00:30",
//    "00:30 - 01:00",
// ]);

const updateText = (newVal: string) => {
   comment.value = newVal;
};

const handleTimeSlotSelection = (selectedSlot: string) => {
   selectedTimeSlot.value = selectedSlot;
   console.log("Selected time slot:", selectedTimeSlot.value);
   // Do something with the selected slot
};
</script>

<template>
   <Page
      actionBarHidden="true"
      backgroundSpanUnderStatusBar="false"
      androidStatusBarBackground="#2E6FF3"
      backgroundColor="white"
      class="bg-white"
   >
      <GridLayout rows="auto, *">
         <!-- <NSLabel
            text="Go Back"
            @tap="$navigateBack"
            class="bg-main_blue text-center px-4 py-10 text-2xl text-gray-900 font-bold"
         /> -->

         <SVGView
            src="~/assets/svgs/heart.svg"
            class="bg-main_blue text-center w-[100%] text-2xl text-gray-900 font-bold rounded-b-2xl"
            row="0"
         />

         <StackLayout row="1">
            <!-- <CardView
               class="bg-white rounded-3xl"
               margin="10"
               radius="20"
               elevation="15"
            >
               <FlexboxLayout class="items-center flex-grow">
                  <NSImg
                     :src="doctor?.image"
                     width="50"
                     height="50"
                     class="rounded-full bg-gray-200"
                     stretch="aspectFit"
                  />

                  <FlexboxLayout class="flex-col ml-4 flex-grow">
                     <NSLabel
                        :text="doctor?.name"
                        class="text-xl font-extrabold text-main_text"
                     />
                     <NSLabel
                        :text="doctor?.specialty"
                        class="text-sm text-gray-500"
                     />
                     <NSLabel
                        :text="doctor?.hours"
                        class="text-base mt-2 text-gray-700"
                     />
                  </FlexboxLayout>
               </FlexboxLayout>
            </CardView> -->

            <DocInfo
               :name="doctor?.name"
               :hours="doctor?.hours"
               :specialty="doctor?.specialty"
               :image="doctor?.image"
            />

            <ScrollView
               height="100%"
               class="bg-gray-100 p-4"
            >
               <StackLayout>
                  <!-- <NSLabel
                     text="Date and Time Picker"
                     class="text-2xl font-semibold mb-4 text-center text-gray-800 fixed"
                  /> -->

                  <DatePickerStyled
                     ref="datePicker"
                     class="mb-4"
                  />
                  <!-- <TimePickerStyled
                     ref="timePicker"
                     class="mb-4"
                  /> -->

                  <TimeSlot
                     v-if="doctor"
                     :timeSlots="doctor.timeSlots"
                     @update:selectedSlot="handleTimeSlotSelection"
                  />

                  <Comments
                     :comment="comment"
                     @update="updateText"
                     class="w-[90%]"
                  />

                  <AuthButton
                     authText="Book Appointment"
                     :auth="confirmSelection"
                     :loadState="isLoading"
                     :disabled="!datePicker?.selectedDate || !selectedTimeSlot"
                     class="w-[80%] font-semibold button"
                  />
               </StackLayout>
            </ScrollView>
         </StackLayout>
      </GridLayout>
   </Page>
</template>

<style scoped>
.button {
   margin-left: 3rem;
   margin-right: 3rem;
   width: 80%;
}
</style>
