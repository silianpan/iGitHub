<!-- h5安全登录回调页面 -->
<template>
	<view class="text-center">
		<u-loading mode="circle" :size="40" color="#0081ff"></u-loading>
	</view>
</template>

<script>
	import { getQueryString } from '@/utils/href'
	export default {
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.$t('SecureLogin')
			})
		},
		onLoad(option) {
			// #ifdef H5
			const code = getQueryString('code')
			const state = getQueryString('state')
			this.$store.dispatch('authLogin', { code, state })
			// #endif
		}
	}
</script>
