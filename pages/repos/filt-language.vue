<template>
	<view>
		<view class="padding-top-sm padding-right-sm bg-white" style="text-align: right;">
			<button class="cu-btn sm text-white" :style="{backgroundColor:themeBgColor}" @tap="okTap">{{$t('Ok')}}</button>
		</view>
		<u-radio-group class="padding-left-sm" v-model="currentTime" :size="30">
			<u-radio v-for="(value, key) in timeMap" :key="key" :name="key">{{value}}</u-radio>
		</u-radio-group>
		<u-divider :use-slot="false" :half-width="'100%'" :margin-top="10" :margin-bottom="10" />
		<u-row>
			<u-col span="8">
				<u-search class="padding-left-sm" v-model="keyword" clearabled :show-action="false" :shape="'square'" @search="searchAction" />
			</u-col>
			<u-col span="4">
				<!-- clear search history -->
				<button class="cu-btn sm bg-blue" @tap="clearSearchHistoryTap">{{$t('ClearSearchHistory')}}</button>
			</u-col>
		</u-row>
		<!-- search history -->
		<!-- <view @tap="historyLangTap(item)" v-for="(item, index) in langHistory" :key="index" class="padding-left-sm">{{item.langName}}</view> -->
		<u-radio-group @change="historyLangTap" wrap class="padding-left-sm" v-model="selectedLangHistory" :size="30">
			<u-radio v-for="(item, index) in langHistory" :key="item.language" :name="item.language">{{item.langName}}</u-radio>
		</u-radio-group>
		<u-divider :use-slot="false" :half-width="'100%'" :margin-top="10" :margin-bottom="10" />
		<!-- <view @tap="allLangTap" class="padding-left-sm">{{$t('AllLanguage')}}</view> -->
		<uni-indexed-list :options="langList" show-select @click="bindClick" />
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters(['langParamsHistory', 'themeBgColor']),
			langHistory() {
				return [
					{
						language: null,
						langName: this.$t('AllLanguage')
					},
					...this.langParamsHistory
				]
			}
		},
		data() {
			return {
				selectedLangHistory: '',
				keyword: '',
				currentTime: 'daily',
				timeMap: {
					daily: this.$t('Daily'),
					weekly: this.$t('Weekly'),
					monthly: this.$t('Monthly')
				},
				langCode: null,
				langName: null,
				langList: [],
				langNameCodeMap: {},
				langMap: {
					A: [],
					B: [],
					C: [],
					D: [],
					E: [],
					F: [],
					G: [],
					H: [],
					I: [],
					J: [],
					K: [],
					L: [],
					M: [],
					N: [],
					O: [],
					P: [],
					Q: [],
					R: [],
					S: [],
					T: [],
					U: [],
					V: [],
					W: [],
					X: [],
					Y: [],
					Z: [],
					'#': []
				}
			}
		},
		mounted() {
			this.listLanguages()
		},
		methods: {
			searchAction() {
				// search language
				if (!this.$_.isEmpty(this.keyword)) {
					let langList = []
					for (let key in this.langMap) {
						let newLangList = []
						if (!this.$_.isEmpty(this.langMap[key])) {
							this.langMap[key].forEach(lang => {
								if (lang.toLowerCase().indexOf(this.keyword.toLowerCase()) !== -1) {
									newLangList.push(lang)
								}
							})
						}
						if (!this.$_.isEmpty(newLangList)) {
							let newLangMap = {
								letter: key,
								data: newLangList
							}
							langList.push(newLangMap)
						}
					}
					this.langList = langList
				} else {
					this.listLanguages()
				}
			},
			okTap() {
				this.$emit('filtParams', {
					language: this.langCode,
					langName: this.langName,
					since: this.currentTime,
					sinceName: this.timeMap[this.currentTime]
				})
			},
			bindClick(e) {
				this.langName = e.item.name
				this.langCode = this.langNameCodeMap[e.item.name]
			},
			historyLangTap(langCode) {
				this.langCode = langCode
				this.langName = this.langParamsHistory.filter(item => item.language === langCode)[0].langName
			},
			allLangTap() {
				this.langName = this.$t('AllLanguage')
				this.langCode = null
			},
			clearSearchHistoryTap() {
				this.$store.dispatch('clearLangParams')
			},
			async listLanguages() {
				const res = await this.$minApi.listLanguages()
				if (!this.$_.isEmpty(res)) {
					res.forEach(item => {
						if (item.name && item.urlParam) {
							this.langNameCodeMap[item.name] = item.urlParam
							const letter = item.name.substring(0, 1).toUpperCase()
							if (this.langMap.hasOwnProperty(letter)) {
								this.langMap[letter].push(item.name)
							} else {
								this.langMap['#'].push(item.name)
							}
						}
					})
				}
				let langList = []
				for (let key in this.langMap) {
					let newLangMap = {
						letter: key,
						data: this.langMap[key]
					}
					langList.push(newLangMap)
				}
				this.langList = langList
			}
		}
	}
</script>
