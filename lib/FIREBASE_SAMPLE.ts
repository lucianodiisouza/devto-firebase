import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "XXXXXXXXXX",
  authDomain: "XXXXXXXXXX",
  projectId: "XXXXXXXXXX",
  storageBucket: "XXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXX",
  appId: "XXXXXXXXXX",
  measurementId: "XXXXXXXXXX",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();


/** Rename this file to firebase.ts
 *  paste your firebase config keys at firebaseConfig const
 */
