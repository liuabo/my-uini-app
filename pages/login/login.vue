<template>
	<view class="login">
		<form @submit="formSubmit" @reset="formReset">
			<view class="login-form-item ogin-form-id">
				<view class="title">账号</view>
				<input class="login-input" name="email" placeholder="手机/邮箱/用户名" />
				<icon type="warn" size="10"/>
			</view>
			<view class="login-form-item">
				<view class="title">密码</view>
				<input class="login-input" name="password" placeholder="请填写密码" />
			</view>
			<view class="uni-btn-v">
				<button type="primary" form-type="submit">登陆</button>
			</view>
		 </form>
		 <view class="register">
			 <text>注册</text>
		 </view>
	</view>
</template>

<script>
	import {user} from '../../api/user.js'
	import { checkForm } from '../../utils/check.js'
	export default {
		data() {
			return {

			}
		},
		computed: {
			type () {
				return this.$route.query.type;
			}
		},
		onLoad () {
			console.log(this.type)
		},
		methods: {
			formSubmit: function(e) {
				const FormData = e.detail.value;
				const rules = {
					email: [{require: true, message: '这是必填选项'}]
				}
				const check = Object.keys(FormData).filter(item => FormData[item] === '')
				if (check.length > 0) {
					return uni.showToast({
						title: '请将' + check[0] === 'email' ? '账号' : '密码' + '填写完整',
						icon: 'none'
					})
				}
				user.login(FormData).then(res => {
					if (res.data.code === 200) {
						uni.setStorage({
						    key: 'user_info',
						    data: FormData.email,
						    success: function () {
						        console.log('success');
						    }
						});
						uni.setStorage({
						    key: 'token',
						    data: res.data.token,
						    success: function () {
						        console.log('success');
						    }
						});
						uni.showToast({
							title:"登录成功",
							icon: 'none'
						})
						uni.switchTab({
							url: '../userInfo/userInfo'
						})
					}
					
				}).finally(() => {
					// uni.showModal({
					// 	content: '表单数据内容：' + JSON.stringify(this.formdata),
					// 	showCancel: false
					// });
				})
				// var formdata = e.detail.value
				// uni.showModal({
				// 	content: '表单数据内容：' + JSON.stringify(formdata),
				// 	showCancel: false
				// });
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style scoped lang="less">
	.login {
		height: 100%;
		background-color: #FFFFFF;
		from {
			height: 70%;
		}
	}
	.login-input {
		width: 80%;
		// color: #b1b1b1;
		color: #030303;
		// border: 1px solid #CCCCCC;
		/* background: #007AFF; */
	}
	.ogin-form-id {
		border: 1px solid #C0C0C0;
	}
	.login-form-item {
		display: flex;
		align-items: center;
		height: 60rpx;
		background-color: #f5f5f5;
		padding: 10rpx;
		.title {
			padding-right: 20rpx;
			color: #030303;
		}
	}
	.uni-btn-v {
		margin: 50px auto 0;
		button:first-child{
			width: 80%;
			height: 60rpx;
			font-size: 14px;
		}
	}
	.register {
		padding-top: 30rpx;
		padding-right: 5%;
		text-align: right;
	}
</style>
