import { getFirestore } from "firebase/firestore";
import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebase = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);
export const storage = getStorage(firebase);
