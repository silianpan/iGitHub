<template>
	<view>
		<view class="login-logo">
			<image mode="aspectFit" src="../../assets/img/Octocat.png" />
		</view>
		<view class="padding-lr-xl flex flex-direction text-center">
			<button class="cu-btn bg-gradual-green margin-tb-sm lg" @click="loginAuth">安全登录</button>
		</view>
	</view>
</template>

<script>
	import globalConfig from '@/config'
	export default {
		onLoad() {
			this.$store.dispatch('autoLogin')
		},
		methods: {
			loginAuth() {
				this.$store.dispatch('loginAuth')
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
		height: 50vh;

		uni-image {
			width: 240rpx;
			height: 240rpx;
		}
	}
</style>
