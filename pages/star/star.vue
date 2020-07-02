<template>
	<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" refresher-enabled
	 :refresher-triggered="triggered" @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherpulling="onPulling">
		<Repos :repos="starredRepos" />
	</scroll-view>
</template>

<script>
	import Repos from '@/pages/repos/repos'
	export default {
		components: {
			Repos
		},
		data() {
			return {
				page: 1,
				perPage: 30,
				_freshing: false,
				triggered: false,
				starredRepos: []
			}
		},
		onLoad() {
			this._freshing = false
			// 触发onRefresh来加载自己的数据，如果不用这种方式，不要在此改变triggered的值
			this.listAuthUserReposStarred(true, false)
		},
		methods: {
			async listAuthUserReposStarred(triggered, freshing) {
				const params = {
					sort: 'created',
					direction: 'desc',
					per_page: this.perPage,
					page: this.page
				}
				const res = await this.$minApi.listAuthUserReposStarred(params)
				this.starredRepos = this.starredRepos.concat(res)
				this.triggered = triggered
				this._freshing = freshing
			},
			onPulling(e) {},
			onRefresh() {
				if (this._freshing) return
				this._freshing = true
				if (!this.triggered) // 界面下拉触发，triggered可能不是true，要设为true  
					this.triggered = true
				this.listAuthUserReposStarred(false, false)
			},
			onRestore() {},
			onAbort() {},
			// scroll-view到底部加载更多
			reachBottom() {
				this.page++
				this.onRefresh()
			}
		}
	}
</script>
