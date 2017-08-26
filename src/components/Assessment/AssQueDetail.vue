<template>
	<div class="ass-que-detail p-container" v-if="endLoad">
		<x-header :left-options="{backText: ''}" title="课程" class="vux-1px-b"></x-header>
		<div class="p-com-wrapper">
			<div class="cent">
				<div class="num">{{Info.question_index}}/{{Info.maxIndex}}</div>
				<pro-bar class="pro" :percent="percent"></pro-bar>
			</div>
			
			<div class="ass-que">
				<div class="ques">
					{{Info.question_index}}、{{questions.question}}
				</div>
				<div v-for="item in questions.dimensions">
					<p class="dimension">{{item.dimension}}</p>
					<group>
				      	<radio :options="item.options" @on-change="change" @click.native="getItem(item)"></radio>
				    </group>
				</div>
			</div>
			<div class="btn-container">
		    	<span v-if="Info.question_index==1&&Info.maxIndex>1" class="first_btn" @click="next">下一题</span>
		    	<div v-if="Info.question_index!=1&&Info.maxIndex!=Info.question_index" class="btn_g">
		    		<span @click="prev">上一题</span>
		    		<span @click="next">下一题</span>
		    	</div>
		    	<div v-if="Info.question_index==Info.maxIndex" class="btn_g">
		    		<span @click="prev">上一题</span>
		    		<span class="submit activeBg" @click="submit">提交测评</span>
		    	</div>
		    </div>
		</div>
	</div>
</template>
<script>
	import { ProBar } from './assComponent'
	import { Radio, Group,XHeader } from 'vux'
	import * as api from '../../api/assessmentApi'
	export default {
		data(){
			return {
				Info:{},
				endLoad:false,
				percent:0
			}
		},
		components:{
			ProBar,Radio,Group,XHeader
		},
		computed:{
			questions:function(){
				if(this.Info.content){
					return JSON.parse(this.Info.content)
				}
			}
		},
		methods:{
			loadInfo(){
				let vm = this
				api.getQue().then(resp=>{
					if(resp.data.res == 0){
						vm.Info = resp.data.data
						vm.percent = vm.Info.question_index/vm.Info.maxIndex*100
						vm.endLoad = true
					}
				})
			},
			change(value, label){
				console.log(value, label)
			},
			getItem(item){
				console.log(item)
			},
			next(){
				let vm = this
				vm.Info.question_index+=1
				vm.percent = vm.Info.question_index/vm.Info.maxIndex*100
			},
			prev(){
				let vm = this
				vm.Info.question_index-=1
				vm.percent = vm.Info.question_index/vm.Info.maxIndex*100
			},
			submit(){

			}
		},
		created(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.ass-que-detail{
		height: 100%;
		background: #fff;
		.cent{
			width: 9.306667rem;
			padding: 0.266667rem 0.346667rem 0.2rem;
			display: flex;
			.num{
				width: 1rem;
			}
			.pro{
				flex: 1;
			}
		}
		.ass-que{
			.ques{
				width: 9.306667rem;
				padding: 0 0.346667rem 0.2rem;
			}
			.dimension{
				padding: 0.266667rem 0.346667rem 0;
			}
		}
		.btn-container{
			padding:0.8rem 0.426667rem 0;
			.first_btn{
				color: #01b38a;
				border: 1px solid #01b38a;
				width: 9.146667rem;
				display: inline-block;
				text-align: center;
				height: 1.066667rem;
				line-height: 1.066667rem;
				font-size: 0.426667rem;
			}
			.btn_g{
				width: 9.146667rem;
				display: flex;
				justify-content: space-between;
				span{
					display: inline-block;
					text-align: center;
					height: 1.066667rem;
					line-height: 1.066667rem;
					font-size: 0.426667rem;
					color: #01b38a;
					border: 1px solid #01b38a;
					padding: 0 1.333333rem;
				}
				.submit{
					border: 1px solid #fff;
					background-color: #01b38a;
					color: #fff;
				}
			}
		}
	}
</style>