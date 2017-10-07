/* vue自定义插件方法 */
import moment from 'moment'
export default {
	install(Vue){

		/* 全局返回上一步 */
		Vue.prototype.back = () => {
			this.$router?this.$router.back():window.history.back()
		}

        /*格式化日期*/
        Vue.prototype.formatDate = (date) => {
            if(date){
                return moment(date).format('YYYY-MM-DD')
            }
        }

        Vue.filter('time_con',(value)=>{
            if(value){
                return moment(value.substring(0,8)).format('YYYY-MM-DD')+' '+value.substr(8,2)+':'+value.substr(10,2)+':'+value.substr(12,2)
            }
        })

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

        //配置微信jssdk
        Vue.prototype.configWxjssdk = () =>{
            let arr = getCookie('wxconfig').split('|')
            let wx_info = {
                appid:arr[0],
                timestamp:arr[1],
                nonce:arr[2],
                signature:arr[3]
            }
            configWxSdk(wx_info)

            function getCookie(name){
                var value = "; " + document.cookie;
                var parts = value.split("; " + name + "=");
                if (parts.length == 2) return parts.pop().split(";").shift();
            }

            function configWxSdk(wxConfig){
                wx.config({
                    debug: false,
                    appId: wxConfig.appid,
                    timestamp: parseInt(wxConfig.timestamp),
                    nonceStr: wxConfig.nonce,
                    signature: wxConfig.signature,
                    jsApiList: [
                        'getLocation',
                        'openLocation',
                        'chooseImage',
                        'scanQRCode',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'hideMenuItems',
                        'previewImage',
                        'uploadImage',
                        'chooseWXPay'
                    ]
                });
            }
        }
	}
}