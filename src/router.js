import { createRouter, createWebHistory } from 'vue-router';
import useAuthUser from './auth';
import MyInvoice from '../src/components/MyInvoice.vue';
import editInvoice from '../src/components/editInvoice.vue';
import Home from '../src/components/Login.vue';
import Me from '../src/components/MainLayout.vue';
import Email from '../src/components/EmailConfirmation.vue';
import Invoice from '../src/components/Invoices.vue';
import NewInvoice from '../src/components/NewInvoice.vue';
import Password from '../src/components/ForgotPassword.vue';


const routes = [

  {
    name: 'Home',
    path: '/',
    component: Home , // Initial route is Login
  },
    {
    name: 'Me',
    path: '/Me',
    meta: {
      requiresAuth: true,
    },
    component: Me ,
  },
 {
    path: '/MyInvoice',
    name: 'MyInvoice',
    component: MyInvoice,
    props: true,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'edit-invoice/:invoiceNumber',
        name: 'editInvoice',
        props: true,
        meta: { requiresAuth: true },
        component: editInvoice,
      }
    ]
  },
  // Route for the Invoices component
  {
    path: '/invoices/:invoiceNumber',
    name: 'Invoices',
    props: true,
    meta: { requiresAuth: true },
    component: Invoice,
  },

  // Route for the NewInvoice component
  {
    path: '/new-invoice',
    name: 'NewInvoice',
    meta: { requiresAuth: true },
    component: NewInvoice,
  },
    {
    name: 'EmailConfirmation',
    path: '/email-confirmation',
    component: Email,
  },
  {
    name: 'ForgotPassword',
    path: '/forgotPassword',
    component: Password,
  },
  {
    name: 'Logout',
    path: '/logout',
    beforeEnter: async () => {
      const { logout } = useAuthUser();
      await logout();
      return { name: 'Home' };
    },
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const authUser = useAuthUser(router);

router.beforeEach(async (to, from, next) => {
  const { isLoggedIn } = useAuthUser();
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next({ name: 'Home' });
  } else {
    next();
  }
});
export default router;