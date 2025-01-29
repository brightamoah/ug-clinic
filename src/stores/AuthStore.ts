import { User } from "@nativescript/firebase-auth";
import { computed, onScopeDispose, ref } from "nativescript-vue";
import { defineStore } from "pinia";
import { useRouter } from "router-vue-native";
import { RoutePath, userDetails } from "types/types";
import { auth, db } from "~/plugins/firebase";
import { handleFirebaseError } from "~/utils/firebaseError";
import { usePiniaWebpackHotHMR } from "~/utils/piniaHmr";

export const useAuthStore = defineStore("AuthStore", () => {
   const router = useRouter();

   const email = ref("");
   const password = ref("");
   const confirmPassword = ref("");
   const name = ref("");
   const isLoading = ref(false);
   const errorMessage = ref("");
   const nameError = ref("");
   const emailError = ref("");
   const passwordError = ref("");
   const confirmPasswordError = ref("");
   const showPassword = ref(false);
   const showConfirmPassword = ref(false);
   const currentUser = computed(() => auth.currentUser);
   const loggedInUser = computed(() => auth.currentUser);

   const isLoggedIn = computed(() => !!currentUser.value);

   const disableLoginButton = computed(() => {
      return !email.value || !password.value;
   });

   const disableSignUpButton = computed(
      () =>
         !name.value ||
         !email.value ||
         !password.value ||
         !confirmPassword.value
   );

   // Method to toggle password visibility
   const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
   };

   const toggleConfirmPasswordVisibility = () => {
      showConfirmPassword.value = !showConfirmPassword.value;
   };

   const clearState = () => {
      name.value = "";
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
      errorMessage.value = "";
   };

   const clearErrors = () => {
      nameError.value = "";
      emailError.value = "";
      passwordError.value = "";
      errorMessage.value = "";
      confirmPasswordError.value = "";
   };

   const routeTo = async (route: RoutePath) => {
      try {
         await router.push(route, {
            clearHistory: true,
         });
      } catch (error) {
         console.error(`Error navigating to ${route}:`, error);
      }
   };

   const validateEmail = () => {
      const emailRegex = /^[a-zA-Z0-9_.+-]+@st\.ug\.edu\.gh$/;
      if (!email.value) {
         emailError.value = "Email is required";
         return false;
      }

      if (!emailRegex.test(email.value)) {
         emailError.value = "Email must be in the format example@st.ug.edu.gh";
         return false;
      }

      emailError.value = "";
      return true;
   };

   const validatePassword = () => {
      if (!password.value) {
         passwordError.value = "Password is required";
         return false;
      }

      if (password.value.length < 6) {
         passwordError.value = "Password must be at least 6 characters";
         return false;
      }

      passwordError.value = "";
      return true;
   };

   const validateConfirmPassword = () => {
      if (!confirmPassword.value) {
         confirmPasswordError.value = "Confirm password is required";
         return false;
      }
      if (confirmPassword.value !== password.value) {
         confirmPasswordError.value = "Passwords do not match";
         return false;
      }

      confirmPasswordError.value = "";
      return true;
   };

   const validateName = () => {
      if (!name.value) {
         nameError.value = "Name is required";
         return false;
      }
      if (name.value.length < 5) {
         nameError.value = "Name must be at least 5 characters";
         return false;
      }

      // Capitalize each word in the name
      name.value = name.value
         .split(" ")
         .map(
            (word: string) =>
               word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
         )
         .join(" ");
      nameError.value = "";
      return true;
   };

   const saveUserToFirestore = async (user: User) => {
      try {
         const userDetails: userDetails = {
            id: user.uid,
            name: name.value,
            email: email.value,
         };
         await db.collection("users").doc(user.uid).set(userDetails);

         console.log("User data saved to Firestore:", userDetails);
      } catch (error: any) {
         handleFirebaseError(error, errorMessage);
         throw error;
      }
   };

   const handleRegister = async () => {
      isLoading.value = true;
      errorMessage.value = "";
      try {
         const userCredential = await auth.createUserWithEmailAndPassword(
            email.value,
            password.value
         );

         const user = userCredential.user;

         await user.updateProfile({ displayName: name.value });

         await saveUserToFirestore(user);

         await user.reload();
         console.table({ message: "Registration successful for user:", user });

         clearState();
         routeTo("/dashboard");
      } catch (error: any) {
         handleFirebaseError(error, errorMessage);
      } finally {
         isLoading.value = false;
      }
   };

   const handleLogin = async () => {
      isLoading.value = true;
      errorMessage.value = "";
      clearErrors();
      try {
         const log = await auth.signInWithEmailAndPassword(
            email.value,
            password.value
         );
         console.log("Login successful for user:", loggedInUser.value);

         clearState();
         routeTo("/dashboard");
      } catch (error: any) {
         handleFirebaseError(error, errorMessage);
      } finally {
         isLoading.value = false;
      }
   };

   const unsubscribeAuth = auth.addAuthStateChangeListener((user) => {
      if (user) {
         console.log("User is logged in:", user);
      } else {
         console.log("User is logged out");
      }
   });

   onScopeDispose(() => unsubscribeAuth);

   return {
      name,
      isLoading,
      isLoggedIn,
      currentUser,
      errorMessage,
      nameError,
      emailError,
      passwordError,
      confirmPasswordError,
      showPassword,
      showConfirmPassword,
      email,
      password,
      confirmPassword,
      disableLoginButton,
      disableSignUpButton,
      loggedInUser,
      unsubscribeAuth,
      clearState,
      clearErrors,
      toggleConfirmPasswordVisibility,
      togglePasswordVisibility,
      routeTo,
      validateEmail,
      validatePassword,
      validateConfirmPassword,
      validateName,
      handleRegister,
      handleLogin,
   };
});

if (import.meta.webpackHot) {
   usePiniaWebpackHotHMR(import.meta.webpackHot, useAuthStore);
}
