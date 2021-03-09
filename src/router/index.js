import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardLayout from "../components/DashboardLayout";
import LoginLayout from "../components/LoginLayout";
import Login from "../views/Login"
import Dashboard from "../views/Dashboard";
import Overview from "../views/Overview";
import store from "../store/index"

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: LoginLayout,
    children: [
      {
        path: "/",
        name: "Login",
        component: Login,
      }
    ]
  },
  {
    path: '',
    name: "DashboardLayout",
    component: DashboardLayout,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = store.getters.isAuthed
      if (to.name !== 'Login' && !isAuthenticated) {
        next({ name: 'Login' })
      } else {
        next()
      }
    },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/overview",
        name: "Overview",
        component: Overview,
      },

    ]
  },

]

const router = new VueRouter({
  mode: "history",
  routes
})

router.beforeEach()

export default router
