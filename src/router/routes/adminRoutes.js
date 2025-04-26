// import Home from "@/views/Home.vue";
// import About from "@/views/About.vue";
// import NotFound from "@/views/NotFound.vue";
// import FormationsView from '@/views/pagesForUse/FormationsView.vue'
import DemandeInscriptionView from '@/views/pagesForAdmin/DemandeInscriptionView.vue'
import GestionUtilisateuresView from '@/views/pagesForAdmin/GestionUtilisateuresView.vue'
import adminLayout from '@/layout/adminLayout.vue'

export default [
//   {
//     path: '/formations',
//     name: 'Formations',
//     icon: 'auto_stories',
//     component: FormationsView,
//     meta: {
//       layout : adminLayout ,
//       requiresAuth: true, 
//       requiresRoles: ["ROLE_ADMIN"] ,
//      }
//   },
  {
    path: '/demandesInscription',
    name: "Les demandes d'inscription",
    icon: 'group_add',
    component: DemandeInscriptionView,
    meta: {
      layout : adminLayout ,
      requiresAuth: true, 
      requiresRoles: ["ROLE_ADMIN"] ,
    }
  },
  {
    path: '/gestionUtilisateuresView',
    name: "La gestion des utilisateurs",
    icon: 'groups',
    component: GestionUtilisateuresView,
    meta: {
      layout : adminLayout ,
      requiresAuth: true, 
      requiresRoles: ["ROLE_ADMIN"] ,
    }
  }
];