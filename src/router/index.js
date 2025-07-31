import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../components/MainLayout.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/app',
    name: 'app',
    component: MainLayout,
    children: [
      {
        path: 'decks',
        name: 'decks',
        component: () => import('../views/DecksManage.vue')
      },
      {
        path: 'cards',
        name: 'cards',
        component: () => import('../views/CardsBrowse.vue')
      },
      {
        path: 'notes',
        name: 'notes',
        component: () => import('../views/NotesManage.vue')
      },
      {
        path: 'tags',
        name: 'tags',
        component: () => import('../views/TagsManage.vue')
      },
      {
        path: 'import-export',
        name: 'import-export',
        component: () => import('../views/ImportExport.vue')
      },
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('../views/Statistics.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 