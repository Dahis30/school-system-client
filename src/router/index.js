import Vue from 'vue'
import VueRouter from 'vue-router'
import schoolNavigation from './routes/schoolNavigation.js'
import authRoutes from './routes/authRoutes.js'

Vue.use(VueRouter)

const routes = [
  ...schoolNavigation ,
  ...authRoutes ,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from , next) => {
  // Cette condition sert uniquement à gérer les pages auxquelles l'utilisateur peut accéder en fonction de son rôle.
  if (to?.meta?.requiresRoles) {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    // console.log('currentUser : ' +currentUser )
    let currentRolesOfUser = currentUser?.roles
    // console.log('currentRolesOfUser : ' +currentRolesOfUser )
    let requiredRoles = to.meta.requiresRoles ;
    // console.log('requiredRoles : ' + requiredRoles)
    if (requiredRoles.includes(currentRolesOfUser?.[0])) {
      next();
    } else {
      console.error("Vous n'avez pas accès à cette page.")
    }
  }else{
    next();
  }
  
});


export default router
