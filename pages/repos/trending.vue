<template>
	<view>
		<view class="wrap">
			<view class="bg-white text-black padding-xs" v-if="langParams">
				<text>{{ (langParams.langName || $t('AllLanguage')) + ' | ' + (langParams.sinceName || $t('Daily')) }}</text>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" refresher-enabled
					 :refresher-triggered="triggered" @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherpulling="onPulling">
						<TrendingRepo :repos="trendingRepos" />
						<u-empty v-if="$_.isEmpty(trendingRepos)" mode="list"></u-empty>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" refresher-enabled
					 :refresher-triggered="triggered" @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherpulling="onPulling">
						<TrendingDeveloper :developers="trendingDevelopers" />
						<u-empty v-if="$_.isEmpty(trendingDevelopers)" mode="list"></u-empty>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import TrendingRepo from './trending-repos'
	import TrendingDeveloper from '@/pages/developer/trending-developer'
	export default {
		components: {
			TrendingRepo,
			TrendingDeveloper
		},
		computed: {
			...mapGetters(['langParams'])
		},
		data() {
			return {
				trendingRepos: [],
				trendingDevelopers: [],
				_freshing: false,
				triggered: false,
				current: 0,
				swiperCurrent: 0
			}
		},
		mounted() {
			this._freshing = false
			// load data
			this.loadData(true, false)
		},
		methods: {
			async loadData(triggered, freshing) {
				this.trendingRepos = await this.$minApi.listTrendingRepo(this.langParams)
				this.trendingDevelopers = await this.$minApi.listTrendingDeveloper(this.langParams)
				this.triggered = triggered
				this._freshing = freshing
			},
			onPulling(e) {},
			onRefresh() {
				if (this._freshing) return
				this._freshing = true
				if (!this.triggered)
					this.triggered = true
				this.loadData(false, false)
			},
			onRestore() {},
			onAbort() {},
			// scroll-view load more
			reachBottom() {},
			// tabs -> swiper change
			tabsChange(index) {
				this.swiperCurrent = index
			},
			// swiper-item left or right swiper -> tabs scrollBar move
			transition({
				detail: {
					dx
				}
			}) {
				this.$emit('tabsTransition', dx)
			},
			// swiper finish -> set tabs swiper status
			animationfinish({
				detail: {
					current
				}
			}) {
				this.swiperCurrent = current
				this.$emit('animationfinish', current)
				// refresh
				// this.onRefresh()
			}
		}
	}
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--status-bar-height));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
