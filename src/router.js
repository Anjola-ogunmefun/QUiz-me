import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./components/pages/HomePage.vue";
import QuizPage from "./components/pages/QuizPage.vue";
import NotFound from "./components/pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage },
    { path: "/quiz", name:'quiz', component: QuizPage },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router