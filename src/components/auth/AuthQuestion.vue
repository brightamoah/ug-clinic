<template>
   <FlexboxLayout
      class="flex-col items-center"
      @tap="handleRoute(navigateTo)"
   >
      <Label class="h-full text-center text-gray-600 font-bold text-base  p-2">
         <FormattedString>
            <Span text="Already have an account? " />
            <Button
               :text="buttonText"
               class="text-main_blue text-lg font-bold border-b border-main_blue text"
            />
         </FormattedString>
      </Label>
   </FlexboxLayout>
</template>

<script setup>
import { PageTransition, SharedTransition } from "@nativescript/core";
import { $navigateTo } from "nativescript-vue";

const props = defineProps({
   navigateTo: {
      type: Object,
      required: true,
   },
   buttonText: {
      type: String,
      required: true,
   },
   transition: {
      type: String,
      required: true,
   },
});

const handleRoute = (destination) => {
   console.log("clicked");
   if (destination) {
      $navigateTo(destination, {
         clearHistory: true,
         animated: true,
         // transition: {
         //    name: props.transition,
         //    duration: 500,
         //    curve: "easeOut",
         // }
         transition: SharedTransition.custom(new PageTransition(),{
            pageEnd:{
               opacity: 1
            }
         }),
      });
   } else {
      console.error("No destination provided");
   }
};
</script>

<style scoped>
.text{
   font-weight: 800;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
   transition: transform 0.3s ease-out;
   position: absolute;
   width: 100%;
}

.slide-left-enter-from {
   transform: translateX(100%);
}
.slide-left-leave-to {
   transform: translateX(-100%);
}

.slide-right-enter-from {
   transform: translateX(-100%);
}
.slide-right-leave-to {
   transform: translateX(100%);
}
</style>
