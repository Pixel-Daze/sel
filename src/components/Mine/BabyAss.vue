<!-- 儿童详情-儿童测评结果 -->
<template>
	<div class="baby-ass">
		<div v-if="assList.length>0&&endLoad">
	    	<ass-cell v-for="item in assList" :cell="item" key="item">
	    		<span slot="btn" class="ass-btn" @click="assRes(item)">查看报告</span>
	    	</ass-cell>
	    </div>
	    <error-info v-if="assList.length==0&&endLoad"></error-info>
	</div>
</template>
<script>
	import { AssCell } from './mineComponent'
	import ErrorInfo from '../AppBase/ErrorInfo'
	export default {
		name:'baby-ass',
		data(){
			return {
				assList:[
					{
						"evaluation_id": 1,
						"name": "适应性行为测评",
						"category": "SEL能力评估",
						"user_access": 0,
						"abstract": "这是简介",
						"details": "这是详细说明",
						"price": 0,
						"page_number": 10,
						"person_count": 50,
						"picture": "http://img4.imgtn.bdimg.com/it/u=2104185324,1359413794&fm=26&gp=0.jpg",
						"sample_report": "/front/sel.pdf",
						"current_question_id": "1",
						"evaluation_time": "2017-08-29T06:13:00Z"
					}
				],
				endLoad:true
			}
		},
		components:{
			AssCell,ErrorInfo
		},
		methods:{
			loadInfo(){
				document.title = '宝贝信息'
			},
			assRes(item){
				let vm = this , body = {
					evaluation_id:item.evaluation_id,
					user_evaluation_id:item.user_evaluation_id
					
				}
				this.$router.push({path:'/assReport',query:body})
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.baby-ass{}
</style>