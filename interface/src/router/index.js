import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login/Login.vue'
import Checkout from '@/views/Checkout/Checkout.vue'
import Result from '@/views/Result/Result.vue'

import Customer from '@/views/Customer/Customer.vue'
import Order from '@/views/Customer/Order.vue'
import Bill from '@/views/Customer/Bill.vue'
import CustomerCenter from '@/views/Customer/Center_c.vue'

import Boss from '@/views/Boss/Boss.vue'
import BossBills from '@/views/Boss/Bills_b.vue'
import Staff from '@/views/Boss/Staff.vue'
import BossWarehouse from '@/views/Boss/Warehouse_b.vue'
import BossSupplier from '@/views/Boss/Supplier_b.vue'
import MenuSetting from '@/views/Boss/MenuSetting.vue'
import BossCenter from '@/views/Boss/Center_b.vue'

import Employee from '@/views/Employee/Employee.vue'
import EmployeeBills from '@/views/Employee/Bills_e.vue'
import EmployeeWarehouse from '@/views/Employee/Warehouse_e.vue'
import EmployeeSupplier from '@/views/Employee/Supplier_e.vue'
import EmployeeCenter from '@/views/Employee/Center_e.vue'

import NotFound from '@/views/NotFound/NotFound.vue'

import bpathArr from '@/router/bpathArr.js'
import cpathArr from '@/router/cpathArr.js'
import epathArr from '@/router/epathArr.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer,
    redirect: '/customer/order',
    children: [
      { path: 'order', name: 'order', component: Order },
      { path: 'bill', name: 'bill', component: Bill },
      { path: 'center', name: 'center_c', component: CustomerCenter }
    ]
  },
  {
    path: '/boss',
    name: 'boss',
    component: Boss,
    redirect: '/boss/bills',
    children: [
      { path: 'bills', name: 'b_bills', component: BossBills },
      { path: 'staff', name: 'staff', component: Staff },
      { path: 'warehouse', name: 'warehouse_b', component: BossWarehouse },
      { path: 'supplier', name: 'supplier_b', component: BossSupplier },
      { path: 'menusetting', name: 'menusetting', component: MenuSetting },
      { path: 'center', name: 'center_b', component: BossCenter }
    ]
  },
  {
    path: '/employee',
    name: 'employee',
    component: Employee,
    redirect: '/employee/bills',
    children: [
      { path: 'bills', name: 'e_bills', component: EmployeeBills },
      { path: 'warehouse', name: 'warehouse_e', component: EmployeeWarehouse },
      { path: 'supplier', name: 'supplier_e', component: EmployeeSupplier },
      { path: 'center', name: 'center_e', component: EmployeeCenter }
    ]
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: NotFound
  },
  {
    path: '/result',
    name: 'result',
    component: Result
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  var token = JSON.parse(window.localStorage.getItem('token'))
  if (to.path === '/login' || to.path === '/' || to.path === '/notfound') {
    next()
  } else if (token) {
    if (cpathArr.indexOf(to.path) !== -1 && token.type === 1) {
      next()
    } else if (epathArr.indexOf(to.path) !== -1 && token.type === 2) {
      next()
    } else if (bpathArr.indexOf(to.path) !== -1 && token.type === 3) {
      next()
    } else {
      next('/notfound')
    }
  } else {
    // next('/login')
    next()
  }
})

export default router
