<template>
	<view>
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
		data() {
			return {}
		},
		onLoad(option) {
			// #ifdef H5
			const code = getQueryString('code')
			const state = getQueryString('state')
			this.$store.dispatch('authLogin', code, state)
			// #endif
		},
		methods: {}
	}
</script>
