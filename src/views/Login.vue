<template>
   <Page>
      <ActionBar>
         <NSLabel
            text="Login"
            class="font-semibold text-xl"
            fontSize="24"
            sharedTransitionTag="pageTitle"
         />
      </ActionBar>

      <ScrollView class="mt-[8rem]">
         <StackLayout
            class="p-4"
            sharedTransitionTag="auth"
         >
            <UGClinicLogo
               class="mx-auto self-center ml-[16%] mb-5"
               sharedTransitionTag="logo"
            />

            <NSLabel
               text="Welcome Back!"
               class="text-2xl font-semibold text-center mb-8"
               sharedTransitionTag="authWelcome"
            />

            <NSLabel
               v-if="authStore.errorMessage"
               :text="authStore.errorMessage"
               class="text-red-500 text-base font-semibold text-center mb-6 p-4 rounded-lg bg-red-100 border-2 border-red-200"
            />

            <TextField
               v-model="authStore.email"
               hint="Enter Your Student Email"
               keyboardType="email"
               autocorrect="false"
               class="mb-6 p-4 bg-gray-200 rounded-lg"
               :class="{
                  'mb--2 border-2 border-red-500': authStore.emailError,
               }"
               sharedTransitionTag="email"
            />
            <NSLabel
               v-if="authStore.emailError"
               :text="authStore.emailError"
               class="text-red-500 text-sm mb-4 ml-2 error"
            />

            <TextField
               v-model="authStore.password"
               hint="Enter Your Password"
               :secure="!authStore.showPassword"
               class="p-4 bg-gray-200 rounded-lg flex-1"
               :class="{
                  'mt--10 border-2 border-red-500': authStore.passwordError,
               }"
               sharedTransitionTag="password"
            />

            <NSLabel
               :text="authStore.showPassword ? eyeOffIcon : eyeIcon"
               @tap="togglePasswordVisibility"
               class="fas h-8 w-8 -translate-y-10 translate-x-[10rem] text-2xl"
               sharedTransitionTag="eyeIcon"
            />

            <NSLabel
               v-if="authStore.passwordError"
               :text="authStore.passwordError"
               class="text-red-500 text-sm mb-4 ml-2 passError"
            />

            <AuthButton
               authText="Login"
               :auth="handleLoginClick"
               :loadState="authStore.isLoading"
               :disabled="authStore.disableLoginButton"
               sharedTransitionTag="authButton"
               returnKeyType="done"
            />

            <AuthQuestion
               buttonText="SignUp"
               :navigateTo="Signup"
               transition="slideRight"
               sharedTransitionTag="authQuestion"
            />
         </StackLayout>
      </ScrollView>
   </Page>
</template>

<script setup>
import { ref, computed, onUnmounted } from "nativescript-vue";
import { useAuthStore } from "~/stores/AuthStore";
import { SVGView } from "@nativescript-community/ui-svg";
import AuthButton from "~/components/auth/AuthButton.vue";
import Signup from "./Signup.vue";
import AuthQuestion from "~/components/auth/AuthQuestion.vue";
import UGClinicLogo from "~/components/UGClinicLogo.vue";
import { eyeIcon, eyeOffIcon } from "~/utils/icons";

const authStore = useAuthStore();
// const {
//    isLoading,
//    email,
//    password,
//    disableLoginButton,
//    emailError,
//    passwordError,
//    errorMessage,
//    showPassword,
// } = storeToRefs(authStore);
const {
   handleLogin,
   validateEmail,
   validatePassword,
   clearState,
   clearErrors,
   togglePasswordVisibility,
} = authStore;

// New method to handle login click:
const handleLoginClick = async () => {
   const emailValid = validateEmail();
   const passwordValid = validatePassword();

   if (emailValid && passwordValid) {
      await handleLogin();
   }
};

onUnmounted(() => {
   clearErrors();
   clearState();
});
</script>

<style scoped>
.loading-button {
   display: flex;
   justify-content: center;
   align-items: center;
}
.error {
   margin-top: -1.5rem;
   font-weight: bold;
}
.passError {
   margin-top: -2rem;
   font-weight: bold;
}
</style>
