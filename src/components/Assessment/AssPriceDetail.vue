<!-- 收费测评详情 -->
<template>
	<div class="ass-price-detail p-container">
		<ass-info :info="assInfo" class="p-com-wrapper" v-if="endLoad"></ass-info>
		<div class="price-wrap">
			<span class="price vux-1px-t">23元</span>
			<span class="ass-btn" @click="OpenTest">立即购买</span>
		</div>
	</div>
</template>
<script>
	import {XHeader} from 'vux'
	import {AssInfo} from './assComponent'
	import * as api from '../../api/assessmentApi'
	import * as mineApi from '../../api/mineApi'
	import * as courseApi from '../../api/courseApi'
	export default {
		name:'assPriceDetail',
		data(){
			return {
				assInfo:{},
				endLoad:false
			}
		},
		components:{
			XHeader,AssInfo
		},
		methods:{
			loadInfo(){
				let vm = this,body = {evaluation_id:vm.$route.query.evaluation_id}
				api.getAssById(body).then(resp=>{
					if(resp.data.res=='0'){
						vm.assInfo = resp.data.data
						document.title = vm.assInfo.name
					}
					vm.endLoad = true
				})
			},
			OpenTest(){
				let vm = this,body = ''
				if(vm.getMsg('base','userInfo')!=null){
					body = {
						user_id:vm.getMsg('base','userInfo').user_id
					}
					mineApi.qrychild(body).then(resp=>{
						if(resp.data.res == 0){
							if(resp.data.data!=null){
								let body = {
									evaluation_id:vm.assInfo.evaluation_id,
									user_id:vm.getMsg('base','userInfo').user_id,
									child_id:resp.data.data[0].child_id,
									index:0
								}
								vm.buy_course(body)
								// vm.$router.push({path:'assQueDetail',query:body})
							}else{
								vm.$vux.confirm.show({
								  	// 组件除show外的属性
								  	title: '提示',
        							content: '您还未绑定儿童信息，是否前往绑定',
								  	onCancel () {
								    	
								  	},
								  	onConfirm () {
								  		vm.$router.push({path:'/mineBaby'})
								  	}
								})
							}
						}
					})
				}else{
					vm.$vux.confirm.show({
						// 组件除show外的属性
						title: '提示',
        				content: '前往登录',
						onCancel () {
								    	
						},
						onConfirm () {
							vm.$router.push({name:'Login'})
						}
					})
				}	
			},
			buy_course(data){
			    let vm = this,body = {
			    	name:vm.assInfo.name,
			    	course_id:vm.assInfo.evaluation_id,
			    	price:vm.assInfo.price,
			    	openid:vm.getCookie('openid'),
			    	user_id:vm.getMsg('base','userInfo').user_id,
			    	child_id:data.child_id
			    }
			    courseApi.coursePay(body).then(resp=>{
			    	if(resp.data.res=='0'){
			    		vm.OpenPay(resp.data.data)
			    	}
			    })
			},
			OpenPay(data){
				let arr = this.getCookie('wxconfig').split('|')
				WeixinJSBridge.invoke(
			       'getBrandWCPayRequest', {
			           "appId":arr[0],     //公众号名称，由商户传入     
			           "timeStamp":data.TimeStamp,         //时间戳，自1970年以来的秒数     
			           "nonceStr":data.Nonce_str, //随机串     
			           "package":'prepay_id='+data.Prepay_id,     
			           "signType":"MD5",         //微信签名方式：     
			           "paySign":data.Sign //微信签名 
			       },
			       function(res){     
			           if(res.err_msg == "get_brand_wcpay_request:ok" ) {

			           }else{
			           	console.log(res)
			           }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
			       }
			   ); 
			}
		},
		created(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.ass-price-detail{
		.p-com-wrapper{
			background-color: #fff;
			height: calc(100% - 1.2rem);
		}
		.price-wrap{
			position: absolute;
			bottom: 0;
			background-color: #fff;
			height: 1.2rem;
			width: 10rem;
			display: flex;
			.price{
				flex: 1;
				line-height: 1.2rem;
				font-size: 0.426667rem;
				color: #f9532d;
				padding-left: 0.4rem;
			}
			.ass-btn{
				color: #fff;
				background-color: #f9532d;
				width: 3rem;
				line-height: 1.2rem;
				text-align: center;
				font-size: 0.426667rem;
				&:active{
					background-color: rgba(249,83,45,.8);
				}
			}
		}
		
	}
</style>
