<template>
   <AbsoluteLayout
      v-if="isVisible"
      class="w-full h-full"
   >
      <GridLayout class="w-full h-full bg-black opacity-50" />
      <CardView class="w-4/5 bg-white rounded-lg p-4 m-auto">
         <StackLayout>
            <Label
               class="text-2xl font-bold text-center text-green-600 m-b-2"
               text="Success!"
            />
            <Label
               class="text-lg text-center text-gray-700 m-b-4"
               :text="message"
               textWrap="true"
            />
            <Button
               text="OK"
               @tap="close"
               class="bg-blue-500 text-white font-semibold p-2 rounded-full"
            />
         </StackLayout>
      </CardView>
   </AbsoluteLayout>
</template>

<script setup lang="ts">
import { ref } from "nativescript-vue";

const props = defineProps<{
   message: string;
}>();

const isVisible = ref(true);

const emit = defineEmits(["close"]);

const close = () => {
   isVisible.value = false;
   emit("close");
};
</script>

<style scoped>
AbsoluteLayout {
   z-index: 9999;
}
CardView {
   vertical-align: center;
   horizontal-align: center;
}
</style>
