// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBCtVKY8kPBNIkqL6jy2yQU_8PqreE8soU',
    authDomain: 'quickstart-1550568083201.firebaseapp.com',
    projectId: 'quickstart-1550568083201',
    storageBucket: 'quickstart-1550568083201.appspot.com',
    messagingSenderId: '267970678541',
    appId: '1:267970678541:web:7bd49b495d9a6875266a44',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
