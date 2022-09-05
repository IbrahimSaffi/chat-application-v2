
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaUy42yhKLLWi--tLU7TPQepVQthRrBOI",
  authDomain: "chat-app-a90bc.firebaseapp.com",
  databaseURL: "https://chat-app-a90bc-default-rtdb.firebaseio.com",
  projectId: "chat-app-a90bc",
  storageBucket: "chat-app-a90bc.appspot.com",
  messagingSenderId: "157305139598",
  appId: "1:157305139598:web:6d105855923ab2626774df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app);
const auth = getAuth(app);
export {auth,database}