<template>
	<view style="padding-top: 10vh;">
		<view class="login-logo">
			<image mode="aspectFit" src="../../assets/img/logo.png" />
		</view>
		<view class="padding-lr-xl flex flex-direction text-center">
			<button class="cu-btn margin-tb-sm lg text-white" :style="{backgroundColor:themeBgColor}" @click="loginAuth">{{$t('SecureLogin')}}</button>
		</view>
		<view class="padding-lr-xl flex align-end justify-center user-sc"><text @tap="tapCommitment">{{$t('UserServiceCommitment')}}</text></view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters(['themeBgColor'])
		},
		methods: {
			loginAuth() {
				this.$store.dispatch('loginAuth')
			},
			tapCommitment() {
				uni.navigateTo({
					url: '/pages/login/commitment'
				})
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
		height: calc(50vh);

		uni-image {
			width: 240rpx;
			height: 240rpx;
		}
	}

	.user-sc {
		height: calc(40vh - 150rpx);
	}
</style>
