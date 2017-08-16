<!-- 我的 -->
<template>
	<div class="mine p-com-container">
		<div class="header">
			
		</div>
		<tabbar class="vux-1px-b">
	      <tabbar-item class="activeBg" @click.native="goTab(0)">
	        <span slot="icon" class="icon iconfont icon-ceping"></span>
	        <span slot="label">我的测评</span>
	      </tabbar-item>
	      <tabbar-item class="activeBg" @click.native="goTab(1)">
	        <span slot="icon" class="icon iconfont icon-kecheng"></span>
	        <span slot="label">我的课程</span>
	      </tabbar-item>
	      <tabbar-item class="activeBg" @click.native="goTab(2)">
	        <span slot="icon" class="icon iconfont icon-baobeishuo"></span>
	        <span slot="label">我的宝贝</span>
	      </tabbar-item>
	    </tabbar>
	</div>
</template>
<script>
	import { Tabbar, TabbarItem } from 'vux'
	export default{
		methods:{
			goTab(){

			}
		},
		components: {
	      	Tabbar,
	      	TabbarItem
	    }
	}
</script>
<style lang='scss'>
	.mine{
		.header{
			height: 4.0rem;
			background:#77c34f;
		}
		.weui-tabbar{
			position: relative;
			.weui-tabbar__item{
				padding-top: 0.2rem;
				padding-bottom: 0.2rem !important;
				.iconfont {
					font-size: 27px !important;
				}
				.icon-ceping{
					color: #20e4a0;
				}
				.icon-kecheng{
					color: #229cee;
				}
				.icon-baobeishuo{
					color: #feb000;
				}
			}
			.weui-bar__item_on{
				.weui-tabbar__label{
					color: #575656 !important;
				}
			}
			.weui-tabbar__label{
				padding-top: 0.1rem;
			}
		}
	}
</style>