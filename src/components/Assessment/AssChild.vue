<!-- 测评前置选择儿童 -->
<template>
	<div class="ass-child">
		<div class="tip">请选择需要进行测评的儿童，并确认儿童的<strong class="text-green">生日</strong>和<strong class="text-green">性别</strong>信息，因为{{assName}}报告结果会根据您填写的儿童信息，自动与同年龄段以及同性别的儿童进行比对。如果信息有误，将<strong class="text-green">影响报告结果</strong>。<a class="text-blue" @click="goDetail">修改儿童信息请点这里></a></div>
		<group>
			<selector title="姓名" :options="children" placeholder="请选择儿童" v-model="child.child_id" @on-change="chooseChild"></selector>
			<cell title="性别" :value="child.gender"></cell>
			<cell title="生日" :value="child.birth_date"></cell>
		</group>
	    <div v-if="isFree=='0'" class="ass-btn" @click="commit">开始测试</div>
	    <div v-else class="price-wrap">
			<span class="price vux-1px-t">{{isFree}}元</span>
			<span class="ass-btn1" @click="buyAss">立即购买</span>
		</div>
	</div>
</template>
<script>
	import {Group,Cell,Selector,XButton} from 'vux'
	import * as courseApi from '../../api/courseApi'
	import * as mineApi from '../../api/mineApi'
	export default {
		name:'ass-child',
		data(){
			return {
				children:[],
				assName:'',
				child:{
					child_id:'',
					gender:'',
					birth_date:''
				},
				isFree:''
			}
		},
		components:{Group,Cell,Selector,XButton},
		methods:{
			/* @desc:初始化页面 */
			loadInfo(){
				let vm = this
				document.title = '儿童信息'
				vm.assName = vm.$route.query.assName
				vm.isFree = vm.$route.query.price
				vm.getBabyList()
				vm.configWxjssdk()
			},
			/* @desc:获取儿童列表 */
			getBabyList(){
				let vm = this , body = {user_id:vm.getMsg('base','userInfo').user_id}
				mineApi.qrychild(body).then(resp=>{
					if(resp.data.res==0){
						vm.children = resp.data.data
						vm.children.forEach(item=>{
							vm.$set(item,'key',item.child_id)
							vm.$set(item,'value',item.name)
						})
						vm.child = vm.children[0]
					}
				})
			},
			/* @desc:选择儿童信息 */
			chooseChild(val){
				let vm = this
				vm.child = _.cloneDeep(vm.children).filter((item)=>{
					return item.child_id == val
				})[0]
				vm.child.birth_date = vm.formatDate(vm.child.birth_date)
				vm.child.gender = vm.formatGender(vm.child.gender)
			},
			/* @desc:提交信息进入免费测评 */
			commit(){
				let vm = this
				if(vm.child.child_id){
					vm.startEva()
				}else{
					vm.$vux.alert.show({
						title: '提示',
						content: '请选择儿童'
					})
				}
			},
			/* @desc:修改儿童信息 */
			goDetail(){
				if(this.child.child_id){
					this.$router.push({path:'/babyDetail/babyInfo',query:{child_id:this.child.child_id}})	
				}else{
					vm.$vux.alert.show({
						title: '提示',
						content: '请选择儿童'
					})
				}
			},
			startEva(){
				let vm = this , body = {
					evaluation_id:vm.$route.query.evaluation_id,
					user_id:vm.getMsg('base','userInfo').user_id,
					child_id:vm.child.child_id,
					index:0,
					assName:vm.$route.query.assName,
					keyname:vm.$route.query.keyname
				}
				vm.$router.push({path:'assQueDetail',query:body})
			},
			/* @desc:购买测评 */
			buyAss(){
				let vm = this
				if(vm.child.child_id){
					vm.getOrder()
				}else{
					vm.$vux.alert.show({
						title: '提示',
						content: '请选择儿童'
					})
				}
			},
			/* @desc:下单 */
			getOrder(){
				let vm = this, body = {
					name:vm.$route.query.assName,
					course_id:vm.$route.query.evaluation_id,
					price:Number(vm.isFree)*100,
					openid:vm.getCookie('openid'),
					user_id:vm.getMsg('base','userInfo').user_id,
					child_id:vm.child.child_id
				}
				courseApi.coursePay(body).then(resp=>{
					if(resp.data.res=='0'){
						vm.openPay(resp.data.data)
					}
				})
			},
			openPay(data){
				let arr = this.getCookie('wxconfig').split('|'),vm = this
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
			           		vm.startEva()
			           }else{
			           		vm.$vux.alert.show({
			           			title: '北京心启点教育科技有限公司',
			           			content: '支付失败'
			           		})
			           }
			       }
			   ); 
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	@import '../../../static/lib/css/base/variable/base-color.scss';
	.ass-child{
		background-color: #fff;
		.tip{padding: .3rem 0.2rem;font-size: 0.426667rem;line-height: .7rem;text-indent: 2em;
			a{text-decoration: underline;}
		}
		.vux-no-group-title{
			margin-top: 0; 
			.weui-cell_select .weui-cell__bd{&:after{width: 0.266667rem;height: 0.266667rem;}}
		}
		.vux-selector{
			padding: 3px 0;
			.weui-cell__bd{position: relative;}
			select{direction: rtl;color: #999;padding-right: 0.426667rem;}
		}
		.vux-selector.weui-cell_select-after { padding: 0 15px; }
		.weui-cells:after{border-bottom: none;}
		.weui-cell:before{border-top: none;}
		.btn-container{
			padding:0.8rem 0.426667rem 0;
			button{
				height: 46px;
				font-size: 0.453333rem;
			}
		}
		.ass-btn{
			position: absolute;
			bottom: 0;
			color: #fff;
			background-color: #8bbd41;
			height: 1.2rem;
			width: 10rem;
			line-height: 1.2rem;
			text-align: center;
			font-size: 0.426667rem;
			&:active{
				background-color: rgba(249,83,45,.8);
			}
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
				padding-left: 0.4rem;
				color: $text-green-color;
			}
			.ass-btn1{
				color: #fff;
				background-color: $text-green-color;
				width: 3rem;
				line-height: 1.2rem;
				text-align: center;
				font-size: 0.426667rem;
				&:active{
					background-color: $text-green-active-color;
				}
			}
		}
	}
</style>