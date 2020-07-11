<template>
	<view>
		<view class="wrap">
			<view class="bg-white text-black padding-xs">
				<text>所有语言 | 今日</text>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" refresher-enabled
					 :refresher-triggered="triggered" @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherpulling="onPulling">
						<TrendingRepo :repos="trendingRepos" />
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" refresher-enabled
					 :refresher-triggered="triggered" @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherpulling="onPulling">
						<TrendingDeveloper :developers="trendingDevelopers" />
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

		<!-- <view class="cu-modal drawer-modal justify-start" :class="filtLangDrawer" @tap="hidefiltLangDrawer">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<FiltLanguage></FiltLanguage>
			</view>
		</view> -->
	</view>
</template>

<script>
	import TrendingRepo from './trending-repos'
	import TrendingDeveloper from '@/pages/developer/trending-developer'
	export default {
		components: {
			TrendingRepo,
			TrendingDeveloper
		},
		data() {
			return {
				trendingRepos: [],
				trendingDevelopers: [],
				_freshing: false,
				triggered: false,
				list: [{
						name: '仓库'
					},
					{
						name: '开发者'
					}
				],
				current: 0,
				swiperCurrent: 0
			}
		},
		mounted() {
			this._freshing = false
			// 触发onRefresh来加载自己的数据，如果不用这种方式，不要在此改变triggered的值
			this.loadData(true, false)
		},
		methods: {
			async loadData(triggered, freshing) {
				this.trendingRepos = await this.$minApi.listTrendingRepo()
				this.trendingDevelopers = await this.$minApi.listTrendingDeveloper()
				this.triggered = triggered
				this._freshing = freshing
			},
			onPulling(e) {},
			onRefresh() {
				if (this._freshing) return
				this._freshing = true
				if (!this.triggered) // 界面下拉触发，triggered可能不是true，要设为true  
					this.triggered = true
				this.loadData(false, false)
			},
			onRestore() {},
			onAbort() {},
			// scroll-view到底部加载更多
			reachBottom() {},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition({
				detail: {
					dx
				}
			}) {
				this.$emit('tabsTransition', dx)
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish({
				detail: {
					current
				}
			}) {
				this.swiperCurrent = current
				this.$emit('animationfinish', current)
				// 执行更新方法，不用每次都加载
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
