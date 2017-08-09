import Vue from 'vue'
import Router from 'vue-router'
// import {routerMode} from '../config/env'
Vue.use(Router)

const AppBase = resolve => require(['../components/AppBase'],resolve)
const Assessment = resolve => require(['../components/Assessment'],resolve)

var routerMaps = [
  {name:'AppBase',path:'/appbase',component:AppBase,children:[
      {name:'Assessment',path:'assessment',component:Assessment}
  ]},
  
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
	// mode:routerMode,
	// scrollBehavior,
	routes:routerMaps
})

export default router