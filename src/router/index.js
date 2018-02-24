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
        requiresAuth: true,
        name:"首页"
      },
      children: [
        {
          path: 'blog',
          name: 'blog',
          redirect: '/home/blog/bloglist',
          component: Blog,
          meta: {
            requiresAuth: true,
            name:"博客管理"
          },
          children: [
            {
              path: 'bloglist',
              name: 'bloglist',
              component: BlogList,
              meta: {
                requiresAuth: true,
                name:"博客管理"
              },
            },
          ]
        },
        {
          path: 'writeblog/:type',
          name: 'writeblog',
          component: WriteBlog,
          meta: {
            requiresAuth: true,
            name: '创建博客'
          },
        },
        {
          path: 'user',
          name: 'User',
          component: User,
          meta: {
            requiresAuth: true,
            name:"用户管理"
          },
        },
        {
          path: 'project',
          name: 'Project',
          component: Project,
          meta: {
            requiresAuth: true,
            name:"项目管理"
          },
        },
        {
          path: 'tags',
          name: 'Tags',
          component: Tags,
          meta: {
            requiresAuth: true,
            name:"标签管理"
          },
        }
      ]
    },


  ]
});

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 获取store里面的token
  let routeList = []
  let token = store.state.token
  if (to.meta.requiresAuth) {
    if (token) {
      let index = routeList.indexOf(to.name)
      if (index !== -1) {
        //如果存在路由列表，则把之后的路由都删掉
        routeList.splice(index + 1, routeList.length - index - 1)
      } else {
        let params = {};
        params.route_link = to.name;
        params.name = to.meta.name;
        routeList.push(params)
      }
      to.meta.routeList = routeList
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
});

// router.beforeEach((to, from, next) => {
//   next(vm => {
//     vm.routeList = to.meta.routeList;
//     console.log(vm.routeList);
//   });
// })

export default router;