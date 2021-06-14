import { createApp } from "vue";

import App from "./App.vue";
import router from "./router.js"

import BaseButton from "./components/BaseComponents/BaseButton.vue";
import UndrawFooter from './components/BaseComponents/UndrawFooter.vue'
import UndrawHeader from './components/BaseComponents/UndrawHeader'
import BaseSpinner from './components/BaseComponents/BaseSpinner.vue'
import BaseDialog from './components/BaseComponents/BaseDialog.vue'

const app = createApp(App);

app.use(router);

app.component("base-button", BaseButton);
app.component('undraw-footer', UndrawFooter)
app.component('undraw-header', UndrawHeader)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)

app.mount("#app");
