<template>
	<view>
		<uni-nav-bar :fixed="false" :border="false" color="#ffffff" background-color="#f24713" />
		<RepoTrending />
	</view>
</template>

<script>
	import { getQueryString } from '@/utils/href'
	import RepoTrending from '@/pages/repos/trending'
	export default {
		components: {
			RepoTrending
		}
	}
</script>
