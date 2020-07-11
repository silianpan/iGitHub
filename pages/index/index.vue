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

		<view class="cu-modal drawer-modal justify-end" style="text-align: left!important;" :class="filtLangDrawer" @tap="closeFiltLangDrawer">
			<view class="cu-dialog basis-lg" @touchmove.stop.prevent="moveHandle" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="scroll-view">
					<scroll-view class="scroll-view-box" scroll-y>
						<FiltLanguage @filtParams="filtParams"></FiltLanguage>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getQueryString } from '@/utils/href'
	import RepoTrending from '@/pages/repos/trending'
	import FiltLanguage from '@/pages/repos/filt-language'
	export default {
		components: {
			RepoTrending,
			FiltLanguage
		},
		data() {
			return {
				filtLangDrawer: null,
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
				// this.$refs.langDrawerRef.close()
				this.filtLangDrawer = null
			},
			filtLangTap() {
				// this.$refs.langDrawerRef.open()
				this.filtLangDrawer = 'show'
			},
			filtParams(urlParams) {
				this.closeFiltLangDrawer()
				this.$store.dispatch('updateLangParams', urlParams)
				this.$refs.repoTrending.loadData(true, false)
			}
		}
	}
</script>
