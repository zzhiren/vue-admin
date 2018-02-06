import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import Login from '@/components/Login'
import Home from '@/components/Home/Home'
import Blog from '@/components/Blog/Blog'
import BlogList from '@/components/Blog/BlogList'
import WriteBlog from '@/components/Blog//WriteBlog'
import User from '@/components/User//User'
import Project from '@/components/Project//Project'
import Tags from '@/components/Tags/Tags'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      // name: 'Login',
      redirect: '/login',
      // component: Login
    },
    {
      path: '/login',
      name: 'Login',
      // redirect: '/login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      redirect: '/home/blog',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'blog',
          name: 'blog',
          redirect: '/home/blog/bloglist',
          component: Blog,
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: 'bloglist',
              name: 'bloglist',
              component: BlogList,
              meta: {
                requiresAuth: true
              },
            },

          ]
        },
        {
          path: 'writeblog/:type',
          name: 'writeblog',
          component: WriteBlog,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: '/user',
          name: 'User',
          component: User,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: '/project',
          name: 'Project',
          component: Project,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: '/tags',
          name: 'Tags',
          component: Tags,
          meta: {
            requiresAuth: true
          },
        }
      ]
    },
    

  ]
});

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 获取store里面的token
  let token = store.state.token
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next();
  }
})

export default router;