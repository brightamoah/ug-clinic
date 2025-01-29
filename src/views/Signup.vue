<script setup lang="ts">
import { onUnmounted, ref } from "nativescript-vue";
import AuthButton from "~/components/auth/AuthButton.vue";
import AuthQuestion from "~/components/auth/AuthQuestion.vue";
import UGClinicLogo from "~/components/UGClinicLogo.vue";
import { useAuthStore } from "~/stores/AuthStore";
import { eyeIcon, eyeOffIcon, settingsIcon } from "~/utils/icons";
import Login from "./Login.vue";

const authStore = useAuthStore();

const isLoading = ref(false);

const handleRegisterClick = async () => {
   const nameValid = authStore.validateName();
   const emailValid = authStore.validateEmail();
   const passwordValid = authStore.validatePassword();
   const confirmPasswordValid = authStore.validateConfirmPassword();

   if (nameValid && emailValid && passwordValid && confirmPasswordValid) {
      console.log("Starting");

      await authStore.handleRegister();
   }
};

onUnmounted(() => {
   authStore.clearErrors();
   authStore.clearState();
});
</script>

<template>
   <Page>
      <ActionBar>
         <Label
            text="Sign Up"
            class="font-bold text-lg"
            fontSize="24"
            sharedTransitionTag="pageTitle"
         />
      </ActionBar>

      <ScrollView class="mt-[3rem]">
         <StackLayout
            class="p-4"
            sharedTransitionTag="auth"
         >
            <UGClinicLogo
               class="mx-auto self-center ml-[16%] mb-5"
               sharedTransitionTag="logo"
            />

            <Label
               text="Create Account"
               class="text-2xl text-main_text font-semibold text-center mb-8"
               sharedTransitionTag="authWelcome"
            />

            <Label
               v-if="authStore.errorMessage"
               :text="authStore.errorMessage"
               class="text-red-500 text-base font-bold text-center mb-6 p-4 rounded-lg bg-red-100 border-2 border-red-200"
            />

            <TextField
               v-model="authStore.name"
               hint="Enter Your Full Name"
               class="mb-4 p-4 bg-gray-200 rounded-lg capitalize"
               :class="{ 'mb--2 border-2 border-red-500': authStore.nameError }"
               sharedTransitionTag="name"
            />
            <Label
               v-if="authStore.nameError"
               :text="authStore.nameError"
               class="text-red-500 text-sm mb-4 ml-2 error"
            />

            <TextField
               v-model="authStore.email"
               hint="Enter Your Student Email"
               keyboardType="email"
               autocorrect="false"
               class="mb-4 p-4 bg-gray-200 rounded-lg"
               :class="{
                  'mb--2 border-2 border-red-500': authStore.emailError,
               }"
               sharedTransitionTag="email"
            />
            <Label
               v-if="authStore.emailError"
               :text="authStore.emailError"
               class="text-red-500 text-sm mb-4 ml-2 error"
            />

            <!-- <FlexboxLayout class="mb-4" > -->
            <TextField
               v-model="authStore.password"
               hint="Enter Your Password"
               :secure="!authStore.showPassword"
               class="w-[100dvw] p-4 bg-gray-200 rounded-lg flex-1"
               :class="{
                  'mb-2 mt--2 border-2 border-red-500': authStore.passwordError,
               }"
               sharedTransitionTag="password"
            />
            <Label
               :text="authStore.showPassword ? eyeOffIcon : eyeIcon"
               @tap="authStore.togglePasswordVisibility"
               class="fas h-8 w-8 -translate-y-10 translate-x-[10rem] text-2xl"
               sharedTransitionTag="eyeIcon"
            />

            <Label
               v-if="authStore.passwordError"
               :text="authStore.passwordError"
               class="text-red-500 text-sm mb-4 mt--2 ml-2 passError"
            />

            <TextField
               v-model="authStore.confirmPassword"
               hint="Confirm Your Password"
               :secure="!authStore.showConfirmPassword"
               class="p-4 bg-gray-200 rounded-lg flex-1"
               :class="{
                  'mb-2 border-2 border-red-500':
                     authStore.confirmPasswordError,
               }"
               sharedTransitionTag="confirmPassword"
            />
            <Label
               :text="authStore.showConfirmPassword ? eyeOffIcon : eyeIcon"
               @tap="authStore.toggleConfirmPasswordVisibility"
               class="fas h-8 w-8 -translate-y-10 translate-x-[10rem] text-2xl fixed"
            />

            <Label
               v-if="authStore.confirmPasswordError"
               :text="authStore.confirmPasswordError"
               class="text-red-500 text-sm mb-4 mt-0 ml-2 passError"
            />

            <AuthButton
               authText="Sign Up"
               :auth="handleRegisterClick"
               :loadState="authStore.isLoading"
               :disabled="authStore.disableSignUpButton"
               sharedTransitionTag="authButton"
            />

            <AuthQuestion
               buttonText="Login"
               :navigateTo="Login"
               transition="fade"
               sharedTransitionTag="authQuestion"
            />
         </StackLayout>
      </ScrollView>
   </Page>
</template>

<style scoped>
.error {
   margin-top: -1rem;
   font-weight: bold;
}
.passError {
   margin-top: -2.5rem;
   font-weight: bold;
}
</style>
