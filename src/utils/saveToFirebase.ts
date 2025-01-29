import { AppointmentData } from "types/types";
import { db } from "~/plugins/firebase";
import { handleFirebaseError } from "./firebaseError";
import { ref } from "nativescript-vue";

const errorMessage = ref("");
export const useSaveToFirebase = async (
   data: AppointmentData,
   collection: string
) => {
   try {
      await db.collection(collection).doc(data.id).set(data);
      console.log("Data saved to Firestore");
   } catch (error: any) {
      handleFirebaseError(error, errorMessage);
   }
};
