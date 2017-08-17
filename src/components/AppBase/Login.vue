<template>
	<div class="login">
		<x-header :left-options="{backText: ''}" title="登录"></x-header>
		<img src="../../../static/imgs/login/login.png" alt="">
		<group>
	      	<x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
	      	<x-input title="验证码" class="weui-vcode">
		        <x-button slot="right" type="primary" mini>发送验证码</x-button>
		    </x-input>
	    </group>
	    <div class="btn-container">
	    	<x-button type="primary" action-type="button">登录</x-button>
	    </div>
	    
	</div>
</template>
<script>
	import {XHeader,XInput,Group,XButton} from 'vux'
	export default {
		components:{
			XHeader,XInput,Group,XButton
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
		.weui-vcode{
			.weui-label{
				width: 5em !important;
			}
		}
	}
</style>