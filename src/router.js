import { createRouter, createWebHistory } from "vue-router";
import useAuthUser from "./auth";


const routes = [
  {
    name: "EmailConfirmation",
    path: "/email-confirmation",
    component: () => import("./components/EmailConfirmation.vue"),
  },
  {
    name: "Home",
    path: "/",
    component: () => import("./components/Login.vue"), // Initial route is Login
  },
    {
    name: "Me",
    path: "/Me",
    meta: {
      requiresAuth: true,
    },
    component: () => import("./components/MainLayout.vue"),
  },

/*    {
    name: "Login",
    path: "/Login",
    component: () => import("./components/Login.vue"),
  },  */
  {
    name: "ForgotPassword",
    path: "/forgotPassword",
    component: () => import("./components/ForgotPassword.vue"),
  },
  {
    name: "Logout",
    path: "/logout",
    beforeEnter: async () => {
      const { logout } = useAuthUser();
      await logout();
      return { name: "Home" };
    },
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, from, next) => {
  const { isLoggedIn } = useAuthUser();
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next({ name: "Home" });
  } else {
    next();
  }
});
export default router;