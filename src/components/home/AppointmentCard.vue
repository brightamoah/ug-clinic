<template>
   <GridLayout
      rows="auto, auto"
      columns="auto, *, auto"
      class="bg-main_blue rounded-3xl p-4 m-2 elevation-4"
   >
      <!-- Doctor Info Section -->
      <NSImg
         row="0"
         col="0"
         :src="doctor.image"
         class="w-8 h-8 rounded-full mr-5 bg-gray-300"
         stretch="aspectFill"
      />
      <FlexboxLayout
         row="0"
         col="1"
         flexDirection="column"
         class="mr-4"
      >
         <Label
            :text="doctor.name"
            class="text-white text-lg  text-center font-bold mb-1"
         />
         <Label
            :text="doctor.specialty"
            class="text-gray-100 text-sm text-center"
         />
      </FlexboxLayout>
      <Label
         row="0"
         col="2"
         :text="ellipsisVertical"
         class="fas text-white text-2xl text-right ml-4 p-1.5"
         @tap="onMenuTap"
      />

      <!-- Appointment Time Section -->
      <GridLayout
         row="1"
         col="0"
         colSpan="3"
         columns="auto, auto, auto, auto"
         class="mt-4"
      >
         <Label
            col="0"
            class="fas text-white text-base mr-1.5"
            :text="bookingsIcon"
         />
         <Label
            col="1"
            :text="appointment.date"
            class="text-white text-base mr-[3.5rem]"
         />
         <Label
            col="2"
            class="fas text-white text-base mr-1.5"
            :text="clockIcon"
         />
         <Label
            col="3"
            :text="appointment.time"
            class="text-white text-base"
         />
      </GridLayout>
   </GridLayout>
</template>

<script setup>
import { bookingsIcon, clockIcon, ellipsisVertical } from '~/utils/icons';

defineProps({
   doctor: {
      type: Object,
      required: true,
      default: () => ({
         name: "",
         specialty: "",
         image: "",
      }),
   },
   appointment: {
      type: Object,
      required: true,
      default: () => ({
         date: "",
         time: "",
      }),
   },
});

const emit = defineEmits(["menuTap"]);

const onMenuTap = () => {
   emit("menuTap");
};
</script>
