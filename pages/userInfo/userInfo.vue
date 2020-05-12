<template>
	<view class="userInfo">
		<view class="user-header">
			<view class="user-hello">你好, {{user_info}}</view>
			<view>
				<text  @click="gotoLoin">{{user_info === '同学' ? '登录/注册' : '完善个人信息'}}</text>
			</view>
		</view>
		<view class="user-content">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		computed: {
			user_info () {
				debugger
				const data = uni.getStorageSync('user_info')
				return  data ? data : '同学'
			}
		},
		onLoad () {
			debugger
			uni.getStorageInfoSync()
		},
		methods: {
			gotoLoin () {
				if (this.user_info === '同学') {
					return uni.reLaunch({
						url: '../login/login?type=1'
					})
				}
				this.gotoDetail();
			},
			gotoDetail () {
				uni.navigateTo({
					url: '../userDetail/userDetail'
				})
			}
		}
	}
</script>

<style lang="less">
.userInfo {
	height: 100%;
	background: url(../../static/img/123.png) no-repeat;
}
.user-header {
	padding: 20rpx 0 40rpx 40rpx;
	view:nth-of-type(2) {
		color: #FFFFFF;
		font-size: 14rpx;
		text{
			margin-right: 10px;
		}
	}
}
.user-hello {
	color: #FFFFFF;
	font-weight: 600;
	font-size: 30rpx;
}
.user-content {
	border-radius: 15px 15px 0 0;
	background: #FFFFFF;
	min-height: 60%;
}
</style>
