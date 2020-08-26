<template>
	<view :class="darkMode?'custom-dark':'custom-light'" class="w-h-100 order">
		<text selectable v-html="htmlContent"></text>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import marked from 'marked'
	export default {
		data() {
			return {
				content: '[FunCode](https://github.com/silianpan/iGitHub)是基于[uni-app](https://uniapp.dcloud.io/)框架开发的多端**GitHub客户端**应用，旨在帮助开发人员熟练运用GitHub，**开心编程，追逐自由**。<br>\
					要成为一名高手，要从学习高手招式开始。<br>\
					FunCode集*颜值*与*实用*于一身，随时随地看高手写代码，怀着一颗改变世界的心，学习前沿科学技术。<br>\
					[快来加入我们 →](http://silianpan.cn/funcode-doc/about/)'
			}
		},
		computed: {
			...mapGetters(['themeBgColor', 'darkMode']),
			htmlContent() {
				return marked(this.content)
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.$t('About')
			})
			// navBar-bg-color
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: this.themeBgColor,
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
		}
	}
</script>
