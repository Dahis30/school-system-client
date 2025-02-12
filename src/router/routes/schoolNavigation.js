// import Home from "@/views/Home.vue";
// import About from "@/views/About.vue";
// import NotFound from "@/views/NotFound.vue";
import HomeView from '@/views/HomeView.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    requirmentsForAccesToTheRoute: { requiresAuth: true, requiresRole: "admin" }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
    requirmentsForAccesToTheRoute: { requiresAuth: true, requiresRole: "admin" }
  }
];