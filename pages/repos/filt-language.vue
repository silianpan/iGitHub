<template>
	<view>
		<uni-indexed-list :options="langList" :show-select="false" @click="bindClick" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			bindClick(e) {
				const urlParam = this.langNameCodeMap[e.item.name]
				this.$emit('filtParams', {
					language: urlParam
				})
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
