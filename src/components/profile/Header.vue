<script setup lang="ts">
import { bellIcon, logOut } from "~/utils/icons";

const props = defineProps({
   icon: {
      type: String,
      default: bellIcon,
   },
   title: {
      type: String,
      default: "Profile",
   },
   actionText: {
      type: String,
   },
   actionIcon: {
      type: String,
   },
   onIconTap: {
      type: Function,
      default: () => {},
   },
});
</script>

<template>
   <GridLayout
      columns="*,*,*"
      class="p-4 shadow-xl"
   >
      <Label
         :text="props.icon"
         col="0"
         class="fas text-3xl ml-4 text-gray-800"
         @tap="props.onIconTap"
      />

      <Label
         :text="props.title"
         col="1"
         class="text-2xl text-center font-extrabold capitalize text-gray-800"
      />

      <Label
         col="2"
         class="text-center ml-8 font-bold text-red-500 space-x-1"
      >
         <FormattedString>
            <Span
               :text="props.actionText"
               class="text-center text-base mr-2"
            />
            <Span text="  " />
            <Span
               :text="actionIcon"
               class="fas ml-3 text-base"
            />
         </FormattedString>
      </Label>
   </GridLayout>
</template>
