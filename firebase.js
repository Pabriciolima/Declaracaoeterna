import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  serverTimestamp,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBleifyVN_xAJqJeRkLWgb2fe2TL_c07dM",
  authDomain: "ivy-mural.firebaseapp.com",
  databaseURL: "https://ivy-mural-default-rtdb.firebaseio.com",
  projectId: "ivy-mural",
  storageBucket: "ivy-mural.firebasestorage.app",
  messagingSenderId: "1016315335181",
  appId: "1:1016315335181:web:4c800884e35d0fa7ed7b44",
  measurementId: "G-B327H5FDP9"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, onValue, serverTimestamp, update, remove };