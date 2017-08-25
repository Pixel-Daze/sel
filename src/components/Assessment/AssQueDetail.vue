<template>
	<div class="ass-que-detail" v-if="endLoad">
		<x-header :left-options="{backText: ''}" title="课程" class="vux-1px-b"></x-header>
		<div class="cent">
			<pro-bar :percent="percent" @click.native="puls"></pro-bar>
		</div>
		
		<div class="ass-que">
			<div class="ques">
				{{Info.question_index}}、{{questions.question}}
			</div>
			<div v-for="item in questions.dimensions">
				<p>{{item.dimension}}</p>
				<group>
			      	<radio :options="item.options" @on-change="change" @click.native="getItem(item)"></radio>
			    </group>
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
						vm.endLoad = true
					}
				})
			},
			puls(){
				this.percent+=10
			},
			change(value, label){
				console.log(value, label)
			},
			getItem(item){
				console.log(item)
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