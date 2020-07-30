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
			</view>
		</view>
		<u-action-sheet @click="clickLang" :list="listLang" v-model="showLang"></u-action-sheet>
	</scroll-view>
</template>

<script>
	export default {
		computed: {
			currentLang() {
				let lang = uni.getStorageSync('_lang').data
				if (!lang || lang === 'System') {
					const res = uni.getSystemInfoSync()
					lang = res.language
				}
				return lang
			},
			listLang() {
				return [{ text: 'System' },
					{ text: 'English' },
					{ text: '中文' }]
			}
		},
		data() {
			return {
				showLang: false
			}
		},
		methods: {
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
			}
		}
	}
</script>
