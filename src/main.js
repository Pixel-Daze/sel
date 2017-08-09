import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'



FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el:'#app-box',
  router,
  render: h => h(App)
})
