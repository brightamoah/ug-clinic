<template>
   <StackLayout class="p-4 bg-white rounded-lg shadow-md">
      <NSLabel
         text="Select Date"
         class="m-2 text-xl font-semibold text-main_text"
      />
      <DatePicker
         v-model="selectedDate"
         class="w-full p-2 bg-gray-100 rounded-md text-blue_text"
         @dateChange="onDateChange"
         :minDate="minDate"
         :maxDate="maxDate"
      />
      <NSLabel
         :text="formattedDate"
         class="mt-2 text-sm text-gray-600"
      />
   </StackLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "nativescript-vue";

const selectedDate = ref(new Date());

const minDate = ref(new Date());
const maxDate = ref(
   new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
);

const formattedDate = computed(() => {
   const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
   };
   try {
      return selectedDate.value.toLocaleDateString("en-GH", options);
   } catch (error) {
      console.error("Error formatting date:", error);
      return "";
   }
});

const onDateChange = (event: { value: Date }) => {
   try {
      if (event && event.value) {
         selectedDate.value = event.value;
      }
   } catch (error) {
      console.error("Error updating date:", error);
   }
};

// Reset function
const reset = () => {
   try {
      selectedDate.value = new Date();
   } catch (error) {
      console.error("Error resetting date:", error);
   }
};

// Watch for external changes to selectedDate
watch(
   selectedDate,
   (newValue) => {
      if (!newValue) {
         reset();
      }
   },
   { deep: true }
);

// Expose necessary properties and methods to parent
defineExpose({
   selectedDate,
   reset,
});
</script>
