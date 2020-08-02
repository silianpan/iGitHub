<!-- callback page of h5 -->
<template>
	<view class="text-center">
		<u-loading mode="circle" :size="40" color="#0081ff"></u-loading>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { getQueryString } from '@/utils/href'
	export default {
		computed: {
			...mapGetters(['themeBgColor'])
		},
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.$t('SecureLogin')
			})
			// navBar-bg-color
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: this.themeBgColor,
			    animation: {
			        duration: 400,
			        timingFunc: 'easeIn'
			    }
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
