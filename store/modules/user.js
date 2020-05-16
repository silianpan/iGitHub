import Vue from 'vue'
// import OctokitRequest from '@/utils/OctokitRequest'
import GithubApi from '@/utils/GithubApi'
export default {
	state: {
		accessCode: ''
	},
	getters: {
		accessCode: state => {
			if (state.accessCode) {
				return state.accessCode
			}
			return Vue.prototype.$cache.get('_accessCode')
		}
	},
	mutations: {
		loginSuccess: (state, accessCode) => {
			console.log('accessCode', accessCode)
			state.accessCode = accessCode
			Vue.prototype.$cache.set('_accessCode', accessCode, 0)
		},
		logoutSuccess: state => {}
	},
	actions: {
		authLogin({ commit, getters }) {
			const code = getters.accessCode
			console.log('code', code)
			if (code) {
				Vue.prototype.$minApi.login(code).then(res => {
					console.log(res)
					if (res.access_token) {
						// 初始化octokit实例
						// const octokitRequest = new OctokitRequest(res.access_token)
						// Vue.prototype.$octokit = octokitRequest
						const gh = GithubApi.loginAuth(res.access_token)
						Vue.prototype.$gh = gh
						uni.reLaunch({
							url: '/pages/index/index'
						})
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				})
			}
		}
	}
}
