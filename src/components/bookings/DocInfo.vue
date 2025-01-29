<script setup lang="ts">
import { computed } from 'nativescript-vue';
import { bookingsIcon, clockIcon } from '~/utils/icons';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: '~/assets/images/UoG.png'
  },
  specialty: {
    type: String,
    required: true
  },
  hours: {
    type: String,
    required: true
  }
});

const currentDate = computed(() => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
});
</script>

<template>
  <CardView 
    class="bg-white"
    margin="10"
    elevation="4"
    radius="16"
  >
    <GridLayout rows="auto,auto" columns="auto, *, auto" class="p-4">
      <!-- Doctor Image and Date -->
      <StackLayout row="0" col="0" class="text-center">
        <NSImg
          :src="image"
          width="60"
          height="60"
          stretch="aspectFill"
          class="rounded-full border-2 border-gray-100"
        />
        <GridLayout columns="auto,auto" class="mt-7">
          <NSLabel
            :text="bookingsIcon"
            class="fas text-xl text-main_blue"
            col="0"
          />
          <NSLabel
            :text="currentDate"
            class="text-base text-main_text ml-2"
            col="1"
          />
        </GridLayout>
      </StackLayout>
      
      <!-- Doctor Info -->
      <StackLayout row="0" col="1" class="ml-3 space-y-2 mt-3">
        <NSLabel
          :text="name"
          class="text-xl text-center font-semibold text-main_text"
        />
        <Label
          :text="specialty"
          class="text-base text-center text-gray-500"
        />
      </StackLayout>

      <!-- Time -->
      <StackLayout row="0" col="2" class="ml-3 text-right">
        <Label
          text="&#xf142;"
          class="fas p-1 text-right text-xl font-semibold text-main_text"
          verticalAlignment="top"
        />
        <GridLayout columns="auto,auto" class="mt-[3.7rem]">
          <NSLabel
            :text="clockIcon"
            class="far text-main_blue text-xl font-semibold"
            col="0"
          />
          <Label
            :text="hours"
            class="text-base text-gray-600 ml-2"
            col="1"
          />
        </GridLayout>
      </StackLayout>
    </GridLayout>
  </CardView>
</template>

<style scoped>
.text-right {
  text-align: right;
}
.mr-1 {
  margin-right: 4;
}
.mt-2 {
  margin-top: 8;
}
.ml-3 {
  margin-left: 12;
}
</style>