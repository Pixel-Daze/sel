import Vue from 'vue'
import router from './router'
import App from './App'

/* fastclick */ 
import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el:'#app-box',
  router,
  render: h => h(App)
})
