<template>
	<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" refresher-enabled
	 :refresher-triggered="triggered" @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherpulling="onPulling">
		<Repos :repos="starredRepos" />
		<u-loadmore :status="loadMoreStatus" icon-type="flower" />
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
				loadMoreStatus: 'loadmore',
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
			this.listAuthUserReposStarred(true, false, res => {
				this.starredRepos = res
			})
		},
		onReachBottom() {
			// next page
			this.page = ++ this.page
			
			if (this._freshing) return
			this._freshing = true
			if (!this.triggered) // 界面下拉触发，triggered可能不是true，要设为true  
				this.triggered = true
			this.listAuthUserReposStarred(false, false, res => {
				this.starredRepos = this.starredRepos.concat(res)
			})
		},
		methods: {
			async listAuthUserReposStarred(triggered, freshing, callbackFunc) {
				const params = {
					sort: 'created',
					direction: 'desc',
					per_page: this.perPage,
					page: this.page
				}
				this.loadMoreStatus = 'loading'
				const res = await this.$minApi.listAuthUserReposStarred(params)
				if (this.$_.isFunction(callbackFunc)) {
					callbackFunc(res)
				}
				this.triggered = triggered
				this._freshing = freshing
				
				if (this.$_.isEmpty(res)) {
					this.loadMoreStatus = 'nomore'
				} else {
					this.loadMoreStatus = 'loadmore'
				}
			},
			onPulling(e) {},
			onRefresh() {
				this.page = 1
				if (this._freshing) return
				this._freshing = true
				if (!this.triggered) // 界面下拉触发，triggered可能不是true，要设为true  
					this.triggered = true
				this.listAuthUserReposStarred(false, false, res => {
					this.starredRepos = res
				})
			},
			onRestore() {
				this.triggered = 'restore'
			},
			onAbort() {},
			// scroll-view到底部加载更多
			reachBottom() {}
		}
	}
</script>
