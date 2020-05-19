<template>
	<view>
		<view class="login-logo">
			<image mode="aspectFit" src="../../assets/img/Octocat.png" />
		</view>
		<u-button style="margin: 60rpx" type="success" shape="circle" :ripple="true" @click="loginAuth">安全登录</u-button>
	</view>
</template>

<script>
	import globalConfig from '@/config'
	export default {
		methods: {
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
