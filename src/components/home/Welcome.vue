<template>
   <GridLayout
      rows="auto"
      columns="auto, *"
      class="items-center"
   >
      <NSImg
         col="0"
         src="https://res.cloudinary.com/eves-oasis/image/upload/t_Profile/v1732258031/samples/man-portrait.jpg"
         class="w-14 h-14 rounded-full border border-secondary_text"
         stretch="aspectFit"
      />

      <NSLabel
         col="1"
         width="100%"
         fontSize="20"
         textWrap="true"
         verticalTextAlignment="center"
         marginLeft="7"
      >
         <Span
            text="Welcome\n"
            class="text-xl text-secondary_text"
            fontSize="21"
            color="#475569"
         />
         <Span
            :text="studentName"
            class="studentID"
            fontSize="25"
            fontWeight="800"
            color="#33384b"
         />
      </NSLabel>
   </GridLayout>
</template>

<script setup lang="ts">
import { computed } from "nativescript-vue";

const props = defineProps({
   name: {
      type: String,
      required: true,
   },
});

const studentName = computed(() => props.name);

// const updateStudentId = () => {
//    studentName.value = "ID: " + Math.floor(Math.random() * 10000);
// };
</script>

<style scoped>
.studentID {
   font-weight: 900;
}
</style>
