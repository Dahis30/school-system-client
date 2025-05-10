import CentreDeformationMiddleware from '@/middlewares/CentreDeformation';
import FormateursView from '@/views/pagesForUse/FormateursView.vue'
import FormationsView from '@/views/pagesForUse/FormationsView.vue'
import EtudiantsView from '@/views/pagesForUse/EtudiantsView.vue'
import managementLayout from '@/layout/managementLayout.vue'

export default [
  {
    path: '/formateurs',
    name: 'Formateurs',
    icon: 'groups_2',
    component: FormateursView,
    meta: {
      layout : managementLayout ,
      requiresAuth: true, 
      requiresRoles: ["ROLE_USER"] ,
      middleware: CentreDeformationMiddleware
     }
  },
  {
    path: '/formations',
    name: 'Formations',
    icon: 'auto_stories',
    component: FormationsView,
    meta: {
      layout : managementLayout ,
      requiresAuth: true, 
      requiresRoles: ["ROLE_USER"] ,
      middleware: CentreDeformationMiddleware
     }
  },
  {
    path: '/etudiants',
    name: 'Étudiants',
    icon: 'school',
    component: EtudiantsView,
    meta: {
      layout : managementLayout ,
      requiresAuth: true, 
      requiresRoles: ["ROLE_USER"] ,
      middleware: CentreDeformationMiddleware
    }
  }
];