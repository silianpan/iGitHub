<template>
	<view>
		<uni-nav-bar :fixed="false" :status-bar="true" :border="false" color="#ffffff" background-color="#0068d7"></uni-nav-bar>
		<RepoTrending />
	</view>
</template>

<script>
	import { getQueryString } from '@/utils/href'
	import RepoTrending from '@/pages/repos/trending'
	export default {
		components: {
			RepoTrending
		},
		onLoad(option) {
			// #ifdef H5
			const code = getQueryString('code')
			const state = getQueryString('state')
			this.$store.dispatch('authLogin', code, state)
			// #endif
		}
	}
</script>
