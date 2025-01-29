<!-- <template>
  <FlexboxLayout class="comment-section">
    <Label text="Comment" class="section-title" />
    <TextView
      v-model="text"
      hint="Add your comment here"
      class="comment-input"
      @textChange="onTextChange"
    />
  </FlexboxLayout>
</template>

<script setup>
import { ref } from 'nativescript-vue';

const emit = defineEmits(['update']);
const text = ref('');

const onTextChange = () => {
  emit('update', text.value);
};
</script> -->

<script setup lang="ts">
import { computed, ref, watch } from "nativescript-vue";

const props = defineProps({
   comment: {
      type: String,
      required: true,
   },
});

const emit = defineEmits( ["update"] );


const text = computed({
   get: () => props.comment,
   set: (value) => emit("update", value),
});

// watch(
//    () => props.comment,
//    (newVal) => {
//       text.value = newVal;
//    }
// );

const onTextChange = () => {
   emit("update", text.value);
};
</script>

<template>
   <StackLayout class="bg-gray-100 rounded-lg">
      <NSLabel
         text="Reason For Appointment"
         class="text-2xl font-semibold mb-2 text-main_text"
      />
      <TextView
         v-model="text"
         hint="Enter Reason For The Appointment"
         class="w-full h-40 mb-5 p-3 bg-white border-2 border-main_text rounded-lg"
         returnKeyType="next"
         :maxLines="20"
         @textChange="onTextChange"
      />
   </StackLayout>
</template>
