import Vue from 'vue'
import App from './App'
import MinRequest from './utils/MinRequest'
import minApi from './api/api'
import MinCache from './utils/MinCache'
import store from './store'
import _ from 'lodash'
import uView from '@/uview'
Vue.use(uView)
Vue.use(MinRequest)
Vue.use(MinCache)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$_ = _

App.mpType = 'app'

const app = new Vue({
	store,
	minApi,
	...App
})
app.$mount()
