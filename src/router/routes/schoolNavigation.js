// import Home from "@/views/Home.vue";
// import About from "@/views/About.vue";
// import NotFound from "@/views/NotFound.vue";
import FormationsView from '@/views/pagesForUse/FormationsView.vue'
import EtudiantsView from '@/views/pagesForUse/EtudiantsView.vue'
import managementLayout from '@/layout/managementLayout.vue'

export default [
  {
    path: '/formations',
    name: 'Formations',
    icon: 'auto_stories',
    component: FormationsView,
    requirmentsForAccesToTheRoute: { requiresAuth: true, requiresRole: "admin" },
    meta: {layout : managementLayout}
  },
  {
    path: '/etudiants',
    name: 'Etudiants',
    icon: 'groups',
    component: EtudiantsView,
    requirmentsForAccesToTheRoute: { requiresAuth: true, requiresRole: "admin" } ,
    meta: {layout : managementLayout}
  }
];