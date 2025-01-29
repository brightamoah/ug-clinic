<template>
  <StackLayout class="p-4 bg-white rounded-lg shadow-md">
    <Label text="Select Time" class="text-lg font-bold mb-2 text-gray-700" />
    <TimePicker
      v-model="selectedTime"
      class="w-full p-2 bg-gray-100 rounded-md text-blue_text"
      @timeChange="onTimeChange"
    />
    <Label :text="formattedTime" class="mt-2 text-sm text-gray-600" />
  </StackLayout>
</template>

<script setup>
import { ref, computed } from 'nativescript-vue';

const selectedTime = ref(new Date());

const formattedTime = computed(() => {
  return selectedTime.value.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
});

const onTimeChange = (event) => {
  selectedTime.value = event.value;
};

// Expose selectedTime to parent component
defineExpose({ selectedTime });
</script>