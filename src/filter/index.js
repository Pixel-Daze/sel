// 全局应用过滤器
import moment from 'moment'

module.exports.install = function(Vue,options){
	Vue.filter('time_con',(value)=>{
		if(value){
			return moment(value).format('YYYY-MM-DD HH:mm:ss')
		}
	})
}