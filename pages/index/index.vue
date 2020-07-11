<template>
	<view>
		<u-navbar :is-back="false" title-color="#ffffff" :background="{background:'#f24713'}">
			<view class="slot-wrap">
				<view class="search-wrap">
					<!-- <u-tabs-swiper :height="CustomBar" inactive-color="#ffffff" :bold="false" bg-color="#f24713" activeColor="#ffffb8"
					 ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper> -->
					<scroll-view scroll-with-animation scroll-x class="nav text-center" style="background-color:#f24713; color:#ffffff"
					 :style="{'height': CustomBar + 'rpx'}">
						<view :style="{color: index==current?'#ffffb8':'#ffffff', height:'50rpx', padding: '0 12rpx', display: 'inline-block'}"
						 :class="index==current?'custom-tab-swiper-cur':''" v-for="(item,index) in list" :key="index" @tap="tabsChange(index)"
						 :data-id="index">
							{{item.name}}
						</view>
					</scroll-view>
				</view>
				<view class="navbar-right">
					<view class="right-item">
						<text class="iconfont iconguolv u-font-lg" @tap="filtLangTap"></text>
					</view>
				</view>
			</view>
		</u-navbar>
		<RepoTrending :catchtouchmove="false" ref="repoTrending" @tabsTransition="tabsTransition" @animationfinish="animationfinish" />

		<uni-drawer :visible="filtLangDrawer" mode="right" @close="closeFiltLangDrawer" @touchmove.stop.prevent="moveHandle">
			<view class="scroll-view">
				<scroll-view class="scroll-view-box" scroll-y>
					<FiltLanguage></FiltLanguage>
				</scroll-view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import {
		getQueryString
	} from '@/utils/href'
	import RepoTrending from '@/pages/repos/trending'
	import FiltLanguage from '@/pages/repos/filt-language'
	export default {
		components: {
			RepoTrending,
			FiltLanguage
		},
		data() {
			return {
				filtLangDrawer: false,
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
			moveHandle() {},
			// tabs通知swiper切换
			tabsChange(index) {
				this.$refs.repoTrending.tabsChange(index)
			},
			tabsTransition(dx) {
				// this.$refs.uTabs.setDx(dx)
			},
			animationfinish(current) {
				// this.$refs.uTabs.setFinishCurrent(current)
				this.current = current
			},
			closeFiltLangDrawer() {
				this.filtLangDrawer = false
			},
			filtLangTap() {
				this.filtLangDrawer = true
			}
		}
	}
</script>
