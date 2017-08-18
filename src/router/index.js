import Vue from 'vue'
import Router from 'vue-router'
import {routerMode} from '../config/env'
Vue.use(Router)

const AppBase = resolve => require(['../components/AppBase'],resolve)
const Login = resolve => require(['../components/AppBase/Login'],resolve)

const Assessment = resolve => require(['../components/Assessment'],resolve)
const AssFreeDetail = resolve => require(['../components/Assessment/AssFreeDetail'],resolve)
const AssPriceDetail = resolve => require(['../components/Assessment/AssPriceDetail'],resolve)
const AssQueDetail = resolve => require(['../components/Assessment/AssQueDetail'],resolve)

const Course = resolve => require(['../components/Course'],resolve)

const Mine = resolve => require(['../components/Mine'],resolve)

var routerMaps = [
  {name:'AppBase',path:'/appbase',component:AppBase,children:[
      {name:'Assessment',path:'assessment',component:Assessment},
      {name:'Course',path:'course',component:Course},
      {name:'Mine',path:'mine',component:Mine}
  ]},
  {name:'AssFreeDetail',path:'/assFreeDetail',component:AssFreeDetail},
  {name:'AssPriceDetail',path:'/assPriceDetail',component:AssPriceDetail},
  {name:'AssQueDetail',path:'/assQueDetail',component:AssQueDetail},
  {name:'Login',path:'/login',component:Login},
	{path: '*', redirect: '/appbase/assessment'}
]

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    if(from.meta.keepAlive){
    	from.meta.savedPosition = document.body.scrollTop
    }
    return { x: 0, y: to.meta.savedPosition ||0}
  }
}

const router = new Router({
	mode:routerMode,
	scrollBehavior,
	routes:routerMaps
})

export default router