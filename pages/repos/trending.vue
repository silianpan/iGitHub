<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper inactive-color="#ffffff" :bold="false" bg-color="#0068d7" activeColor="#f9906f" ref="uTabs" :list="list"
				 :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
				<view style="background-color: #0068d7; color: #ffffff;" class="padding-xs">
					<text class="iconfont iconguolv margin-right-xs"></text>
					<text>所有语言 | 今日</text>
				</view>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" @change="swiperChange">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" refresher-enabled
					 :refresher-triggered="triggered" @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherpulling="onPulling">
						<TrendingRepo ref="refTrendingRepo" />
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<TrendingDeveloper ref="refTrendingDeveloper" />
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
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
			swiperChange() {
				this.onRefresh()
			},
			loadData(triggered, freshing) {
				if (this.current === 0) {
					this.$refs.refTrendingRepo.listRepo().then(() => {
						this.triggered = triggered
						this._freshing = freshing
					})
				} else if (this.current === 1) {
					this.$refs.refTrendingDeveloper.listDeveloper().then(() => {
						this.triggered = triggered
						this._freshing = freshing
					})
				}
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
				this.$refs.uTabs.setDx(dx)
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.uTabs.setFinishCurrent(current)
				this.swiperCurrent = current
				this.current = current
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
