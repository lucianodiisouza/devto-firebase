import { getFirestore } from "firebase/firestore";
import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "XXXXXXXXXX",
  authDomain: "XXXXXXXXXX",
  projectId: "XXXXXXXXXX",
  storageBucket: "XXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXX",
  appId: "XXXXXXXXXX",
  measurementId: "XXXXXXXXXX",
};

const firebase = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);
export const storage = getStorage(firebase);

/** Rename this file to firebase.ts
 *  paste your firebase config keys at firebaseConfig const
 */
