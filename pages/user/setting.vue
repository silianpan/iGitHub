<!-- setting -->
<template>
	<scroll-view scroll-y>
		<view class="bg-white margin-top-xs">
			<view class="cu-list menu sm-border u-skeleton-rect">
				<view class="cu-item arrow" @tap="tapLang">
					<view class="content">
						<text class="list-left-icon cu-avatar round bg-cyan iconfont iconshezhi1" />
						<text class="text-grey padding-left-sm">{{ $t('Language') }}</text>
					</view>
					<view class="action">
						<view>{{ $t(currentLang) }}</view>
					</view>
				</view>
				<view class="cu-item arrow" @tap="tapTheme">
					<view class="content">
						<text class="list-left-icon cu-avatar round bg-cyan iconfont iconshezhi1" />
						<text class="text-grey padding-left-sm">{{ $t('Theme') }}</text>
					</view>
					<view class="action">
						<view>{{ $t(currentTheme) }}</view>
					</view>
				</view>
			</view>
		</view>
		<u-action-sheet @click="clickLang" :list="listLang" v-model="showLang" :cancel-btn="false"></u-action-sheet>
		<u-action-sheet @click="clickTheme" :list="listTheme" v-model="showTheme" :cancel-btn="false"></u-action-sheet>
	</scroll-view>
</template>

<script>
	export default {
		computed: {
			listLang() {
				return [{ text: 'System' },
					{ text: 'English' },
					{ text: '中文' }]
			},
			listTheme() {
				return [{ text: this.$t('BluishGreen'), color: '#48c0a3' }]
			}
		},
		data() {
			return {
				currentLang: '',
				currentTheme: '',
				showLang: false,
				showTheme: false
			}
		},
		mounted() {
			this.getCurrentLang()
		},
		methods: {
			getCurrentLang() {
				this.currentLang = uni.getStorageSync('_lang').data || 'System'
			},
			tapLang() {
				this.showLang = true
			},
			clickLang(index) {
				if (index === 0) {
					const res = uni.getSystemInfoSync()
					this.$i18n.locale = res.language
					this.$cache.set('_lang', 'System', 0)
				} else if (index === 1) {
					this.$cache.set('_lang', 'en', 0)
					this.$i18n.locale = 'en'
				} else if (index === 2) {
					this.$cache.set('_lang', 'zh-CN', 0)
					this.$i18n.locale = 'zh-CN'
				}
				this.getCurrentLang()
			},
			tapTheme() {
				this.showTheme = true
			},
			clickTheme(index) {
				const color = this.listTheme[index].color
				this.$store.dispatch('initThemeBgColor', color)
				// navBar-bg-color
				uni.setNavigationBarColor({
				    frontColor: '#ffffff',
				    backgroundColor: color,
				    animation: {
				        duration: 400,
				        timingFunc: 'easeIn'
				    }
				})
			}
		}
	}
</script>
