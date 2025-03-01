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

export default router
