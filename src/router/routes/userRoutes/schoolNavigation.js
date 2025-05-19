import CentreDeformationMiddleware from '@/middlewares/CentreDeformation';
import CentresDeformationView from '@/views/pagesForUse/CentresDeformationView.vue'

import FormateursView from '@/views/pagesForUse/FormateursView.vue'
import FormationsView from '@/views/pagesForUse/FormationsView.vue'
import EtudiantsView from '@/views/pagesForUse/EtudiantsView.vue'
import managementLayout from '@/layout/managementLayout.vue'

export default [
  {
    path: '/centresDeformation',
    name: 'Centres de formation',
    icon: 'arrow_circle_left',
    component: CentresDeformationView,
    meta: {
      requiresAuth: true, 
      requiresRoles: ["ROLE_USER"] ,
     }
  },
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