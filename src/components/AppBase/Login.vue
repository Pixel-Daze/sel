<template>
	<div class="login">
		<x-header :left-options="{backText: ''}" title="登录"></x-header>
		<img src="../../../static/imgs/login/login.png" alt="">
		<group>
	      	<x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="body.telno"></x-input>
	      	<x-input title="姓名" class="weui-name" name="username" v-model="body.name" placeholder="请输入姓名" is-type="china-name"></x-input>
	      	<x-input title="验证码" class="weui-vcode" v-model="body.number">
		        <x-button slot="right" type="primary" mini @click.native="sendCode">发送验证码</x-button>
		    </x-input>
	    </group>
	    <div class="btn-container">
	    	<x-button type="primary" action-type="button" @click.native="login">登录</x-button>
	    </div>
	    
	</div>
</template>
<script>
	import {XHeader,XInput,Group,XButton} from 'vux'
	import * as api from '../../api/assessmentApi'
	export default {
		data(){
			return {
				body:{
					telno:'',
					number:'',
					name:''
				}
			}
		},
		components:{
			XHeader,XInput,Group,XButton
		},
		methods:{
			sendCode(){
				let vm = this,body = {
					telno:vm.body.telno
				}
				api.sendCode(body).then()
			},
			login(){
				let vm = this,body = {
					telno:vm.body.telno,
					number:vm.body.number,
					name:vm.body.name,
					openid:vm.getCookie('openid')
				}
				api.login(body).then(resp=>{
					if(resp.data.res=='0'){
						vm.setMsg('Index','path',0)
						this.$router.push({name:'Assessment'})
					}
				})
			}
		}
	}
</script>
<style lang='scss'>
	.login{
		background-color: #fff;
		height: 100%;
		img{
			width: 4rem;
			padding: 1rem 0;
			display: block;
			margin:0 auto;
		}
		.vux-no-group-title{
			margin-top: 0.133333rem;
		}
		.btn-container{
			padding:0.8rem 0.426667rem 0;
			button{
				height: 46px;
				font-size: 20px;
			}
		}
		.weui-vcode,.weui-name{
			.weui-label{
				width: 5em !important;
			}
		}
	}
</style>