<!-- 我的宝贝 -->
<template>
	<div class="mine-baby">
		<x-header :left-options="{backText: ''}" title="我的宝贝"></x-header>
		<div class="headIcon">
			<img :src="body.head_portrait" alt="">
		</div>
		<group>
	      	<x-input title="儿童姓名" placeholder="请输入儿童姓名" v-model="body.name"></x-input>
	      	<selector v-model="body.gender" title="省份" :options="sexList" @on-change="changeSex"></selector>
	      	<datetime v-model="body.birth_date" @on-change="changeDate" title="儿童生日"></datetime>
	    </group>
	    <div class="btn-container">
	    	<x-button type="primary" action-type="button" @click.native="save">保存</x-button>
	    </div>
	</div>
</template>
<script>
	import {Group,Datetime,XInput,Selector,XButton,XHeader} from 'vux'
	import * as api from '../../api/mineApi'
	export default {
		data(){
			return {
				body:{
					head_portrait:'http://img4.imgtn.bdimg.com/it/u=2104185324,1359413794&fm=26&gp=0.jpg',
					relation:'0',
					name:'',
					gender:'0',
					birth_date:'',
					user_id:'',
					child_id:''
				},
				sexList:[{key: '0', value: '男'}, {key: '1', value: '女'}]
			}
		},
		components:{
			Group,Datetime,XInput,Selector,XButton,XHeader
		},
		methods:{
			changeSex(val){
				// console.log(val)
			},
			changeDate(val){
				// console.log(val)
			},
			save(){
				let vm = this
				if(vm.checkInfo()){
					vm.body.user_id = vm.getMsg('base','userInfo').user_id
					api.addchild(vm.body).then(resp=>{
						console.log(resp)
					})
				}
				
			},
			loadInfo(){
				let vm = this,body = {
					user_id:vm.getMsg('base','userInfo').user_id
				}
				vm.configWxjssdk()
				api.qrychild(body).then(resp=>{
					if(resp.data.res == 0){
						console.log(resp.data.data)
					}
				})
			},
			checkInfo(){
				let vm = this
				if(vm.body.name==''){
					this.$vux.toast.show({
						text: '请输入姓名',
						type: 'text',
						width: '3.5rem'
					})
					return false
				}else if(vm.body.birth_date == ''){
					this.$vux.toast.show({
						text: '请输入生日',
						type: 'text',
						width: '3.5rem'
					})
					return false
				}else{
					return true
				}
			}
		},
		created(){
			// this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.mine-baby{
		height: 100%;
		width: 100%;
		background: #fff;
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
			}
		}
		.btn-container{
			padding:0.8rem 0.426667rem 0;
			button{
				height: 46px;
				font-size: 20px;
			}
		}
	}
</style>
