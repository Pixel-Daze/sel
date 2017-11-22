<!-- 测评前置选择儿童 -->
<template>
	<div class="ass-child">
		<div class="tip">请选择需要进行测评的儿童，并确认儿童的<strong class="text-green">生日</strong>和<strong class="text-green">性别</strong>信息，因为{{assName}}报告结果会根据您填写的儿童信息，自动与同年龄段以及同性别的儿童进行比对。如果信息有误，将<strong class="text-green">影响报告结果</strong>。</div>
		<group>
			<selector title="姓名" :options="children" placeholder="请选择儿童" v-model="child.child_id" @on-change="chooseChild"></selector>
			<cell title="性别" :value="child.gender"></cell>
			<cell title="生日" :value="child.birth_date"></cell>
		</group>
		<div class="btn-container">
	    	<x-button type="primary" action-type="button" @click.native="commit">提交信息</x-button>
	    </div>
	</div>
</template>
<script>
	import {Group,Cell,Selector,XButton} from 'vux'
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
				}
			}
		},
		components:{Group,Cell,Selector,XButton},
		methods:{
			/* @desc:初始化页面 */
			loadInfo(){
				let vm = this
				document.title = '儿童信息'
				vm.assName = vm.$route.query.assName
				vm.getBabyList()
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
			/* @desc:提交信息进入测评 */
			commit(){
				let vm = this
				if(vm.child.child_id){
					let body = {
						evaluation_id:vm.$route.query.evaluation_id,
						user_id:vm.getMsg('base','userInfo').user_id,
						child_id:vm.child.child_id,
						index:0,
						assName:vm.$route.query.assName
					}
					vm.$router.push({path:'assQueDetail',query:body})
				}else{
					vm.$vux.alert.show({
						title: '提示',
						content: '请选择儿童'
					})
				}
			}
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
	}
</style>