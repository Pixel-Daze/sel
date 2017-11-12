<!-- 用户个人信息页 -->
<template>
	<div class="mine-info">
		<div class="headIcon">
			<img :src="body.head_portrait" alt="">
		</div>
		<group>
			<x-input class="name" title="昵称" placeholder="请输入昵称"></x-input>
	      	<x-input class="name" title="姓名" placeholder="请输入姓名"></x-input>
	      	<pixel-selector title="性别" :options="sexList" :value="body.gender" ></pixel-selector>
	      	<datetime v-model="body.birth_date" @on-change="changeDate" title="生日"></datetime>
	      	<popup-picker title="常驻地" :data="areaList" :columns="2" show-name></popup-picker>
	    </group>
	    <div class="btn-container">
	    	<x-button type="primary" action-type="button" @click.native="save">保存</x-button>
	    </div>
	</div>
</template>
<script>
	import {Group,Datetime,XInput,Selector,XButton,XHeader,PopupPicker} from 'vux'
	import {PixelSelector} from './mineComponent'
	import * as api from '../../api/mineApi'
	export default {
		data(){
			return {
				body:{
					head_portrait:'',
					relation:'0',
					name:'',
					gender:'0',
					birth_date:'',
					user_id:'',
					child_id:'0',
					maxDate: ''// 预留作为最大日期
				},
				sexList:[{key: '0', value: '男',icon:'icon-boy'}, {key: '1', value: '女',icon:'icon-girl'}],
				areaList: [{
			        name: '广东',
			        value: 'china001',
			        parent: 0
			      }, {
			        name: '广西',
			        value: 'china002',
			        parent: 0
			      }, {
			        name: '广州',
			        value: 'gz',
			        parent: 'china001'
			      }, {
			        name: '深圳',
			        value: 'sz',
			        parent: 'china001'
			      }, {
			        name: '广西001',
			        value: 'gx001',
			        parent: 'china002'
			      }, {
			        name: '广西002',
			        value: 'gx002',
			        parent: 'china002'
			      }],
				endLoad:false
			}
		},
		components:{
			Group,Datetime,XInput,Selector,XButton,XHeader,PixelSelector,PopupPicker
		},
		methods:{
			loadInfo(){
				let vm = this
				document.title = '个人中心'
			},
			changeDate(){},
			save(){
				this.$router.push({path:"/appbase/mine"})
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.mine-info{
		height: 100%;
		width: 100%;
		background: #fff;
		.name{
			.weui-cell__bd{
				padding-right: 11px;
				.weui-input{
					text-align: right;
				}
			}
			.weui-cell__ft{
				display: none;
			}
		}
		.weui-cells{
			margin: 1.17647059em 15px 0;
		}
		.weui-cell{
			padding: 13px 0;
			&:before{
				left: 0;
			}
		}
		.headIcon{
			width: 1.8rem;
			height: 1.8rem;
			border-radius: 50%;
			background: #dae2e2;
			margin: 1rem auto 1.3rem;
			text-align: center;
			img{
				width: inherit;
				height: inherit;
				border-radius: 50%;
				color: gray;
			}
		}
		.btn-container{
			padding:0.8rem 15px 0;
			button{
				height: 46px;
				font-size: 20px;
			}
		}
		.vux-cell-box:before{left: 0;}
		.weui-cell_access .weui-cell__ft {padding-left: 16px;}
	}
</style>
