<template>
	<view style="padding-top: 10vh;">
		<view class="login-logo">
			<image mode="aspectFit" src="../../assets/img/logo.png" />
		</view>
		<view class="padding-lr-xl flex flex-direction text-center">
			<button class="cu-btn bg-gradual-orange margin-tb-sm lg" @click="loginAuth">{{$t('SecureLogin')}}</button>
		</view>
	</view>
</template>

<script>
	export default {
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
