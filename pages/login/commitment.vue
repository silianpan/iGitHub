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
				commitment: '[FunCode](https://github.com/silianpan/iGitHub)完全基于GitHub REST API的v3版本，没有单独的后端服务，不获取用户隐私。<br>FunCode旨在帮助开发人员熟练运用GitHub，**开心编程，追逐自由**。<br>[快来加入我们 →](http://silianpan.cn/funcode-doc/about/)'
			}
		},
		computed: {
			...mapGetters(['themeBgColor', 'darkMode']),
			htmlContent() {
				return marked(this.commitment)
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.$t('UserServiceCommitment')
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
