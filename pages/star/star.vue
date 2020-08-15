<template>
	<scroll-view :class="darkMode?'custom-dark':'custom-light'" class="w-h-100" scroll-y @scrolltolower="reachBottom" refresher-enabled
	 :refresher-triggered="triggered" @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherpulling="onPulling">
		<Repos v-if="$_.isArray(starredRepos)" :repos="starredRepos" />
		<u-loadmore class="padding-bottom padding-top" :status="loadMoreStatus" icon-type="flower" />
	</scroll-view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Repos from '@/pages/repos/repos'
	export default {
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.$t('Stars')
			})
			this.setNavBarColor()
		},
		computed: {
			...mapGetters(['themeBgColor', 'darkMode'])
		},
		components: {
			Repos
		},
		watch: {
			themeBgColor() {
				this.setNavBarColor()
			}
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
			// load data
			this.listAuthUserReposStarred(true, false, res => {
				this.starredRepos = res
			})
		},
		onReachBottom() {
			// next page
			this.page = ++this.page

			if (this._freshing) return
			this._freshing = true
			if (!this.triggered)
				this.triggered = true
			this.listAuthUserReposStarred(false, false, res => {
				this.starredRepos = this.starredRepos.concat(res)
			})
		},
		methods: {
			setNavBarColor() {
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
				if (this._freshing) return
				this._freshing = true
				if (!this.triggered)
					this.triggered = true

				this.page = 1
				this.listAuthUserReposStarred(false, false, res => {
					this.starredRepos = res
				})
			},
			onRestore() {
				this.triggered = 'restore'
			},
			onAbort() {},
			reachBottom() {}
		}
	}
</script>
