<template>
   <FlexboxLayout class="date-picker">
      <Label
         text="Select Date"
         class="section-title"
      />
      <GridLayout
         columns="*, *"
         gap="10"
      >
         <NSLabel
            col="0"
            :items="days"
            v-model="selectedDay"
            hint="Day"
         />
         <NSLabel
            col="1"
            :items="months"
            v-model="selectedMonth"
            hint="Month"
         />
      </GridLayout>
   </FlexboxLayout>
</template>

<script setup>
import { ref } from "nativescript-vue";

const days = ref(Array.from({ length: 31 }, (_, i) => (i + 1).toString()));
const months = ref([
   "Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "Jun",
   "Jul",
   "Aug",
   "Sep",
   "Oct",
   "Nov",
   "Dec",
]);

const selectedDay = ref("");
const selectedMonth = ref("");
</script>

<style scoped>
.date-picker {
   margin-bottom: 20;
}

.section-title {
   font-size: 18;
   font-weight: bold;
   margin-bottom: 10;
}
</style>
