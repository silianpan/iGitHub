<template>
	<view>
		<view class="login-logo">
			<image mode="aspectFit" src="../../assets/img/Octocat.png" />
		</view>
		<u-cell-group>
			<u-field style="margin: 60rpx" v-model="username" placeholder="账号" clearable :label-width="0" icon="account-fill">
			</u-field>
			<u-field style="margin: 60rpx" v-model="password" password placeholder="密码" clearable :label-width="0" icon="lock-fill">
			</u-field>
		</u-cell-group>
		<u-button style="margin: 60rpx" type="primary" shape="circle" :ripple="true" @click="login">登录</u-button>
		<u-button style="margin: 60rpx" type="success" shape="circle" :ripple="true" @click="loginAuth">安全登录</u-button>
	</view>
</template>

<script>
	import globalConfig from '@/config'
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			login() {
				this.$store.dispatch('login', {username: this.username, password: this.password})
			},
			loginAuth() {
				//#ifdef APP-PLUS
				uni.navigateTo({
					url: '/pages/login/auth'
				})
				//#endif
				//#ifdef H5
				window.location.href = globalConfig.githubAuthUrl
				//#endif
			}
		}
	}
</script>

<style lang="less">
	.login-logo {
		display: table-cell;
		vertical-align: middle;
		text-align: center;
		width: calc(100vw);
		height: 30vh;

		uni-image {
			width: 200rpx;
			height: 200rpx;
		}
	}
</style>
