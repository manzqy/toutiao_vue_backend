import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'
import Welcome from '@/views/Welcome.vue'
import ArticleList from '@/views/ArticleList.vue'
Vue.use(VueRouter)

const routes = [
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Index',
    path: '/index',
    component: Index,
    redirect: { name: 'Welcome' },
    children: [
      {
        name: 'Welcome',
        path: 'welcome',
        component: Welcome
      },
      {
        name: 'ArticleList',
        path: 'articleList',
        component: ArticleList
      }
    ]
  }
]
const router = new VueRouter({
  routes
})
export default router
