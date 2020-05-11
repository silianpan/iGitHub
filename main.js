import Vue from 'vue'
import App from './App'
import MinRequest from './utils/MinRequest'
import minApi from './api/api'
import minApiTrending from './api/apiTrending'
import MinCache from './utils/MinCache'
import uView from "@/uview"
Vue.use(uView)
Vue.use(MinRequest)
Vue.use(MinCache)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	minApi,
	minApiTrending,
	...App
})
app.$mount()
