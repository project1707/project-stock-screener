import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import globalComponents from "./components/";

const app = createApp(App);

app.use(globalComponents);
app.use(createPinia());
app.use(router);

app.mount("#app");
