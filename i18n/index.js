import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUS from './en-US'
import zhCN from './zh-CN'
Vue.use(VueI18n)

const i18n = new VueI18n({
	locale: 'en',
	messages: {
		'en': enUS,
		'zh-CN': zhCN
	}
})
export default i18n
