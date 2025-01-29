<template>
   <StackLayout class="bg-white rounded-lg shadow-md mb-5">
      <Label 
         text="Select Time" 
         class="m-2 text-xl font-semibold text-main_text" 
      />
      <GridLayout
         v-if="timeSlots && timeSlots.length > 0"
         :columns="columns"
         :rows="rows"
         class="m-2 mt-1 border shadow-md p-3 rounded-lg bg-purple_box"
      >
         <StackLayout
            v-for="(slot, index) in timeSlots"
            :key="getSlotKey(slot, index)"
            :row="Math.floor(index / itemsPerRow)"
            :col="index % itemsPerRow"
            class="m-1 p-2 border-2 rounded-xl"
            :class="{
               'bg-main_blue border-main_blue': selectedSlot === slot,
               'bg-white': selectedSlot !== slot,
            }"
            @tap="selectTimeSlot(slot)"
         >
            <Label
               :text="getSlotText(slot)"
               class="text-sm text-center font-semibold"
               :class="{
                  'text-white': selectedSlot === slot,
                  'text-gray-800': selectedSlot !== slot,
               }"
            />
         </StackLayout>
      </GridLayout>
      <Label 
         v-else 
         text="No time slots available" 
         class="m-2 text-base text-gray-500 text-center"
      />
   </StackLayout>
</template>

<script setup lang="ts">
import { ref, computed,watch } from "nativescript-vue";

interface TimeSlot {
   id?: string | number;
   displayText?: string;
   [key: string]: any;
}

const props = defineProps({
   timeSlots: {
      type: Array as () => (string | TimeSlot)[],
      required: true,
      default: () => []
   },
   itemsPerRow: {
      type: Number,
      default: 4,
   },
});

const emit = defineEmits(["update:selectedSlot"]);

const selectedSlot = ref<string | TimeSlot | null>(null);

// Helper function to get slot text
const getSlotText = (slot: string | TimeSlot): string => {
   if (typeof slot === 'string') return slot;
   return slot.displayText || '';
};

// Helper function to get unique key for slot
const getSlotKey = (slot: string | TimeSlot, index: number): string | number => {
   if (typeof slot === 'object' && slot !== null) {
      return slot.id || `slot-${index}`;
   }
   return `slot-${index}`;
};

const selectTimeSlot = (slot: string | TimeSlot) => {
   selectedSlot.value = selectedSlot.value === slot ? null : slot;
   emit("update:selectedSlot", selectedSlot.value);
};

const columns = computed(() => {
   if (!props.timeSlots?.length) return "*";
   return "*,".repeat(props.itemsPerRow).slice(0, -1);
});

const rows = computed(() => {
   if (!props.timeSlots?.length) return "auto";
   return "auto,".repeat(Math.ceil(props.timeSlots.length / props.itemsPerRow)).slice(0, -1);
});

// Reset selection when timeSlots change
watch(() => props.timeSlots, () => {
   if (selectedSlot.value && !props.timeSlots.includes(selectedSlot.value)) {
      selectedSlot.value = null;
   }
}, { deep: true });
</script>