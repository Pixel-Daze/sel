<!-- babyList -->
<template>
	<div class="baby-list">
		<group>
			<cell :title="baby.name" is-link @click.native="goDetail(baby)" v-for="baby in babyList">
				<img slot="icon" :src="baby.head_portrait">
			</cell>
		</group>
		<div class="add" @click="addBaby()">
			<span class="icon iconfont icon-add"></span>
			<span class="tip">添加宝贝</span>
		</div>
	</div>
</template>
<script>
	import {Cell,Group} from 'vux'
	import * as api from '../../api/mineApi'
	export default {
		data(){
			return {
				babyList:[]
			}
		},
		components:{
			Cell,Group
		},
		methods:{
			loadInfo(){
				document.title = '我的宝贝'
				this.getBabyList()
			},
			getBabyList(){
				let vm = this , body = {user_id:vm.getMsg('base','userInfo').user_id}
				api.qrychild(body).then(resp=>{
					if(resp.data.res==0){
						vm.babyList = resp.data.data
					}
				})
			},
			addBaby(){
				this.$router.push({path:'/mineBaby'})
			},
			goDetail(baby){
				this.$router.push({path:'/babyDetail/babyInfo'})
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.baby-list{
		background-color: #fff;
		.vux-no-group-title{
			margin-top: 0; 
			.weui-cell img{ width: 0.8rem;display: block;margin-right: 0.4rem; }
		}
		.add{
			display: flex;align-items: center;padding: 0.266667rem 0.4rem;
			.icon-add{font-size: 1.2rem;color:#666;width: 1.2rem;}
			.tip{font-size: 0.453333rem;padding-left: 0.35rem;flex: 1;height: 1.306667rem;line-height: 1.306667rem;}
		}
	}
</style>