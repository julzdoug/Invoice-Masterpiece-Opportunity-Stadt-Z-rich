import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import useAuthUser from "./auth"; 


createApp(App).use(router).mount("#app");


