<template>
	<view>
		<u-navbar :is-back="false" title-color="#ffffff" :background="{background:'#f24713'}">
			<view class="slot-wrap">
				<view class="u-tabs-box">
					<u-tabs-swiper :height="CustomBar" inactive-color="#ffffff" :bold="false" bg-color="#f24713" activeColor="#ffffb8"
					 ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
					<!-- <view class="primary-color padding-xs" @tap="filtLangTap">
							<text class="iconfont iconguolv margin-right-xs"></text>
							<text>所有语言 | 今日</text>
						</view> -->
				</view>
			</view>
		</u-navbar>
		<RepoTrending ref="repoTrending" @tabsTransition="tabsTransition" @animationfinish="animationfinish" />
	</view>
</template>

<script>
	import {
		getQueryString
	} from '@/utils/href'
	import RepoTrending from '@/pages/repos/trending'
	export default {
		components: {
			RepoTrending
		},
		data() {
			return {
				current: 0,
				list: [{
						name: '仓库'
					},
					{
						name: '开发者'
					}
				]
			}
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.$refs.repoTrending.tabsChange(index)
			},
			tabsTransition(dx) {
				this.$refs.uTabs.setDx(dx)
			},
			animationfinish(current) {
				this.$refs.uTabs.setFinishCurrent(current)
				this.current = current
			}
		}
	}
</script>
