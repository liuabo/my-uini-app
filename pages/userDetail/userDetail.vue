<template>
	<view>
		<cover-image class="controls-play" @click="upload" src="../../static/img/pay.png"></cover-image>
		<view>{{user_name}}</view>
		
			<view @click="open('nickname')" class="login-form-item">
				<text class="title">昵称</text>
				<view>
					{{userInfo.nickname}}
					<cover-image class="img" src="../../static/img/right-brackets.png"></cover-image>
				</view>
			</view>
			<view @click="open('phone')" class="login-form-item">
				<text class="title">手机号</text>
				<view>
					<text>{{userInfo.phone}}</text>
					<cover-image class="img" src="../../static/img/right-brackets.png"></cover-image>
				</view>
			</view>
		 <uni-popup class="popup" ref="popup" type="top">
			 <form @submit="formSubmit">
				 <textarea :name="objkey" :value="userInfo[objkey]" class="textarea" placeholder="占位符字体是红色的"/>
				 <button style="margin-top: 20px;" type="primary" form-type="submit">保存</button>
			 </form>
		 </uni-popup>
	</view>
</template>

<script>
	import {user} from '../../api/user.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {uniPopup},
		data () {
			return {
				userInfo: {},
				editTitle: ''
			}
		},
		computed: {
			user_name () {
				const data = uni.getStorageSync('user_info')
				return  data ? data : '同学';
			},
			objkey () {
				return this.editTitle === 'nickname' ? 'nickname' : 'phone';
			}
		},
		onLoad () {
			this.init();
		},
		methods: {
			open(e){
				this.editTitle = e;
				this.$refs.popup.open();
			  },
			formSubmit (e) {
				debugger
				const FormData = e.detail.value;
				const rules = {
					email: [{require: true, message: '这是必填选项'}]
				}
				const check = Object.keys(FormData).filter(item => FormData[item] === '')
				if (check.length > 0) {
					return uni.showToast({
						title: '请将' + (check[0] === this.editTitle ? '昵称' : '手机号') + '填写完整',
						icon: 'none'
					})
				}
				user.userEdit({email: this.user_name, ...this.userInfo, id: 1, ...FormData}).then(res => {
					console.log(res)
					if (res.data.code === 200) {
						this.init();
						uni.showToast({
							title: '保存成功',
							icon: 'success'
						})
						uni.navigateBack({
							delta: 1
						})
						uni.navigateTo({
							url: '../userDetail/userDetail'
						})
					} else {
						const msg = Array.isArray(res.data.msg) ? res.data.msg.reduce((item,next) => item + next, '') : res.data.msg
						uni.showToast({
							title: msg,
							icon: 'none'
						})
					}
				})
			},
			init () {
				const params = {
					uid: '1'
				}
				user.getUserDetail(params).then(res => {
					console.log(res);
					this.userInfo = res.data.data
				})
			},
			upload () {
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						debugger
				        uni.uploadFile({
				            url: '/api/v1/admin/uploadfile', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
				            success: (uploadFileRes) => {
				                console.log(uploadFileRes.data);
				            }
				        });
				    }
				});
				
			}
		}
	}
</script>

<style>
	view {
		text-align: center;
	}
.controls-play {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	margin: 100rpx  auto 0;
}
</style>

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
		justify-content: space-between;
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
	.label-content {
		text-align: right;
	}
	.img {
		display: inline-block;
		width: 50rpx;
		height: 40rpx;
		position: relative;
		top: 12rpx;
	}
	.popup {
		height: 100%;
		background: #FFFFFF;
		&:first-child {
			height: 100%;
			background: #FFFFFF;
		}
		/deep/.uni-transition {
			height: 100%;
			background: #FFFFFF;
		}
		/deep/ .uni-popup__wrapper-box {
			height: 100%;
		}
	}
	.textarea {
		width: 100%;
		background: #f8f8f8;
	}
</style>
