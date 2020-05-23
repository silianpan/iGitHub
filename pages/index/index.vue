<template>
	<view>
		<uni-nav-bar :fixed="false" :border="false" color="#ffffff" background-color="#0068d7" />
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
