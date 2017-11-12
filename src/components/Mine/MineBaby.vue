<!-- 我的宝贝-改造为新增儿童页面 -->
<template>
	<div class="mine-baby">
		<div class="headIcon">
			<img :src="body.head_portrait" alt="" @click="addPic">
		</div>
		<group>
	      	<x-input class="name" title="姓名" placeholder="请输入儿童姓名" v-model="body.name"></x-input>
	      	<pixel-selector v-if="endLoad" title="性别" :options="sexList" :value="body.gender" @onSelect="chengeSex"></pixel-selector>
	      	<datetime v-model="body.birth_date" @on-change="changeDate" title="生日"></datetime>
	      	<selector ref="defaultValueRef" title="家长身份" :options="list"></selector>
	    </group>
	    <div class="btn-container">
	    	<x-button type="primary" action-type="button" @click.native="save">保存</x-button>
	    </div>
	</div>
</template>
<script>
	import {Group,Datetime,XInput,Selector,XButton,XHeader} from 'vux'
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
				list:[],
				sexList:[{key: '0', value: '男',icon:'icon-boy'}, {key: '1', value: '女',icon:'icon-girl'}],
				endLoad:true
			}
		},
		components:{
			Group,Datetime,XInput,Selector,XButton,XHeader,PixelSelector
		},
		methods:{
			chengeSex(val){
				this.body.gender = val
			},
			changeDate(val){
				// console.log(val)
			},
			save(){
				let vm = this
				if(vm.checkInfo()){
					vm.body.user_id = vm.getMsg('base','userInfo').user_id
					api.addchild(vm.body).then(resp=>{
						if(resp.data.res == 0){
							let data = vm.getMsg('mineBaby','data')
							vm.$router.push({path:data.path,query:data.query})
						}
					})
				}
				
			},
			loadInfo(){
				let vm = this,body = {
					user_id:vm.getMsg('base','userInfo').user_id
				}
				document.title = '我的宝贝'
				vm.configWxjssdk()
				api.qrychild(body).then(resp=>{
					if(resp.data.res == 0){
						if(resp.data.data!=null){
							vm.body.child_id = resp.data.data[0].child_id
							vm.body.birth_date = vm.formatDate(resp.data.data[0].birth_date)
							vm.body.gender = resp.data.data[0].gender
							vm.body.name = resp.data.data[0].name
							vm.body.head_portrait = resp.data.data[0].head_portrait
						}
					}
					vm.endLoad = true
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
			},
			addPic(){
				let vm = this
				wx.chooseImage({
				    count: 1, // 默认9
				    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				    success: function (res) {
				        vm.upImg(res.localIds)
				    }
				});
			},
			upImg(localIds){
				let vm = this
				let localId = localIds.shift()

				wx.uploadImage({
				    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
				    isShowProgressTips: 1, // 默认为1，显示进度提示
				    success: function (res) {
				        let body = {
				        	mediaid:res.serverId
				        }
				        // console.log(vm.body.name = res.serverId)
				        api.UploadChildImg(body).then(resp=>{
				        	if(resp.data.res=='0'){
				        		vm.body.head_portrait = resp.data.data
				        	}
				        })
				    }
				});
			}
		},
		created(){
			// this.loadInfo()
		},
		beforeRouteEnter (to, from, next) {
		    next(vm=>{
		    	let body = {
			    	path:from.path,
			    	query:from.query
			    }
		    	vm.setMsg('mineBaby','data',body)
		    })
		}
	}
</script>
<style lang='scss'>
	.mine-baby{
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
		.vux-selector{
			padding: 3px 0;
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
		.weui-cell_access .weui-cell__ft {
		    padding-left: 16px;
		}
	}
</style>
