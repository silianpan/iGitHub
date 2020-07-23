import Vue from 'vue'
import App from './App'
import MinRequest from './utils/MinRequest'
import minApi from './api/api'
import MinCache from './utils/MinCache'
import store from './store'
import _ from 'lodash'
import NP from 'number-precision'
import uView from '@/uview'
// highlight.js代码高亮插件
import Highlight from '@/utils/highlight'
import i18n from './i18n'

Vue.use(uView)
Vue.use(MinRequest)
Vue.use(MinCache)
Vue.use(Highlight)

Vue.prototype.$store = store
Vue.prototype.$_ = _
Vue.prototype.$NP = NP

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype._i18n = i18n

const app = new Vue({
	store,
	minApi,
	i18n,
	...App
})
app.$mount()
