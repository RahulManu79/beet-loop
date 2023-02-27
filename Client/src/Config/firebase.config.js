// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAP0BrzIrvPtQYAMPxNwsTNuNhw4eX0TxY",
  authDomain: "project-beetloop.firebaseapp.com",
  projectId: "project-beetloop",
  storageBucket: "project-beetloop.appspot.com",
  messagingSenderId: "266202588029",
  appId: "1:266202588029:web:43a5a71f9f8b3a47cca214",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export const Auth = getAuth(app);
export { app, storage };
