<template>
	<view class="container">
		<view>header</view>
		<view>
			<router-view></router-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			gotoInfo() {
				uni.navigateTo({
					url: '../userInfo/userInfo'
				})
			}
		}
	}
</script>

<style>
	page {  
	    background-color: #F4F5F6;  
	    height: 100%;  
	    font-size: 14px;  
	    line-height: 1.8;  
	}
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.uni-navbar {
		height: 100rpx;
		background: #FFFFFF;
		box-shadow: 0 0 5px #888;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
</style>
