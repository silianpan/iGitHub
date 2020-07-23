import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUS from './en-US'
import zhCN from './zh-CN'
Vue.use(VueI18n)

const i18n = new VueI18n({
	locale: 'en-US',
	messages: {
		'en-US': enUS,
		'zh-CN': zhCN
	}
})
export default i18n
