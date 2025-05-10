
import CentresDeformationView from '@/views/pagesForUse/CentresDeformationView.vue'

export default [
  {
    path: '/CentresDeformation',
    name: 'Centres de formation',
    icon: 'groups_2',
    component: CentresDeformationView,
    meta: {
      requiresAuth: true, 
      requiresRoles: ["ROLE_USER"] ,
    }
  },
];