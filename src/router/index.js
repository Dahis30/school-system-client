import Vue from 'vue'
import VueRouter from 'vue-router'
import schoolNavigation from './routes/schoolNavigation.js'

Vue.use(VueRouter)

const routes = [
  ...schoolNavigation ,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
