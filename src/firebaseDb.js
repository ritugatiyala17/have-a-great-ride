import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCwWN1plF_Gv5XYKgoW0_sOmOcAqRaPnQ8",
  authDomain: "hire-a-bike.firebaseapp.com",
  projectId: "hire-a-bike",
  storageBucket: "hire-a-bike.appspot.com",
  messagingSenderId: "665664057939",
  appId: "1:665664057939:web:6508a0f46f740380a08ca6",
  measurementId: "G-2CXXND0MPS",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
