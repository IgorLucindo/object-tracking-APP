import firebase from "firebase";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBv6UMFaRaf-5ySZhFQKt4n1GDq3RTrLv8",
    authDomain: "logitrack-a3fc9.firebaseapp.com",
    projectId: "logitrack-a3fc9",
    storageBucket: "logitrack-a3fc9.appspot.com",
    messagingSenderId: "425218396916",
    appId: "1:425218396916:web:1d8b0498672fa80635c4a1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
export default database