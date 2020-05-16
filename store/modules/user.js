import Vue from 'vue'
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
			if (code) {
				// #ifdef H5
				const url = '/apitoken/login/oauth/access_token?client_id=' + globalConfig.githubClientId + '&client_secret=' +
						globalConfig.githubClientSecret + '&code=' + code + '&state=igithub'
				// #endif
				// #ifdef APP-PLUS
				const url = 'https://github.com/login/oauth/access_token?client_id=' + globalConfig.githubClientId + '&client_secret=' +
						globalConfig.githubClientSecret + '&code=' + code + '&state=igithub'
				// #endif
				uni.request({
					url,
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
