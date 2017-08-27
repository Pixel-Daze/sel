<!-- 我的宝贝 -->
<template>
	<div class="mine-baby">
		<x-header :left-options="{backText: ''}" title="我的宝贝"></x-header>
		<div class="headIcon">
			<img :src="body.head_portrait" alt="" @click="addPic">
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
	import moment from 'moment'
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
					child_id:'0'
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
						if(resp.data.res == 0){
							let text = '添加成功'
							if(vm.body.child_id!='0'){
								text = '修改成功'
							}
							this.$vux.toast.show({
								text: text,
								type: 'text',
								width: '3.5rem'
							})
						}
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
						if(resp.data.data!=null){
							vm.body.child_id = resp.data.data.child_id
							vm.body.birth_date = moment(resp.data.data.birth_date).format('YYYY-MM-DD')
							vm.body.gender = resp.data.data.gender
							vm.body.name = resp.data.data.name
							vm.body.head_portrait = resp.data.data.head_portrait
						}
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
				        console.log(res.serverId)
				        api.UploadChildImg(body).then(resp=>{
				        	if(resp.data.res=='0'){
				        		console.log(resp.data.data)
				        		vm.body.head_portrait = resp.data.data
				        	}
				        })
				    }
				});
			}
		},
		created(){
			this.loadInfo()
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
