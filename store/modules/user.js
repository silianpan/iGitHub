import Vue from 'vue'
// import OctokitRequest from '@/utils/OctokitRequest'
import GithubApi from '@/utils/GithubApi'
import globalConfig from '@/config'
import { checkStatus } from '@/utils/checkResponse'
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
		logoutSuccess: state => {
			state.accessCode = ''
			Vue.prototype.$cache.delete('_accessCode')
		}
	},
	actions: {
		authLogin({
			commit,
			getters
		}) {
			const code = getters.accessCode
			console.log('code', code)
			if (code) {
				// Vue.prototype.$minApi.login(code).then(res => {
				// 	console.log(res)
				// 	if (res.access_token) {
				// 		// 初始化octokit实例
				// 		// const octokitRequest = new OctokitRequest(res.access_token)
				// 		// Vue.prototype.$octokit = octokitRequest
				// 		const gh = GithubApi.loginAuth(res.access_token)
				// 		Vue.prototype.$gh = gh
				// 		uni.reLaunch({
				// 			url: '/pages/index/index'
				// 		})
				// 	} else {
				// 		uni.reLaunch({
				// 			url: '/pages/login/login'
				// 		})
				// 	}
				// })
				uni.request({
					url: 'https://github.com/login/oauth/access_token?client_id=' + globalConfig.githubClientId + '&client_secret=' +
						globalConfig.githubClientSecret + '&code=' + code + '&state=igithub',
					header: {
						'content-type': 'application/json; charset=utf-8',
						'Accept': 'application/json',
					},
					withCredentials: true,
					method: 'POST',
					success: res => {
						if (res.data && res.data.access_token) {
							const gh = GithubApi.loginAuth(res.data.access_token)
							Vue.prototype.$gh = gh
							uni.reLaunch({
								url: '/pages/index/index'
							})
						} else {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					},
					fail: res => {
						checkStatus(res)
					}
				})
			}
		}
	}
}
