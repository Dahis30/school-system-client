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
    meta: {
      layout : managementLayout ,
      requiresAuth: true, 
      requiresRoles: ["ROLE_USER"] ,
     }
  },
  {
    path: '/etudiants',
    name: 'Étudiants',
    icon: 'groups',
    component: EtudiantsView,
    meta: {
      layout : managementLayout ,
      requiresAuth: true, 
      requiresRoles: ["ROLE_USER"] ,
    }
  }
];