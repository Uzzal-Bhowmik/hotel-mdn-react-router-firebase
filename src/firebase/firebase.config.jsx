// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDY5M2ARolKcza8fi9u5qsTYUgA-ETNV0o",
    authDomain: "hotel-mdn-react.firebaseapp.com",
    projectId: "hotel-mdn-react",
    storageBucket: "hotel-mdn-react.appspot.com",
    messagingSenderId: "1009131081800",
    appId: "1:1009131081800:web:3b2f88d2f1210799acc87d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;