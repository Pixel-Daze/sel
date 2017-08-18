/* vue自定义插件方法 */
export default {
	install(Vue){

		/* 全局返回上一步 */
		Vue.prototype.back = () => {
			this.$router?this.$router.back():window.history.back()
		}

		/* 存储本地信息
		   格式：{"app":{"selected":"appIndex"}}
		   规则：如果没有则创建，有就更新 */
		Vue.prototype.setMsg=(url,name,msg)=>{
            if(sessionStorage.getItem(url) !== null){
                let Msg = JSON.parse(sessionStorage.getItem(url))
                Msg[name] = msg
                sessionStorage.setItem(url,JSON.stringify(Msg))
            }else{
                let Msg = {}
                Msg[name] = msg
                sessionStorage.setItem(url,JSON.stringify(Msg))
            }
        }

        /* 获取本地信息，返回结构为对象 */
        Vue.prototype.getMsg=(url,name)=>{
            if(sessionStorage.getItem(url) !== null){
                let Msg = JSON.parse(sessionStorage.getItem(url))
                return Msg[name]
            }else{
                return null;
            }
        }

        /* 获取cookie */
        Vue.prototype.getCookie=(name) =>{
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }
	}
}