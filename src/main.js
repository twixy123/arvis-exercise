import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//импорт scss файлов
import "./assets/styles/main.scss";

// импорт ui библиотеки
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/ru-RU";

//подключение ui библиотеки
Vue.use(ElementUI, { locale });

//импорт кастомных доп. файлов
import api_links from "./static/api_links";

//подключение кастомных доп. файлов
Vue.prototype.$api = api_links;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
