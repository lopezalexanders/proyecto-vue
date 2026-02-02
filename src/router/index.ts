import { useAuth } from '@/composables/useAuth'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import PerfilView from '@/views/dashboard/PerfilView.vue'
import TaskRegisterView from '@/views/dashboard/TaskRegisterView.vue'
import TaskEditView from '@/views/dashboard/TaskeditView.vue'
import TaskView from '@/views/dashboard/TaskView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/auth',
    name: 'auth',
    meta: { requiresAuth: false },
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginView,
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView,
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { requiresAuth: true },
    component: DashboardLayout,
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: PerfilView,
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: TaskView,
      },
      {
        path: 'tasks/new',
        name: 'taskregister',
        component: TaskRegisterView,
      },
      {
        path: 'tasks/edit/:id',
        name: 'taskedit',
        component: TaskEditView,
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Guard
router.beforeEach((to, from, next) => {
  const { isAuthentucated } = useAuth()

  if (to.meta.requiresAuth && !isAuthentucated.value) {
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'register') && isAuthentucated.value) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
