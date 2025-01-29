import { firebase } from "@nativescript/firebase-core";
import "@nativescript/firebase-auth"
import "@nativescript/firebase-firestore"
import { GoogleAuthProvider } from "@nativescript/firebase-auth";


const primaryApp = firebase().initializeApp()
const auth = firebase().auth()
const db = firebase().firestore()

// GoogleSignin.configure()
const googleProvider = GoogleAuthProvider


export {
    primaryApp,
    auth,
    db,
    googleProvider
}

