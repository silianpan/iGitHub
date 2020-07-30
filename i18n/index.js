import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUS from './en-US'
import zhCN from './zh-CN'
Vue.use(VueI18n)

let lang = uni.getStorageSync('_lang')
if (!lang) {
	const res = uni.getSystemInfoSync()
	uni.setStorageSync('_lang', res.language)
	lang = res.language
}

const i18n = new VueI18n({
	locale: lang,
	fallbackLocale: 'en',
	silentFallbackWarn: true,
	messages: {
		'en': enUS,
		'zh-CN': zhCN
	}
})
export default i18n
