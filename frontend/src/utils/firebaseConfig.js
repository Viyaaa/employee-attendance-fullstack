import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBfW__iU720BQyWdeWF_uetAVxqIT53Heg",
    authDomain: "fullstack-8e555.firebaseapp.com",
    projectId: "fullstack-8e555",
    storageBucket: "fullstack-8e555.appspot.com",
    messagingSenderId: "209842074323",
    appId: "1:209842074323:web:b0cdb14f5b5dd0628d9a26",
    measurementId: "G-74X08L2FEY"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;