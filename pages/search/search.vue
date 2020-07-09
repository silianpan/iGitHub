<template>
	<view>
		<u-navbar :is-back="false" title-color="#ffffff" :background="{background:'#f24713'}">
			<view class="slot-wrap">
				<view class="search-wrap">
					<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
					<u-search @search="searchAction" v-model="keyword" :show-action="false"></u-search>
				</view>
			</view>
		</u-navbar>
		<Repos :repos="reposList" />
		<u-loadmore :status="loadMoreStatus" icon-type="flower" />
	</view>
</template>

<script>
	import Repos from '@/pages/repos/repos'
	export default {
		components: {
			Repos
		},
		data() {
			return {
				loadMoreStatus: 'loadmore',
				reposList: [],
				keyword: '',
				per_page: 30,
				page: 1
			}
		},
		methods: {
			searchAction() {
				this.keyword && this.searchRepos()
			},
			async searchRepos() {
				let params = {
					q: this.keyword,
					sort: 'stars',
					order: 'desc',
					per_page: this.per_page,
					page: this.page
				}
				this.loadMoreStatus = 'loading'
				const res = await this.$minApi.searchRepos(params)
				if (this.$_.isEmpty(res) || this.$_.isEmpty(res.items)) {
					this.loadMoreStatus = 'nomore'
				} else {
					this.reposList = res.items
					this.loadMoreStatus = 'loadmore'
				}
			}
		}
	}
</script>
