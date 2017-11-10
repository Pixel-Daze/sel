<!-- 测评前置选择儿童 -->
<template>
	<div class="ass-child">
		<div class="tip">请选择需要进行测评的儿童，并确认儿童的<strong class="text-green">生日</strong>和<strong class="text-green">性别</strong>信息，因为SEL发展水平报告结果会根据您填写的儿童信息，自动与同年龄段以及同性别的儿童进行比对。如果信息有误，将<strong class="text-green">影响报告结果</strong>。</div>
		<group>
			<selector title="姓名" :options="children" v-model="child.name"></selector>
			<cell title="性别" value="男"></cell>
			<cell title="生日" value="2009-08-11"></cell>
		</group>
		<div class="btn-container">
	    	<x-button type="primary" action-type="button">提交信息</x-button>
	    </div>
	</div>
</template>
<script>
	import {Group,Cell,Selector,XButton} from 'vux'
	export default {
		name:'ass-child',
		data(){
			return {
				children:[],
				child:{
					name:''
				}
			}
		},
		components:{Group,Cell,Selector,XButton},
		methods:{
			// 获取儿童信息列表
			loadInfo(){
				let vm = this
				document.title = '儿童信息'
			},
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.ass-child{
		background-color: #fff;
		.tip{padding: .3rem 0.2rem;font-size: 0.426667rem;line-height: .7rem;text-indent: 2em;}
		.vux-no-group-title{
			margin-top: 0; 
			.weui-cell_select .weui-cell__bd{&:after{width: 0.266667rem;height: 0.266667rem;}}
		}
		.weui-cells:after{border-bottom: none;}
		.weui-cell:before{border-top: none;}
		.btn-container{
			padding:0.8rem 0.426667rem 0;
			button{
				height: 46px;
				font-size: 0.453333rem;
			}
		}
	}
</style>