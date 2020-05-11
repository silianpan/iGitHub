import Vue from 'vue'
import OctokitRequest from '@/utils/OctokitRequest'
export default {
	state: {},
	getters: {},
	mutations: {
		loginSuccess: state => {},
		logoutSuccess: state => {}
	},
	actions: {
		async authLogin({ commit }, code) {
			if (code) {
				let res = await Vue.prototype.$minApi.login(code)
				console.log('res', res)
				if (res.access_token) {
					// 初始化octokit实例
					const octokitRequest = new OctokitRequest(res.access_token)
					Vue.prototype.$octokit = octokitRequest
				} else {
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}
			}
		}
	}
}
