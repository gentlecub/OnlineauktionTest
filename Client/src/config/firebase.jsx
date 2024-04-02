import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlbgQpyAnLMH4mouC-oAeKJa4eHe2B-Ow",
  authDomain: "onlineauktion-deeda.firebaseapp.com",
  projectId: "onlineauktion-deeda",
  storageBucket: "onlineauktion-deeda.appspot.com",
  messagingSenderId: "503950263254",
  appId: "1:503950263254:web:cfe50166e141a4cec29a77",
};
export const app = initializeApp(firebaseConfig);
const storage = getStorage();
export const storageRef = ref(storage);
