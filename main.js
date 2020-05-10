import Vue from 'vue'
import App from './App'
import MinRequest from './utils//MinRequest'
import minRequest from './api/api'
import MinCache from './utils/MinCache'
import uView from "@/uview"
Vue.use(uView)
Vue.use(MinRequest)
Vue.use(MinCache)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	minRequest,
	...App
})
app.$mount()
