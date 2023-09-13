import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBCmUz380u5cK6M79l3GZoXQ39K40LW9ww",
    authDomain: "mini-next-app.firebaseapp.com",
    projectId: "mini-next-app",
    storageBucket: "mini-next-app.appspot.com",
    messagingSenderId: "1002285058339",
    appId: "1:1002285058339:web:a12640331649a8733ce496",
    measurementId: "G-941DRF3STD"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
