import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'
import Welcome from '@/views/Welcome.vue'
import ArticleList from '@/views/ArticleList.vue'
import ArticlePublish from '@/views/ArticlePublish.vue'
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
      },
      {
        name: 'ArticlePublish',
        path: 'articlePublish',
        component: ArticlePublish
      }
    ]
  }
]
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // ...
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('tiaotiao_backend_token')
    if (token) {
      next()
    } else {
      next({ name: 'Login' })
    }
  }
})
export default router
