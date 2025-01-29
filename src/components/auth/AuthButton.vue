<template>
   <FlexboxLayout
      rows="auto"
      columns="auto"
      :class="[
         'w-full h-12 relative flex items-center justify-center overflow-hidden border-[7px] rounded-full mb-3',
         disabled ? 'bg-gray-400 border-gray-400' : 'bg-main_blue border-main_blue'
      ]"
      @tap="!disabled ? auth() : null"
   >
      <!-- Button Text -->
      <NSLabel
         :text="authText"
         class="text-white text-xl font-bold text-center uppercase"
         v-if="!loadState"
      />

      <ActivityIndicator
         class="rounded-md text-white "
         :busy="loadState"
         v-else
      />
   </FlexboxLayout>
</template>

<script setup>
defineProps({
   auth: {
      type: Function,
      required: true,
   },
   authText: {
      type: String,
      required: true,
   },
   loadState: {
      type: Boolean,
      required: true,
   },
   disabled: {
      type: Boolean,
      default: false,
   },
});
</script>