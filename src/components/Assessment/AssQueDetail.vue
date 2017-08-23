<template>
	<div class="ass-que-detail">
		<pro-bar></pro-bar>
		<ass-que :ques="Info.content"></ass-que>
	</div>
</template>
<script>
	import { ProBar } from './assComponent'
	import { AssQue } from './assComponent'
	import * as api from '../../api/assessmentApi'
	export default {
		data(){
			return {
				Info:{}
			}
		},
		components:{
			ProBar,AssQue
		},
		methods:{
			loadInfo(){
				let vm = this
				api.getQue().then(resp=>{
					if(resp.data.res == 0){
						vm.Info = resp.data.data
					}
				})
			}
		},
		created(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.ass-que-detail{
		
	}
</style>