import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home/Home'
import Blog from '@/components/Blog/Blog'
import BlogList from '@/components/Blog/BlogList/BlogList'

Vue.use(Router)

export default new Router({
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
            }
          ]
        }
      ]
    }
  ]
})
