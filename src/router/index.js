import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home/Home'
import Blog from '@/components/Blog/Blog'
import BlogList from '@/components/Blog/BlogList/BlogList'
import WriteBlog from '@/components/Blog/WriteBlog/WriteBlog'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      redirect: '/home/blog',
      component: Home,
      children:[
        {
          path:'blog',
          name:'blog',
          redirect: '/home/blog/bloglist',
          component:Blog,
          children:[
            {
              path: 'bloglist',
              name:'bloglist',
              component:BlogList
            },
            {
              path: 'writeblog',
              name:'writeblog',
              component:WriteBlog
            }
          ]
        }
      ]
    }
  ]
})
