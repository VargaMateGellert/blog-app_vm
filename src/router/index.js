import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import PostView from '../views/PostView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/category/:id', name: 'Category', component: CategoryView },
  { path: '/post/:id', name: 'Post', component: PostView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/admin', name: 'Admin', component: AdminView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
