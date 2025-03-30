// import Home from "@/views/Home.vue";
// import About from "@/views/About.vue";
// import NotFound from "@/views/NotFound.vue";
import FormationsView from '@/views/pagesForUse/FormationsView.vue'
import managementLayout from '@/layout/managementLayout.vue'

export default [
  {
    path: '/',
    name: 'Formations',
    component: FormationsView,
    requirmentsForAccesToTheRoute: { requiresAuth: true, requiresRole: "admin" },
    meta: {layout : managementLayout}
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/pagesForUse/AboutView.vue'),
    requirmentsForAccesToTheRoute: { requiresAuth: true, requiresRole: "admin" } ,
    meta: {layout : managementLayout}
  }
];