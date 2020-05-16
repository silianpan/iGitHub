<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper inactive-color="#ffffff" :bold="false" bg-color="#0068d7" activeColor="#f9906f" ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
				 swiperWidth="750"></u-tabs-swiper>
				 <view style="background-color: #0068d7; color: #ffffff;" class="padding-xs">
					<text class="iconfont iconguolv margin-right-xs"></text>
					<text>所有语言 | 今日</text>
				 </view>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<TrendingRepo />
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import TrendingRepo from './trending-repos'
	export default {
		components: {
			TrendingRepo
		},
		data() {
			return {
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
		methods: {
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
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
