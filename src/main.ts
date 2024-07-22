import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import globalComponents from "./components/";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDT5N9DVrFO46QreEHIPm-lo2QgjUv2shs",
  authDomain: "ctock-screener.firebaseapp.com",
  projectId: "ctock-screener",
  storageBucket: "ctock-screener.appspot.com",
  messagingSenderId: "951222211466",
  appId: "1:951222211466:web:8b13aa7ce620f58f0d6e73",
  measurementId: "G-MWH8R6ZZ7X",
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const app = createApp(App);

app.use(globalComponents);
app.use(createPinia());
app.use(router);

app.mount("#app");
