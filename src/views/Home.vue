<template>
   <Page
      actionBarHidden="true"
      backgroundSpanUnderStatusBar="false"
      androidStatusBarBackground="#2E6FF3"
      backgroundColor="white"
      class="bg-white"
   >
      <GridLayout
         rows="*"
         columns="*"
         class="bg-white mt-16"
      >
         <!-- Background Image
         <ImageCache
            src="https://res.cloudinary.com/eves-oasis/image/upload/v1735242006/mainbg_p8bltp.jpg"
            stretch="aspectFill"
         /> -->

         <!-- Overlay -->
         <StackLayout class="bg-black bg-opacity-70" />

         <!-- Content -->
         <ScrollView>
            <StackLayout class="p-8 bg-white">
               <!-- Logo -->
               <!-- <ImageCache
                  src="https://res.cloudinary.com/eves-oasis/image/upload/v1735242006/mainbg_p8bltp.jpg"
                  width="100"
                  height="100"
                  class="self-center mb-8 animate-pulse rounded-lg"
               /> -->

               <UGClinicLogo  class="self-center mb-8 ml-[16%]"/>

               <!-- Welcome Text -->
               <Label
                  :text="welcomeText"
                  class="text-4xl font-bold text-main_text text-center mb-2"
                  textWrap="true"
               />
               <Label
                  :text="secondaryText"
                  class="text-lg text-center mb-8"
                  textWrap="true"
               />

               <!-- Health Benefits -->
               <GridLayout
                  rows="auto"
                  columns="*, *, *"
                  class="mb-8"
               >
                  <StackLayout
                     v-for="(service, index) in clinicServices"
                     :key="index"
                     :col="index"
                     class="bg-purple_box bg-opacity-40 rounded-lg p-4 m-1"
                  >
                     <Label
                        :text="service.icon"
                        class="text-4xl text-center mb-2"
                     />
                     <Label
                        :text="service.text"
                        textWrap="true"
                        class="text-sm text-main_text text-center"
                     />
                  </StackLayout>
               </GridLayout>

               <!-- Get Started Button -->
               <Button
                  :text="buttonText"
                  @tap="onGetStarted"
                  class="bg-main_blue text-white font-bold py-4 px-8 rounded-full text-lg"
               />

               <!-- Additional Info -->
               <Label
                  text="Health assessments and medical consultations"
                  class="text-grey text-lg text-center mt-5"
                  textWrap="true"
               />
            </StackLayout>
         </ScrollView>
      </GridLayout>
   </Page>
</template>

<script setup lang="ts">
import { ref, $navigateTo, computed } from "nativescript-vue";
import { useRouter } from "router-vue-native";
import { RoutePath } from "types/types";
import UGClinicLogo from "~/components/UGClinicLogo.vue";

const router = useRouter()
const welcomeText = ref( "Welcome to UG Clinic" )
const secondaryText =  ref("Your Health, Our Priority")

const clinicServices = ref([
    { icon: "🏥", text: "General Consultation & Check-ups" },
    { icon: "💊", text: "Pharmacy & Medication Services" },
    { icon: "🔬", text: "Laboratory & Diagnostic Tests" },
]);

const buttonText = ref("Get Started");

const onGetStarted = () => {
   router.push( "/signup")
   console.log("Hello");
};
</script>
