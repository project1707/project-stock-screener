import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDZo5DQc6YqY0IVbrmR_9TNlr199iL-UY",
  authDomain: "stock-screener-a6e11.firebaseapp.com",
  projectId: "stock-screener-a6e11",
  storageBucket: "stock-screener-a6e11.appspot.com",
  messagingSenderId: "419102254226",
  appId: "1:419102254226:web:ea7175dcd037843d1eb24b",
  measurementId: "G-34BQMJRGHH",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { storage };
