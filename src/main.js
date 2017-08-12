import Vue from 'vue'
import router from './router'
import App from './App'

/* fastclick */ 
import FastClick from 'fastclick'
FastClick.attach(document.body)

/* flexible.js */
import '../static/lib/js/flexible_css.js'

/* iconfont */
import '../static/lib/iconfont/iconfont.css'

/* basic style */
import '../static/lib/css/basic.scss'

/* ExtendPlugin */
import ExtendPlugin from './plugins/vue.ext.js'
Vue.use(ExtendPlugin)

/* lodashPlugin */
import _ from './plugins/lodash'
Vue.use(_)

/* store */
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el:'#app-box',
  router,
  store,
  render: h => h(App)
})
