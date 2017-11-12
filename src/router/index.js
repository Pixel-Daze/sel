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
const AssResult =  resolve => require(['../components/Assessment/AssResult'],resolve)
const AssReport = resolve => require(['../components/Assessment/AssReport'],resolve)
const AssChild = resolve => require(['../components/Assessment/AssChild'],resolve)

const Course = resolve => require(['../components/Course'],resolve)
const CourseFree = resolve => require(['../components/Course/CourseFree'],resolve)
const CoursePrice = resolve => require(['../components/Course/CoursePrice'],resolve)

const Mine = resolve => require(['../components/Mine'],resolve)
const MineBaby = resolve => require(['../components/Mine/MineBaby'],resolve)
const MineAss = resolve => require(['../components/Mine/MineAss'],resolve)
const MineCourse = resolve => require(['../components/Mine/MineCourse'],resolve)
const BabyList = resolve => require(['../components/Mine/BabyList'],resolve)
const MineInfo = resolve => require(['../components/Mine/MineInfo'],resolve)

var routerMaps = [
  {name:'AppBase',path:'/appbase',component:AppBase,children:[
      {name:'Assessment',path:'assessment',component:Assessment,meta:{title:'测评'}},
      {name:'Course',path:'course',component:Course},
      {name:'Mine',path:'mine',component:Mine}
  ]},
  {name:'AssFreeDetail',path:'/assFreeDetail',component:AssFreeDetail},
  {name:'AssPriceDetail',path:'/assPriceDetail',component:AssPriceDetail},
  {name:'AssQueDetail',path:'/assQueDetail',component:AssQueDetail},
  {name:'AssResult',path:'/assResult',component:AssResult},
  {name:'AssReport',path:'/assReport',component:AssReport},
  {name:'AssChild',path:'/assChild',component:AssChild},
  {name:'CourseFree',path:'/courseFree',component:CourseFree},
  {name:'CoursePrice',path:'/coursePrice',component:CoursePrice},
  {name:'MineBaby',path:'/mineBaby',component:MineBaby},
  {name:'MineAss',path:'/mineAss',component:MineAss},
  {name:'MineCourse',path:'/mineCourse',component:MineCourse},
  {name:'BabyList',path:'/babyList',component:BabyList},
  {name:'MineInfo',path:'/mineInfo',component:MineInfo},
  {name:'Login',path:'/login',component:Login},
	{path: '*', redirect: '/appbase/assessment',component:Assessment}
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
	// scrollBehavior,
	routes:routerMaps
})

export default router