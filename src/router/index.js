import Vue from 'vue'
import VueRouter from 'vue-router'
import schoolNavigation from './routes/userRoutes/schoolNavigation.js'
import centresDeformation from './routes/userRoutes/centresDeformation.js'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

Vue.use(VueRouter)

const routes = [
  ...schoolNavigation ,
  ...centresDeformation ,
  ...authRoutes ,
  ...adminRoutes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from , next) => {

  if (to.meta.middleware) {
    to.meta.middleware(to, from, next);
  }
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
      next('/login');
    }
  }else{
    next();
  }
  
});


export default router
