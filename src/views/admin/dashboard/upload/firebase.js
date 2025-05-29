import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCoPU9sKjJdzCWJugimuJNtMqWkqjiBy6k",
  authDomain: "enpara-b49c0.firebaseapp.com",
  projectId: "enpara-b49c0",
  storageBucket: "enpara-b49c0.appspot.com",
  messagingSenderId: "161387880442",
  appId: "1:161387880442:web:e39d0629e776e432754e43",
  measurementId: "G-6XFVZN0PCB",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

