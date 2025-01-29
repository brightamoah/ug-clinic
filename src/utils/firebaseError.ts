// Define error types for better type safety
interface FirebaseError {
    code?: string;
    message: string;
}

interface ErrorRef {
    value: string;
}

export const handleFirebaseError = (
    error: FirebaseError,
    errorMessageRef: ErrorRef
) => {
    errorMessageRef.value = error.message;
    console.error("Firebase error:", error);

    if (error instanceof Error && typeof parseInt(error.message) === 'number' && !isNaN(parseInt(error.message))) {
        // Handle google sign in error
        const errorCode = parseInt(error.message);
        switch (errorCode) {
            // Google Sign-In Errors (Specific to @nativescript/google-signin)
            case 10:
                console.error("Google Sign-in Error: Configuration error. Please check your SHA-1 key and google-services.json.");
                errorMessageRef.value = "Google Sign-in configuration error. Please check your SHA-1 key and google-services.json.";
                break;

            case 12500:
                console.error("Google Sign-in Error: The sign-in process failed, try again.");
                errorMessageRef.value = "The sign-in process failed, try again.";
                break;

            case 12501:
                console.error("Google Sign-in Error: User cancelled sign-in.");
                errorMessageRef.value = "User cancelled sign-in.";
                break;

            case 12502:
                console.error("Google Sign-in Error: Sign-in failed due to an invalid account.");
                errorMessageRef.value = "Sign-in failed due to an invalid account.";
                break;

            case 12503:
                console.error("Google Sign-in Error: Sign-in process was already in progress.");
                errorMessageRef.value = "Sign-in process was already in progress.";
                break;

            case 12504:
                console.error("Google Sign-in Error: Sign-in process has been timed out.");
                errorMessageRef.value = "Sign-in process has been timed out.";
                break;

            case 12505:
                console.error("Google Sign-in Error: Google play services are missing");
                errorMessageRef.value = "Google play services are missing";
                break;

            case 12506:
                console.error("Google Sign-in Error: Internal error with Google Play Services.");
                errorMessageRef.value = "Internal error with Google Play Services.";
                break;

            case 12507:
                console.error("Google Sign-in Error: Sign-in process has been interrupted.");
                errorMessageRef.value = "Sign-in process has been interrupted.";
                break;

            case 12508:
                console.error("Google Sign-in Error: Developer error with Google Play Services configuration.");
                errorMessageRef.value = "Developer error with Google Play Services configuration.";
                break;
            default:
                console.error("Google Sign-in Error: Unknown Error", errorCode);
                errorMessageRef.value = "Unknown Google Sign-in error.";

        }
    }
    else if (error.code) {
        // Handle firebase errors
        switch (error.code) {
            // Authentication Errors (Firebase Auth)
            case "auth/email-already-in-use":
                console.error("Authentication Error: The email address is already in use by another account.");
                errorMessageRef.value = "The email address is already in use by another account.";
                break;

            case "auth/invalid-email":
                console.error("Authentication Error: The email address is not valid.");
                errorMessageRef.value = "The email address is not valid.";
                break;

            case "auth/weak-password":
                console.error("Authentication Error: Password should be at least 6 characters.");
                errorMessageRef.value = "Password should be at least 6 characters.";
                break;

            case "auth/network-request-failed":
                console.error("Authentication Error: Network error. Please check your connection.");
                errorMessageRef.value = "Network error. Please check your connection.";
                break;

            case "auth/timeout":
                console.error("Authentication Error: The request to the auth server timed out.");
                errorMessageRef.value = "The request to the auth server timed out.";
                break;

            case "auth/operation-not-allowed":
                console.error("Authentication Error: Email/password sign-in is not enabled.");
                errorMessageRef.value = "Email/password sign-in is not enabled.";
                break;

            case "auth/too-many-requests":
                console.error("Authentication Error: Too many requests have been sent in a short amount of time.");
                errorMessageRef.value = "Too many requests have been sent in a short amount of time.";
                break;

            case "auth/internal-error":
                console.error("Authentication Error: There has been an internal error.");
                errorMessageRef.value = "There has been an internal error.";
                break;

            case "auth/user-disabled":
                console.error("Authentication Error: The user account has been disabled by an administrator.");
                errorMessageRef.value = "The user account has been disabled by an administrator.";
                break;

            case "auth/user-not-found":
                console.error("Authentication Error: There is no user record corresponding to the identifier provided.");
                errorMessageRef.value = "There is no user record corresponding to the identifier provided.";
                break;

            case "auth/wrong-password":
                console.error("Authentication Error: The password provided is not correct.");
                errorMessageRef.value = "The password provided is not correct.";
                break;

            case "auth/invalid-credential":
                console.error("Authentication Error: The provided credential is malformed or expired.");
                errorMessageRef.value = "The provided credential is invalid or expired.";
                break;

            case "auth/invalid-verification-code":
                console.error("Authentication Error: The verification code is invalid.");
                errorMessageRef.value = "The verification code provided is invalid.";
                break;

            case "auth/invalid-verification-id":
                console.error("Authentication Error: The verification ID is invalid.");
                errorMessageRef.value = "The verification ID is invalid.";
                break;

            case "auth/requires-recent-login":
                console.error("Authentication Error: This operation requires recent authentication.");
                errorMessageRef.value = "Please log in again to complete this action.";
                break;

            // Firestore Errors
            case "firestore/permission-denied":
                console.error("Firestore Error: Permission denied. Please check your Firestore rules.");
                errorMessageRef.value = "Permission denied. Please check your Firestore rules.";
                break;

            case "firestore/invalid-argument":
                console.error("Firestore Error: Invalid data. Check your data types and required fields.");
                errorMessageRef.value = "Invalid data. Check your data types and required fields.";
                break;

            case "firestore/unavailable":
                console.error("Firestore Error: Firestore service unavailable, please check your internet connection.");
                errorMessageRef.value = "Firestore service unavailable, please check your internet connection.";
                break;

            case "firestore/data-loss":
                console.error("Firestore Error: There has been data loss on the server-side.");
                errorMessageRef.value = "There has been data loss on the server-side.";
                break;

            case "firestore/resource-exhausted":
                console.error("Firestore Error: The app has used too many Firebase resources. Check your Firebase quota.");
                errorMessageRef.value = "The app has used too many Firebase resources. Check your Firebase quota.";
                break;

            case "firestore/unknown":
                console.error("Firestore Error: Unknown Error.");
                errorMessageRef.value = "Unknown Error.";
                break;

            case "firestore/cancelled":
                console.error("Firestore Error: The operation was cancelled due to some client error.");
                errorMessageRef.value = "The operation was cancelled due to some client error.";
                break;

            case "firestore/aborted":
                console.error("Firestore Error: The operation was aborted.");
                errorMessageRef.value = "The operation was aborted.";
                break;

            case "firestore/already-exists":
                console.error("Firestore Error: Document already exists.");
                errorMessageRef.value = "A document with this ID already exists.";
                break;

            case "firestore/failed-precondition":
                console.error("Firestore Error: Operation failed due to a failed precondition.");
                errorMessageRef.value = "Operation cannot be performed in the current state.";
                break;

            case "firestore/deadline-exceeded":
                console.error("Firestore Error: Operation deadline exceeded.");
                errorMessageRef.value = "Operation timed out. Please try again.";
                break;

            case "firestore/not-found":
                console.error("Firestore Error: Requested document not found.");
                errorMessageRef.value = "The requested document was not found.";
                break;


            // Storage Errors
            case "storage/unauthorized":
                console.error("Storage Error: User doesn't have permission to access the object");
                errorMessageRef.value = "You don't have permission to access this file.";
                break;

            case "storage/canceled":
                console.error("Storage Error: User canceled the upload");
                errorMessageRef.value = "File upload was cancelled.";
                break;

            case "storage/unknown":
                console.error("Storage Error: Unknown error occurred");
                errorMessageRef.value = "An unknown error occurred during file operation.";
                break;

            case "storage/object-not-found":
                console.error("Storage Error: File doesn't exist");
                errorMessageRef.value = "The requested file does not exist.";
                break;

            case "storage/bucket-not-found":
                console.error("Storage Error: No bucket configured");
                errorMessageRef.value = "Storage bucket not configured.";
                break;

            case "storage/quota-exceeded":
                console.error("Storage Error: Quota exceeded");
                errorMessageRef.value = "Storage quota exceeded. Please contact support.";
                break;

            case "storage/invalid-checksum":
                console.error("Storage Error: File on the client does not match the checksum of the file received");
                errorMessageRef.value = "File upload failed due to data integrity check.";
                break;

            case "storage/retry-limit-exceeded":
                console.error("Storage Error: Maximum time limit on an operation exceeded");
                errorMessageRef.value = "Operation timed out. Please try again.";
                break;

            default:
                console.error("Firebase error: ", error.code, error.message);
                errorMessageRef.value = error.message;
        }
    } else {
        console.error("General Error", error.message);
        errorMessageRef.value = error.message;
    }
};