import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex'
import { resetfilter, setcurrent } from '../vuex/actions'
import Index from '@/view/Index'
import List from '@/view/List'
import Role from '@/view/system/Role'
import User from '@/view/system/User'
import Part from '@/view/system/Part'
import Supplier from '@/view/system/Supplier'
import Menu from '@/view/system/Menu'
import Stock from '@/view/system/Stock'
import Category from '@/view/system/Category'
import Member from '@/view/system/Member'
import Tennet from '@/view/system/Tennet'
import Login from '@/view/Login'
import Home from '@/view/Home'
Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: '',
      redirect: '/role',
      children: [
        {
          path: '/role',
          name: 'Role',
          component: Role
        },
        {
          path: '/menu',
          name: 'Menu',
          component: Menu
        },
        {
          path: '/part',
          name: 'Part',
          component: Part
        },
        {
          path: '/supplier',
          name: 'Supplier',
          component: Supplier
        },
        {
          path: '/category',
          name: 'Category',
          component: Category
        },
        {
          path: '/stock',
          name: 'Stock',
          component: Stock
        },
        {
          path: '/tennet',
          name: 'Tennet',
          component: Tennet
        },
        {
          path: '/member',
          name: 'Member',
          component: Member
        },
        {
          path: '/user',
          name: 'User',
          component: User
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/list/:id',
      name: 'List',
      component: List
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '*',
      redirect: '/role'
    }
  ]
})
router.beforeEach((to, from, next) => {
  let name = to.name.toLowerCase()
  setcurrent(store, name)
  resetfilter(store, name)
  next()
})
export default router
